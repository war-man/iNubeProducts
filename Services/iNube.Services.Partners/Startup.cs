using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using iNube.Services.Partners.Controllers.Partner.PartnerService;
using iNube.Services.Partners.Controllers.Organization.OrganizationService;
using iNube.Services.Partners.Controllers.Accounts.AccountsService;
using iNube.Services.Partners.Entities;
using FluentValidation.AspNetCore;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.Notification;
using FluentValidation;
using iNube.Services.Partners.Models;
using iNube.Services.Partners.Validations;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Services.Partners.Controllers.Office.OfficeService;

using System;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Services.Partners.Helpers;

namespace iNube.Services.Partners
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
            services.AddDbContext<MICAPRContext>();


            //services.AddCors();
            var connectionstring = Configuration.GetConnectionString("PRConnection");
            //services.AddDbContext<MICAPRContext>(x => x.UseSqlServer(connectionstring));

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            ConfigureModuleService(services);

            services.InitializedCommonServices(Configuration);

            services.AddMvc()
                .AddFluentValidation(options =>
                {
                    options.RegisterValidatorsFromAssemblyContaining<Startup>();
                });

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
            services.AddTransient<IValidator<CdAccountsDTO>, CreateCDAccountRequestValidator>();
            services.AddTransient<IValidator<PartnersDTO>, CreatePartnerRequestValidator>();
            services.AddTransient<IValidator<PartnerAddressDTO>, PartnerAddressValidator>();

            services.AddTransient<MicaPartnerService>();
            services.AddTransient<AvoPartnerService>();
            services.AddTransient<MotorPartnerService>();
            services.AddTransient<Func<string, IPartnerProductService>>(serviceProvider => pkey =>
            {
                switch (pkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaPartnerService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorPartnerService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoPartnerService>();
                    default:
                        return serviceProvider.GetService<MicaPartnerService>();

                }
            });



            services.AddTransient<MicaOrganizationService>();
            services.AddTransient<MotorOrganizationService>();
            services.AddTransient<AvoOrganizationService>();
            services.AddTransient<Func<string, IOrganizationProductService>>(serviceProvider => okey =>
            {
                switch (okey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaOrganizationService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorOrganizationService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoOrganizationService>();
                    default:
                        return serviceProvider.GetService<MicaOrganizationService>();

                }
            });



            services.AddTransient<MicaOfficeService>();
            services.AddTransient<MotorOfficeService>();
            services.AddTransient<AvoOfficeService>();
            services.AddTransient<Func<string, IOfficeProductService>>(serviceProvider => ofkey =>
            {
                switch (ofkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaOfficeService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorOfficeService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoOfficeService>();
                    default:
                        return serviceProvider.GetService<MicaOfficeService>();

                }
            });





            services.AddTransient<MicaAccountsService>();
            services.AddTransient<MotorAccountsService>();
            services.AddTransient<AvoAccountsService>();
            services.AddTransient<Func<string, IAccountsProductService>>(serviceProvider => akey =>
            {
                switch (akey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaAccountsService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorAccountsService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoAccountsService>();
                    default:
                        return serviceProvider.GetService<MicaAccountsService>();

                }
            });

            // configure DI for application services
            services.AddScoped<IAccountService, AccountsService>();
            services.AddScoped<IIntegrationService, IntegrationService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<IPartnerService, PartnerService>();
            services.AddScoped<ILoggerManager, LoggerManager>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped<IOfficeService, OfficeService>();
        }
    }
}
