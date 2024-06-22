# API Documentation

## Models

```ts
type ImageModel = {
  id: string;
  name: string;
  group?: string;
  timestamp: string;
  blurhash: BlurHash;
  dimensions: Dimensions;
  ratio: number;
  exif?: ExifModel;
};

type Dimensions = {
  width: number;
  height: number;
};

type BlurHash = {
  hash: string;
  components: Dimensions;
};

type ExifModel = {
  fstop?: string;
  iso?: string;
  exposuretime?: string;
  taken?: string;
  lensmodel?: string;
  lensmake?: string;
  bodymodel?: string;
  bodymake?: string;
};
```

## Endpoints

### `GET /images`

Returns a list of all images and their metadata.

#### Response

```ts
type Response = ImageModel[];
```

### `GET /images/{id}`

Returns the binary image data of the given image by `id`.

### `GET /images/{id}/meta`

Returns the metadata of a given image by `id`.

### `GET /images/{id}/thumbnail`

Scales down the image by the given size and returns the results binary data. The `height` and or `width` of the resulting image is passed via query parameter where at least one of them must me larger than `0`. The aspect ratio of the image is always preserved. If both `width` and `height` is given, the lower of both parameters is chosen for downscaling.

#### Query Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `0` | Maximum width in pixel. |
| `height` | `number` | `0` | Maximum height in pixel. |
