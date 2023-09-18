use crate::cache::CacheDriver;
use crate::models::Image;
use crate::ws::extractors::token::Token;
use crate::ws::server::Config;
use actix_web::error::{ErrorBadRequest, ErrorInternalServerError, ErrorUnauthorized};
use actix_web::web::{Data, ServiceConfig};
use actix_web::{post, Error, HttpResponse};

#[post("/cache/flush")]
async fn flush_cache(
    cfg: Data<Config>,
    cache: Data<CacheDriver<Image>>,
    token: Token,
) -> Result<HttpResponse, Error> {
    check_token(&cfg, &token)?;

    cache.flush().map_err(ErrorInternalServerError)?;

    Ok(HttpResponse::Ok().finish())
}

pub fn configure(cfg: &mut ServiceConfig) {
    cfg.service(flush_cache);
}

fn check_token(cfg: &Config, token: &Token) -> Result<(), Error> {
    let Some(adminkey) = &cfg.adminkey else {
        return Err(ErrorBadRequest("no admin API key configured"));
    };

    let Token::Bearer(token) = token else {
        return Err(ErrorBadRequest("no admin API key provided in request"));
    };

    if adminkey != token {
        return Err(ErrorUnauthorized("unauthorized"));
    }

    Ok(())
}
