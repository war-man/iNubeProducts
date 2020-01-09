﻿
using AutoMapper;
using iNube.Services.Proposal.Controllers.ProposalConfig.ProposalConfigService;
using iNube.Services.Proposal.PLEntities;
using iNube.Utility.Framework.Extensions;

using Microsoft.AspNetCore.Builder;

using Microsoft.AspNetCore.Hosting;

using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;

using Microsoft.Extensions.DependencyInjection;





namespace iNube.Services.Proposal

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

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);



            services.AddDbContext<PLContext>();







            var connectionstring = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<PLContext>(x => x.UseSqlServer(connectionstring));





            //services.AddCors();





            //Module service

            ConfigureModuleService(services);





            //Common Service

            services.InitializedCommonServices(Configuration);





            services.AddMvc();

            //.AddFluentValidation(options =>

            //{

            //    options.RegisterValidatorsFromAssemblyContaining<Startup>();

            //});





            services.AddHealthChecks().AddSqlServer(connectionstring);

            services.AddAutoMapper(typeof(Startup));





        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)

        {

            app.InitializedCommonConfiguration(env, Configuration);

            // app.ConfigureExceptionHandler(new LoggerManager());

            app.UseAuthentication();

        }





        private void ConfigureModuleService(IServiceCollection services)

        {



            // configure DI for application services
            services.AddScoped<IProposalService, ProposalService>();



        }



    }

}