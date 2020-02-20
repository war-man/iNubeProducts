﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace iNube.Components.RuleEngine
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

       // public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
         //   WebHost.CreateDefaultBuilder(args)
           //     .UseStartup<Startup>();
		
		 public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .Build();
            return WebHost.CreateDefaultBuilder(args)
                .UseUrls($"http://*:{config.GetValue<int>("Host:Port")}")
                .UseStartup<Startup>();
        }
    }
}
