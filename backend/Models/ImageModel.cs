using System;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class ImageModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Name { get; set; }

        [JsonPropertyName("timestamp")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public DateTimeOffset Timestamp { get; set; }

        [JsonPropertyName("blurhash")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public BlurHash BlurHash { get; set; }

        [JsonPropertyName("dimensions")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Dimensions Dimenisons { get; set; }

        [JsonPropertyName("exif")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ExifModel Exif { get; set; }

        public ImageModel Simplify() => new ImageModel
        {
            Id = Id,
            Name = Name,
            Timestamp = Timestamp,
            BlurHash = BlurHash,
            Dimenisons = Dimenisons,
        };
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

    public class Dimensions
    {
        [JsonPropertyName("width")]
        public int Width { get; set; }

        [JsonPropertyName("height")]
        public int Height { get; set; }

        [JsonPropertyName("ratio")]
        public double Ratio { get => (double)Width / Height; }
    }

    public class BlurHash
    {
        [JsonPropertyName("hash")]
        public string Hash { get; set; }

        [JsonPropertyName("components")]
        public Dimensions Components { get; set; }
    }
}