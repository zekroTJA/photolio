use anyhow::Result;
use std::{
    fs::{File, Metadata},
    io::{Cursor, Read, Seek},
    path::PathBuf,
};

pub trait ReadSeek: Read + Seek {}
impl ReadSeek for File {}
impl ReadSeek for Cursor<std::vec::Vec<u8>> {}

pub trait Storage {
    fn create_bucket_if_not_exists(&self, bucket: &str) -> Result<()>;

    fn store(&self, bucket: &str, name: &str, content: &mut dyn Read) -> Result<()>;

    fn read(&self, bucket: &str, name: &str) -> Result<Box<dyn ReadSeek>>;

    fn meta(&self, bucket: &str, name: &str) -> Result<Metadata>;

    fn exists(&self, bucket: &str, name: &str) -> Result<bool>;

    fn list(&self, bucket: &str) -> Result<Vec<String>>;

    fn get_bucket_path(&self, bucket: &str) -> Option<PathBuf>;
}
