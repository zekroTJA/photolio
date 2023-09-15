use crate::{
    cache::CacheDriver,
    errors::StatusError,
    models::{BlurHash, Dimensions, Exif, Image},
    storage::{ReadSeek, Storage},
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

/// Singleton thread pool used to perform concurrent work
/// like generating blurhashes for images.
static THREAD_POOL: OnceCell<Mutex<ThreadPool>> = OnceCell::new();

/// Returns an initialized instance of the singleton thread pool.
fn thread_pool() -> &'static Mutex<threadpool::ThreadPool> {
    THREAD_POOL.get_or_init(|| Mutex::new(ThreadPool::new(num_cpus::get())))
}

/// Create storage buckets if not already existent.
pub fn prepare(storage: &Storage) -> Result<()> {
    storage.create_bucket_if_not_exists(CONTENT_BUCKET)?;
    storage.create_bucket_if_not_exists(THUMBNAILS_BUCKET)?;
    Ok(())
}

/// Retrieve [`Image`](Image) metadata by the given image `id` from the given
/// [`cache`](CacheDriver) instance.
pub fn cached_details(cache: &CacheDriver<Image>, id: &str) -> Result<Option<Image>> {
    let v = cache.get(format!("imgmeta-{id}").as_str())?;
    Ok(v)
}

/// Collects a list of all images from [`storage`](Storage) and, extracts
/// metadata and generates blurhashes for each image using the thread pool and
/// stores the results to the [`cache`](CacheDriver).
///
/// If `block` is passed as `true`, the function will block the current therad
/// until all images have been processed. If an error occurs, it is passed in
/// the returned result. Otherwise, if `block` is passed as `false`, the
/// processing will be performed in the background and errors will be reported
/// to the log output.
pub fn cache_all_images_meta(
    storage: Arc<Storage>,
    cache: Arc<CacheDriver<Image>>,
    block: bool,
) -> Result<()> {
    let item_ids: Vec<String> = storage
        .list_deep(CONTENT_BUCKET)?
        .iter()
        .filter(|(id, _)| is_image(Path::new(id)))
        .map(|(id, _)| id)
        .cloned()
        .collect();

    let pool = thread_pool()
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

/// Takes a single image from [`storage`](Storage) by `id` and, if found, extracts
/// metadata and generates a blurhash for the image which are then stored to the
/// [`cache`](CacheDriver). The process is executed asynchroneously in the tread pool.
pub fn cache_single_image_meta(
    storage: Arc<Storage>,
    cache: Arc<CacheDriver<Image>>,
    id: String,
) -> Result<()> {
    let pool = thread_pool()
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

/// Lists all images from [`storage`](Storage) and tries to find cached metadata
/// in the [`cache`](CacheDriver) and returns a list of images with their metadata.
///
/// Images with no cached metadata are not contained in the resulting list.
pub fn list(storage: Arc<Storage>, cache: Arc<CacheDriver<Image>>) -> Result<Vec<Image>> {
    let mut res: Vec<Image> = storage
        .list_deep(CONTENT_BUCKET)?
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

/// Finds an image by `id` in the given [`storage`](Storage) and returns
/// a [`ReadSeek`] implementation instance.
pub fn data(storage: &Storage, id: &str) -> Result<Option<Box<dyn ReadSeek>>> {
    storage.read_deep(CONTENT_BUCKET, id)
}

/// Finds an image by `id` in the given [`storage`](Storage) and returns
/// a scaled down version of it by the given `width` and `height` as
/// [`ReadSeek`] implementation instance.
///
/// If a thumbnail for the given `id` and `height` + `width` parameters has
/// already been generated, the pre-generated version is returned. Otherwise,
/// the thumbnail is generated and stored to the [`storage`](Storage).
///
/// At least one of the both parameters `width` and `height` must be larger
/// than `0`. If both values are given, the smallest side is used for
/// downscaling to preserve aspect ratio.
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

    if storage.exists_deep(THUMBNAILS_BUCKET, thumbnail_id.as_str())? {
        debug!("Returning thumbnail from storage for {id} ...");
        return match storage.read_deep(THUMBNAILS_BUCKET, thumbnail_id.as_str()) {
            Ok(r) => Ok(r),
            Err(e) => Err(e),
        };
    }

    info!("Generating thumbnail for {id} ...");

    let Some(reader) = storage.read_deep(CONTENT_BUCKET, id)? else {
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

    let width = if width > original_width {
        original_width
    } else {
        width
    };

    let height = if height > original_height {
        original_height
    } else {
        height
    };

    image
        .thumbnail(width, height)
        .write_to(&mut buf, ImageOutputFormat::Jpeg(80))?;

    buf.seek(SeekFrom::Start(0))?;
    storage.store(THUMBNAILS_BUCKET, thumbnail_id.as_str(), &mut buf)?;

    buf.seek(SeekFrom::Start(0))?;
    Ok(Some(Box::new(buf)))
}

/// Returns `true` if the given path's extension matches one of the defined
/// image file extensions.
pub fn is_image(path: &Path) -> bool {
    let Some(ext) = path.extension() else {
        return false;
    };
    ["jpg", "jpeg", "tiff", "png", "webp", "gif"].contains(&ext.to_string_lossy().deref())
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

    let Some(data) = storage.read_deep(CONTENT_BUCKET, id)? else {
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

    let Some((meta, group)) = storage.meta_deep(CONTENT_BUCKET, id)? else {
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
