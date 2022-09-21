use std::ops::Deref;

use serde::{de::DeserializeOwned, Serialize};

use self::{inmemory::InMemory, spec::Cache};

pub mod inmemory;
pub mod spec;

pub enum CacheDriver<T> {
    InMemory(InMemory<T>),
}

impl<T> Deref for CacheDriver<T>
where
    T: Clone + Serialize + DeserializeOwned + 'static,
{
    type Target = dyn Cache<T>;

    fn deref(&self) -> &Self::Target {
        match self {
            CacheDriver::InMemory(in_memory) => in_memory,
        }
    }
}
