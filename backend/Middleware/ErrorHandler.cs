using System.Diagnostics;
using System;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace backend.Middleware
{
    public static class ErrorHandler
    {
        public static void UseErrorMiddleware(this IApplicationBuilder app) =>
            app.Use(Handler);

        private static async Task Handler(HttpContext httpContext, Func<Task> next)
        {
            var exceptionDetails = httpContext.Features.Get<IExceptionHandlerFeature>();
            var ex = exceptionDetails?.Error;

            if (ex == null)
                return;


            httpContext.Response.ContentType = "application/json";
            var err = new ErrorModel
            {
                Code = GetStatusCode(ex),
                Message = ex.Message,
                TraceId = Activity.Current?.Id ?? httpContext?.TraceIdentifier,
            };

            var stream = httpContext.Response.Body;
            httpContext.Response.StatusCode = err.Code;
            await JsonSerializer.SerializeAsync(stream, err);
        }

        private static int GetStatusCode(Exception ex)
        {
            if (ex is ArgumentException) return 400;

            return 500;
        }
    }
}