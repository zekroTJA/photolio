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

namespace backend.Services
{
    public class LocalImageService : IImageService
    {
        private readonly string imageLocation;
        private readonly string thumbnailLocation;

        private readonly ConcurrentDictionary<string, ImageModel> metaCache = new();

        public LocalImageService(IConfiguration config)
        {
            imageLocation = config.MustGetValue<string>("Storage:Locations:Content");
            thumbnailLocation = config.GetValue("Storage:Locations:Thumbanils", Path.Join(imageLocation, ".thumbnails"));
        }

        public void EnsureStorageBuckets()
        {
            System.IO.Directory.CreateDirectory(this.imageLocation);
            System.IO.Directory.CreateDirectory(this.thumbnailLocation);
        }

        public IEnumerable<ImageModel> List()
        {
            var files = System.IO.Directory.GetFiles(this.imageLocation)
                .Select((filePath) => Path.GetFileName(filePath))
                .Select((id) => Details(id).Simplify());

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
                    Exif = new ExifModel(),
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

                var exifSubIfd = metadata.OfType<ExifSubIfdDirectory>().FirstOrDefault();
                if (exifSubIfd != null)
                {
                    meta.Exif.FStop = exifSubIfd.GetDescription(ExifDirectoryBase.TagModel);
                    meta.Exif.Iso = exifSubIfd.GetDescription(ExifDirectoryBase.TagIsoEquivalent);
                    meta.Exif.ExposureTime = exifSubIfd.GetDescription(ExifDirectoryBase.TagExposureTime);
                    meta.Exif.Taken = DateTimeUtil.ParseExif(exifSubIfd.GetDescription(ExifDirectoryBase.TagDateTimeOriginal));
                    meta.Exif.LensModel = exifSubIfd.GetDescription(ExifDirectoryBase.TagLensModel);
                    meta.Exif.LensMake = exifSubIfd.GetDescription(ExifDirectoryBase.TagLensMake);
                }

                var exifIfd0 = metadata.OfType<ExifIfd0Directory>().FirstOrDefault();
                if (exifIfd0 != null)
                {
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
            Path.Join(this.imageLocation, id);

        private string ThumbnailPath(string id, int width, int height) =>
            Path.Join(this.thumbnailLocation, $"{id}_{width}x{height}.jpg");
    }
}
