using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using MICA.Controllers.Login.LoginService;
using MICA.Helper;
using MICA.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MICA.Controllers
{
    [Route("[controller]")]
    public class LoginController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly Func<string, ILoginService> _loginService;

        public LoginController(
            Func<string, ILoginService> loginService,
            IOptions<AppSettings> appSettings)
        {
            _loginService = loginService;
            _appSettings = appSettings.Value;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public JsonResult Authenticate([FromBody]LoginModel modelRequest)
        {
            try
            {
                modelRequest = _loginService(_appSettings.ChannelType).Authenticate(modelRequest);
                return Json(modelRequest);
            }
            catch (Exception ex)
            {
                // model.status = false;
                modelRequest.Message = ex.Message;
                return Json(modelRequest);
            }
        }

        [HttpPost]
        public async Task<string> GetUserType([FromBody] Datahandle value)
        {
            //value.Id = 6;
            var modelRequest =await _loginService(_appSettings.ChannelType).GetUserType(value.UserName);
            return modelRequest;

        }

    }
}