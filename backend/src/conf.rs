use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Config {
    pub skipprecache: Option<bool>,
    pub server: Option<ServerConfig>,
    pub storage: Option<StorageConfig>,
    pub cache: Option<CacheConfig>,
}

#[derive(Debug, Default, Deserialize)]
pub struct ServerConfig {
    pub address: Option<String>,
    pub port: Option<u16>,
    pub allowedorigin: Option<String>,
}

#[derive(Debug, Default, Deserialize)]
pub struct StorageConfig {
    pub location: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "type")]
pub enum CacheConfig {
    #[serde(rename = "memory")]
    InMemory { cachelocation: Option<String> },
    #[serde(rename = "redis")]
    Redis { redisaddress: String },
}

impl Default for CacheConfig {
    fn default() -> Self {
        Self::InMemory {
            cachelocation: None,
        }
    }
}
