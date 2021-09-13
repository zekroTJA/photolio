using System;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class ImageModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("exif")]
        public ExifModel Exif { get; set; }
    }

    public class ExifModel
    {
        [JsonPropertyName("fstop")]
        public string FStop { get; set; }

        [JsonPropertyName("iso")]
        public string Iso { get; set; }

        [JsonPropertyName("exposuretime")]
        public string ExposureTime { get; set; }

        [JsonPropertyName("taken")]
        public DateTimeOffset Taken { get; set; }

        [JsonPropertyName("lensmodel")]
        public string LensModel { get; set; }

        [JsonPropertyName("lensmake")]
        public string LensMake { get; set; }

        [JsonPropertyName("bodymodel")]
        public string BodyModel { get; set; }

        [JsonPropertyName("bodymake")]
        public string BodyMake { get; set; }
    }
}