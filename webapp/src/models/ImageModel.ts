export type ImageModel = {
  id: string;
  name: string;
  group?: string;
  timestamp: string;
  blurhash: BlurHash;
  dimensions: Dimensions;
  ratio: number;
  exif?: ExifModel;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type BlurHash = {
  hash: string;
  components: Dimensions;
};

export type ExifModel = {
  fstop?: string;
  iso?: string;
  exposuretime?: string;
  taken?: string;
  lensmodel?: string;
  lensmake?: string;
  bodymodel?: string;
  bodymake?: string;
};
