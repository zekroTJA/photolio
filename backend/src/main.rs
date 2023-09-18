mod cache;
mod conf;
mod errors;
mod images;
mod models;
mod storage;
mod watcher;
mod ws;

use actix_web::rt::spawn;
use argparse::{ArgumentParser, Store, StoreTrue};
use config::{Config, Environment, File, FileFormat};
use env_logger::Env;
use log::{debug, error, info, warn};
use models::Image;
use std::{io, sync::Arc};

use crate::storage::Storage;

#[actix_web::main]
async fn main() -> io::Result<()> {
    env_logger::Builder::from_env(Env::default().default_filter_or("info"))
        .try_init()
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;

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

    let cache_cfg = cfg.cache.unwrap_or_default();
    let c = Arc::new(
        cache::CacheDriver::<Image>::new(&cache_cfg).expect("cache initialization failed"),
    );

    let storage_loc = cfg
        .storage
        .unwrap_or_default()
        .location
        .unwrap_or_else(|| "data".into());
    let s = Arc::new(Storage::new(storage_loc.as_str()));

    if flush_cache {
        info!("Flushing image meta cache ...");
        match c.flush() {
            Ok(_) => info!("Image meta cache flushed."),
            Err(err) => error!("Failed flushing image meta cache: {err}"),
        };
        return Ok(());
    }

    images::prepare(&s).expect("Preparation failed");

    if !cfg.skipprecache.unwrap_or(false) {
        info!("Pre-caching image metadata for all images ...");
        images::cache_all_images_meta(s.clone(), c.clone(), false).expect("pre-cache failed");
    } else {
        warn!("Pre-caching skipped");
    }

    let _s = s.clone();
    let _c = c.clone();
    spawn(async {
        watcher::watch_files(_s, _c)
            .await
            .expect("failed initializing watcher");
    });

    let ws_conf = cfg.server.unwrap_or_default();
    let ws_addr = ws_conf.address.unwrap_or_else(|| "0.0.0.0".into());
    let ws_port = ws_conf.port.unwrap_or(80);

    info!("Starting web server on {ws_addr}:{ws_port} ...");
    ws::server::run((ws_addr.as_str(), ws_port), cfg.adminkey, ws_conf.allowedorigin, s, c).await
}
