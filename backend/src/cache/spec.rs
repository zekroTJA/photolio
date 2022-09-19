use std::error::Error;

pub trait Cache<T> {
    fn get(&self, key: &str) -> Result<Option<T>, Box<dyn Error + Send + Sync>>;
    fn set(&self, key: &str, val: &T) -> Result<(), Box<dyn Error + Send + Sync>>;
    fn flush(&self) -> Result<(), Box<dyn Error + Send + Sync>>;
}
