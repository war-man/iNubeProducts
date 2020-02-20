using MICA.Model;
using System;
using System.Threading.Tasks;

namespace MICA.Controllers.Login.LoginService
{
    public class TestLoginService : ILoginService
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
            var userType = "Form";
            if (username == "Ashish")
                userType= "Google";
            else if (username == "Subba")
                userType= "Facebook";
            else if (username == "Rahul")
                userType= "Github";

            return userType;
        }
    }
}
