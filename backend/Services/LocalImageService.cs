using System;
using System.Threading;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mime;
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

        public IEnumerable<string> List()
        {
            var files = System.IO.Directory.GetFiles(this.imageLocation)
                .Select((file) => Path.GetFileName(file));

            return files;
        }

        public ImageModel Details(string id)
        {
            var fileName = ImagePath(id);
            if (!File.Exists(fileName))
                throw new FileNotFoundException();

            var image = new ImageModel
            {
                Id = id,
                Exif = new ExifModel(),
            };

            var meta = ImageMetadataReader.ReadMetadata(fileName);

            var exifSubIfd = meta.OfType<ExifSubIfdDirectory>().FirstOrDefault();
            if (exifSubIfd != null)
            {
                image.Exif.FStop = exifSubIfd.GetDescription(ExifDirectoryBase.TagModel);
                image.Exif.Iso = exifSubIfd.GetDescription(ExifDirectoryBase.TagIsoEquivalent);
                image.Exif.ExposureTime = exifSubIfd.GetDescription(ExifDirectoryBase.TagExposureTime);
                image.Exif.Taken = DateTimeUtil.ParseExif(exifSubIfd.GetDescription(ExifDirectoryBase.TagDateTimeOriginal));
                image.Exif.LensModel = exifSubIfd.GetDescription(ExifDirectoryBase.TagLensModel);
                image.Exif.LensMake = exifSubIfd.GetDescription(ExifDirectoryBase.TagLensMake);
            }

            var exifIfd0 = meta.OfType<ExifIfd0Directory>().FirstOrDefault();
            if (exifIfd0 != null)
            {
                image.Exif.BodyModel = exifIfd0.GetDescription(ExifDirectoryBase.TagModel);
                image.Exif.BodyMake = exifIfd0.GetDescription(ExifDirectoryBase.TagMake);
            }

            return image;
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
