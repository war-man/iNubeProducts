using iNube.Services.Billing.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace iNube.Services.Billing.Controllers.Billing.IntegrationServices
{
    public interface IIntegrationService
    {

        Task<IEnumerable<BilingEventDataDTO>> GetProductBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<IEnumerable<BilingEventDataDTO>> GetClaimBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<IEnumerable<BilingEventDataDTO>> GetPolicyBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext);
        Task<OrganizationResponse> SaveCustomerAsync(OrganizationDTO EventRequest, ApiContext apiContext);
        Task<BillingEventResponseDTO> GetProductItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<BillingEventResponseDTO> GetPolicyItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<BillingEventResponseDTO> GetClaimItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<UserNameById> GetUserNameById(string Id, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {
        private IConfiguration _configuration;
        readonly string PolicyUrl, BillingUrl, ClaimUrl, NotificationUrl, PartnerUrl, ProductUrl, UserUrl, AccountingUrl, RuleEngineUrl, DMSUrl, RatingUrl, ExtensionUrl;

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

        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<UserNameById> GetUserNameById(string Id, ApiContext apiContext)
        {
            var uri = UserUrl + "/api/UserProfile/GetUserNameById?Id="+ Id;
            var data =  await GetApiInvoke<UserNameById>(uri, apiContext);
            return data;
        }

        public async Task<IEnumerable<BilingEventDataDTO>> GetProductBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/BillingEventData";

            return await PostListApiInvoke<BillingEventRequest, BilingEventDataDTO>(uri, apiContext, EventRequest);
        }

        public async Task<BillingEventResponseDTO> GetProductItemizedDetailsAsync(BillingEventRequest EventRequest,ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/BillingEventResponse";

            return await PostApiInvoke<BillingEventRequest, BillingEventResponseDTO>(uri, apiContext, EventRequest);
        }

        public async Task<IEnumerable<BilingEventDataDTO>> GetPolicyBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/BillingEventData";

            return await PostListApiInvoke<BillingEventRequest, BilingEventDataDTO>(uri, apiContext, EventRequest);
        }

        public async Task<BillingEventResponseDTO> GetPolicyItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/BillingEventResponse";

            return await PostApiInvoke<BillingEventRequest, BillingEventResponseDTO>(uri, apiContext, EventRequest);
        }

        public async Task<IEnumerable<BilingEventDataDTO>> GetClaimBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = ClaimUrl + "/api/ClaimManagement/BillingEventData";

            return await PostListApiInvoke<BillingEventRequest, BilingEventDataDTO>(uri, apiContext, EventRequest);
        }

        public async Task<BillingEventResponseDTO> GetClaimItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = ClaimUrl + "/api/ClaimManagement/BillingEventResponse";

            return await PostApiInvoke<BillingEventRequest, BillingEventResponseDTO>(uri, apiContext, EventRequest);
        }

        public async Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendTemplateNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }


        public async Task<OrganizationResponse> SaveCustomerAsync(OrganizationDTO EventRequest, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Organization/CreateOrganizationAsync";
            return await PostApiInvoke<OrganizationDTO, OrganizationResponse>(uri, apiContext, EventRequest);
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
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url) where TResponse : new()
        {

            HttpClient client = new HttpClient();
            //  client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //client.BaseAddress = new Uri(url);
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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
            try
            {
                HttpClient client = new HttpClient();


                HttpContent contentPost = null;
                if (request != null)
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    if (!string.IsNullOrEmpty(apiContext.Token))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    }
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
                    // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    if (!string.IsNullOrEmpty(apiContext.Token))
                    {
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    }
                    string postBody = JsonConvert.SerializeObject(request);
                    //dynamic dynamicObject = JsonConvert.DeserializeObject(postBody);
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
