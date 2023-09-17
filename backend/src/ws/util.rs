use std::io;
use actix_web::Error;
use crate::errors::StatusError;

/// Takes an [Anyhow Error](anyhow::Error) and returns an [Actix Error](Error)
/// depending on the underlying error in the passed `error`.
pub fn map_err(error: anyhow::Error) -> Error {
    if error.is::<io::Error>()
        && error.downcast_ref::<io::Error>().unwrap().kind() == io::ErrorKind::NotFound
    {
        actix_web::error::ErrorNotFound(error)
    } else if error.is::<StatusError>() {
        let status = error.downcast_ref::<StatusError>().unwrap().status();
        actix_web::error::InternalError::new(error, status).into()
    } else {
        actix_web::error::ErrorInternalServerError(error)
    }
}