pub mod inmemory;
pub mod redis;
pub mod spec;

use self::{inmemory::InMemory, redis::Redis, spec::Cache};
use crate::conf::CacheConfig;
use anyhow::Result;
use serde::{de::DeserializeOwned, Serialize};
use std::ops::Deref;

pub enum CacheDriver<T> {
    InMemory(InMemory<T>),
    Redis(Redis),
}

impl<T> CacheDriver<T>
where
    T: Clone + Serialize + DeserializeOwned,
{
    pub fn new(cfg: &CacheConfig) -> Result<Self> {
        match cfg {
            CacheConfig::InMemory { cachelocation } => {
                if let Some(cachelocation) = cachelocation {
                    let d = inmemory::InMemory::<T>::new_persistent(cachelocation)
                        .map(|d| CacheDriver::InMemory(d))?;
                    Ok(d)
                } else {
                    Ok(CacheDriver::InMemory(
                        inmemory::InMemory::<T>::new_volatile(),
                    ))
                }
            }
            CacheConfig::Redis { redisaddress } => {
                redis::Redis::new(redisaddress).map(|d| CacheDriver::Redis(d))
            }
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
