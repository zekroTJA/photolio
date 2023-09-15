# Photolio backend

Backend for listing and serving images, generating thumbnails and extracting image metadata from EXIF fields.

## Configuration

Configuration can be achieved with environment variables or a config.toml in the backend root (see [config.dev.toml](../config.dev.toml) as example).

| Environment Variable  | Options | Default |
| ------------- | ------------- | ------------- |
| `PH_STORAGE_LOCATION` | Location to diskpath where images are saved  | `data` |
| `PH_SERVER_PORT` | Port on which the webserver listens  | `80` |
| `PH_SERVER_ADDRESS` | Address/Host on which the webserver listens  | `0.0.0.0` |
| `PH_SERVER_ALLOWEDORIGIN` | Allowed Origin for cors header  | `*` |
| `PH_CACHE_TYPE` | Cache Provider (redis or memory)  | `memory` |
| `PH_CACHE_CACHELOCATION` | Disk location for cache (only memory cache provider)  | *none* |
| `PH_CACHE_REDISADDRESS` | Connection URL for redis (only redis cache provider)  | *none* |