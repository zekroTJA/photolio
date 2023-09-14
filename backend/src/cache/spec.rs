use anyhow::Result;

/// Key-value cache store implementation for value type T.
pub trait Cache<T> {
    /// Try to retrieve a value from the cache by the given `key`.
    /// If no value is stored, `Ok(None)` is returned.
    fn get(&self, key: &str) -> Result<Option<T>>;
    /// Set a value to the cache by the given `key`.
    fn set(&self, key: &str, val: &T) -> Result<()>;
    /// Remove all key-value paris from the cache.
    fn flush(&self) -> Result<()>;
}
