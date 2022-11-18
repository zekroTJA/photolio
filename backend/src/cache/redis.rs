use super::spec::Cache;
use anyhow::Result;
use log::info;
use redis::Commands;
use serde::{de::DeserializeOwned, Serialize};

pub struct Redis {
    client: redis::Client,
}

impl Redis {
    const KEY_PREFIX: &'static str = "PHCACHE:";

    pub fn new(addr: &str) -> Result<Self> {
        let client = redis::Client::open(addr)?;
        client.get_connection()?;
        Ok(Redis { client })
    }

    pub fn key(key: &str) -> String {
        Self::KEY_PREFIX.to_owned() + key
    }
}

impl<T> Cache<T> for Redis
where
    T: Serialize + DeserializeOwned,
{
    fn get(&self, key: &str) -> Result<Option<T>> {
        let mut conn = self.client.get_connection()?;
        let res: Option<String> = conn.get(Self::key(key))?;
        if let Some(res) = res {
            let res: T = serde_json::de::from_str(res.as_str())?;
            Ok(Some(res))
        } else {
            Ok(None)
        }
    }

    fn set(&self, key: &str, val: &T) -> Result<()> {
        let val = serde_json::ser::to_string(val)?;
        let mut conn = self.client.get_connection()?;
        conn.set(Self::key(key), val)?;
        Ok(())
    }

    fn flush(&self) -> Result<()> {
        let mut conn = self.client.get_connection()?;
        let keys: Vec<String> = conn.keys(Self::key("*"))?;
        info!("Cleaning up {} entries ...", keys.len());
        conn.del(keys)?;
        Ok(())
    }
}
