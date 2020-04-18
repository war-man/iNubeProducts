using AutoMapper;
using FluentValidation.AspNetCore;
using HealthChecks.UI.Client;
using inube.Services.Notification.Controllers.DMS.DMSService;
using inube.Services.Notification.Controllers.RDLC.RdlcService;
using inube.Services.Notification.Helpers;
using inube.Services.Notification.Models;
using iNube.Services.Notification.Controllers.IntegrationServices;
using iNube.Services.Notification.Helpers;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.Filters.Attribute;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Rotativa.AspNetCore;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;

namespace inube.Services.Notification
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<DMSDatabaseSettings>(
                Configuration.GetSection(nameof(DMSDatabaseSettings)));
            services.AddSingleton<IDMSDatabaseSettings>(sp =>
              sp.GetRequiredService<IOptions<DMSDatabaseSettings>>().Value);

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            //Module service
            ConfigureModuleService(services);

            //Common Service
            services.InitializedCommonServices(Configuration);

            services.AddMvc()
           .AddFluentValidation(options =>
           {
               options.RegisterValidatorsFromAssemblyContaining<Startup>();
           });


            services.AddAutoMapper(typeof(Startup));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.InitializedCommonConfiguration(env, Configuration);
            // app.ConfigureExceptionHandler(new LoggerManager(Configuration));
            app.ConfigureCustomExceptionMiddleware(new LoggerManager(Configuration));
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();
        }

        private void ConfigureModuleService(IServiceCollection services)
        {
            services.AddScoped<IReportsService, ReportsService>();
            services.AddTransient<IDMSService, DMSService1>();
            services.AddScoped<INEmailService, EmailNService>();
            services.AddTransient<ISMSService, SMSService>();
            services.AddTransient<IIntegrationService, IntegrationService>();
        }
        }
}
