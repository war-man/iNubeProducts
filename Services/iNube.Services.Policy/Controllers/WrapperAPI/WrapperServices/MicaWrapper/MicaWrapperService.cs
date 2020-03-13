using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.Policy.Controllers.WrapperAPI.IntegrationServices;
using iNube.Services.Policy.Entities.WrapperAPIEntities;
using iNube.Services.Policy.Helpers.DynamicReportHelpers;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.WrapperAPI.WrapperServices.MicaWrapper
{
    public class MicaWrapperService : IWrapperProductService
    {
        private MICAWAContext _context;
        private IMapper _mapper;
        private IWAIntegrationService _integrationService;
        private readonly IConfiguration _configuration;

        public MicaWrapperService(MICAWAContext context, IMapper mapper, IWAIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }

        //private static Dictionary<string, string> GetClaimColumns()
        //{
        //    Dictionary<string, string> dicClaimColumns = new Dictionary<string, string>();
        //    dicClaimColumns.Add("ClaimIntimatedId", "ClaimId");
        //    dicClaimColumns.Add("ClaimNumber", "ClaimNumber");
        //    dicClaimColumns.Add("ClaimAmount", "ClaimAmount");
        //    dicClaimColumns.Add("PolNumber", "PolicyNo");
        //    dicClaimColumns.Add("IncidentDateTime", "LossDateTime");
        //    return dicClaimColumns;
        //}
         
        //private static Dictionary<string, string> GetClaimMethods()
        //{
        //    Dictionary<string, string> dicClaimMethods = new Dictionary<string, string>();
        //    dicClaimMethods.Add("ClaimIntimation", "GetClaimByNumber");
        //    dicClaimMethods.Add("IntimateClaim", "GetIntimateClaim");
        //    return dicClaimMethods;
        //}

        //private string Getmethod(string name)
        //{
        //    var lstMethod = GetClaimMethods();
        //    string methodName;
        //    if (lstMethod.TryGetValue(name, out methodName))
        //    {
        //        return methodName;
        //    }
        //    return "";
        //}

        //public async Task<object> GetClaims(string name, ApiContext apiContext)
        //{
        //    _context = (MICAWAContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

        //    var methodname = "";

        //    foreach (var item in name)
        //    {
        //        methodname = Getmethod(item.ToString());
        //        if (methodname != null)
        //        {
        //            MethodInfo methodInfo = typeof(item).GetMethod("");
        //            return methodInfo;
        //        }
        //    }
        //    return null;
             
        //}

        //public async Task<object> WrapperApi(ApiContext apiContext)
        //{
        //    _context = (MICAWAContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

        //    Assembly testAssembly = Assembly.LoadFile(@"c:\Test.dll");

        //    // get type of class Calculator from just loaded assembly
        //    Type calcType = testAssembly.GetType("Test.Calculator");

        //    // create instance of class Calculator
        //    object calcInstance = Activator.CreateInstance(calcType);

        //    // get info about property: public double Number
        //    PropertyInfo numberPropertyInfo = calcType.GetProperty("Number");

        //    // get value of property: public double Number
        //    double value = (double)numberPropertyInfo.GetValue(calcInstance, null);

        //    // set value of property: public double Number
        //    numberPropertyInfo.SetValue(calcInstance, 10.0, null);

        //    return value;
        //}

    }
}
