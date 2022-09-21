mod cache;
mod conf;
mod errors;
mod images;
mod models;
mod storage;
mod ws;
#[macro_use]
mod macros;

use argparse::{ArgumentParser, Store, StoreTrue};
use cache::inmemory::InMemory;
use config::{Config, Environment, File, FileFormat};
use log::{debug, error, info, warn};
use models::Image;
use std::sync::Arc;
use storage::local::Local;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let mut cfg_file = "config.toml".to_string();
    let mut flush_cache = false;

    {
        let mut ap = ArgumentParser::new();
        ap.refer(&mut cfg_file)
            .add_option(&["-c", "--config"], Store, "The config file location.");
        ap.refer(&mut flush_cache).add_option(
            &["--flush-cache"],
            StoreTrue,
            "Flush the image meta cache and exit afterwards.",
        );
        ap.parse_args_or_exit();
    }

    let cfg = Config::builder()
        .add_source(File::new(cfg_file.as_str(), FileFormat::Toml).required(false))
        .add_source(File::new("config.dev.toml", FileFormat::Toml).required(false))
        .add_source(Environment::with_prefix("PH").separator("_"))
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
    let cache_loc = cfg
        .cache
        .unwrap_or_default()
        .cachelocation
        .unwrap_or_else(|| ".cache".into());

    let c = Arc::new(cache::CacheDriver::InMemory(
        InMemory::<Image>::load(cache_loc.as_str()).expect("Failed initializing cache"),
    ));
    let s = Arc::new(storage::StorageDriver::Local(Local::new(
        storage_loc.as_str(),
    )));

    if flush_cache {
        info!("Flushing image meta cache ...");
        match c.flush() {
            Ok(_) => info!("Image meta cache flushed."),
            Err(err) => error!("Failed flushing image meta cache: {err}"),
        };
        return Ok(());
    }

    if !cfg.skipprecache.unwrap_or(false) {
        info!("Pre-caching image metadata for all images ...");
        images::list(s.clone(), c.clone()).expect("list initialization failed");
    } else {
        warn!("Pre-caching skipped");
    }

    let ws_conf = cfg.server.unwrap_or_default();
    let ws_addr = ws_conf.address.unwrap_or_else(|| "0.0.0.0".into());
    let ws_port = ws_conf.port.unwrap_or(80);

    info!("Starting web server on {ws_addr}:{ws_port} ...");
    ws::server::run(ws_addr.as_str(), ws_port, ws_conf.allowedorigin, s, c).await
}
