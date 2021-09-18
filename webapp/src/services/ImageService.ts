import { ImageModel } from '../models/ImageModel';

const ROOT_URL =
  process.env.API_ROOT_URL ??
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000');

export default class ImageService {
  public static list(): Promise<ImageModel[]> {
    return window.fetch(`${ROOT_URL}/images`).then((res) => res.json());
  }

  public static getMeta(id: string): Promise<ImageModel> {
    return window
      .fetch(`${ROOT_URL}/images/${id}/meta`)
      .then((res) => res.json());
  }

  public static getImageSource(id: string): string {
    return `${ROOT_URL}/images/${id}`;
  }

  public static getThumbnailSource(id: string, width?: number): string {
    return `${ROOT_URL}/images/${id}/thumbnail?width=${width}`;
  }
}
