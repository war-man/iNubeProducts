using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Net.Http;

namespace iNube.Services.UserManagement.Test.Functional
{
    public class UserServerBase
    {
        public TestServer CreateServer()
        {
            var path = Assembly.GetAssembly(typeof(UserServerBase)).Location;

            var hostBuilder = new WebHostBuilder()
                .UseContentRoot(Path.GetDirectoryName(path))
                .ConfigureAppConfiguration(cb =>
                {
                    cb.AddJsonFile("appsettings.json", optional: false)
                     .AddEnvironmentVariables();
                }).UseStartup<UserStartup>();
            var testServer = new TestServer(hostBuilder);
            testServer.BaseAddress =  new Uri("https://localhost:44367");
            return testServer;
        }

        public static class Get
        {
            public static string UserApi = "api/Login";

            public static string GetUserType(string username)
            {
                return $"{UserApi}/GetUserType?username={username}&productType=Mica";
            }

            public static string GetUserName(string email)
            {
                return $"{UserApi}/GetUserName?email={email}&productType=Mica";
            }
        }

        public static class Post
        {
            public static string Authenticate = "api/Login/Authenticate";
        }
    }

    public class TestClientProvider1
    {
        public HttpClient Client { get; private set; }

        public TestClientProvider1()
        {
            var server = new TestServer(new WebHostBuilder().UseStartup<Startup>());

            Client = server.CreateClient();
        }
    }
   
public class TestClientProvider : IDisposable
    {
        private TestServer server;

        public HttpClient Client { get; private set; }

        public TestClientProvider()
        {
            server = new TestServer(new WebHostBuilder().UseStartup<Startup>());

            Client = server.CreateClient();
        }

        public void Dispose()
        {
            server?.Dispose();
            Client?.Dispose();
        }
    }
}
