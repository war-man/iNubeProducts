using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.Login.LoginServices
{
    public interface ILoginProductService
    {
        AspNetUsersDTO Authenticate(LoginDTO loginDTO);
        AspNetUsersDTO RefreshTokenAuthenticate(LoginDTO loginDTO);
        bool GoogleValidate(AspNetUsersDTO asp, string productType, string serverType);
        Task<string> ForgetUserNameAsync(string emailId, string productType);
        UserLoginResponse GetUserType(string username, string productType);
        LoginResponse GenerateToken(AspNetUsersDTO user, string productType, decimal envId, bool isTokenExpire);
        Task<bool> SendEmailAsync(EmailTest emailTest);
        EnvironmentResponse GetEnvironmentConnection(string product,decimal EnvId);
    }
}
