﻿using iNube.Services.Billing.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

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
        // readonly string productUrl = "https://inubeservicesproductconfiguration.azurewebsites.net";
        //readonly string productUrl = "https://localhost:44347";
        readonly string productUrl = "http://dev2-mica-product.aws.vpc.:9007";

        //readonly string claimUrl = "https://inubeservicesclaims.azurewebsites.net";
        //readonly string claimUrl = "https://localhost:44344";
		 readonly string claimUrl = "http://dev2-mica-claims.aws.vpc.:9002";

        //readonly string policyUrl = "https://inubeservicespolicy.azurewebsites.net";
        //readonly string policyUrl = "https://localhost:44351";
		 readonly string policyUrl = "http://dev2-mica-policy.aws.vpc.:9006";

      //  string notificationUrl = "https://inubeservicesnotification.azurewebsites.net";
        //string notificationUrl = "http://localhost:53000";
        readonly string notificationUrl = "http://dev2-mica-notification.aws.vpc.:9004";


        //readonly string partnerUrl = "https://inubeservicespartners.azurewebsites.net";
        //readonly string partnerUrl = "https://localhost:44315";
		readonly string partnerUrl = "http://dev2-mica-partner.aws.vpc.:9005";

        //readonly string UsermanangementUrl = "https://localhost:44367";
       // readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
		readonly string UsermanangementUrl = "http://dev2-mica-user.aws.vpc.:9009";

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UsermanangementUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<UserNameById> GetUserNameById(string Id, ApiContext apiContext)
        {
            var uri = UsermanangementUrl + "/api/UserProfile/GetUserNameById?Id="+ Id;
            var data =  await GetApiInvoke<UserNameById>(uri, apiContext);
            return data;
        }

        public async Task<IEnumerable<BilingEventDataDTO>> GetProductBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/BillingEventData";

            return await PostListApiInvoke<BillingEventRequest, BilingEventDataDTO>(uri, apiContext, EventRequest);
        }

        public async Task<BillingEventResponseDTO> GetProductItemizedDetailsAsync(BillingEventRequest EventRequest,ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/BillingEventResponse";

            return await PostApiInvoke<BillingEventRequest, BillingEventResponseDTO>(uri, apiContext, EventRequest);
        }

        public async Task<IEnumerable<BilingEventDataDTO>> GetPolicyBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/BillingEventData";

            return await PostListApiInvoke<BillingEventRequest, BilingEventDataDTO>(uri, apiContext, EventRequest);
        }

        public async Task<BillingEventResponseDTO> GetPolicyItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/BillingEventResponse";

            return await PostApiInvoke<BillingEventRequest, BillingEventResponseDTO>(uri, apiContext, EventRequest);
        }

        public async Task<IEnumerable<BilingEventDataDTO>> GetClaimBilingDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = claimUrl + "/api/ClaimManagement/BillingEventData";

            return await PostListApiInvoke<BillingEventRequest, BilingEventDataDTO>(uri, apiContext, EventRequest);
        }

        public async Task<BillingEventResponseDTO> GetClaimItemizedDetailsAsync(BillingEventRequest EventRequest, ApiContext apiContext)
        {
            var uri = claimUrl + "/api/ClaimManagement/BillingEventResponse";

            return await PostApiInvoke<BillingEventRequest, BillingEventResponseDTO>(uri, apiContext, EventRequest);
        }

        public async Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = notificationUrl + "/api/Notifications/SendTemplateNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }


        public async Task<OrganizationResponse> SaveCustomerAsync(OrganizationDTO EventRequest, ApiContext apiContext)
        {
            var uri = partnerUrl + "/api/Organization/CreateOrganizationAsync";
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