using AutoMapper;
using iNube.Services.UserManagement.Controllers.Login;
using iNube.Services.UserManagement.Controllers.Login.LoginServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Xunit;

namespace iNube.Services.UserManagement.Test.Controllers
{
    public class LoginTest
    {
        private Mock<ILoginService> loginServiceMock;
        private Mock<IMapper> mapperMock;
        private Mock<IOptions<AppSettings>> appSettingMock;
        private LoginController controller;
        public LoginTest()
        {
            loginServiceMock = new Mock<ILoginService>();
            mapperMock = new Mock<IMapper>();
            appSettingMock = new Mock<IOptions<AppSettings>>();
            controller = new LoginController(loginServiceMock.Object, mapperMock.Object, appSettingMock.Object);
        }
        private LoginController CreateCartController()
        {
            // var controller = new LoginController();
            // controller.Request = new HttpRequestMessage();
            // HttpContext.Current = new HttpContext(new HttpRequest(null, "http://tempuri.org", null), new HttpResponse(null));
            //// controller.SetContext();
            // return controller;
            return null;
        }
        [Fact]
        public void GetUserType()
        {
            // Arrange
            UserLoginResponse userLoginResponse = new UserLoginResponse() { Status=BusinessStatus.Ok, userLogin= new UserLoginType { IsFirstTimeLogin=1, UserType="admin", LoginProvider="Form" } };
            loginServiceMock.Setup(ser => ser.GetUserType("admin", "Mica")).Returns(userLoginResponse);

            //Act
            var result =  controller.GetUserType("admin", "Mica");

            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = (UserLoginResponse)viewResult.Value;
            Assert.Equal("admin", model.userLogin.UserType);
            Assert.Equal("Form", model.userLogin.LoginProvider);
            Assert.Equal(1, model.userLogin.IsFirstTimeLogin);
            Assert.Equal(BusinessStatus.Ok, model.Status);

        }
        [Fact]
        public void AuthenticateTest()
        {
            // Arrange
            LoginDTO loginDTO = new LoginDTO() { Username = "admin", Password = "Mica@123", ProductType = "Mica", ServerType = "Dev" };
            var userLoginResponse = new  LoginResponse() { Status =BusinessStatus.Ok, FirstName="Ashish", LastName="Sinha",UserName="admin" };
            var authResponse = new AspNetUsersDTO() { UserName="admin", Email="mica@123", UserDetails=  new List<UserDetailsDTO>() { new UserDetailsDTO() { FirstName="Ashish", LastName="Sinha" }} };
            loginServiceMock.Setup(ser => ser.Authenticate(loginDTO)).Returns(authResponse);
          //  loginServiceMock.Setup(ser => ser.GenerateToken(authResponse,"Mica",1)).Returns(userLoginResponse);

            //Act
            var result = controller.Authenticate(loginDTO);

            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = (LoginResponse)viewResult.Value;
            Assert.Equal("Sinha", model.LastName);
            Assert.Equal("Ashish", model.FirstName);
            Assert.Equal("admin", model.UserName);
            Assert.Equal(BusinessStatus.Ok, model.Status);

        }
        private UserLoginResponse GetUserLoginResponse(bool IsUserExist,bool isFirstTimeLogin)
        {
            UserLoginResponse userLoginResponse = null;
            if (IsUserExist)
            {
                userLoginResponse = new UserLoginResponse() { Status = BusinessStatus.Ok, userLogin = new UserLoginType { IsFirstTimeLogin = 1, UserType = "admin", LoginProvider = "Form" } };
            }
            else
            {
                userLoginResponse = new UserLoginResponse() { Status = BusinessStatus.NotFound, userLogin = new UserLoginType { IsFirstTimeLogin = 1, UserType = "admin", LoginProvider = "Form" } };
            }
            return userLoginResponse;
        }
    }
}
