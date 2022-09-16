use std::{collections::HashMap, sync::RwLock};

use log::error;

use super::spec::Cache;

pub struct InMemory<T> {
    map: RwLock<HashMap<String, T>>,
}

impl<'a, T> InMemory<T> {
    pub fn new() -> Self {
        InMemory {
            map: RwLock::new(HashMap::new()),
        }
    }
}

impl<'a, T> Cache<T> for InMemory<T>
where
    T: Clone,
{
    fn get(&self, key: &str) -> Option<T> {
        match &self.map.read() {
            Ok(m) => match m.get(key) {
                Some(e) => Some(e.clone()),
                None => None,
            },
            Err(_) => {
                error!("map lock is poisoned");
                None
            }
        }
    }

    fn set(&mut self, key: &str, val: &T) {
        match &mut self.map.write() {
            Ok(m) => {
                m.insert(key.to_string(), val.clone());
            }
            Err(_) => {
                error!("map lock is poisoned");
            }
        };
    }
}
