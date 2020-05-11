using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HealthChecks.UI.Client;
using iNube.Components.RuleEngine.Controllers.AllocationConfig.AllocationConfigService;
using iNube.Components.RuleEngine.Controllers.RuleConfig.RuleConfigService;
using iNube.Components.RuleEngine.Controllers.RuleConfig.RuleEngineService;
using iNube.Components.RuleEngine.Entities;
using iNube.Components.RuleEngine.Entities.AllocationEntities;
using iNube.Components.RuleEngine.Helpers;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.LogPrivider.LogService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace iNube.Components.RuleEngine
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
            var connectionstring = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<RuleEngineContext>(x => x.UseSqlServer(connectionstring));
            services.AddDbContext<MICAALContext>(x => x.UseSqlServer(connectionstring));
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            ConfigureModuleService(services);

            services.InitializedCommonServices(Configuration);

            services.AddHealthChecks().AddSqlServer(connectionstring);
            services.AddAutoMapper(typeof(Startup));
        }


        
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

        public void ConfigureModuleService(IServiceCollection services)
        {
            services.AddScoped<IRuleConfigService, RuleConfigService>();
            services.AddScoped<IRuleEngineService, RuleEngineService>();
            services.AddScoped<IAllocationConfigService, AllocationConfigService>();
        }

    }
}