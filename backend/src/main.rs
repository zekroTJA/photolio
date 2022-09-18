mod cache;
mod conf;
mod errors;
mod images;
mod models;
mod storage;
mod ws;
#[macro_use]
mod macros;

use cache::inmemory::InMemory;
use config::{Config, Environment, File, FileFormat};
use log::{debug, error, info, warn};
use models::Image;
use std::sync::Arc;
use storage::local::Local;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let cfg = Config::builder()
        .add_source(File::new("config.toml", FileFormat::Toml).required(false))
        .add_source(File::new("config.dev.toml", FileFormat::Toml).required(false))
        .add_source(Environment::with_prefix("PH"))
        .build()
        .expect("Failed reading config")
        .try_deserialize::<conf::Config>()
        .expect("Failed parsing config");

    info!("Config parsed");
    debug!("Config content: {:#?}", cfg);

    let storage_loc = cfg
        .storage
        .unwrap_or_default()
        .location
        .unwrap_or_else(|| "data".into());
    let c = Arc::new(InMemory::<Image>::new());
    let s = Arc::new(Local::new(storage_loc.as_str()));

    if !cfg.skip_precache.unwrap_or(false) {
        info!("Pre-caching image metadata for all images ...");
        images::list(s.clone(), c.clone()).expect("list initialization failed");
    } else {
        warn!("Pre-caching skipped");
    }

    let ws_conf = cfg.server.unwrap_or_default();
    let ws_addr = ws_conf.address.unwrap_or_else(|| "0.0.0.0".into());
    let ws_port = ws_conf.port.unwrap_or(80);

    info!("Starting web server on {ws_addr}:{ws_port} ...");
    ws::server::run(ws_addr.as_str(), ws_port, ws_conf.allowed_origin, s, c).await
}
