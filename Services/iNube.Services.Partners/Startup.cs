﻿using AutoMapper;
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
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using iNube.Utility.Framework.Extensions.DefaultSecurityHeader;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Http;
using iNube.Services.Partners.Entities.AVO;
using iNube.Services.Partners.Controllers.Contracts.ContractService.MicaContract;
using iNube.Services.Partners.Controllers.Contracts.ContractService.MotorContract;
using iNube.Services.Partners.Controllers.Contracts.ContractService.AvoContract;
using iNube.Services.Partners.Controllers.Contracts.ContractService;

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
            services.AddDbContext<AVOPRContext>();


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
                    //case "Avo":
                    //    return serviceProvider.GetService<AvoOrganizationService>();
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


            services.AddTransient<MicaContractService>();
            services.AddTransient<MotorContractService>();
            services.AddTransient<AvoContractService>();
            services.AddTransient<Func<string, IContractProductService>>(serviceProvider => ofkey =>
            {
                switch (ofkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaContractService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorContractService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoContractService>();
                    default:
                        return serviceProvider.GetService<MicaContractService>();

                }
            });

            // configure DI for application services
            services.AddScoped<IAccountService, AccountsService>();
            services.AddScoped<IIntegrationService, IntegrationService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<IContractService, ContractService>();
            services.AddScoped<IAvoOrganizationProductService, AvoOrganizationService>();
            services.AddScoped<IPartnerService, PartnerService>();
            services.AddScoped<ILoggerManager, LoggerManager>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped<IOfficeService, OfficeService>();
        }
    }
}
