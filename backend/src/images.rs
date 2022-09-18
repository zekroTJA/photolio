use crate::{
    cache::spec::Cache,
    errors::StatusError,
    models::{BlurHash, Dimensions, Exif, Image},
    storage::spec::{ReadSeek, Storage},
    tenary,
};
use actix_web::http::StatusCode;
use chrono::{NaiveDate, Utc};
use exif::{In, Tag, Value};
use image::{GenericImageView, ImageOutputFormat};
use log::{debug, error, info, warn};
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

pub fn list<S, C>(storage: Arc<S>, cache: Arc<C>) -> Result<Vec<Image>, Box<dyn Error>>
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
        let cache = cache.clone();
        pool.execute(move || {
            let res = details(storage, cache, id.as_str());
            if let Err(err) = tx.send(res) {
                error!("Failed sending result to channel {id}: {err}");
            }
        });
    }

    let mut res = match rx.iter().take(n_items).collect::<Result<Vec<_>, _>>() {
        Ok(r) => r,
        Err(e) => return Err(e),
    };

    res.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));

    Ok(res)
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

fn extract_exif(
    mut buf_data: BufReader<Box<dyn ReadSeek>>,
) -> Result<Exif, Box<dyn Error + Send + Sync>> {
    let exif_reader = exif::Reader::new();
    let exif_meta = exif_reader.read_from_container(&mut buf_data)?;

    let datetime = match exif_meta.get_field(Tag::DateTime, In::PRIMARY) {
        Some(field) => match field.value {
            Value::Ascii(ref vec) if !vec.is_empty() => {
                if let Ok(datetime) = exif::DateTime::from_ascii(&vec[0]) {
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

    Ok(Exif {
        fstop: get_exif_field(&exif_meta, Tag::FNumber),
        iso: get_exif_field(&exif_meta, Tag::ISOSpeed),
        exposuretime: get_exif_field(&exif_meta, Tag::ExposureTime),
        lensmodel: get_exif_field(&exif_meta, Tag::LensModel),
        lensmake: get_exif_field(&exif_meta, Tag::LensMake),
        bodymodel: get_exif_field(&exif_meta, Tag::Model),
        bodymake: get_exif_field(&exif_meta, Tag::Make),
        taken: datetime,
    })
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
    let ex = match extract_exif(buf_data) {
        Ok(r) => Ok(Some(r)),
        Err(err)
            if err.is::<exif::Error>()
                && matches!(
                    err.downcast_ref::<exif::Error>().unwrap(),
                    exif::Error::NotFound(_)
                ) =>
        {
            warn!("No exif data found for image {id}");
            Ok(None)
        }
        Err(e) => Err(e),
    }?;

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

    let meta = storage.meta(CONTENT_BUCKET, id)?;

    let image = Image {
        id: id.to_string(),
        name: id.to_string(),
        timestamp: meta.modified()?.into(),
        blurhash: BlurHash {
            hash: b_hash,
            components: bh_dimensions,
        },
        dimensions: Dimensions {
            width: image.width(),
            height: image.height(),
        },
        exif: ex,
    };

    debug!("{{{id}}} Storing result to cache ...");
    cache.set(format!("imgmeta-{id}").as_str(), &image);

    Ok(image)
}

pub fn data<S>(storage: Arc<S>, id: &str) -> Result<Box<dyn ReadSeek>, Box<dyn Error + Send + Sync>>
where
    S: Storage,
{
    storage.read(CONTENT_BUCKET, id)
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
        return Err(Box::new(StatusError::wrap(
            "with and height can not be both 0".into(),
            StatusCode::BAD_REQUEST,
        )));
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

    let image = image_reader.decode()?;

    let (original_width, original_height) = image.dimensions();
    let width = tenary!(width > original_width => original_width; width);
    let height = tenary!(height > original_height => original_height; height);

    image
        .thumbnail(width, height)
        .write_to(&mut buf, ImageOutputFormat::Jpeg(80))?;

    buf.seek(SeekFrom::Start(0))?;
    storage.store(THUMBNAILS_BUCKET, thumbnail_id.as_str(), &mut buf)?;

    buf.seek(SeekFrom::Start(0))?;
    Ok(Box::new(buf))
}

fn get_exif_field(exif_meta: &exif::Exif, tag: Tag) -> Option<String> {
    exif_meta
        .get_field(tag, In::PRIMARY)
        .map(|f| format!("{}", f.display_value().with_unit(f)))
}
