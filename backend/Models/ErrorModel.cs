using System.Text.Json.Serialization;

namespace backend.Models
{
    public class ErrorModel
    {
        [JsonPropertyName("code")]
        public int Code { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("traceid")]
        public string TraceId { get; set; }
    }
}