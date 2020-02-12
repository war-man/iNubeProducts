using MICA.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MICA.Controllers.Login.LoginService
{
    public interface ILoginService
    {
        LoginModel Authenticate(LoginModel modelRequest);
        Task<string> GetUserType(string username);
    }
    public class LoginService : ILoginService
    {
        public LoginModel Authenticate(LoginModel modelRequest)
        {
            try
            {
                modelRequest = new LoginModel();
                modelRequest.UserName = "Ashish";
                modelRequest.Password = "11111";
                modelRequest.Message = "TestMessage";
                string username = modelRequest.UserName;
                if (modelRequest.Password.ToLower() == "wrong")
                {
                    // model.status = false;
                    modelRequest.Message = "Incorrect Credentials";

                }
                //WebApi Call
            }
            catch (Exception ex)
            {
                // model.status = false;
                modelRequest.Message = ex.Message;

            }
            return modelRequest;
        }

        public async Task<string> GetUserType(string username)
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri("http://localhost:51072/Users/authenticate");

                HttpResponseMessage postTask = await client.PostAsJsonAsync<string>("", username);
                // var response = client.GetAsync(client.BaseAddress).Result;
                //var social = await response.Content.ReadAsStringAsync();
                //var response = await client.PostAsJsonAsync("", value);
                var result = await postTask.Content.ReadAsStringAsync();
                return "Google";


                //postTask.Wait();

            }
        }
    }
}
