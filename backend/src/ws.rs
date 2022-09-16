use actix_web::{get, web, App, HttpServer, Responder};

#[get("/hello/{name}")]
async fn greet(name: web::Path<String>) -> impl Responder {
    format!("Hello {name}!")
}

pub async fn run(addr: &str, port: u16) -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(greet))
        .bind((addr, port))?
        .run()
        .await
}
