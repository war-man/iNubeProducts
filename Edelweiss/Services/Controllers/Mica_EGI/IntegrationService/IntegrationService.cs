using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using iNube.Services.MicaExtension_EGI.Models;

namespace iNube.Services.Controllers.EGI.IntegrationServices
{
    public interface IIntegrationService
    {

        Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData);
        Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext);

        //Scheduler Module AR
        Task<dynamic> GenerateCDTransaction(CDDTO cdModel, ApiContext apiContext);
        Task<List<PolicyDetailsDTO>> GetPolicyList(string productCode, ApiContext apiContext);
        Task<dynamic> CalculatePremium(SchedulerPremiumDTO premiumDTO, ApiContext apiContext);
        Task<dynamic> GetPolicyDetails(string PolicyNo, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {
        readonly string productUrl = "https://inubeservicesproductconfiguration.azurewebsites.net";
       //readonly string productUrl = "https://localhost:44347";
		//readonly string productUrl = "http://mica-inube-product-service.mica-internal.:9007";
        
		readonly string claimUrl = "https://inubeservicesclaims.azurewebsites.net";
        //readonly string claimUrl = "https://localhost:44344";
		// readonly string claimUrl = "http://mica-inube-claim-service.mica-internal.:9002";

        readonly string policyUrl = "https://inubeservicespolicy.azurewebsites.net";
       // readonly string policyUrl = "https://localhost:44351";
		// readonly string policyUrl = "http://mica-inube-policy-service.mica-internal.:9006";

        string notificationUrl = "https://inubeservicesnotification.azurewebsites.net";
        //string notificationUrl = "http://localhost:53000";
		//readonly string notificationUrl = "http://mica-inube-notification-service.mica-internal.:9004";
		

        readonly string partnerUrl = "https://inubeservicespartners.azurewebsites.net";
        //readonly string partnerUrl = "https://localhost:44315";
		//readonly string partnerUrl = "http://mica-inube-partner-service.mica-internal.:9005";

        //readonly string UsermanangementUrl = "https://localhost:44367";
        //readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
        //readonly string UsermanangementUrl = "http://mica-inube-user-service.mica-internal.:9009";

        //readonly string rating = "http://localhost:58593";
        readonly string rating = "http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/swagger/index.html";


        public async Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/CreatePolicy";
            return await PostApiInvoke<dynamic, PolicyResponse>(uri, apiContext, policyDetail);
        }

        public async Task<List<PolicyDetailsDTO>> GetPolicyList(string productCode, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetAllPolicy?ProductCode=" + productCode;
            return await GetApiInvoke<List<PolicyDetailsDTO>>(uri, apiContext);
        }

        public async Task<dynamic> GenerateCDTransaction(CDDTO cdModel, ApiContext apiContext)
        {
            var uri = partnerUrl + "/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<CDDTO, dynamic>(uri, apiContext, cdModel);
        }

        public async Task<dynamic> CalculatePremium(SchedulerPremiumDTO premiumDTO, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/CalCulatePremium";

            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, premiumDTO);
        }

        public async Task<dynamic> GetPolicyDetails(string PolicyNo, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetPolicyDetailsByNumber?policyNumber" + PolicyNo;
            return await GetApiInvoke<dynamic>(uri, apiContext);
        }



        ApiContext context = new ApiContext();

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
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            try
            {


                HttpClient client = new HttpClient();
                //  client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //client.BaseAddress = new Uri(url);
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


            }
            catch (Exception ex)
            {

                //throw;
            }
            return new List<TResponse>();
        }

        //Calculation Premium for Rating
        public async Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData)
        {
            //context apicontext = new context();
            context.OrgId = 277;
            context.UserId = "a95d03cd-df18-4756-a577-3412b6817dd0";
            context.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg";
            context.ServerType = "1";
            context.IsAuthenticated = true;
            var uri = policyUrl + "/api/Policy/CalCulatePremium";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, context, dynamicData);
        }


    }
}
