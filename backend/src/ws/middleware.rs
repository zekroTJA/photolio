use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    http::header::{self, HeaderValue},
    Error,
};
use futures_util::future::LocalBoxFuture;
use std::future::{ready, Ready};

pub struct AddCache<'a> {
    val: &'a str,
}

impl<'a> AddCache<'a> {
    pub fn default() -> Self {
        AddCache {
            val: "public, max-age=604800, immutable",
        }
    }
}

impl<'a, S, B> Transform<S, ServiceRequest> for AddCache<'a>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = AddCacheMiddleware<'a, S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(AddCacheMiddleware {
            service,
            val: self.val,
        }))
    }
}

pub struct AddCacheMiddleware<'a, S> {
    val: &'a str,
    service: S,
}

impl<'a, S, B> Service<ServiceRequest> for AddCacheMiddleware<'a, S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let fut = self.service.call(req);
        let rv = HeaderValue::from_str(self.val);
        Box::pin(async move {
            let mut res = fut.await?;
            let v = rv?;
            res.headers_mut().append(header::CACHE_CONTROL, v);
            Ok(res)
        })
    }
}
