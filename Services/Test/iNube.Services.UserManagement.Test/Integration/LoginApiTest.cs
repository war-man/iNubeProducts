using iNube.Services.UserManagement.Test.Helpers;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iNube.Services.UserManagement.Test.Integration
{
    public class LoginApiTest : IClassFixture<TestFixture<Startup>>
    {
        private HttpClient Client;

        public LoginApiTest(TestFixture<Startup> fixture)
        {
            Client = fixture.Client;
        }

        [Fact]
        public async Task TestGetUserTypeAsync()
        {
            // Arrange
            var request = "/api/Login/GetUserType?username=admin&productType=Mica&serverType=MicaDev";

            // Act
            var response = await Client.GetAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
        }
    }
}
