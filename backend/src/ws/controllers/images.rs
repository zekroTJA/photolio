use std::io;
use actix_web::{Error, get, HttpResponse, web};
use actix_web::web::{Data, ServiceConfig};
use crate::cache::CacheDriver;
use crate::images;
use crate::models::{DimensionsOpt, Image};
use crate::storage::Storage;
use crate::ws::util;

#[get("")]
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

#[get("/{id}/meta")]
async fn get_meta(
    cache: Data<CacheDriver<Image>>,
    id: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let Some(res) = images::cached_details(&cache, id.as_str()).map_err(util::map_err)? else {
        return Ok(HttpResponse::NotFound().finish());
    };

    Ok(HttpResponse::Ok().json(res))
}

#[get("/{id}")]
async fn get_image(storage: Data<Storage>, id: web::Path<String>) -> Result<HttpResponse, Error> {
    let Some(mut res) = images::data(&storage, id.as_str()).map_err(util::map_err)? else {
        return Ok(HttpResponse::NotFound().finish());
    };
    let mut v = Vec::<u8>::new();
    io::copy(&mut res, &mut v)?;
    Ok(HttpResponse::Ok().body(v))
}

#[get("/{id}/thumbnail")]
async fn get_image_thumbnail(
    storage: Data<Storage>,
    id: web::Path<String>,
    web::Query(dimensions): web::Query<DimensionsOpt>,
) -> Result<HttpResponse, Error> {
    let (width, height) = (
        dimensions.width.unwrap_or(0),
        dimensions.height.unwrap_or(0),
    );

    let Some(mut res) = images::thumbnail(&storage, id.as_str(), width, height).map_err(util::map_err)?
        else {
            return Ok(HttpResponse::NotFound().finish());
        };

    let mut v = Vec::<u8>::new();
    io::copy(&mut res, &mut v)?;
    Ok(HttpResponse::Ok()
        .append_header(("Cache-Control", "public, max-age=604800, immutable"))
        .body(v))
}

pub fn configure(cfg: &mut ServiceConfig) {
    cfg.service(get_meta_list)
        .service(get_meta)
        .service(get_image)
        .service(get_image_thumbnail);
}