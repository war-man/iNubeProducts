using iNube.Services.Claims.Models;
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
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices
{
    public interface IIntegrationService
    {
        //Task<PartnersDTO> GetPartnerDetailAsync(string partnerId);
        //Task<ProductDTO> GetProductDetailAsync(string productId);
        Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext);
        Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext);
        Task<IEnumerable<ProductRcbdetailsDTO>> GetProductClaimsDetailsAsync(string productId, ApiContext apiContext);
        Task<PolicyDTO> GetPolicyByNumber(string policyNo, ApiContext apiContext);
        Task<ClaimDTO> CreatePostCallAsync(string requestUri, FileRequest request, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext);
        Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext);
        Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO claimDashBoard, ApiContext apiContext);
        Task<BillingEventResponseDTO> PolicyData(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<IEnumerable<PolicyDataForClaims>> GetPolicyForClaimsInvoice(Models.BillingEventRequest EventRequet, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<String> GetEnvironmentConnectionforDoc(string product, decimal EnvId);
        Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext);
        // Task<IEnumerable<PolicyDTO>> GetPolicyNoByPolicyIds(decimal?[] policyId, ApiContext apiContext);
        //Accounting
        Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext);
        Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext);
        Task<decimal> UpdatePolicySumInsuredAsync(string PolicyNumber, decimal amount, ApiContext apiContext);
        Task<List<dynamic>> CheckRuleSets(string EventId, AllocDTO allocDTO, ApiContext apiContext);
        Task<IEnumerable<ClaimdocDTO>> GetPolicyDocuments(string policyNo, ApiContext apiContext);
        Task<PolicyResponse> UpdatePolicyBalanceSumInsuredAsync(string PolicyNumber, decimal amount, ApiContext apiContext);
        Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext);
        Task<List<RuleEngineResponse>> RuleMapperAsync(string TxnType, dynamic SourceObject, ApiContext apiContext);

        Task<ResponseStatus> SendSMSAsync(Models.SMSRequest SmsRequest, ApiContext apiContext);
        Task<ResponseStatus> SendEmailAsync(Models.EmailRequest SmsRequest, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {
        private IConfiguration _configuration;
        readonly string PolicyUrl, BillingUrl, ClaimUrl, NotificationUrl, PartnerUrl, ProductUrl, UserUrl, AccountingUrl, RuleEngineUrl, DMSUrl, RatingUrl, ExtensionUrl,AllocRuleEngineUrl;

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
            AllocRuleEngineUrl = _configuration["Integration_Url:AllocRuleEngine:AllocRuleEngineUrl"];

        }

        
       
        
       // readonly string accountRuleApiUrl = "https://inubeservicesaccounting.azurewebsites.net/api/AccountConfig/GetTransactionConditionDetails";
        
       // readonly string createTransactionApi = "https://inubeservicesaccounting.azurewebsites.net/api/AccountConfig/CreateTransaction";
        
        //ACCOUNTING
        public async Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext)
        {
            var uri = AccountingUrl;
            var accountMapListDetails = await GetListApiInvoke<TransactionRuleMappingDto>(uri, apiContext);
            return accountMapListDetails;
        }
        //Accounting CreateTransaction
        public async Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext)
        {
            var uri = AccountingUrl;
            return await PostApiInvoke<TransactionHeaderDto, TransactionsResponse>(uri, transaction,apiContext);
        }

        public async Task<List<dynamic>> CheckRuleSets(String EventId, AllocDTO allocDTO, ApiContext apiContext)
        {
            var uri = RuleEngineUrl + "/api/AllocationConfig/CheckRuleSets/CheckRuleSets/" + EventId;
            return await PostApiInvoke<AllocDTO, List<dynamic>>(uri, allocDTO, apiContext);
        }

        public async Task<PartnersDTO> GetPartnerDetailAsync(string partnerId)
        {
            var uri = PartnerUrl + "/api/Partner/GetPartnerDetails?partnerId=" + partnerId;
            return await GetApiInvoke<PartnersDTO>(uri);
        }
        public async Task<decimal> UpdatePolicySumInsuredAsync(string PolicyNumber,decimal amount,ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/UpdateSumInsured?PolicyNumber="+ PolicyNumber+"&amount="+ amount;
            return await GetApiInvoke<decimal>(uri, apiContext);
        }

        public async Task<PolicyResponse> UpdatePolicyBalanceSumInsuredAsync(string PolicyNumber, decimal amount, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/UpdateBalanceSumInsured?PolicyNumber=" + PolicyNumber + "&amount=" + amount;
            return await PutApiInvoke<dynamic,PolicyResponse> (uri, apiContext, null);
        }

        public async Task<List<RuleEngineResponse>> RuleMapperAsync(string TxnType, dynamic SourceObject, ApiContext apiContext)
        {
            var uri = ExtensionUrl + "/api/Mica_EGI/RuleMapper?TxnType=" + TxnType;
            return await PostApiInvoke<dynamic, List<RuleEngineResponse>>(uri, SourceObject, apiContext);
        }

        private Task<T> GetApiInvoke<T>(string uri)
        {
            throw new NotImplementedException();
        }

        //public async Task<ProductDTO> GetProductDetailAsync(string productId)
        //{
        //    var uri = productUrl + "/api/Product/GetProductById?productId="+productId;
        //    return await GetApiInvoke<ProductDTO>(uri);
        //}

        public async Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetMasterData?sMasterlist=" + sMasterList;
            return await GetListApiInvoke<ddDTOs>(uri, apiContext);
        }
        public async Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext)
        {

            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerSettings?customerid=" + apiContext.OrgId + "&type=" + TimeZone;//+"&envid="+apiContext.ServerType;

            return await GetApiInvoke<CustomerSettingsDTO>(uri, apiContext);

        }
        public async Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductById?productId=" + ProductId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }

        public async Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductById?productId=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            var result= await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            return result;
        }
        public async Task<String> GetEnvironmentConnectionforDoc(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            var result= await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            return result.Dbconnection;
        }

        //public async Task<IEnumerable<PolicyDTO>> GetPolicyNoByPolicyIds(decimal?[] policyId)
        //{
        //    var uri = policyUrl + "/api/Policy/GetPolicyNoByPolicyIds?policyId=" + policyId;
        //    return await PostListApiInvoke<decimal?[], PolicyDTO>(uri,policyId);
        //}

        public async Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch,ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/PolicySearch";
            return await PostListApiInvoke<PolicysearchDTO, PolicyDTO>(uri, apiContext, policysearch);
        }

        public async Task<PolicyDTO> ModifyPolicy(string policyNo, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/ModifyPolicy?policyNumber=" + policyNo;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyDetails";
            return await GetListApiInvoke<PolicyDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO claimDashBoard, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyByDetails";
            return await PostListApiInvoke<PolicySearchbyPidDTO, decimal>(uri, apiContext,claimDashBoard);
        }

        public async Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyById?policyId=" + policyId;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }
        public async Task<PolicyDTO> GetPolicyByNumber(string policyNo, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyByNumber?policyNumber=" + policyNo;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<ClaimdocDTO>> GetPolicyDocuments(string policyNo, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyDocumentsByNumber?PolicyNumber=" + policyNo;
            return await GetListApiInvoke<ClaimdocDTO>(uri, apiContext);
        }
        public async Task<IEnumerable<ProductRcbdetailsDTO>> GetProductClaimsDetailsAsync(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductClaimsDetails?ProductId=" + productId;
            return await GetListApiInvoke<ProductRcbdetailsDTO>(uri, apiContext);
        }
        public async Task<ClaimDTO> CreatePostCallAsync(string requestUri, FileRequest request, ApiContext apiContext)
        {
            return await PostApiInvoke<FileRequest, ClaimDTO>(requestUri, request, apiContext);
        }
        public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            HttpClient client = new HttpClient();
            if (!string.IsNullOrEmpty(apiContext.Token))
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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


        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, TRequest request, ApiContext apiContext) where TRequest : new() where TResponse : new()
        {
            try
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                HttpContent contentPost = null;
                if (request != null)
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //client.BaseAddress = new Uri(baseUrl);
                    //client.DefaultRequestHeaders.Accept.Clear();
                    // client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken.auth_token);
                    string postBody = JsonConvert.SerializeObject(request);
                    var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                    contentPost = content;
                }
                using (var response = await client.PostAsync(requestUri, contentPost))
                {
                    using (var content = response.Content)
                    {
                        return await content.ReadAsAsync<TResponse>();
                    }
                }
            }
            catch (Exception ex)
            {

                return new TResponse();
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
        private async Task<TResponse> PutApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                HttpClient client = new HttpClient();


                HttpContent contentPost = null;
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                if (request != null)
                {
                    string postBody = JsonConvert.SerializeObject(request);
                    var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                    contentPost = content;
                }
                using (var response = await client.PutAsync(requestUri, contentPost))
                {
                    using (var content = response.Content)
                    {
                        return await content.ReadAsAsync<TResponse>();
                    }
                }
            }
            catch (Exception ex)
            {

                return new TResponse();
            }

        }


        public async Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/SearchProduct";

            return await PostListApiInvoke<ProductSearchDTO, ProductDTO>(uri, apiContext, productSearchDTO);
        }

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                HttpClient client = new HttpClient();
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
                        return await content.ReadAsAsync<IEnumerable<TResponse>>();
                    }
                }
            }
            catch (Exception ex)
            {

                return new List<TResponse>();
            }

        }

        public async Task<BillingEventResponseDTO> PolicyData(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/BillingEventResponse";
            return await GetApiInvoke<BillingEventResponseDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<PolicyDataForClaims>> GetPolicyForClaimsInvoice(Models.BillingEventRequest EventRequet, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyForClaimsInvoice";
            return await PostListApiInvoke<Models.BillingEventRequest, PolicyDataForClaims>(uri, apiContext, EventRequet);
        }

       public async Task<ResponseStatus> SendSMSAsync(Models.SMSRequest SmsRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendSMSAsync";
            return await PostApiInvoke<Models.SMSRequest, ResponseStatus>(uri, SmsRequest, apiContext );
        }

        public async Task<ResponseStatus> SendEmailAsync(EmailRequest EmailRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendEmailAsync";
            return await PostApiInvoke<Models.EmailRequest, ResponseStatus>(uri, EmailRequest, apiContext);
        }
    }
}
