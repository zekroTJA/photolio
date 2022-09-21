use super::spec::{ReadSeek, Storage};
use std::{
    error::Error,
    fs::{self, Metadata},
    io::{copy, Read},
    path::{Path, PathBuf},
};

pub struct Local {
    root_dir: String,
}

impl Local {
    pub fn new(root_dir: &str) -> Self {
        Local {
            root_dir: root_dir.into(),
        }
    }

    fn bucket_path(&self, bucket: &str) -> PathBuf {
        Path::new(&self.root_dir).join(bucket)
    }
}

impl Storage for Local {
    fn create_bucket_if_not_exists(&self, bucket: &str) -> Result<(), Box<dyn Error>> {
        fs::create_dir_all(self.bucket_path(bucket)).map_err(Box::from)
    }

    fn store(
        &self,
        bucket: &str,
        name: &str,
        content: &mut dyn Read,
    ) -> Result<(), Box<dyn Error>> {
        self.create_bucket_if_not_exists(bucket)?;
        let mut file = fs::File::create(self.bucket_path(bucket).join(name))?;
        copy(content, &mut file)?;
        Ok(())
    }

    fn read(
        &self,
        bucket: &str,
        name: &str,
    ) -> Result<Box<dyn ReadSeek>, Box<dyn Error + Send + Sync>> {
        let file = fs::File::open(self.bucket_path(bucket).join(name))?;
        Ok(Box::new(file))
    }

    fn meta(&self, bucket: &str, name: &str) -> Result<Metadata, Box<dyn Error + Send + Sync>> {
        let file = fs::File::open(self.bucket_path(bucket).join(name))?;
        let meta = file.metadata()?;
        Ok(meta)
    }

    fn exists(&self, bucket: &str, name: &str) -> Result<bool, Box<dyn Error>> {
        Ok(self.bucket_path(bucket).join(name).exists())
    }

    fn list(&self, bucket: &str) -> Result<Vec<String>, Box<dyn Error + Send + Sync>> {
        fs::read_dir(self.bucket_path(bucket))?
            .map(|res| {
                res.map(|d| d.file_name().into_string().unwrap_or_default())
                    .map_err(Box::from)
            })
            .collect()
    }
}
