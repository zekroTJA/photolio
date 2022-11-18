use anyhow::Result;

pub trait Cache<T> {
    fn get(&self, key: &str) -> Result<Option<T>>;
    fn set(&self, key: &str, val: &T) -> Result<()>;
    fn flush(&self) -> Result<()>;
}
