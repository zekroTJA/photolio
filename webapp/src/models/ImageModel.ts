export interface ImageModel {
  id: string;
  name: string;
  timestamp: string;
  blurhash: BlurHash;
  dimensions: Dimensions;
  exif: ExifModel;
}

export interface Dimensions {
  width: number;
  height: number;
  ratio: number;
}

export interface BlurHash {
  hash: string;
  components: Dimensions;
}

export interface ExifModel {
  fstop: string;
  iso: string;
  exposuretime: string;
  taken: string;
  lensmodel: string;
  lensmake: string;
  bodymodel: string;
  bodymake: string;
}
