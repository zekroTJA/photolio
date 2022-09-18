mod cache;
mod errors;
mod images;
mod models;
mod storage;
mod ws;

#[macro_use]
mod macros;

use cache::inmemory::InMemory;
use log::{debug, error, info};
use models::Image;
use std::sync::Arc;
use storage::local::Local;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let c = Arc::new(InMemory::<Image>::new());
    let s = Arc::new(Local::new(String::from("../data")));

    // info!("Pre-caching image metadata for all images ...");
    // images::list(s.clone(), c.clone()).expect("list initialization failed");

    info!("Starting web server on localhost:8080 ...");
    ws::server::run("localhost", 8080, s, c).await
}
