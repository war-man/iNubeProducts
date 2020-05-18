﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation.AspNetCore;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.AvoDispatcher;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.IntegrationServices;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.MicaDispatcher;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.MotorDispatcher;
using iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService;
using iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService.AvoObjectMapper;
using iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService.MicaObjectMapper;
using iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService.MotorObjectMapper;
using iNube.Services.Dispatcher.Entities;
using iNube.Services.Dispatcher.Helpers;
using iNube.Utility.Framework.Extensions;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace iNube.Services.Dispatcher
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

            services.AddDbContext<MICADTContext>();
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

            
            
            services.AddHealthChecks().AddSqlServer(micaconnectionstring);
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
        private void ConfigureModuleService(IServiceCollection services)
        {
            //services.AddTransient<AccountConfigService>();
            //services.AddScoped<IAccountConfigService, AccountConfigService>();
            //
            //services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<MicaObjectMapperService>();
            services.AddTransient<MotorObjectMapperService>();
            services.AddTransient<AvoObjectMapperService>();
            services.AddTransient<Func<string, IObjectMapperService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaObjectMapperService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorObjectMapperService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoObjectMapperService>();
                    default:
                        return serviceProvider.GetService<MicaObjectMapperService>();

                }
            });

            // configure DI for application services
            services.AddScoped<IDTObjectMapperService, ObjectMapperService>();



            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<MicaDispatcherService>();
            services.AddTransient<MotorDispatcherService>();
            services.AddTransient<AvoDispatcherService>();
            services.AddTransient<Func<string, IDispatcherService>>(serviceProvider => lkey =>
            {
                switch (lkey)
                {
                    case "Mica":
                        return serviceProvider.GetService<MicaDispatcherService>();
                    case "Motor":
                        return serviceProvider.GetService<MotorDispatcherService>();
                    case "Avo":
                        return serviceProvider.GetService<AvoDispatcherService>();
                    default:
                        return serviceProvider.GetService<MicaDispatcherService>();

                }
            });
            // configure DI for application services
            services.AddScoped<IDTDispatcherService, DispatcherService>();
            services.AddScoped<IIntegrationService, IntegrationService>();


        }

        
    }
}
