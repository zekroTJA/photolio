use actix_web::{Error, HttpResponse, post};
use actix_web::web::{ServiceConfig};
use crate::ws::extractors::token::Token;

#[post("/cache/flush")]
async fn flush_cache(token: Token) -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().body(format!("{token:#?}")))
}

pub fn configure(cfg: &mut ServiceConfig) {
    cfg.service(flush_cache);
}