using System.Collections.Generic;
using System.IO;
using backend.Models;

namespace backend.Services
{
    public interface IImageService
    {
        /// <summary>
        /// Ensures that the image and thumbnail storage buckets
        /// are ready to receive and return files.
        /// </summary>
        void EnsureStorageBuckets();

        /// <summary>
        /// Returns a list of image IDs available.
        /// </summary>
        /// <returns></returns>
        IEnumerable<string> List();

        /// <summary>
        /// Returns details of a given image by ID.
        /// </summary>
        /// <param name="id">The image ID.</param>
        /// <returns></returns>
        ImageModel Details(string id);

        /// <summary>
        /// Returns an open file stream and mime type 
        /// to an image by ID.
        /// </summary>
        /// <param name="id">The image ID.</param>
        /// <returns></returns>
        (Stream fs, string mimeType) Data(string id);

        /// <summary>
        /// Returns the file stream and mime type of a thumbnail
        /// from an image by it's ID.
        /// 
        /// When either width or height is lower or equal 0,
        /// the other value is calculated using the images
        /// aspect ratio. Both values must not be euqal or
        /// lower than 0. When both values are given, the 
        /// original aspect ratio is ignored.
        /// 
        /// When the thumbnail is not existent, is is generated and
        /// stored. Otherwise, it is returned from storage.
        /// </summary>
        /// <param name="id">The image ID.</param>
        /// <param name="width">The width of the result image.</param>
        /// <param name="height">The height of the result image.</param>
        /// <returns></returns>
        (Stream fileStream, string mimeType) Thumbnail(string id, int width, int height);
    }
}