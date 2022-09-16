use super::spec::Storage;
use std::{
    error::Error,
    fs,
    io::{Read, Write},
    path::{Path, PathBuf},
};

pub struct Local {
    root_dir: String,
}

impl Local {
    pub fn new(root_dir: String) -> Self {
        Local { root_dir }
    }

    fn bucket_path(&self, bucket: &str) -> PathBuf {
        Path::new(&self.root_dir).join(bucket)
    }
}

impl Storage for Local {
    fn create_bucket_if_not_exists(&self, bucket: &str) -> Result<(), Box<dyn Error>> {
        fs::create_dir_all(self.bucket_path(bucket)).map_err(Box::from)
    }

    fn store(&self, bucket: &str, name: &str, content: &[u8]) -> Result<(), Box<dyn Error>> {
        self.create_bucket_if_not_exists(bucket)?;
        let mut file = fs::File::create(self.bucket_path(bucket).join(name))?;
        file.write(content)?;
        Ok(())
    }

    fn read(&self, bucket: &str, name: &str) -> Result<Vec<u8>, Box<dyn Error + Send + Sync>> {
        let mut file = fs::File::open(self.bucket_path(bucket).join(name))?;
        let mut buf = Vec::<u8>::new();
        file.read_to_end(&mut buf)?;
        Ok(buf)
    }

    fn list(&self, bucket: &str) -> Result<Vec<String>, Box<dyn Error>> {
        fs::read_dir(self.bucket_path(bucket))?
            .map(|res| {
                res.map(|d| d.file_name().into_string().unwrap_or_default())
                    .map_err(Box::from)
            })
            .collect()
    }
}
