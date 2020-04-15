using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.Extensions;
using iNube.Services.Claims.Helpers;
using iNube.Services.Claims.Entities;
using iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices;
using iNube.Services.Claims.Controllers.ClaimManagement.ClaimService;
using System;
using iNube.Services.Claims.Controllers.ClaimManagement.ClaimService.MicaProduct;
using iNube.Utility.Framework.LogPrivider.LogService;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using iNube.Utility.Framework.Extensions.DefaultSecurityHeader;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Http;

namespace iNube.Services.Claims
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
            services.AddDbContext<MICACMContext>();
            //services.AddCors();

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

            var connectionstring = Configuration.GetConnectionString("PCConnection");
            services.AddHealthChecks().AddSqlServer(connectionstring);
            services.AddAutoMapper(typeof(Startup));
            services.AddHsts(options =>
            {
                options.Preload = true;
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromDays(365);
            });
            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                //options.HttpsPort = 5001;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.InitializedCommonConfiguration(env, Configuration);
            // global cors policy
            app.UseCors(x => x
             .AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader()
             .AllowCredentials());
            app.UseHealthChecks("/hc", new HealthCheckOptions()
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });

            app.UseSwagger(c =>
            {
                c.RouteTemplate = Configuration["Swagger:Url"].ToString() + "/{documentName}/swagger.json";
            });
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/" + Configuration["Swagger:Url"].ToString() + "/" + Configuration["Swagger:Version"].ToString() + "/swagger.json", Configuration["Swagger:Name"].ToString());
                c.RoutePrefix = Configuration["Swagger:Url"].ToString();
            });
            app.ConfigureExceptionHandler(new LoggerManager(Configuration));
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
            app.UseSecurityHeadersMiddleware(new SecurityHeadersBuilder()
              .AddFrameOptionsSameOrigin()
              .AddXssProtectionEnabled()
              .AddContentTypeOptionsNoSniff()
            );
            app.UseMvc();
        }
        private void ConfigureModuleService(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<MicaClaimManagementService>();
            services.AddTransient<MotorClaimManagementService>();
            services.AddTransient<AvoClaimManagementService>();
            services.AddTransient<Func<string, IClaimProductService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaClaimManagementService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorClaimManagementService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoClaimManagementService>();
                    default:
                        return serviceProvider.GetService<MicaClaimManagementService>();

                }
            });

            // configure DI for application services
            services.AddScoped<IClaimManagementService, ClaimManagementService>();
            services.AddScoped<IIntegrationService, IntegrationService>();

        }

    }
}
