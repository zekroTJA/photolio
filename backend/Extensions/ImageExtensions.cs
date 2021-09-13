using System;
using System.Drawing;

namespace backend.Extensions
{
    public static class ImageExtension
    {
        public static Image Thumbnail(this Image img, int width = 0, int height = 0)
        {
            if (width <= 0 && height <= 0)
                throw new ArgumentException("At least one positive height or width value must be given");

            if (width > 0 && width > img.Width || height > 0 && height > img.Height)
                throw new ArgumentException("Given scale must be smaller than the original image");

            if (width <= 0)
                width = (int)Math.Floor((double)height / img.Height * img.Width);
            else if (height <= 0)
                height = (int)Math.Floor((double)width / img.Width * img.Height);

            return img.GetThumbnailImage(width, height, () => false, IntPtr.Zero);
        }
    }
}