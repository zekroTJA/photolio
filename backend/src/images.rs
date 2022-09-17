use crate::{
    cache::spec::Cache,
    models::{BlurHash, Dimensions, Exif, Image},
    storage::spec::{ReadSeek, Storage},
};
use chrono::{NaiveDate, Utc};
use exif::{DateTime, In, Tag, Value};
use image::ImageOutputFormat;
use log::{debug, error, info};
use std::{
    error::Error,
    io::{BufReader, Cursor, Read, Seek, SeekFrom},
    path::Path,
    sync::{mpsc::channel, Arc},
};
use threadpool::ThreadPool;

const CONTENT_BUCKET: &str = "content";
const THUMBNAILS_BUCKET: &str = "thumbnails";

pub fn details<S, C>(
    storage: Arc<S>,
    cache: Arc<C>,
    id: &str,
) -> Result<Image, Box<dyn Error + Send + Sync>>
where
    S: Storage,
    C: Cache<Image>,
{
    match cache.get(format!("imgmeta-{id}").as_str()) {
        Some(i) => {
            debug!("Returned image meta from cache for {id}");
            Ok(i)
        }
        None => image_details(storage, cache, id),
    }
}

pub fn list<S, C>(
    storage: Arc<S>,
    cache: &mut Arc<C>,
) -> Result<Vec<Result<Image, Box<dyn Error + Send + Sync>>>, Box<dyn Error>>
where
    S: Storage + Send + Sync + 'static,
    C: Cache<Image> + Send + Sync + 'static,
{
    let item_ids = storage.list(CONTENT_BUCKET)?;

    let pool = ThreadPool::new(num_cpus::get());
    let (tx, rx) = channel();

    let n_items = item_ids.len();
    for id in item_ids {
        let tx = tx.clone();
        let storage = storage.clone();
        let mut cache = cache.clone();
        pool.execute(move || {
            let res = details(storage, cache, id.as_str());
            if let Err(err) = tx.send(res) {
                error!("Failed sending result to channel {id}: {err}");
            }
        });
    }

    Ok(rx.iter().take(n_items).collect())
}

fn image_reader<'a, R>(
    buf_data: &'a mut BufReader<R>,
    id: &str,
) -> Result<image::io::Reader<&'a mut BufReader<R>>, Box<dyn Error + Send + Sync>>
where
    R: Read + Seek,
{
    let image_format =
        image::ImageFormat::from_extension(Path::new(id).extension().unwrap_or_default());

    let mut image_reader = image::io::Reader::new(buf_data);
    if let Some(format) = image_format {
        debug!("{{{id}}} Got format from ext");
        image_reader.set_format(format);
    } else {
        debug!("{{{id}}} Guessing image format ...");
        image_reader = image_reader.with_guessed_format()?;
    }

    Ok(image_reader)
}

fn image_details<S, C>(
    storage: Arc<S>,
    cache: Arc<C>,
    id: &str,
) -> Result<Image, Box<dyn Error + Send + Sync>>
where
    S: Storage,
    C: Cache<Image>,
{
    info!("Collecting image details for {id} ...");

    let data = storage.read(CONTENT_BUCKET, id)?;
    let mut buf_data = BufReader::new(data);

    let image_reader = image_reader(&mut buf_data, id)?;

    debug!("{{{id}}} Decoding image ...");
    let image = image_reader.decode()?;
    buf_data.seek(std::io::SeekFrom::Start(0))?;

    debug!("{{{id}}} Reading exif metadata ...");
    let exif_reader = exif::Reader::new();
    let exif_meta = exif_reader.read_from_container(&mut buf_data)?;

    let datetime = match exif_meta.get_field(Tag::DateTime, In::PRIMARY) {
        Some(field) => match field.value {
            Value::Ascii(ref vec) if !vec.is_empty() => {
                if let Ok(datetime) = DateTime::from_ascii(&vec[0]) {
                    Some(datetime)
                } else {
                    None
                }
            }
            _ => None,
        },
        _ => None,
    }
    .map(|v| {
        chrono::DateTime::from_utc(
            NaiveDate::from_ymd(v.year.into(), v.month.into(), v.day.into()).and_hms(
                v.hour.into(),
                v.minute.into(),
                v.second.into(),
            ),
            Utc,
        )
    });

    let bh_dimensions = Dimensions {
        width: 4,
        height: 4,
    };

    debug!("{{{id}}} Generating blurhash ...");
    let b_hash = blurhash::encode(
        bh_dimensions.width,
        bh_dimensions.height,
        image.width(),
        image.height(),
        image.to_rgba8().to_vec().as_slice(),
    );

    let image = Image {
        id: id.to_string(),
        name: id.to_string(),
        timestamp: chrono::Utc::now(),
        blurhash: BlurHash {
            hash: b_hash,
            components: bh_dimensions,
        },
        dimensions: Dimensions {
            width: image.width(),
            height: image.height(),
        },
        exif: Exif {
            fstop: get_exif_field(&exif_meta, Tag::FNumber),
            iso: get_exif_field(&exif_meta, Tag::ISOSpeed),
            exposuretime: get_exif_field(&exif_meta, Tag::ExposureTime),
            lensmodel: get_exif_field(&exif_meta, Tag::LensModel),
            lensmake: get_exif_field(&exif_meta, Tag::LensMake),
            bodymodel: get_exif_field(&exif_meta, Tag::Model),
            bodymake: get_exif_field(&exif_meta, Tag::Make),
            taken: datetime,
        },
    };

    debug!("{{{id}}} Storing result to cache ...");
    cache.set(format!("imgmeta-{id}").as_str(), &image);

    Ok(image)
}

pub fn thumbnail<S>(
    storage: Arc<S>,
    id: &str,
    width: u32,
    height: u32,
) -> Result<Box<dyn ReadSeek>, Box<dyn Error>>
where
    S: Storage,
{
    if width == 0 && height == 0 {
        return Err("width and height can not be both 0".into());
    }

    let thumbnail_id = format!("{id}_{width}x{height}");

    if storage.exists(THUMBNAILS_BUCKET, thumbnail_id.as_str())? {
        debug!("Returning thumbnail from storage for {id} ...");
        return match storage.read(THUMBNAILS_BUCKET, thumbnail_id.as_str()) {
            Ok(r) => Ok(r),
            Err(e) => Err(e),
        };
    }

    info!("Generating thumbnail for {id} ...");

    let reader = match storage.read(CONTENT_BUCKET, id) {
        Ok(r) => r,
        Err(e) => return Err(e),
    };

    let mut buf_data = BufReader::new(reader);
    let image_reader = match image_reader(&mut buf_data, id) {
        Ok(r) => r,
        Err(e) => return Err(e),
    };

    let mut buf = Cursor::new(Vec::<u8>::new());

    let width = if width == 0 { u32::MAX } else { width };
    let height = if height == 0 { u32::MAX } else { height };

    image_reader
        .decode()?
        .thumbnail(width, height)
        .write_to(&mut buf, ImageOutputFormat::Jpeg(80))?;

    buf.seek(SeekFrom::Start(0))?;
    storage.store(THUMBNAILS_BUCKET, thumbnail_id.as_str(), &mut buf)?;

    Ok(Box::new(buf))
}

fn get_exif_field(exif_meta: &exif::Exif, tag: Tag) -> Option<String> {
    exif_meta
        .get_field(tag, In::PRIMARY)
        .map(|f| format!("{}", f.display_value().with_unit(f)))
}
