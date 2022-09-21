pub mod local;
pub mod spec;

use self::{local::Local, spec::Storage};
use std::ops::Deref;

pub enum StorageDriver {
    Local(Local),
}

impl Deref for StorageDriver {
    type Target = dyn Storage;

    fn deref(&self) -> &Self::Target {
        match self {
            StorageDriver::Local(local) => local,
        }
    }
}
