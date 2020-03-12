using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using iNube.Services.MicaExtension_EGI.Models;
using Microsoft.Extensions.Configuration;

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
        Task<dynamic> WrapperCalculateRatingPremium(SchedulerPremiumDTO dynamicData);

        //MICA Rating for CD Mapping
        Task<dynamic> RatingPremium(SchedulerPremiumDTO dynamicData, ApiContext apiContext);
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
            AccountingUrl = _configuration["Integration_Url:Accounting:AccountingUrl"];
            RuleEngineUrl = _configuration["Integration_Url:RuleEngine:RuleEngineUrl"];
            ExtensionUrl = _configuration["Integration_Url:Extension:ExtensionUrl"];
            RatingUrl = _configuration["Integration_Url:Rating:RatingUrl"];
        }        


        public async Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/CreatePolicy";
            return await PostApiInvoke<dynamic, PolicyResponse>(uri, apiContext, policyDetail);
        }

        public async Task<List<PolicyDetailsDTO>> GetPolicyList(string productCode, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetAllPolicy?ProductCode=" + productCode;
            return await GetApiInvoke<List<PolicyDetailsDTO>>(uri, apiContext);
        }

        public async Task<dynamic> GenerateCDTransaction(CDDTO cdModel, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<CDDTO, dynamic>(uri, apiContext, cdModel);
        }

        public async Task<dynamic> CalculatePremium(SchedulerPremiumDTO premiumDTO, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/CalCulatePremium";

            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, premiumDTO);
        }

        public async Task<dynamic> GetPolicyDetails(string PolicyNo, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyDetailsByNumber?policyNumber=" + PolicyNo;
            return await GetApiInvoke<dynamic>(uri, apiContext);
        }

        //Calculation Premium for Rating
        public async Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);
            var uri = PolicyUrl + "/api/Policy/CalCulatePremium";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }
        public async Task<dynamic> WrapperCalculateRatingPremium(SchedulerPremiumDTO dynamicData)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/41";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<dynamic> RatingPremium(SchedulerPremiumDTO dynamicData,ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/37";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
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

    }
}
