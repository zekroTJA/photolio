use crate::{
    cache::CacheDriver,
    errors::StatusError,
    models::{BlurHash, Dimensions, Exif, Image},
    storage::{ReadSeek, Storage},
    tenary,
};
use actix_web::http::StatusCode;
use anyhow::Result;
use chrono::{NaiveDate, Utc};
use exif::{In, Tag, Value};
use image::{GenericImageView, ImageOutputFormat};
use log::{debug, error, info, warn};
use once_cell::sync::OnceCell;
use std::{
    io::{BufReader, Cursor, Read, Seek, SeekFrom},
    ops::Deref,
    path::Path,
    sync::{mpsc::channel, Arc, Mutex},
};
use threadpool::ThreadPool;

pub const CONTENT_BUCKET: &str = "content";
pub const THUMBNAILS_BUCKET: &str = "thumbnails";

static POOL: OnceCell<Mutex<ThreadPool>> = OnceCell::new();

pub fn get_pool() -> &'static Mutex<threadpool::ThreadPool> {
    POOL.get_or_init(|| Mutex::new(ThreadPool::new(num_cpus::get())))
}

pub fn prepare(storage: &Storage) -> Result<()> {
    storage.create_bucket_if_not_exists(CONTENT_BUCKET)?;
    storage.create_bucket_if_not_exists(THUMBNAILS_BUCKET)?;
    Ok(())
}

pub fn cached_details(cache: &CacheDriver<Image>, id: &str) -> Result<Option<Image>> {
    let v = cache.get(format!("imgmeta-{id}").as_str())?;
    Ok(v)
}

pub fn cache_all_images(
    storage: Arc<Storage>,
    cache: Arc<CacheDriver<Image>>,
    block: bool,
) -> Result<()> {
    let item_ids: Vec<String> = storage
        .list(CONTENT_BUCKET)?
        .iter()
        .filter(|(id, _)| is_image(Path::new(id)))
        .map(|(id, _)| id)
        .cloned()
        .collect();

    let pool = get_pool()
        .lock()
        .map_err(|_| anyhow::anyhow!("locking thread poool failed"))?;
    let (tx, rx) = channel();

    let n_items = item_ids.len();
    for id in item_ids {
        let tx = tx.clone();
        let storage = storage.clone();
        let cache = cache.clone();
        pool.execute(move || {
            let res = image_details(&storage, &cache, &id);
            if block {
                if let Err(err) = tx.send(res) {
                    error!("Failed sending result to channel {id}: {err}");
                }
            } else if let Err(err) = res {
                error!("Failed gathering image details for {id}: {err}");
            }
        });
    }

    if block {
        match rx.iter().take(n_items).collect::<Result<Vec<_>, _>>() {
            Ok(r) => r,
            Err(e) => return Err(e),
        };
    }

    Ok(())
}

pub fn cache_single_image(
    storage: Arc<Storage>,
    cache: Arc<CacheDriver<Image>>,
    id: String,
) -> Result<()> {
    let pool = get_pool()
        .lock()
        .map_err(|_| anyhow::anyhow!("locking on threadpool failed"))?;

    pool.execute(move || {
        let res = image_details(&storage, &cache, &id);
        if let Err(err) = res {
            error!("Failed gathering image details for {id}: {err}");
        }
    });

    Ok(())
}

pub fn list(storage: Arc<Storage>, cache: Arc<CacheDriver<Image>>) -> Result<Vec<Image>> {
    let mut res: Vec<Image> = storage
        .list(CONTENT_BUCKET)?
        .iter()
        .map(|(id, group)| {
            cached_details(&cache, id).map(|d| d.map(|d| d.with_group(group.clone())))
        })
        .filter_map(|r| {
            if let Err(err) = &r {
                error!("Failed getting image from cache: {}", err);
            }
            debug!("{:#?}", r);
            r.ok()
        })
        .flatten()
        .collect();

    res.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));

    Ok(res)
}

pub fn data(storage: &Storage, id: &str) -> Result<Option<Box<dyn ReadSeek>>> {
    storage.read(CONTENT_BUCKET, id)
}

pub fn thumbnail(
    storage: &Storage,
    id: &str,
    width: u32,
    height: u32,
) -> Result<Option<Box<dyn ReadSeek>>> {
    if width == 0 && height == 0 {
        return Err(StatusError::wrap(
            "with and height can not be both 0".into(),
            StatusCode::BAD_REQUEST,
        )
        .into());
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

    let Some(reader) = storage.read(CONTENT_BUCKET, id)? else {
        return Ok(None);
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
    Ok(Some(Box::new(buf)))
}

fn get_exif_field(exif_meta: &exif::Exif, tag: Tag) -> Option<String> {
    exif_meta
        .get_field(tag, In::PRIMARY)
        .map(|f| format!("{}", f.display_value().with_unit(f)))
}

fn image_reader<'a, R>(
    buf_data: &'a mut BufReader<R>,
    id: &str,
) -> Result<image::io::Reader<&'a mut BufReader<R>>>
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

fn extract_exif(mut buf_data: BufReader<Box<dyn ReadSeek>>) -> Result<Exif> {
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
    .and_then(|v| {
        NaiveDate::from_ymd_opt(v.year.into(), v.month.into(), v.day.into())
            .and_then(|dt| dt.and_hms_opt(v.hour.into(), v.minute.into(), v.second.into()))
            .map(|dt| chrono::DateTime::from_utc(dt, Utc))
    });

    for field in exif_meta.fields() {
        println!(
            "{}: {:?}",
            field.tag.description().unwrap_or_default(),
            field
        );
    }

    Ok(Exif {
        fstop: get_exif_field(&exif_meta, Tag::FNumber),
        iso: get_exif_field(&exif_meta, Tag::PhotographicSensitivity),
        exposuretime: get_exif_field(&exif_meta, Tag::ExposureTime),
        lensmodel: get_exif_field(&exif_meta, Tag::LensModel).map(|s| s.trim_matches('"').into()),
        lensmake: get_exif_field(&exif_meta, Tag::LensMake).map(|s| s.trim_matches('"').into()),
        bodymodel: get_exif_field(&exif_meta, Tag::Model).map(|s| s.trim_matches('"').into()),
        bodymake: get_exif_field(&exif_meta, Tag::Make).map(|s| s.trim_matches('"').into()),
        taken: datetime,
    })
}

fn image_details(storage: &Storage, cache: &CacheDriver<Image>, id: &str) -> Result<Option<Image>> {
    info!("Collecting image details for {id} ...");

    let Some(data) = storage.read(CONTENT_BUCKET, id)? else {
        return Ok(None);
    };

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

    let Some((meta, group)) = storage.meta(CONTENT_BUCKET, id)? else {
        return Ok(None);
    };

    let image = Image {
        id: id.to_string(),
        name: id.to_string(),
        group,
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
    if let Err(err) = cache.set(format!("imgmeta-{id}").as_str(), &image) {
        error!("failed storing result to cache: {err}");
    }

    Ok(Some(image))
}

pub fn is_image(p: &Path) -> bool {
    let Some(ext) = p.extension() else {
        return false;
    };
    ["jpg", "jpeg", "tiff", "png", "webp", "gif"].contains(&ext.to_string_lossy().deref())
}
