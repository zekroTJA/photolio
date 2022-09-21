use std::{
    error::Error,
    fs::{File, Metadata},
    io::{Cursor, Read, Seek},
};

pub trait ReadSeek: Read + Seek {}
impl ReadSeek for File {}
impl ReadSeek for Cursor<std::vec::Vec<u8>> {}

pub trait Storage {
    fn create_bucket_if_not_exists(&self, bucket: &str) -> Result<(), Box<dyn Error>>;

    fn store(&self, bucket: &str, name: &str, content: &mut dyn Read)
        -> Result<(), Box<dyn Error>>;

    fn read(
        &self,
        bucket: &str,
        name: &str,
    ) -> Result<Box<dyn ReadSeek>, Box<dyn Error + Send + Sync>>;

    fn meta(&self, bucket: &str, name: &str) -> Result<Metadata, Box<dyn Error + Send + Sync>>;

    fn exists(&self, bucket: &str, name: &str) -> Result<bool, Box<dyn Error>>;

    fn list(&self, bucket: &str) -> Result<Vec<String>, Box<dyn Error>>;
}
