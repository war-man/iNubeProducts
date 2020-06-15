using System;
using AutoMapper;
using FluentValidation.AspNetCore;
using HealthChecks.UI.Client;
using iNube.Services.Policy.Controllers.DynamicGraph;
using iNube.Services.Policy.Controllers.DynamicGraph.GraphServices.AvoGraph;
using iNube.Services.Policy.Controllers.DynamicGraph.GraphServices.MicaGraph;
using iNube.Services.Policy.Controllers.DynamicGraph.GraphServices.MotorGraph;
using iNube.Services.Policy.Controllers.DynamicGraph.IntegrationServices;
using iNube.Services.Policy.Controllers.DynamicReports;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using iNube.Services.Policy.Controllers.DynamicReports.ReportServices.AvoReport;
using iNube.Services.Policy.Controllers.DynamicReports.ReportServices.MicaReport;
using iNube.Services.Policy.Controllers.DynamicReports.ReportServices.MotorReport;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.Policy.Controllers.Policy.PolicyServices;
using iNube.Services.Policy.Controllers.Proposal.IntegrationService;
using iNube.Services.Policy.Controllers.Proposal.ProposalService;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Entities.AVO.DynamicReportEntities;
using iNube.Services.Policy.Entities.AvoEntities;
using iNube.Services.Policy.Entities.DynamicGraphEntities;
using iNube.Services.Policy.Entities.DynamicReportEntities;
using iNube.Services.Policy.Helpers;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.Extensions.DefaultSecurityHeader;
using iNube.Utility.Framework.LogPrivider.LogService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace iNube.Services.Policy
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
            services.AddDbContext<MICAPOContext>();
            services.AddDbContext<ProposalContext>();

            services.AddDbContext<MICARPContext>();
            services.AddDbContext<AVORPContext>();

            services.AddDbContext<MICADBContext>();

            //var connectionstring = Configuration.GetConnectionString("PCConnection");

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

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.ConfigureExceptionHandler(new LoggerManager(Configuration));
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
            // configure DI for application services

            services.AddTransient<MicaPolicyService>();
            services.AddTransient<MotorPolicyService>();
            services.AddTransient<AvoPolicyService>();
            services.AddTransient<Func<string, IPolicyProductService>>(serviceProvider => pokey =>
            {
                switch (pokey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaPolicyService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorPolicyService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoPolicyService>();
                    default:
                        return serviceProvider.GetService<MicaPolicyService>();

                }
            });

            services.AddTransient<MicaReportService>();
            services.AddTransient<MotorReportService>();
            services.AddTransient<AvoReportService>();
            services.AddTransient<Func<string, IReportProductService>>(serviceProvider => pkey =>
            {
                switch (pkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaReportService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorReportService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoReportService>();
                    default:
                        return serviceProvider.GetService<MicaReportService>();

                }
            });
           

            services.AddTransient<MicaGraphService>();
            services.AddTransient<MotorGraphService>();
            services.AddTransient<AvoGraphService>();
            services.AddTransient<Func<string, IGraphProductService>>(serviceProvider => gkey =>
            {
                switch (gkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaGraphService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorGraphService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoGraphService>();
                    default:
                        return serviceProvider.GetService<MicaGraphService>();

                }
            });
          

            services.AddScoped<IPolicyService, PolicyService>();
            services.AddScoped<IIntegrationService, IntegrationService>();

            services.AddScoped<IProposalService, ProposalService>();
            services.AddScoped<IPOIntegrationService, POIntegrationService>();

            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IRPIntegrationService, RPIntegrationService>();

            services.AddScoped<IGraphService, GraphService>();
            services.AddScoped<IDBIntegrationService, DBIntegrationService>();



        }
    }
}