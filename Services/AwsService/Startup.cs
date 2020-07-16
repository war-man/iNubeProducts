using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.LogPrivider.LogService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AwsService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public class AppSettings
        {
            public string Secret { get; set; }
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            app.ConfigureCustomExceptionMiddleware(new LoggerManager(Configuration));
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();
        }

    }
}
