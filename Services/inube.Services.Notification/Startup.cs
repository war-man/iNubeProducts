using AutoMapper;
using FluentValidation.AspNetCore;
using HealthChecks.UI.Client;
using inube.Services.Notification.Controllers.DMS.DMSService;
using inube.Services.Notification.Models;
using iNube.Services.Notification.Helpers;
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
            services.AddCors();
            //var connectionstring = Configuration.GetConnectionString("PCConnection");
            //services.AddDbContext<MICACMContext>(x => x.UseSqlServer(connectionstring));

            // configure DI for application services
            services.AddScoped<ILoggerManager, LoggerManager>();
            services.AddTransient<IEmailService, EmailService>();
           // services.AddScoped<IIntegrationService, IntegrationService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(new ValidateModelAttribute(new LoggerManager()));
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddFluentValidation(options =>
            {
                options.RegisterValidatorsFromAssemblyContaining<Startup>();
            });

            services.Configure<DMSDatabaseSettings>(
               Configuration.GetSection(nameof(DMSDatabaseSettings)));

            services.AddSingleton<IDMSDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<DMSDatabaseSettings>>().Value);
            //services.AddSingleton<DMSService1>();
            services.AddTransient<IDMSService, DMSService1>();
            services.AddAutoMapper();
            services.AddHealthChecks();
            //services.AddHealthChecks().AddSqlServer(connectionstring);

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "Notification Module",
                    Version = "v1"
                });
                c.AddFluentValidationRules();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            // HealthCheck middleware
            app.UseHealthChecks("/hc", new HealthCheckOptions()
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
            //Application Looger
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            //loggerFactory.AddContext(LogLevel.Information, Configuration.GetConnectionString("PCConnection"));
            //loggerFactory.AddLog4Net();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            Mapper.Initialize(cfg =>
            {
                //  cfg.ConstructServicesUsing(ObjectFactory.GetInstance);

            });
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notification Module V1");
            });
            //app.ConfigureExceptionHandler(new LoggerManager());
            app.UseAuthentication();
            app.UseHttpsRedirection();
           
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            RotativaConfiguration.Setup(env);
        }
    }
}
