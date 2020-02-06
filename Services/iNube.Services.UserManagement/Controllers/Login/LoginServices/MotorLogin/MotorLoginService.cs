using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;

namespace iNube.Services.UserManagement.Controllers.Login.LoginServices.MotorLogin
{
    public class MotorLoginService : ILoginProductService
    {
        public AspNetUsersDTO Authenticate(LoginDTO loginDTO)
        {
            throw new NotImplementedException();
        }

        public AspNetUsersDTO RefreshTokenAuthenticate(LoginDTO loginDTO)
        {
            throw new NotImplementedException();
        }

        public Task<string> ForgetUserNameAsync(string emailId, string productType)
        {
            throw new NotImplementedException();
        }

        public LoginResponse GenerateToken(AspNetUsersDTO user, string productType, decimal envId, bool isTokenExpire)
        {
            throw new NotImplementedException();
        }

        public UserLoginResponse GetUserType(string username, string productType, string serverType)
        {
            throw new NotImplementedException();
        }

        public bool GoogleValidate(AspNetUsersDTO asp, string productType, string serverType)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SendEmailAsync(EmailTest emailTest)
        {
            throw new NotImplementedException();
        }

        public EnvironmentResponse GetEnvironmentConnection(string product, decimal EnvId)
        {
            throw new NotImplementedException();
        }
    }
}
