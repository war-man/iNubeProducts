using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.LogPrivider.LogService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;


namespace AWSServiceTesting
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

            //services.AddDbContext<MICARIContext>();
          //  var micaconnectionstring = Configuration.GetConnectionString("RIConnection");
            //services.AddDbContext<MICAACContext>(x => x.UseSqlServer(micaconnectionstring));


            var appSettingsSection = Configuration.GetSection("AppSettings");
           // services.Configure<AppSettings>(appSettingsSection);

            ConfigureModuleService(services);
         //   services.InitializedCommonServices(Configuration);

            services.AddMvc(); 
           //.AddFluentValidation(options =>
           //{
           //    options.RegisterValidatorsFromAssemblyContaining<Startup>();
           //});
           // services.AddHealthChecks().AddSqlServer(micaconnectionstring);
           // services.AddAutoMapper(typeof(Startup));




            // var connectionstring = Configuration.GetConnectionString("RIConnection");

            // var appSettingsSection = Configuration.GetSection("AppSettings");
            // services.Configure<AppSettings>(appSettingsSection);

            // //Module service
            // ConfigureModuleService(services);

            // //Common Service
            // services.InitializedCommonServices(Configuration);

            // services.AddMvc()
            //.AddFluentValidation(options =>
            //{
            //    options.RegisterValidatorsFromAssemblyContaining<Startup>();
            //});


            // var appSettings = Configuration.GetSection("AppSettings");
            // services.Configure<AppSettings>(appSettings);


            // services.AddHealthChecks().AddSqlServer(connectionstring);
            // services.AddAutoMapper(typeof(Startup));
        }

        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
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
            // configure DI for application services
            // services.AddTransient<IValidator<RIModels>, CreateProductRequestValidator>();
            //services.AddTransient<IEmailService, EmailService>();
            //services.AddTransient<MicaAccountConfigService>();
            //services.AddTransient<MotorAccountConfigService>();
            //services.AddTransient<AvoAccountConfigService>();
            //services.AddTransient<Func<string, IAccountingConfigService>>(serviceProvider => lkey =>
            //{
            //    switch (lkey)
            //    {
            //        case "Mica":
            //            return serviceProvider.GetService<MicaAccountConfigService>();
            //        case "Motor":
            //            return serviceProvider.GetService<MotorAccountConfigService>();
            //        case "Avo":
            //            return serviceProvider.GetService<AvoAccountConfigService>();
            //        default:
            //            return serviceProvider.GetService<MicaAccountConfigService>();

            //    }
            //});
            //services.AddScoped<IReInsuranceService, ReInsuranceService>();
            //services.AddScoped<IIntegrationService, IntegrationService>();


        }
    }
}
