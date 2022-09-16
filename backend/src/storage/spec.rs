use std::error::Error;

pub trait Storage {
    fn create_bucket_if_not_exists(&self, bucket: &str) -> Result<(), Box<dyn Error>>;
    fn store(&self, bucket: &str, name: &str, content: &[u8]) -> Result<(), Box<dyn Error>>;
    fn read(&self, bucket: &str, name: &str) -> Result<Vec<u8>, Box<dyn Error + Send + Sync>>;
    fn list(&self, bucket: &str) -> Result<Vec<String>, Box<dyn Error>>;
}
