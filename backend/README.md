# Photolio backend

Backend for saving and retrieving the images of the gallery

## Configuration

Configuration can be achieved with environment variables or a config.toml in the backend root(see [config.dev.toml](config.dev.toml))

| Environment Variable  | Options | Default |
| ------------- | ------------- | ------------- |
| PH_STORAGE_LOCATION | Location to diskpath where images are saved  | none |
| PH_SERVER_PORT | Port on which the webserver listens  | none |
| PH_SERVER_ADDRESS | Address/Host on which the webserver listens  | none |
| PH_SERVER_ALLOWEDORIGIN | Allowed Origin for cors header  | none |
| PH_CACHE_TYPE | Cache Provider (redis or memory)  | none |
| PH_CACHE_REDISADDRESS | Connection URL for redis (only redis cache provider)  | none |
| PH_CACHE_CACHELOCATION | Disk location for cache (only memory cache provider)  | none |