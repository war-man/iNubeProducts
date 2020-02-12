using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using MICA.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MICA.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
       
        [HttpGet("[action]")]
        public IEnumerable<TestModel> GetDropDownFromList()
        {
            return GetTestModel();
        }

     
        private IEnumerable<TestModel> GetTestModel()
        {
            List<TestModel> lstModel = new List<TestModel>();
            TestModel model = new TestModel();
            model.CityId = 1;
            model.City = "Delhi";
            lstModel.Add(model);

            model = new TestModel();
            model.CityId = 2;
            model.City = "Mumbai";
            lstModel.Add(model);

            model = new TestModel();
            model.CityId = 3;
            model.City = "Chennai";
            lstModel.Add(model);

            model = new TestModel();
            model.CityId = 4;
            model.City = "Bangalore";
            lstModel.Add(model);

            model = new TestModel();
            model.CityId = 5;
            model.City = "Kolkata";
            lstModel.Add(model);
            return lstModel;

        }
        public class TestModel
        {
            public int EmployeeId { get; set; }
            public int CityId { get; set; }
            public string Name { get; set; }
            public int TypeId { get; set; }
            public string TypeName { get; set; }
            public string City { get; set; }
            public string Department { get; set; }
            public string Gender { get; set; }
            public bool IsClient { get; set; }
            public DateTime StartDate { get; set; }
            public string EndDate { get; set; }
        }

        [HttpGet("[action]")]
        public UserTestViewModel GetData()
        {
            var userModel = GetUserTestModel();
            return userModel;
        }
        [HttpPost("[action]")]
        public IActionResult SaveUser([FromBody]User user)
        {
            user.UserId = 22;
            user.Salary = 6000;
            return Ok(user);
        }
        [HttpPost("[action]")]
        public async Task<UserViewModel> PostUserDataAsync([FromBody]UserViewModel user)
        {
            //var UserModel = GetUserModel();
            //return UserModel;

            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri("http://localhost:51072/api/Login/CreateProfileUser");

                HttpResponseMessage postTask = await client.PostAsJsonAsync<UserViewModel>("", user);
                // var response = client.GetAsync(client.BaseAddress).Result;
                //var social = await response.Content.ReadAsStringAsync();
                //var response = await client.PostAsJsonAsync("", value);
                var result = await postTask.Content.ReadAsStringAsync();

                return user;


                //postTask.Wait();

            }



        }
        private UserTestViewModel GetUserTestModel()
        {
            var userModel = new UserTestViewModel();


            userModel.user = new User();
            userModel.user.FirstName = "Ashish";
            userModel.user.LastName = "Sinha";
            userModel.user.DobTest = DateTime.Now.AddDays(-5);
            userModel.user.Dob = DateTime.Now.AddDays(-5).ToString();
            userModel.user.IsEmployee = true;

            var user = new User();
            user.FirstName = "Bhavuk";
            user.LastName = "Bhardwaj";
            //user.Dob = DateTime.Now.AddYears(-25);
            user.Dob = DateTime.Now.AddYears(-25).ToString();
            user.IsEmployee = true;
            userModel.lstUser.Add(user);

            user = new User();
            user.FirstName = "Suyash";
            user.LastName = "Pandey";
            //user.Dob = DateTime.Now.AddYears(-45);
            user.Dob = DateTime.Now.AddYears(-45).ToString();

            userModel.lstUser.Add(user);
            user = new User();
            user.FirstName = "Kunal";
            user.LastName = "Bhardwaj";
            //user.Dob = DateTime.Now.AddYears(-35);
            user.Dob = DateTime.Now.AddYears(-35).ToString();

            userModel.lstUser.Add(user);

            var city = new City();
            city.CommonTypeId = 1;
            city.Value = "Mumbai";
            city.StateId = 1;
            userModel.lstCity.Add(city);

            city = new City();
            city.CommonTypeId = 2;
            city.Value = "Thane";
            city.StateId = 1;
            userModel.lstCity.Add(city);

            city = new City();
            city.CommonTypeId = 3;
            city.Value = "Bangalore";
            city.StateId = 2;
            userModel.lstCity.Add(city);

            city = new City();
            city.CommonTypeId = 4;
            city.Value = "Mangalore";
            city.StateId = 2;
            userModel.lstCity.Add(city);

            city = new City();
            city.CommonTypeId = 5;
            city.Value = "Davangere";
            city.StateId = 2;
            userModel.lstCity.Add(city);



            var state = new State();
            state.CommonTypeId = 1;
            state.Value = "Maharashtra";
            userModel.lstState.Add(state);

            state = new State();
            state.CommonTypeId = 2;
            state.Value = "Karnataka";
            userModel.lstState.Add(state);

            return userModel;
        }


        [HttpGet("[action]")]
        public IEnumerable<City> GetCity([FromQuery] int id)
        {
            var lstCity = new List<City>();
            var city = new City();

            if (id == 1)
            {
                city.CommonTypeId = 1;
                city.Value = "Mumbai";
                city.StateId = 1;
                lstCity.Add(city);

                city = new City();
                city.CommonTypeId = 2;
                city.Value = "Thane";
                city.StateId = 1;
                lstCity.Add(city);
            }
            else if (id == 2)
            {
                city = new City();
                city.CommonTypeId = 3;
                city.Value = "Bangalore";
                city.StateId = 2;
                lstCity.Add(city);

                city = new City();
                city.CommonTypeId = 4;
                city.Value = "Mangalore";
                city.StateId = 2;
                lstCity.Add(city);

                city = new City();
                city.CommonTypeId = 5;
                city.Value = "Davangere";
                city.StateId = 2;
                lstCity.Add(city);
            }
            return lstCity;
        }


        [HttpGet("[action]")]
        public ProdutViewModel GetProductData()
        {
            var productModel = GetProductModel();
            return productModel;
        }
        private ProdutViewModel GetProductModel()
        {
            var productModel = new ProdutViewModel();

            productModel.pd = new ProductBasic();

            productModel.pd.ProductName = "A";
            productModel.pd.ProductCode = 01;
            productModel.pd.ClassOfBusiness = "High";
            productModel.pd.LineOfBusiness = "abc";
            productModel.pd.ProductStatus = 1;
            productModel.pd.ActiveFrom = "01/01/201";
            productModel.pd.ActiveTo = "01/01/2019";

            var pd = new ProductBasic();
            pd.ProductName = "B";
            pd.ProductCode = 02;
            pd.ClassOfBusiness = "High";
            pd.LineOfBusiness = "qwe";
            pd.ProductStatus = 2;
            pd.ActiveFrom = "01/01/2018";
            pd.ActiveTo = "01/01/2018";
            productModel.lstProduct.Add(pd);


            pd.ProductName = "C";
            pd.ProductCode = 03;
            pd.ClassOfBusiness = "Low";
            pd.LineOfBusiness = "hjk";
            pd.ProductStatus = 1;
            pd.ActiveFrom = "01/01/2018";
            pd.ActiveTo = "01/01/2018";
            productModel.lstProduct.Add(pd);



            return productModel;
        }

        [HttpGet("[action]")]
        public UserViewModel GetUserData()
        {
            var UserModel = GetUserModel();
            return UserModel;
        }
        [HttpPost("[action]")]
        public IActionResult SaveUserData(UserViewModel model)
        {
            var UserModel = GetUserModel();
            return Ok(UserModel);
        }

        private UserViewModel GetUserModel()
        {
            var UserModel = new UserViewModel();


            UserModel.User = new CreateUser();
            UserModel.User.EmployeeId = 1;
            UserModel.User.FirstName = "Ashish";
            UserModel.User.MiddleName = "Kumar";
            UserModel.User.LastName = "Sinha";
            UserModel.User.MaritalStatus = "Single";
            UserModel.User.DateofBirth = "01/01/2019";
            UserModel.User.DateofJoining = "01/03/2019";
            UserModel.User.AddressLine1 = "1792/10 1st cross";
            UserModel.User.AddressLine2 = "Biet college";
            UserModel.User.PinCode = 560024;
            UserModel.User.City = "Bangalore";
            UserModel.User.State = "Karnataka";
            UserModel.User.TelNoOffice = 987654432;
            UserModel.User.Number = 787653766;
            UserModel.User.EmailId = "sinhaashish@gmail.com";
            UserModel.User.PANNo = "KAF65T";
            UserModel.User.BranchName = "true";
            UserModel.User.BranchCode = 6753;

            //var pd = new ProductBasic();
            //pd.ProductName = "Bhavuk";
            //pd.ProductName = "abc";
            //pd.ProductCode = 12;
            //pd.LineOfBusiness = "BE";
            //pd.ClassOfBusiness = "MQ";
            //pd.ActiveFrom = "01/02/2018";
            //pd.ActiveTo = "01/01/2019";
            //pd.ProductStatus = "true";

            //ProductModel.lstProduct.Add(pd);

            //pd = new ProductBasic();
            //pd.ProductName = "Suyash";
            //pd.ProductName = "Pandey";
            //pd.ProductCode = 34;
            //pd.LineOfBusiness = "BE";
            //pd.ClassOfBusiness = "MQ";
            //pd.ActiveFrom = "01/02/2018";
            //pd.ActiveTo = "01/01/2019";
            //pd.ProductStatus = "true";
            //ProductModel.lstProduct.Add(pd);



            return UserModel;
        }
        [HttpGet("[action]")]
        public AssignViewModel GetAssignData()
        {
            var RoleModel = GetAssignModel();
            return RoleModel;
        }


        private AssignViewModel GetAssignModel()
        {
            var RoleModel = new AssignViewModel();


            RoleModel.Role = new AssignRole();
            RoleModel.Role.Admin = "Vithal";
            //RoleModel.Role.CONFIGURATOR = "abc";
            //RoleModel.Role.MANAGEMEMT = "xyz";
            RoleModel.Role.Configurator = "abc";
            RoleModel.Role.Operations = "AB";
            var config = new Config();
            config.CONFIGURATOR = "ABC";
            config.CONFIGURATORId = 1;
            RoleModel.lstConfig.Add(config);




            return RoleModel;
        }
        [HttpGet("[action]")]
        public PartnerViewModel GetPartnerData()
        {
            var PartnerModel = GetPartnerModel();
            return PartnerModel;
        }

        private PartnerViewModel GetPartnerModel()
        {
            var PartnerModel = new PartnerViewModel();

            PartnerModel.Partner = new PartnerDetails();
            PartnerModel.Partner.PartnerName = "Nadira Khanum ";
            PartnerModel.Partner.PartnerId = 123;
            PartnerModel.Partner.GSTN = 1253467;
            PartnerModel.Partner.PANNumber = "12ndh45 ";
            PartnerModel.Partner.CINNo = "U124 hsu23 ";
            PartnerModel.Partner.AddressLine1 = "Gandhi nagar";
            PartnerModel.Partner.AddressLine2 = "1st main 1st cross";
            PartnerModel.Partner.PINSearch = 577601;
            PartnerModel.Partner.Town = "Harihar";
            PartnerModel.Partner.District = "Davangere";
            PartnerModel.Partner.State = "Karnataka";
            PartnerModel.Partner.LandLineNumber = 08192 - 277601;
            PartnerModel.Partner.FaxNumber = 123456;
            PartnerModel.Partner.MobileNumber = 98873;
            PartnerModel.Partner.Email = "nadira@gmail.com";
            var parttype = new PartType();
            parttype.PARTNER = "Partner 1";
            parttype.PARTNERID = 1;
            PartnerModel.lstPartType.Add(parttype);

            return PartnerModel;
        }


        [HttpGet("[action]")]
        public ProdConfigViewModel GetProdConfigData()
        {
            var ProdConfigModel = GetProdConfigModel();
            return ProdConfigModel;
        }

        private ProdConfigViewModel GetProdConfigModel()
        {
            var ProdConfigModel = new ProdConfigViewModel();

            ProdConfigModel.ProdConfig = new ProdConfigPage();
            ProdConfigModel.ProdConfig.ProductName = "abc";
            ProdConfigModel.ProdConfig.ProductCode = 123;
            ProdConfigModel.ProdConfig.ActiveFrom = "12/01/2019";
            ProdConfigModel.ProdConfig.ActiveTo = "12/01/2021";

            return ProdConfigModel;
        }
        //[SwaggerResponse(HttpStatusCode.Unauthorized)]
        [HttpGet("[action]")]
        public ProfitViewModel GetProfitData()
        {
            var ProfitModel = GetProfitModel();
            return ProfitModel;
        }
        //private ProfitViewModel GetProfitModel()
        //{
        //    var ProfitModel = new ProfitViewModel();


        //    ProfitModel.Profile = new ProfileDetails();

        //    ProfitModel.Profile.OrganizationName = "abc";
        //    ProfitModel.Profile.FaxNumber = 123;
        //    ProfitModel.Profile.WebSite = "abcc@gmail.com";
        //    ProfitModel.Profile.PhoneNumber = 345;
        //    var category = new Category();
        //    category.ORGANIZATIONCAT = "XY";
        //    category.ORGANIZATIONCATId = 1;
        //    ProfitModel.lstCategory.Add(category);
        //    var typess = new OrgType();
        //    typess.ORGANIZATIONTYPE = "XY";
        //    typess.ORGANIZATIONTYPEId = 1;
        //    ProfitModel.lstTypess.Add(typess);



        //    return ProfitModel;

        //}



        [HttpPost("[action]")]
        public ProfitViewModel SetAddData([FromBody]ProfitViewModel Profile)
        {

            var ProfitModel = GetProfitModel();
            return ProfitModel;
        }


        private ProfitViewModel GetProfitModel()
        {
            var ProfitModel = new ProfitViewModel();


            ProfitModel.Profile = new ProfileDetails();

            ProfitModel.Profile.OrganizationName = "abc";
            ProfitModel.Profile.FaxNumber = 123;
            ProfitModel.Profile.WebSite = "abcc@gmail.com";
            ProfitModel.Profile.PhoneNumber = 345;
            var category = new Category();
            category.ORGANIZATIONCAT = "XY";
            category.ORGANIZATIONCATId = 1;
            ProfitModel.lstCategory.Add(category);
            var typess = new OrgType();
            typess.ORGANIZATIONTYPE = "XY";
            typess.ORGANIZATIONTYPEId = 1;
            ProfitModel.lstTypess.Add(typess);



            return ProfitModel;
        }

        [HttpGet("[action]")]
        public RegisterViewModel GetRegisterData()
        {
            var RegisterModel = GetRegisterModel();
            return RegisterModel;
        }
        private RegisterViewModel GetRegisterModel()
        {
            var RegisterModel = new RegisterViewModel();


            RegisterModel.register = new Register();
            RegisterModel.register.Address1 = "a";
            RegisterModel.register.Address2 = "b";
            RegisterModel.register.Address3 = "c";
            RegisterModel.register.pincode = 1;

            var cityss = new Register();
            cityss.City = "XY";
            cityss.CityId = 1;
            RegisterModel.lstCity.Add(cityss);
            var countryss = new Register();
            countryss.Country = "ab";
            countryss.CountryId = 2;
            RegisterModel.lstCountry.Add(countryss);
            var statess = new Register();
            statess.State = "ef";
            statess.StateId = 3;
            RegisterModel.lstState.Add(statess);
            var districtss = new Register();
            districtss.District = "ef";
            districtss.DistrictId = 4;
            RegisterModel.lstDistrict.Add(districtss);
            var areass = new Register();
            areass.Area = "ef";
            areass.AreaId = 5;
            RegisterModel.lstArea.Add(areass);
            return RegisterModel;



        }
        [HttpGet("[action]")]
        public CorporateViewModel GetCorporateData()
        {
            var CorporateModel = GetCorporateModel();
            return CorporateModel;
        }
        private CorporateViewModel GetCorporateModel()
        {
            var CorporateModel = new CorporateViewModel();


            CorporateModel.corporate = new Corporate();
            CorporateModel.corporate.Address1 = "a";
            CorporateModel.corporate.Address2 = "b";
            CorporateModel.corporate.Address3 = "c";
            CorporateModel.corporate.pincode = 2;
            var cityss = new Corporate();
            cityss.City = "XY";
            cityss.CityId = 1;
            CorporateModel.lstCity.Add(cityss);
            var countryss = new Corporate();
            countryss.Country = "ab";
            countryss.CountryId = 2;
            CorporateModel.lstCountry.Add(countryss);
            var statess = new Corporate();
            statess.State = "ef";
            statess.StateId = 3;
            CorporateModel.lstState.Add(statess);
            var districtss = new Corporate();
            districtss.District = "ef";
            districtss.DistrictId = 4;
            CorporateModel.lstDistrict.Add(districtss);
            var areass = new Corporate();
            areass.Area = "ef";
            areass.AreaId = 5;
            CorporateModel.lstArea.Add(areass);

            return CorporateModel;

        }

        [HttpGet("[action]")]
        public MailViewModel GetMailData()
        {
            var MailModel = GetMailModel();
            return MailModel;
        }
        private MailViewModel GetMailModel()
        {
            var MailModel = new MailViewModel();


            MailModel.mail = new Mails();
            MailModel.mail.Address1 = "a";
            MailModel.mail.Address2 = "b";
            MailModel.mail.Address3 = "c";
            MailModel.mail.pincode = 2;

            var cityss = new Mails();
            cityss.City = "XY";
            cityss.CityId = 1;
            MailModel.lstCity.Add(cityss);
            var countryss = new Mails();
            countryss.Country = "ab";
            countryss.CountryId = 2;
            MailModel.lstCountry.Add(countryss);
            var statess = new Mails();
            statess.State = "ef";
            statess.StateId = 3;
            MailModel.lstState.Add(statess);
            var districtss = new Mails();
            districtss.District = "ef";
            districtss.DistrictId = 4;
            MailModel.lstDistrict.Add(districtss);
            var areass = new Mails();
            areass.Area = "ef";
            areass.AreaId = 5;
            MailModel.lstArea.Add(areass);

            return MailModel;

        }
        [HttpGet("[action]")]
        public LicenseViewModel GetLicenseData()
        {
            var LicenseModel = GetLicenseModel();
            return LicenseModel;
        }
        private LicenseViewModel GetLicenseModel()
        {
            var LicenseModel = new LicenseViewModel();


            LicenseModel.license = new License();
            LicenseModel.license.RegistrationNo = "ka047653";
            LicenseModel.license.RegisterAuthority = "ab";
            LicenseModel.license.ServiveTax = "cd";
            LicenseModel.license.Pan = 12;
            LicenseModel.license.Tan = 11;
            return LicenseModel;
        }
        [HttpGet("[action]")]
        public SpocViewModel GetSpocData()
        {
            var SpocModel = GetSpocModel();
            return SpocModel;
        }
        private SpocViewModel GetSpocModel()
        {
            var SpocModel = new SpocViewModel();

            SpocModel.spoc = new Spoc();
            SpocModel.spoc.Address1 = "ab";
            SpocModel.spoc.Address2 = "cd";
            SpocModel.spoc.Address3 = "ef";
            SpocModel.spoc.Name = "aa";
            SpocModel.spoc.Designation = "Manager";
            SpocModel.spoc.pincode = 23;
            SpocModel.spoc.PhoneNo = 1223;
            SpocModel.spoc.Email = "aa@gmail.com";
            SpocModel.spoc.MobileNo = 666;
            var cityss = new Spoc();
            cityss.City = "XY";
            cityss.CityId = 1;
            SpocModel.lstCity.Add(cityss);
            var countryss = new Spoc();
            countryss.Country = "ab";
            countryss.CountryId = 2;
            SpocModel.lstCountry.Add(countryss);
            var statess = new Spoc();
            statess.State = "ef";
            statess.StateId = 3;
            SpocModel.lstState.Add(statess);
            var districtss = new Spoc();
            districtss.District = "ef";
            districtss.DistrictId = 4;
            SpocModel.lstDistrict.Add(districtss);
            var areass = new Spoc();
            areass.Area = "ef";
            areass.AreaId = 5;
            SpocModel.lstArea.Add(areass);
            return SpocModel;
        }
    }
}
