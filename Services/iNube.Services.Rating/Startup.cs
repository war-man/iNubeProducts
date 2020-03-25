using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation.AspNetCore;
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService;
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.AvoRating;
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.MicaRating;
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.MotorRating;
using iNube.Services.Rating.Entities;
using iNube.Services.Rating.Helpers;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Notification;
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

namespace iNube.Services.Rating
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

            services.AddDbContext<MICARTContext>();
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
            //services.AddTransient<AccountConfigService>();
            //services.AddScoped<IAccountConfigService, AccountConfigService>();
            //
            //services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<MicaRatingConfigService>();
            services.AddTransient<MotorRatingConfigService>();
            services.AddTransient<AvoRatingConfigService>();
            services.AddTransient<Func<string, IRatingConfigService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaRatingConfigService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorRatingConfigService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoRatingConfigService>();
                    default:
                        return serviceProvider.GetService<MicaRatingConfigService>();

                }
            });

            // configure DI for application services
            services.AddScoped<IRateConfigService, RatingConfigService>();
        }
    }

}
