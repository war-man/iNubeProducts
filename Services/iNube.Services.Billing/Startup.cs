using AutoMapper;
using FluentValidation.AspNetCore;
using iNube.Services.Billing.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using iNube.Utility.Framework.Extensions;
using iNube.Services.Billing.Entities;
using Microsoft.EntityFrameworkCore;
using iNube.Services.Billing.Controllers.Billing.IntegrationServices;
using iNube.Services.Billing.Controllers.Billing.BillingService;
using iNube.Utility.Framework.Notification;
using iNube.Services.Billing.Controllers.Billing.MicaBillingService;
using iNube.Services.Billing.Controllers.Billing.MotorBillingService;
using iNube.Services.Billing.Controllers.Billing;
using System;

namespace iNube.Services.Billing
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
            var connectionstring = Configuration.GetConnectionString("BIConnection");
            services.AddDbContext<MICABIContext>(x => x.UseSqlServer(connectionstring));
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

           // services.AddScoped<IBillingService, BillingService>();

            //Module service
            ConfigureModuleService(services);

            //Common Service
            services.InitializedCommonServices(Configuration);

            services.AddMvc()
           .AddFluentValidation(options =>
           {
               options.RegisterValidatorsFromAssemblyContaining<Startup>();
           });
           
           
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
            //services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<MicaBillingService>();
            services.AddTransient<MotorBillingService>();
            services.AddTransient<AvoBillingService>();
            services.AddTransient<Func<string, IBillingProductService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaBillingService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorBillingService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoBillingService>();
                    default:
                        return serviceProvider.GetService<MicaBillingService>();

                }
            });

            services.AddScoped<IBillingService, BillingService>();
            services.AddScoped<IIntegrationService, IntegrationService>();
        }
    }
}
