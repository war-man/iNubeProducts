using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using iNube.Utility.Framework.Extensions;
using FluentValidation.AspNetCore;
using FluentValidation;
using iNube.Services.MicaExtension_EGI.Helpers;
using iNube.Services.MicaExtension_EGI.Controllers.MicaExtension_EGI.Mica_EGIService;
using iNube.Services.MicaExtension_EGI.Models;
using MicaExtension_EGI.Entities;
using iNube.Services.Controllers.EGI.IntegrationServices;

namespace iNube.Services.MicaExtension_EGI
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

            services.AddDbContext<MICAQMContext>();

            var connectionstring = Configuration.GetConnectionString("Mica_EGIConnection");

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


            var appSettings = Configuration.GetSection("AppSettings");
           // services.Configure<AppSettings>(appSettings);


            services.AddHealthChecks().AddSqlServer(connectionstring);
            services.AddAutoMapper(typeof(Startup));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.InitializedCommonConfiguration(env, Configuration);
            // app.ConfigureExceptionHandler(new LoggerManager());
            app.UseAuthentication();
        }

        private void ConfigureModuleService(IServiceCollection services)
        {
            // configure DI for application services
            // services.AddTransient<IValidator<EGI_Models>, CreateProductRequestValidator>();
            // services.AddScoped<IReInsuranceService, ReInsuranceService>();
            services.AddScoped<IMicaEGIService, MicaEGIService>();
            services.AddScoped<IIntegrationService, IntegrationService>();
           

        }

      
    }
}

