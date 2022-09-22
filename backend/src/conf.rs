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

#[derive(Debug, Default, Deserialize)]
pub struct CacheConfig {
    #[serde(rename = "type")]
    pub typ: Option<String>,
    pub cachelocation: Option<String>,
    pub redisaddress: Option<String>,
}
