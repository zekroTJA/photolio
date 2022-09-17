use crate::{
    cache::spec::Cache,
    models::{BlurHash, Dimensions, Exif, Image},
    storage::spec::Storage,
};
use chrono::{NaiveDate, Utc};
use exif::{DateTime, In, Tag, Value};
use log::{debug, error, info};
use std::{
    error::Error,
    io::{BufReader, Seek},
    path::Path,
    sync::{mpsc::channel, Arc},
};
use threadpool::ThreadPool;

const CONTENT_BUCKET: &str = "content";

pub fn details<S, C>(
    storage: Arc<Box<S>>,
    cache: &mut Arc<Box<C>>,
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
    storage: Arc<Box<S>>,
    cache: &mut Arc<Box<C>>,
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
            let res = details(storage, &mut cache, id.as_str());
            if let Err(err) = tx.send(res) {
                error!("Failed sending result to channel {id}: {err}");
            }
        });
    }

    Ok(rx.iter().take(n_items).collect())
}

fn image_details<S, C>(
    storage: Arc<Box<S>>,
    cache: &mut Arc<Box<C>>,
    id: &str,
) -> Result<Image, Box<dyn Error + Send + Sync>>
where
    S: Storage,
    C: Cache<Image>,
{
    info!("Collecting image details for {id} ...");

    let data = storage.read(CONTENT_BUCKET, id)?;
    let mut buf_data = BufReader::new(data);

    let image_format =
        image::ImageFormat::from_extension(Path::new(id).extension().unwrap_or_default());

    let mut image_reader = image::io::Reader::new(&mut buf_data);
    if let Some(format) = image_format {
        debug!("{{{id}}} Got format from ext");
        image_reader.set_format(format);
    } else {
        debug!("{{{id}}} Guessing image format ...");
        image_reader = image_reader.with_guessed_format()?;
    }

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

    if let Some(cache) = Arc::get_mut(cache) {
        debug!("{{{id}}} Storing result to cache ...");
        cache.set(format!("imgmeta-{id}").as_str(), &image);
    }

    Ok(image)
}

fn get_exif_field(exif_meta: &exif::Exif, tag: Tag) -> Option<String> {
    exif_meta
        .get_field(tag, In::PRIMARY)
        .map(|f| format!("{}", f.display_value().with_unit(f)))
}
