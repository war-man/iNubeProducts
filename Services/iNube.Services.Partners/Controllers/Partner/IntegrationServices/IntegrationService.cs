using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
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
        Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal productId, ApiContext apiContext);
        Task<dynamic> GetRateParamsAsync(decimal rateId, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {
        //readonly string productUrl = "https://localhost:44347";
        readonly string productUrl = "https://inubeservicesproductconfiguration.azurewebsites.net";
		//readonly string productUrl = "http://mica-inube-product-service.mica-internal.:9007";

        readonly string userApiUrl = "https://inubeservicesusermgmt.azurewebsites.net";
        //readonly string userApiUrl = "https://localhost:44367";
		// readonly string userApiUrl = "http://mica-inube-user-service.mica-internal.:9009";

        //readonly string UsermanangementUrl = "https://localhost:44367";
        readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
        //readonly string UsermanangementUrl = "http://mica-inube-user-service.mica-internal.:9009";

        //Url For Accesing Transacttion Acces
        //readonly string accountApiUrl = "http://localhost:52166/api/AccountConfig/GetTransactionMappingDetails";
        readonly string accountRuleApiUrl = "https://inubeservicesaccounting.azurewebsites.net/api/AccountConfig/GetTransactionConditionDetails";


        readonly string createTransactionApi = "https://inubeservicesaccounting.azurewebsites.net/api/AccountConfig/CreateTransaction";
        //readonly string createTransactionApi = "http://localhost:52166/api/AccountConfig/CreateTransaction";
        // readonly string createTransactionApi = "http://mica-inube-accounting-service.mica-internal.:9011/api/AccountConfig/CreateTransaction";


        readonly string notificationUrl = "https://inubeservicesnotification.azurewebsites.net";
        //readonly string notificationUrl = "http://mica-inube-notification-service.mica-internal.:9004";

        readonly string ratingUrl = "https://inubeservicesrating.azurewebsites.net";
        //readonly string ratingUrl = "http://mica-inube-notification-service.mica-internal.:9004";

        public async Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext)
        {
            var uri = accountRuleApiUrl;
            var accountMapListDetails = await GetListApiInvoke<TransactionRuleMappingDto>(uri, apiContext);
            return accountMapListDetails;
        }
        //Accounting CreateTransaction
        public async Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext)
        {
            var uri = createTransactionApi;
            return await PostApiInvoke<TransactionHeaderDto, TransactionsResponse>(uri, apiContext, transaction);
        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UsermanangementUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductById?productId=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<ddDTO>> GetProductMasterAsync(ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            var productList = await GetListApiInvoke<ddDTO>(uri, apiContext);
            return productList;
        }

        public async Task<UserResponse> CreateUserAsync(UserDTO userDTO, ApiContext apiContext)
        {
            var uri = userApiUrl + "/api/UserProfile/CreateProfileUser";
            var productList = await PostApiInvoke<UserDTO, UserResponse>(uri, apiContext, userDTO);
            return productList;
        }

        public async Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = notificationUrl + "/api/Notifications/SendTemplateNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }
        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetInsurableRiskDetails?ProductId=" + productId;
            return await GetApiInvoke<ProductRiskDetailsDTO>(uri, apiContext);

        }
        public async Task<dynamic> GetRateParamsAsync(decimal rateId, ApiContext apiContext)
        {
            var uri = ratingUrl + "/api/RatingConfig/GetHandleEvents?EventId=" + rateId;
            return await GetApiInvoke<dynamic>(uri, apiContext);
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

        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            HttpClient client = new HttpClient();
            if (apiContext.Token != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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
    }
}
