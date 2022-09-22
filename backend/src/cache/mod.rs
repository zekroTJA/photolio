pub mod inmemory;
pub mod redis;
pub mod spec;

use self::{inmemory::InMemory, redis::Redis, spec::Cache};
use crate::conf::CacheConfig;
use serde::{de::DeserializeOwned, Serialize};
use std::{error::Error, ops::Deref};

pub enum CacheDriver<T> {
    InMemory(InMemory<T>),
    Redis(Redis),
}

impl<T> CacheDriver<T>
where
    T: Clone + Serialize + DeserializeOwned,
{
    pub fn new(cfg: &CacheConfig) -> Result<Self, Box<dyn Error>> {
        match cfg.typ.clone().unwrap_or_else(|| "memory".into()).as_str() {
            "memory" => {
                if let Some(cachelocation) = cfg.cachelocation.clone() {
                    let d = inmemory::InMemory::<T>::load(&cachelocation)
                        .map(|d| CacheDriver::InMemory(d))?;
                    Ok(d)
                } else {
                    Ok(CacheDriver::InMemory(inmemory::InMemory::<T>::new()))
                }
            }
            "redis" => {
                if let Some(redisaddress) = cfg.redisaddress.clone() {
                    redis::Redis::new(&redisaddress).map(|d| CacheDriver::Redis(d))
                } else {
                    Err("no redis address has been specified".into())
                }
            }
            _ => Err("invalid or unsupported cache driver specified".into()),
        }
    }
}

impl<T> Deref for CacheDriver<T>
where
    T: Clone + Serialize + DeserializeOwned + 'static,
{
    type Target = dyn Cache<T>;

    fn deref(&self) -> &Self::Target {
        match self {
            CacheDriver::InMemory(in_memory) => in_memory,
            CacheDriver::Redis(redis) => redis,
        }
    }
}
