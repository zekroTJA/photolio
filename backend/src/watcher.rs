use crate::{
    cache::CacheDriver,
    images::{self, CONTENT_BUCKET},
    models::Image,
    storage::Storage,
};
use futures::{channel::mpsc::Receiver, SinkExt, StreamExt};
use log::{debug, error, info};
use notify::{Config, Event, EventKind, RecommendedWatcher, RecursiveMode, Result, Watcher};
use std::{error::Error, sync::Arc};

fn async_watcher() -> Result<(RecommendedWatcher, Receiver<Result<Event>>)> {
    let (mut tx, rx) = futures::channel::mpsc::channel(1);

    let watcher = RecommendedWatcher::new(
        move |res| {
            futures::executor::block_on(async {
                tx.send(res).await.unwrap();
            })
        },
        Config::default(),
    )?;

    Ok((watcher, rx))
}

fn handle_event(storage: Arc<Storage>, cache: Arc<CacheDriver<Image>>, event: Event) {
    for id in event
        .paths
        .iter()
        .filter(|p| images::is_image(p))
        .filter_map(|p| p.file_name())
        .map(|p| p.to_string_lossy().to_string())
    {
        if let Err(err) = images::cache_single_image(storage.clone(), cache.clone(), id.clone()) {
            error!("Gathering image data for {} failed: {}", id, err);
        }
    }
}

pub async fn watch_files(
    storage: Arc<Storage>,
    cache: Arc<CacheDriver<Image>>,
) -> std::result::Result<(), Box<dyn Error>> {
    let (mut watcher, mut rx) = async_watcher()?;

    let pth = storage.get_bucket_path(CONTENT_BUCKET).unwrap();

    info!("Watching directory {} ...", pth.to_str().unwrap());
    watcher.watch(pth.as_path(), RecursiveMode::Recursive)?;

    while let Some(res) = rx.next().await {
        match res {
            Ok(event) => match event.kind {
                EventKind::Create(_) => handle_event(storage.clone(), cache.clone(), event),
                EventKind::Modify(_) => handle_event(storage.clone(), cache.clone(), event),
                _ => {}
            },
            Err(e) => debug!("watch error: {:?}", e),
        }
    }

    Ok(())
}
