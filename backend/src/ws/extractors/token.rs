use actix_web::{Error, FromRequest, HttpRequest};
use actix_web::dev::Payload;
use actix_web::error::{ErrorInternalServerError, ErrorUnauthorized};
use futures_util::future::{err, ok, Ready};

#[derive(Debug)]
pub enum Token {
    Basic(String),
    Bearer(String),
    Unspecified((String, String)),
    Unprefixed(String),
}

impl FromRequest for Token {
    type Error = Error;
    type Future = Ready<Result<Token, Self::Error>>;

    fn from_request(req: &HttpRequest, _: &mut Payload) -> Self::Future {
        let Some(auth_header) = req.headers().get("Authorization") else {
            return err(ErrorUnauthorized("unauthorized"));
        };

        let auth_header = match auth_header.to_str() {
            Err(e) => return err(ErrorInternalServerError(e)),
            Ok(v) => v,
        };

        let Some((prefix, value)) = auth_header.split_once(' ') else {
            return ok(Self::Unprefixed(auth_header.to_string()));
        };

        let prefix = prefix.to_lowercase();
        ok(match prefix.as_str() {
            "basic" => Self::Basic(value.to_string()),
            "bearer" => Self::Bearer(value.to_string()),
            _ => Self::Unspecified((prefix, value.to_string()))
        })
    }
}