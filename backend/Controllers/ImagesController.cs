using System.Collections.Generic;
using System.IO;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService imageService;

        public ImagesController(IImageService _imageService)
        {
            imageService = _imageService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<string>> List() =>
            Ok(imageService.List());

        [HttpGet("{id}")]
        public ActionResult<FileStream> Data([FromRoute] string id)
        {
            var (fs, mimeType) = imageService.Data(id);

            HttpContext.Response.Headers.Add("Cache-Control", "public, max-age=604800, immutable");
            return File(fs, mimeType);
        }

        [HttpGet("{id}/meta")]
        public ActionResult<ImageModel> Details([FromRoute] string id) =>
            Ok(imageService.Details(id));

        [HttpGet("{id}/thumbnail")]
        public ActionResult<FileStream> Thubnail(
            [FromRoute] string id,
            [FromQuery] int width,
            [FromQuery] int height
        )
        {
            var (fs, mimeType) = imageService.Thumbnail(id, width, height);

            HttpContext.Response.Headers.Add("Cache-Control", "public, max-age=604800, immutable");
            return File(fs, mimeType);
        }
    }
}
