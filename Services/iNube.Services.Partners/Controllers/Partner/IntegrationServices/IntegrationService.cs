using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.Policy.IntegrationServices
{
    public interface IIntegrationService
    {
        Task<IEnumerable<ddDTO>> GetProductMasterAsync(ApiContext apiContext);
        Task<UserResponse> CreateUserAsync(UserDTO userDTO, ApiContext apiContext);
        Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext);
        //Transaction Mapping
        Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext);
        Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext);
        Task<ResponseStatus> SendNotificationAsync(Partners.Models.NotificationRequest notificationRequest, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal productId, ApiContext apiContext);
        Task<dynamic> GetRateParamsAsync(decimal rateId, ApiContext apiContext);
        Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext);
        Task<EmpRoleResponse> UpdateEmpRole(EmpRoleMapDTO empRoles, ApiContext apiContext);
        Task<ViewDetails> ViewDetailsByEmpCode(string empcode, ApiContext apiContext);
        Task<bool> UpdateEmpQuotationData(EMPDistribute eMPDistribute, ApiContext apiContext);
        Task<bool> UpdateEmpProspectData(EMPDistribute eMPDistribute, ApiContext apiContext);
        Task<bool> UpdateEmpSuspectData(EMPDistribute eMPDistribute, ApiContext apiContext);
        Task<bool> UpdateEmpProposalData(EMPDistribute eMPDistribute, ApiContext apiContext);
        Task<bool> UpdateEmpPolicyData(EMPDistribute eMPDistribute, ApiContext apiContext);
        Task<dynamic> CheckCalculationRate(dynamic obj, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {
        private IConfiguration _configuration;
        readonly string PolicyUrl, BillingUrl, LeadUrl, ClaimUrl, NotificationUrl, PartnerUrl, ProductUrl, UserUrl, AccountingUrl, RuleEngineUrl, DMSUrl, RatingUrl, ExtensionUrl;

        public IntegrationService(IConfiguration configuration)
        {

            _configuration = configuration;
            PolicyUrl = _configuration["Integration_Url:Policy:PolicyUrl"];
            BillingUrl = _configuration["Integration_Url:Billing:BillingUrl"];
            ClaimUrl = _configuration["Integration_Url:Claim:ClaimUrl"];
            NotificationUrl = _configuration["Integration_Url:Notification:NotificationUrl"];
            PartnerUrl = _configuration["Integration_Url:Partner:PartnerUrl"];
            ProductUrl = _configuration["Integration_Url:Product:ProductUrl"];
            UserUrl = _configuration["Integration_Url:User:UserUrl"];
            //UserUrl = "http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9009";
            AccountingUrl = _configuration["Integration_Url:Accounting:AccountingUrl"];
            RuleEngineUrl = _configuration["Integration_Url:RuleEngine:RuleEngineUrl"];
            ExtensionUrl = _configuration["Integration_Url:Extension:ExtensionUrl"];
            RatingUrl = _configuration["Integration_Url:Rating:RatingUrl"];
            LeadUrl = _configuration["Integration_Url:Lead:LeadUrl"];

        }

        public async Task<ViewDetails> ViewDetailsByEmpCode(string empcode, ApiContext apiContext)
        {
            var uri = LeadUrl + "/api/Lead/ViewDetailsByPositionId?Positionid=" + empcode;

            // var uri = "https://localhost:44351/api/Proposal/GetProposalByQuotNO?quotoNo=" + empcode;
            var res = await GetApiInvoke<ViewDetails>(uri, apiContext);
            return res;

        }


        public async Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext)
        {
            var uri = AccountingUrl + "/api/AccountConfig/GetTransactionConditionDetails";
            var accountMapListDetails = await GetListApiInvoke<TransactionRuleMappingDto>(uri, apiContext);
            return accountMapListDetails;
        }
        //Accounting CreateTransaction
        public async Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext)
        {
            var uri = AccountingUrl + "/api/AccountConfig/CreateTransaction";
            return await PostApiInvoke<TransactionHeaderDto, TransactionsResponse>(uri, apiContext, transaction);
        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductById?productId=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<ddDTO>> GetProductMasterAsync(ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            var productList = await GetListApiInvoke<ddDTO>(uri, apiContext);
            return productList;
        }

        public async Task<UserResponse> CreateUserAsync(UserDTO userDTO, ApiContext apiContext)
        {
            var uri = UserUrl + "/api/UserProfile/CreateProfileUser";
            var productList = await PostApiInvoke<UserDTO, UserResponse>(uri, apiContext, userDTO);
            return productList;
        }

        public async Task<EmpRoleResponse> UpdateEmpRole(EmpRoleMapDTO empRoles, ApiContext apiContext)
        {
            var uri = UserUrl + "/api/Role/UpdateEmpRole";
            var productList = await PostApiInvoke<EmpRoleMapDTO, EmpRoleResponse>(uri, apiContext, empRoles);
            return productList;
        }

        public async Task<bool> UpdateEmpQuotationData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            var uri = LeadUrl + "/api/Quotation/UpdateEmpQuotationData";
            var productlist = await PostApiInvoke<EMPDistribute, bool>(uri, apiContext, eMPDistribute);
            return productlist;
        }

        public async Task<bool> UpdateEmpProspectData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            var uri = LeadUrl + "/api/Lead/UpdateEmpProspectData";
            var productlist = await PostApiInvoke<EMPDistribute, bool>(uri, apiContext, eMPDistribute);
            return productlist;
        }

        public async Task<bool> UpdateEmpSuspectData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            var uri = LeadUrl + "/api/Lead/UpdateEmpSuspectData";
            var productlist = await PostApiInvoke<EMPDistribute, bool>(uri, apiContext, eMPDistribute);
            return productlist;
        }

        public async Task<bool> UpdateEmpProposalData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            var uri = LeadUrl + "/api/Proposal/UpdateEmpProposalData";
            var productlist = await PostApiInvoke<EMPDistribute, bool>(uri, apiContext, eMPDistribute);
            return productlist;
        }

        public async Task<bool> UpdateEmpPolicyData(EMPDistribute eMPDistribute, ApiContext apiContext)
        {
            var uri = LeadUrl + "/api/Proposal/UpdateEmpPolicyData";
            var productlist = await PostApiInvoke<EMPDistribute, bool>(uri, apiContext, eMPDistribute);
            return productlist;
        }

        public async Task<dynamic> CheckCalculationRate(dynamic obj, ApiContext apiContext)
        {
            ApiContext api = new ApiContext();
            api.ProductType = "Mica";
            api.ServerType = "1";
            api.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6ImludWJlYWRtaW5AaW51YmVzb2x1dGlvbnMuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkludWJlIiwiVXNlck5hbWUiOiJpbnViZWFkbWluIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE1OTI4MzMyMzUsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.gQTzj4xxg-XquWxNo7zG5bt0PJJY1hqCT3zg6eac30Y";
            var uri = "https://inubeservicesrating.azurewebsites.net/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/53";
            var productlist = await PostListApiInvoke<dynamic, dynamic>(uri, api, obj);
            return productlist;
        }

        public async Task<ResponseStatus> SendNotificationAsync(Partners.Models.NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendTemplateNotificationAsync";
            return await PostApiInvoke<Partners.Models.NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }

        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetInsurableRiskDetails?ProductId=" + productId;
            return await GetApiInvoke<ProductRiskDetailsDTO>(uri, apiContext);

        }

        public async Task<dynamic> GetRateParamsAsync(decimal rateId, ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/GetHandleEvents?EventId=" + rateId;
            return await GetApiInvoke<dynamic>(uri, apiContext);
        }

        public async Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext)
        {

            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerSettings?customerid=" + apiContext.OrgId + "&type=" + TimeZone;//+"&envid="+apiContext.ServerType;

            return await GetApiInvoke<CustomerSettingsDTO>(uri, apiContext);

        }

        public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            HttpClient client = new HttpClient();

            if (!string.IsNullOrEmpty(apiContext.Token))
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
            }

            using (var response = await client.GetAsync(url))
            using (var content = response.Content)
            {
                if (response.IsSuccessStatusCode)
                {
                    var serviceResponse = await content.ReadAsAsync<TResponse>();
                    if (serviceResponse != null)
                    {
                        return serviceResponse;
                    }
                }
            }
            return new TResponse();
        }

        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            HttpClient client = new HttpClient();
            if (apiContext.Token != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
            }
            using (var response = await client.GetAsync(url))
            using (var content = response.Content)
            {
                if (response.IsSuccessStatusCode)
                {
                    var serviceResponse = await content.ReadAsAsync<IEnumerable<TResponse>>();
                    if (serviceResponse != null)
                    {
                        return serviceResponse;
                    }
                }
            }
            return new List<TResponse>();
        }

        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            HttpClient client = new HttpClient();
            if (apiContext.Token != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
            }

            HttpContent contentPost = null;
            if (request != null)
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string postBody = JsonConvert.SerializeObject(request);
                var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                contentPost = content;
            }
            using (var response = await client.PostAsync(requestUri, contentPost))
            {
                using (var content = response.Content)
                {
                    try
                    {
                        //for 400 errors also same response is expected.
                        return await content.ReadAsAsync<TResponse>();
                    }
                    catch (Exception ex)
                    {
                        return new TResponse();
                    }
                }
            }
        }

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpContent contentPost = null;
                if (request != null)
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
                    string postBody = JsonConvert.SerializeObject(request);
                    var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                    contentPost = content;
                }
                using (var response = await client.PostAsync(requestUri, contentPost))
                {
                    using (var content = response.Content)
                    {
                        return await content.ReadAsAsync<IEnumerable<TResponse>>();
                    }
                }
            }
            catch (Exception ex)
            {

                return new List<TResponse>();
            }

        }

    }
}
