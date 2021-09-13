using backend.Middleware;
using backend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace backend
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSingleton<IImageService, LocalImageService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(c =>
                    c
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            }

            app.UseExceptionHandler(err => err.UseErrorMiddleware());

            app.UseRouting();

            app.UseEndpoints(endpoints => endpoints.MapControllers());

            // Initialize image service to check configuration,
            // to initialize storage and to pre-cache available
            // image metadata.
            var imgService = app.ApplicationServices.GetService<IImageService>();
            imgService.EnsureStorageBuckets();
            imgService.List();
        }
    }
}
