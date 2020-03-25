using AutoMapper;
using FluentValidation.AspNetCore;
using HealthChecks.UI.Client;
using iNube.Services.Lead.Controllers.Lead.LeadService;
using iNube.Services.Lead.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;
using iNube.Services.Lead.Entities;
using iNube.Services.Quotation.Controllers.Quotation.QuotationService;
using iNube.Services.Quotation.Controllers.Quotation.IntegrationServices;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.Filters.Attribute;
using iNube.Services.NeedAnalysis.Controllers.NeedAnalysis.NeedAnalysisServices;
using iNube.Services.NeedAnalysis.Controllers.IntegrationServices;
using iNube.Utility.Framework.Extensions;
using INube.Services.Prospect.Controllers.Prospect.ProspectService;
//using iNube.Services.Lead.Controllers.Lead.IntegrationServices;
using iNube.Services.Lead.Controllers.Lead.LDIntegrationServices;
//using iNube.Services.Lead.Controllers.Lead.IntegrationServices;

namespace iNube.Services.Lead
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
            
            var connectionstring = Configuration.GetConnectionString("PCConnection");
            services.AddDbContext<AVOLMContext>(x => x.UseSqlServer(connectionstring));
            
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

           
            services.AddHealthChecks().AddSqlServer(connectionstring);
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
            services.AddScoped<ILeadService, LeadService>();
            services.AddScoped<ILDIntegrationService, LDIntegrationService>();
            services.AddScoped<IProspectService, ProspectService>();
            
            //Quotation Services
            services.AddScoped<IQuotationService, QuotationService>();
            services.AddScoped<IIntegrationService, IntegrationService>();

            //NeedAnalysis Services
            services.AddScoped<INeedAnalysisService, NeedAnalysisService>();
            services.AddScoped<INAIntegrationService, NAIntegrationService>();

        }
    }

    }
