use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Dimensions {
    pub width: u32,
    pub height: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DimensionsOpt {
    pub width: Option<u32>,
    pub height: Option<u32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BlurHash {
    pub hash: String,
    pub components: Dimensions,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Exif {
    pub fstop: Option<String>,
    pub iso: Option<String>,
    pub exposuretime: Option<String>,
    pub taken: Option<DateTime<Utc>>,
    pub lensmodel: Option<String>,
    pub lensmake: Option<String>,
    pub bodymodel: Option<String>,
    pub bodymake: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Image {
    pub id: String,
    pub name: String,
    pub group: Option<String>,
    pub timestamp: DateTime<Utc>,
    pub blurhash: BlurHash,
    pub dimensions: Dimensions,
    pub exif: Option<Exif>,
}

impl Image {
    pub fn with_group(mut self, group: Option<String>) -> Self {
        self.group = group;
        self
    }
}
