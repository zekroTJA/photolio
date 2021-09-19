using System;
using System.Collections.Concurrent;
using BlurhashDrawing = System.Drawing.Common.Blurhash;
using System.Threading.Tasks;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using backend.Extensions;
using backend.Models;
using Microsoft.Extensions.Configuration;
using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using System.IO;
using backend.Util;
using MetadataExtractor.Formats.FileType;
using System.Drawing.Imaging;
using MetadataExtractor.Formats.FileSystem;
using Microsoft.Extensions.Logging;

namespace backend.Services
{
    public class LocalImageService : IImageService
    {
        private readonly string imageLocation;
        private readonly string thumbnailLocation;

        private readonly ConcurrentDictionary<string, ImageModel> metaCache = new();
        private readonly ILogger<LocalImageService> logger;

        public LocalImageService(IConfiguration config, ILogger<LocalImageService> _logger)
        {
            imageLocation = config.MustGetValue<string>("Storage:Locations:Content");
            thumbnailLocation = config.GetValue("Storage:Locations:Thumbanils", Path.Join(imageLocation, ".thumbnails"));
            logger = _logger;
        }

        public void EnsureStorageBuckets()
        {
            logger.LogInformation($"Ensure Content Directory \"{imageLocation}\"");
            System.IO.Directory.CreateDirectory(imageLocation);
            logger.LogInformation($"Ensure Thumbnail Directory \"{thumbnailLocation}\"");
            System.IO.Directory.CreateDirectory(thumbnailLocation);
        }

        public IEnumerable<ImageModel> List()
        {
            var files = System.IO.Directory.GetFiles(imageLocation)
                .Select((filePath) => Path.GetFileName(filePath))
                .Select((id) => Details(id).Simplify())
                .OrderByDescending((e) => e.Timestamp);

            return files;
        }

        public ImageModel Details(string id)
        {
            return metaCache.GetOrAdd(id, (_) =>
            {
                var fileName = ImagePath(id);
                var image = Image.FromFile(fileName);
                var meta = new ImageModel
                {
                    Id = id,
                    BlurHash = new BlurHash
                    {
                        Hash = new BlurhashDrawing.Encoder().Encode(image, 4, 4),
                        Components = new Dimensions { Width = 4, Height = 4 }
                    },
                    Dimenisons = new Dimensions
                    {
                        Height = image.Height,
                        Width = image.Width,
                    }
                };

                var metadata = ImageMetadataReader.ReadMetadata(fileName);

                var fileMeta = metadata.OfType<FileMetadataDirectory>().FirstOrDefault();
                if (fileMeta != null)
                {
                    fileMeta.TryGetDateTime(FileMetadataDirectory.TagFileModifiedDate, out var t);
                    meta.Timestamp = t;
                }

                var exifSubIfd = metadata.OfType<ExifSubIfdDirectory>().FirstOrDefault();
                if (exifSubIfd != null)
                {
                    meta.InitExif();

                    meta.Exif.FStop = exifSubIfd.GetDescription(ExifDirectoryBase.TagFNumber);
                    meta.Exif.Iso = exifSubIfd.GetDescription(ExifDirectoryBase.TagIsoEquivalent);
                    meta.Exif.ExposureTime = exifSubIfd.GetDescription(ExifDirectoryBase.TagExposureTime);
                    meta.Exif.LensModel = exifSubIfd.GetDescription(ExifDirectoryBase.TagLensModel);
                    meta.Exif.LensMake = exifSubIfd.GetDescription(ExifDirectoryBase.TagLensMake);

                    exifSubIfd.TryGetDateTime(ExifDirectoryBase.TagDateTimeOriginal, out var t);
                    meta.Exif.Taken = t;
                }

                var exifIfd0 = metadata.OfType<ExifIfd0Directory>().FirstOrDefault();
                if (exifIfd0 != null)
                {
                    meta.InitExif();

                    meta.Exif.BodyModel = exifIfd0.GetDescription(ExifDirectoryBase.TagModel);
                    meta.Exif.BodyMake = exifIfd0.GetDescription(ExifDirectoryBase.TagMake);
                }

                return meta;
            });
        }

        public (Stream fs, string mimeType) Data(string id)
        {
            var fileName = ImagePath(id);
            var mimeType = ImageMetadataReader
                .ReadMetadata(fileName)
                .OfType<FileTypeDirectory>()
                .FirstOrDefault()
                ?.GetDescription(FileTypeDirectory.TagDetectedFileMimeType);
            var fs = File.OpenRead(fileName);
            return (fs, mimeType);
        }

        public (Stream fileStream, string mimeType) Thumbnail(string id, int width = 0, int height = 0)
        {
            var tnFileName = ThumbnailPath(id, width, height);

            Stream imageStream = null;
            if (File.Exists(tnFileName))
                imageStream = File.OpenRead(tnFileName);
            else
            {
                var fileName = ImagePath(id);
                var image = Image
                    .FromFile(fileName)
                    .Thumbnail(width, height);
                var fileStream = new MemoryStream();
                image.Save(fileStream, ImageFormat.Jpeg);
                var fileStreamBytes = fileStream.ToArray();
                imageStream = new MemoryStream(fileStreamBytes);
                Task.Run(() =>
                {
                    var imgFile = File.OpenWrite(tnFileName);
                    imgFile.Write(fileStreamBytes);
                    imgFile.Close();
                });
            }

            return (imageStream, "image/jpeg");
        }

        private string ImagePath(string id) =>
            Path.Join(imageLocation, id);

        private string ThumbnailPath(string id, int width, int height) =>
            Path.Join(thumbnailLocation, $"{id}_{width}x{height}.jpg");
    }
}
