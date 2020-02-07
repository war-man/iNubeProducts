using iNube.Services.UserManagement.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace iNube.Services.UserManagement.Test.Functional
{
    public class UserScenarios : UserServerBase
    {
        //[Fact]
        //public async Task Test_Get_All()
        //{
        //    using (var client =  CreateServer().CreateClient())
        //    {
        //        var response = await client.GetAsync("/api/Values");

        //        response.EnsureSuccessStatusCode();

        //        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //    }
        //    //using (var client = new TestClientProvider().Client)
        //    //{
        //    //    var response = await client.GetAsync("/api/Values");

        //    //    response.EnsureSuccessStatusCode();

        //    //    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //    //}
        //}
        //[Fact]
        //public async Task Login_response_ok_status_code()
        //{
        //    using (var server = CreateServer())
        //    {
        //        var userId = "admin";
        //        var content = new StringContent(BuildLoginRequest("admin", "mica@123","Mica","Dev"), UTF8Encoding.UTF8, "application/json");

        //        // Expected result
        //        var loginProvider = "Form";

        //        // Act
        //        var response = await server.CreateClient().PostAsync(Post.Authenticate, content);
        //        var responseBody = await response.Content.ReadAsStringAsync();
        //        var userResponse = JsonConvert.DeserializeObject<LoginResponse>(responseBody);

        //        var userTypeResponse = await server.CreateClient().GetAsync(Get.GetUserType(userId));
        //        var responseTypeBody = await userTypeResponse.Content.ReadAsStringAsync();
        //        var userLoginType = JsonConvert.DeserializeObject<UserLoginResponse>(responseTypeBody);

        //        var userNameResponse = await server.CreateClient().GetAsync(Get.GetUserName(userResponse.UserName));
        //        var responseUserName = await userNameResponse.Content.ReadAsStringAsync();
        //        var userNameType = JsonConvert.DeserializeObject<string>(responseTypeBody);

        //        // Assert
        //        Assert.Equal(userId, userResponse.UserName);
        //        Assert.Equal(loginProvider, userLoginType.userLogin.LoginProvider);
        //        Assert.Equal(userId, userNameType);
        //    }
        //}

        string BuildLoginRequest(string userName, string password,string productType,string serverType)
        {
            var user = new LoginDTO()
            {
                Username = userName,
                Password = password,
                ProductType= productType,
                ServerType= serverType
            };
            return JsonConvert.SerializeObject(user);
        }
    }
}
