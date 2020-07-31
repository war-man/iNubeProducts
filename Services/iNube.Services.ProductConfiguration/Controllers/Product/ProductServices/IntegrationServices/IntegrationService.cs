using iNube.Services.ProductConfiguration.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using iNube.Utility.Framework.LogPrivider.LogService;
using System.Reflection;

namespace iNube.Services.ProductConfiguration.Controllers.Product.IntegrationServices
{
    public interface IIntegrationService
    {
        Task<string> GetEnvironmentConnection(string product, decimal EnvId);
        Task<IEnumerable<AssignProductList>> GetAssignProductByPartnerId(string pID, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext);
        Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext);
        Task<PolicyResponse> LeadPolicyAsync(LeadInfoDTO lead, ApiContext apiContext);
        Task<MapperResponse> SaveDynamicMapper(MapperDTO MapperDTO, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {
        private IConfiguration _configuration;
        readonly string PartnerUrl, UserUrl, RatingUrl, PolicyUrl, DispatcherUrl;

        // readonly string DispatcherUrl = "http://localhost:58593";

        // readonly string partnerUrl = "https://inubeservicespartners.azurewebsites.net";
        ////readonly string partnerUrl = "https://localhost:44315";


        // //readonly string UsermanangementUrl = "https://localhost:44367";
        // readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
        // //readonly string RatingUrl = "http://localhost:58593";
        // readonly string RatingUrl = "https://inubeservicesrating.azurewebsites.net";

        private static readonly HttpClient _httpClient = new HttpClient();
        private ILoggerManager _logger;
        public IntegrationService(IConfiguration configuration, ILoggerManager logger)
        {
            _logger = logger;
            _configuration = configuration;
            RatingUrl = _configuration["Integration_Url:Rating:RatingUrl"];
            PartnerUrl = _configuration["Integration_Url:Partner:PartnerUrl"];
            UserUrl = _configuration["Integration_Url:User:UserUrl"];
            //UserUrl = "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com";
            DispatcherUrl = _configuration["Integration_Url:Dispatcher:DispatcherUrl"];
            PolicyUrl = _configuration["Integration_Url:Policy:PolicyUrl"];
        }



        public async Task<String> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            var result = await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            return result.Dbconnection;
        }
        public async Task<IEnumerable<AssignProductList>> GetAssignProductByPartnerId(string pID, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=" + pID;
            return await GetListApiInvoke<AssignProductList>(uri, apiContext);
        }

        public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            try
            {

            if (!string.IsNullOrEmpty(apiContext.Token))
            {
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    _httpClient.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
            }
            using (var response = await _httpClient.GetAsync(url))
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
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Product", MethodBase.GetCurrentMethod().Name, url, null, apiContext);

            }
            return new TResponse();
        }
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            try
            {

               if (!string.IsNullOrEmpty(apiContext.Token))
                {
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    _httpClient.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
                }
                using (var response = await _httpClient.GetAsync(url))
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


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Product", MethodBase.GetCurrentMethod().Name, url, null, apiContext);

                //throw;
            }
            return new List<TResponse>();
        }
        public async Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext)
        {

            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerSettings?customerid=" + apiContext.OrgId + "&type=" + TimeZone;//+"&envid="+apiContext.ServerType;

            return await GetApiInvoke<CustomerSettingsDTO>(uri, apiContext);

        }
        public async Task<MapperResponse> SaveDynamicMapper(MapperDTO MapperDTO, ApiContext apiContext)
        {
            var uri = DispatcherUrl + "/api/ObjectMapper/SaveDynamicMapper";
            return await PostApiInvoke<MapperDTO, MapperResponse>(uri, apiContext, MapperDTO); ;

        }
        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                if (!string.IsNullOrEmpty(apiContext.Token))
                {
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    _httpClient.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
                }

                HttpContent contentPost = null;
                if (request != null)
                {
                    _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    string postBody = JsonConvert.SerializeObject(request);
                    var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                    contentPost = content;
                }
                using (var response = await _httpClient.PostAsync(requestUri, contentPost))
                {
                    using (var content = response.Content)
                    {
                        return await content.ReadAsAsync<TResponse>();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Product", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);

                return new TResponse();
            }

        }

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                 HttpContent contentPost = null;
                if (!string.IsNullOrEmpty(apiContext.Token))
                {
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    _httpClient.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
                }
                if (request != null)
                {
                    _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    string postBody = JsonConvert.SerializeObject(request);
                    var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                    contentPost = content;
                }
                using (var response = await _httpClient.PostAsync(requestUri, contentPost))
                {
                    using (var content = response.Content)
                    {
                        return await content.ReadAsAsync<IEnumerable<TResponse>>();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Policy", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);

                return new List<TResponse>();
            }

        }

        //public async Task<BillingEventDataDTO> GetProductBillingDetailAsync(policy pDTO, ApiContext apiContext)
        //{
        //    var uri = productUrl + "/api/Product/GetProductBillingData";

        //    //return await PostApiInvoke<ProductDTO>(uri, apiContext);
        //    return await PostApiInvoke<PolicyBilingDataDTO,ProductBilingDataDTO>(uri, apiContext, pDTO);
        //}


        public async Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/GetHandleEventsMaster?lMasterlist=" + lMasterlist;

            return await GetListApiInvoke<MasDTO>(uri, apiContext);
        }

        public async Task<PolicyResponse> LeadPolicyAsync(LeadInfoDTO lead, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/LeadPolicy";

            return await PostApiInvoke<LeadInfoDTO, PolicyResponse>(uri, apiContext, lead);
        }
    }
}
