use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Config {
    pub skip_precache: Option<bool>,
    pub server: Option<ServerConfig>,
    pub storage: Option<StorageConfig>,
}

#[derive(Debug, Default, Deserialize)]
pub struct ServerConfig {
    pub address: Option<String>,
    pub port: Option<u16>,
    pub allowed_origin: Option<String>,
}

#[derive(Debug, Default, Deserialize)]
pub struct StorageConfig {
    pub location: Option<String>,
}
