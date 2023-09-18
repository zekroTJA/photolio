use std::{net, sync::Arc};

use actix_cors::Cors;
use actix_web::{
    middleware::Logger,
    web::{self, Data},
    App, HttpServer,
};

use crate::ws::controllers::{admin, images};
use crate::{cache::CacheDriver, models::Image, storage::Storage};

pub struct Config {
    pub adminkey: Option<String>,
}

/// Initializes and starts the web server on the given `address` with the
/// passed `storage` and `cache` instances.
///
/// If `Some(origin)` is passed, it will be set as `Access-Control-Allow-Origin`
/// header value. Otherwise, the value of the header will be a wildcard (`*`).
pub async fn run(
    address: impl net::ToSocketAddrs,
    adminkey: Option<String>,
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

        let cfg = Config {
            adminkey: adminkey.clone(),
        };

        App::new()
            .service(web::scope("/images").configure(images::configure))
            .service(web::scope("/admin").configure(admin::configure))
            .wrap(Logger::default())
            .wrap(cors)
            .app_data(Data::from(cache.clone()))
            .app_data(Data::from(storage.clone()))
            .app_data(Data::new(cfg))
    })
    .bind(address)?
    .run()
    .await
}
