use anyhow::Result;
use std::{
    fs::{self, DirEntry, File, Metadata},
    io::{copy, Cursor, ErrorKind, Read, Seek},
    path::{Path, PathBuf},
};

pub trait ReadSeek: Read + Seek {}

impl ReadSeek for File {}
impl ReadSeek for Cursor<std::vec::Vec<u8>> {}

pub struct Storage {
    root_dir: String,
}

impl Storage {
    pub fn new(root_dir: &str) -> Self {
        Storage {
            root_dir: root_dir.into(),
        }
    }

    pub fn create_bucket_if_not_exists(&self, bucket: &str) -> Result<()> {
        fs::create_dir_all(self.bucket_path(bucket))?;
        Ok(())
    }

    pub fn store(&self, bucket: &str, name: &str, content: &mut dyn Read) -> Result<()> {
        let mut file = fs::File::create(self.bucket_path(bucket).join(name))?;
        copy(content, &mut file)?;
        Ok(())
    }

    pub fn read(&self, bucket: &str, name: &str) -> Result<Option<Box<dyn ReadSeek>>> {
        let obj = self.get_object_deep(bucket, name)?;
        match obj {
            Some((f, _)) => Ok(Some(Box::new(f))),
            None => Ok(None),
        }
    }

    pub fn meta(&self, bucket: &str, name: &str) -> Result<Option<(Metadata, Option<String>)>> {
        let file = self.get_object_deep(bucket, name)?;
        let meta = file
            .map(|(f, dir)| f.metadata().map(|meta| (meta, dir)))
            .transpose()?;
        Ok(meta)
    }

    pub fn exists(&self, bucket: &str, name: &str) -> Result<bool> {
        if self.bucket_path(bucket).join(name).exists() {
            return Ok(true);
        }

        for dir in self.directories(bucket)? {
            if dir.path().join(name).exists() {
                return Ok(true);
            }
        }

        Ok(false)
    }

    pub fn list(&self, bucket: &str) -> Result<Vec<(String, Option<String>)>> {
        let entries = fs::read_dir(self.bucket_path(bucket))?;

        let mut res = vec![];
        for entry in entries {
            let entry = entry?;
            let meta = entry.metadata()?;

            let entry_name = entry.file_name().to_string_lossy().to_string();

            if meta.is_dir() {
                for sub_entry in fs::read_dir(self.bucket_path(bucket).join(entry.file_name()))? {
                    let sub_entry = sub_entry?;
                    res.push((
                        sub_entry.file_name().to_string_lossy().to_string(),
                        Some(entry_name.clone()),
                    ));
                }
            } else {
                res.push((entry_name, None));
            }
        }

        Ok(res)
    }

    pub fn get_bucket_path(&self, bucket: &str) -> Option<PathBuf> {
        Some(self.bucket_path(bucket))
    }

    fn bucket_path(&self, bucket: &str) -> PathBuf {
        Path::new(&self.root_dir).join(bucket)
    }

    fn directories(&self, bucket: &str) -> Result<Vec<DirEntry>> {
        let res = fs::read_dir(self.bucket_path(bucket))?
            .map(|entry| {
                entry.and_then(|entry| {
                    entry
                        .metadata()
                        .map(|meta| if meta.is_dir() { Some(entry) } else { None })
                })
            })
            .filter_map(|v| v.transpose())
            .collect::<Result<Vec<_>, _>>();

        Ok(res?)
    }

    fn get_object(&self, bucket: &str, dir: impl AsRef<Path>) -> Result<Option<fs::File>> {
        match fs::File::open(self.bucket_path(bucket).join(dir)) {
            Ok(file) => Ok(Some(file)),
            Err(err) if matches!(err.kind(), ErrorKind::NotFound) => Ok(None),
            Err(err) => Err(err.into()),
        }
    }

    fn get_object_deep(
        &self,
        bucket: &str,
        name: &str,
    ) -> Result<Option<(fs::File, Option<String>)>> {
        match self.get_object(bucket, name)? {
            Some(file) => Ok(Some((file, None))),
            None => {
                for dir in self.directories(bucket)? {
                    if let Some(file) =
                        self.get_object(bucket, Path::new(dir.file_name().as_os_str()).join(name))?
                    {
                        return Ok(Some((
                            file,
                            Some(dir.file_name().to_string_lossy().to_string()),
                        )));
                    }
                }
                Ok(None)
            }
        }
    }
}
