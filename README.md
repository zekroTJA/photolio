# photolio

A self-hosted light weight web gallery to show my photography work on my web page.

## Demo

[**Here**](https://gallery.zekro.de) you can find the deployment of my gallery.

https://github-production-user-asset-6210df.s3.amazonaws.com/16734205/268050531-e1ce2f5c-4ee2-42ec-9c56-4ebec699d0d4.mp4

## Setup

If you want to set up this service for yourself, please consider the following steps to get started.

### Backend Setup

You can use the [provided Docker image](https://github.com/zekroTJA/photolio/pkgs/container/photolio-backend) to run the backend service.

```
$ docker pull ghcr.io/zekrotja/photolio-backend:latest
```

It can either be configured via a config file you can pass via the `--config` flag (see [`config.dev.toml`](config.dev.toml) as example) or via environment variables.

| Environment Variable  | Options | Default |
| ------------- | ------------- | ------------- |
| `PH_STORAGE_LOCATION` | Location to diskpath where images are saved  | `data` |
| `PH_SERVER_PORT` | Port on which the webserver listens  | `80` |
| `PH_SERVER_ADDRESS` | Address/Host on which the webserver listens  | `0.0.0.0` |
| `PH_SERVER_ALLOWEDORIGIN` | Allowed Origin for cors header  | `*` |
| `PH_CACHE_TYPE` | Cache Provider (redis or memory)  | `memory` |
| `PH_CACHE_CACHELOCATION` | Disk location for cache (only memory cache provider)  | *none* |
| `PH_CACHE_REDISADDRESS` | Connection URL for redis (only redis cache provider)  | *none* |

### Frontend

The front end is a simple React SPA listing and displaying the images by fetching the data via the backend service. **If you want to host the provided frontend, please clone or fork the repository and enter your own information in the ["about"](webapp/src/routes/about/) and ["contact"](webapp/src/routes/contact/) routes or remove them, if desired.**

You can either build the web app and serve it by building the [provided Dockerfile](Dockerfile.Webapp) or by statically building the web app and run it behind a web server like NGINX or Apache2. Alternatively, you can also update the configuration in the [Web App Pages workflow](.github\workflows\webapp-pages.yml) and serve the web application via GitHub Pages.

On building the web app - either directly, via Docker or via GitHub Actions - **make sure to set the `REACT_APP_API_ROOT_URL` environment variable to the URL of your backend instance.**

You can also implement your own frontend, if you want. [Here](docs/api.md) you can find a brief API documentation for the backend.