use std::{
    net,
    sync::Arc,
};

use actix_cors::Cors;
use actix_web::{
    App,
    HttpServer,
    middleware::Logger, web::{self, Data},
};

use crate::{
    cache::CacheDriver,
    models::Image,
    storage::Storage,
};
use crate::ws::controllers::images;

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
            // .route("/images", web::get().to(get_meta_list))
            // .route(
            //     "/images/{id}",
            //     web::get().to(get_image).wrap(AddCache::default()),
            // )
            // .route("/images/{id}/meta", web::get().to(get_meta))
            // .route(
            //     "/images/{id}/thumbnail",
            //     web::get().to(get_image_thumbnail).wrap(AddCache::default()),
            // )
            .service(web::scope("/images").configure(images::configure))
            .wrap(Logger::default())
            .wrap(cors)
            .app_data(Data::from(cache.clone()))
            .app_data(Data::from(storage.clone()))
    })
    .bind(address)?
    .run()
    .await
}


