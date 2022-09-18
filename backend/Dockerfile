FROM rust:slim AS build
WORKDIR /build
COPY src src
COPY Cargo.lock .
COPY Cargo.toml .
RUN cargo build --release

FROM alpine AS release
COPY --from=build /build/target/release/backend /bin/backend
ENV PH_STORAGE_LOCATION="/var/data"
VOLUME [ "/var/data/thumbnails" ]
EXPOSE 80
ENTRYPOINT [ "/bin/backend" ]