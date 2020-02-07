using System;
using AutoMapper;
using FluentValidation.AspNetCore;
using iNube.Services.ProductConfiguration.Controllers.Product.ProductServices;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using iNube.Services.ProductConfiguration.Controllers.Product.ProductServices.MicaProduct;
using iNube.Services.ProductConfiguration.Controllers.Product.ProductServices.MotorProduct;
using iNube.Services.ProductConfiguration.Controllers.Product.ProductServices.AvoProduct;
using iNube.Utility.Framework.Extensions;
using iNube.Services.ProductConfiguration.Models;
using FluentValidation;
using iNube.Services.ProductConfiguration.Validations;
using iNube.Services.ProductConfiguration.Controllers.Product.AvoProductServices;
using iNube.Services.ProductConfiguration.Entities.AvoEntities;
using iNube.Services.ProductConfiguration.Controllers.Product.IntegrationServices;
using Microsoft.Extensions.Options;
using iNube.Services.ProductConfiguration.Controllers.PSD.PSD_Service;

namespace iNube.Services.ProductConfiguration
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
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<MICAPCContext>();
            services.AddDbContext<AVOPRContext>();

            var connectionstring = Configuration.GetConnectionString("PRConnection");
            //services.AddDbContext<MICAPCContext>(x => x.UseSqlServer(connectionstring));

            //AVO DB Connection
            //var avoconnectionstring = Configuration.GetConnectionString("PRConnection");
            //services.AddDbContext<AVOPRContext>(x => x.UseSqlServer(connectionstring));

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

            services.Configure<PSDDataBaseSetting>(
              Configuration.GetSection(nameof(PSDDataBaseSetting)));

            services.AddSingleton<IPSDDataBaseSetting>(sp =>
                sp.GetRequiredService<IOptions<PSDDataBaseSetting>>().Value);

            services.AddTransient<IPSDService, PSDService>();
            services.AddAutoMapper();
            services.AddHealthChecks();

            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);


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
            services.AddTransient<IValidator<ProductDTO>, CreateProductRequestValidator>();

            //services.AddScoped<IAvoProductConfigService, AvoProductService>();

            services.AddTransient<MicaProductService>();
            services.AddTransient<MotorProductService>();
            services.AddTransient<AvoProductService>();
            services.AddTransient<Func<string, IProductConfigService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaProductService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorProductService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoProductService>();
                    default:
                        return serviceProvider.GetService<MicaProductService>();

                }
            });

            services.AddScoped<IProductService, ProductService>();
            //services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IAvoProductConfigService, AvoProductService>();
            services.AddScoped<IIntegrationService, IntegrationService>();
        }
    }
}

