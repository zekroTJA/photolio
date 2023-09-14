use super::middleware::AddCache;
use crate::{
    cache::CacheDriver,
    errors::StatusError,
    images,
    models::{DimensionsOpt, Image},
    storage::Storage,
};
use actix_cors::Cors;
use actix_web::{
    middleware::Logger,
    web::{self, Data},
    App, Error, HttpResponse, HttpServer,
};
use anyhow::Result;
use std::{
    io::{self, copy},
    net,
    sync::Arc,
};

async fn get_meta_list(
    storage: Data<Storage>,
    cache: Data<CacheDriver<Image>>,
) -> Result<HttpResponse, Error> {
    let res = images::list(storage.into_inner(), cache.into_inner());

    let v = match res {
        Ok(v) => Ok(v),
        Err(e) => Err(actix_web::error::ErrorInternalServerError(e)),
    }?;

    Ok(HttpResponse::Ok().json(v))
}

async fn get_meta(
    cache: Data<CacheDriver<Image>>,
    id: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let res = images::cached_details(&cache, id.as_str()).map_err(map_err)?;

    Ok(HttpResponse::Ok().json(res))
}

async fn get_image(storage: Data<Storage>, id: web::Path<String>) -> Result<HttpResponse, Error> {
    let Some(mut res) = images::data(&storage, id.as_str()).map_err(map_err)? else {
        return Ok(HttpResponse::NotFound().finish());
    };
    let mut v = Vec::<u8>::new();
    copy(&mut res, &mut v)?;
    Ok(HttpResponse::Ok().body(v))
}

async fn get_image_thumbnail(
    storage: Data<Storage>,
    id: web::Path<String>,
    web::Query(dimensions): web::Query<DimensionsOpt>,
) -> Result<HttpResponse, Error> {
    let (width, height) = (
        dimensions.width.unwrap_or(0),
        dimensions.height.unwrap_or(0),
    );

    let Some(mut res) = images::thumbnail(&storage, id.as_str(), width, height).map_err(map_err)?
    else {
        return Ok(HttpResponse::NotFound().finish());
    };

    let mut v = Vec::<u8>::new();
    copy(&mut res, &mut v)?;
    Ok(HttpResponse::Ok()
        .append_header(("Cache-Control", "public, max-age=604800, immutable"))
        .body(v))
}

/// Initializes and starts the web server on the given `address` with the
/// passed `storage` and `cache` instances.
///
/// If `Some(origin)` is passed, it will be set as `Access-Control-Allow-Origin`
/// header value. Otherwise, the value of the header will be a wildcard (`*`).
pub async fn run(
    address: impl net::ToSocketAddrs,
    origin: Option<String>,
    storage: Arc<Storage>,
    cache: Arc<CacheDriver<Image>>,
) -> std::io::Result<()> {
    HttpServer::new(move || {
        let mut cors = Cors::default()
            .allow_any_header()
            .allow_any_method()
            .max_age(3600);

        if let Some(org) = origin.clone() {
            cors = cors.allowed_origin(org.as_str());
        } else {
            cors = cors.send_wildcard();
        }

        App::new()
            .route("/images", web::get().to(get_meta_list))
            .route(
                "/images/{id}",
                web::get().to(get_image).wrap(AddCache::default()),
            )
            .route("/images/{id}/meta", web::get().to(get_meta))
            .route(
                "/images/{id}/thumbnail",
                web::get().to(get_image_thumbnail).wrap(AddCache::default()),
            )
            .wrap(Logger::default())
            .wrap(cors)
            .app_data(Data::from(cache.clone()))
            .app_data(Data::from(storage.clone()))
    })
    .bind(address)?
    .run()
    .await
}

/// Takes an [Anyhow Error](anyhow::Error) and returns an [Actix Error](Error)
/// depending on the underlying error in the passed `error`.
fn map_err(error: anyhow::Error) -> Error {
    if error.is::<io::Error>()
        && error.downcast_ref::<io::Error>().unwrap().kind() == io::ErrorKind::NotFound
    {
        actix_web::error::ErrorNotFound(error)
    } else if error.is::<StatusError>() {
        let status = error.downcast_ref::<StatusError>().unwrap().status();
        actix_web::error::InternalError::new(error, status).into()
    } else {
        actix_web::error::ErrorInternalServerError(error)
    }
}
