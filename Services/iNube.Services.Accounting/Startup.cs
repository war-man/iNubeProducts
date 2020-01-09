using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HealthChecks.UI.Client;
using iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService;
using iNube.Services.Accounting.Entities;
using iNube.Services.Accounting.Helpers;
using iNube.Utility.Framework.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using FluentValidation;
using FluentValidation.AspNetCore;
using iNube.Utility.Framework.Notification;
using iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService.MicaAccounting;
using iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService.MotorAccounting;
using iNube.Services.Accounting.Controllers.AccountConfig.AccountConfigService.AvoAccounting;

namespace iNube.Services.Accounting
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

            services.AddDbContext<MICAACContext>();
            var micaconnectionstring = Configuration.GetConnectionString("DefaultConnection");
            //services.AddDbContext<MICAACContext>(x => x.UseSqlServer(micaconnectionstring));


            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            ConfigureModuleService(services);
            services.InitializedCommonServices(Configuration);

            services.AddMvc()
           .AddFluentValidation(options =>
           {
               options.RegisterValidatorsFromAssemblyContaining<Startup>();
           });

            //services.AddMvcCore()
            //.AddAuthorization() // Note - this is on the IMvcBuilder, not the service collection
            //.AddJsonFormatters(options => options.ContractResolver = new CamelCasePropertyNamesContractResolver())
            //.AddFluentValidation(options =>
            // {
            //     options.RegisterValidatorsFromAssemblyContaining<Startup>();
            // });

            //var connectionstring = Configuration.GetConnectionString("DefaultConnection");
            services.AddHealthChecks().AddSqlServer(micaconnectionstring);
            services.AddAutoMapper(typeof(Startup));


        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.InitializedCommonConfiguration(env, Configuration);
            // app.ConfigureExceptionHandler(new LoggerManager());
            app.UseAuthentication();
        }
        private void ConfigureModuleService(IServiceCollection services)
        {
            //services.AddTransient<AccountConfigService>();
            //services.AddScoped<IAccountConfigService, AccountConfigService>();
            //
            //services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<MicaAccountConfigService>();
            services.AddTransient<MotorAccountConfigService>();
            services.AddTransient<AvoAccountConfigService>();
            services.AddTransient<Func<string, IAccountingConfigService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaAccountConfigService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorAccountConfigService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoAccountConfigService>();
                    default:
                        return serviceProvider.GetService<MicaAccountConfigService>();

                }
            });

            // configure DI for application services
            services.AddScoped<IAccountConfigService, AccountConfigService>();
        }
    }

}
