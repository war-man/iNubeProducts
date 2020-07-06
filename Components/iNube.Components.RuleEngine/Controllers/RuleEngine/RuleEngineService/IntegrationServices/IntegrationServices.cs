using iNube.Components.RuleEngine.Models;
using iNube.Utility.Framework.LogPrivider.LogService;
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

namespace iNube.Components.RuleEngine.Controllers.RuleEngine.RuleEngineService.IntegrationServices
{
    public interface IIntegrationService
    {
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        //Task<object> RatingCall(string id, dynamic data, ApiContext apiContext);
        Task<HandleExecEvent> HandleRate(int eventId, ApiContext apiContext);
        Task<ResponseStatus> CheckRateExecution(int RateId, dynamic Rate, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {

        //readonly string UsermanangementUrl = "https://localhost:44367";
        //readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
        //readonly string UsermanangementUrl = "http://elwei-publi-1sxquhk82c0h4-688030859.ap-south-1.elb.amazonaws.com:9009";

        private IConfiguration _configuration;
        readonly string UsermanangementUrl;
        readonly string Rating;
        private static readonly HttpClient _httpClient = new HttpClient();
        public IntegrationService(IConfiguration configuration)
        {
            _configuration = configuration;
            UsermanangementUrl = _configuration["Integration_Url:User:UserUrl"];
            Rating = _configuration["Integration_Url:Rating:RatingUrl"];
        }
        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            LoggerManager logger = new LoggerManager(_configuration);
            var uri = UsermanangementUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            var result = await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            logger.LogRequest("Rating", "Rating", result.Dbconnection, "Final Return in integration Call--DB Return", new ApiContext() { ProductType = product, ServerType = EnvId.ToString() });
            return result;
        }


        public async Task<HandleExecEvent> HandleRate(int eventId, ApiContext apiContext)
        {
            var uri = Rating + "/api/RatingConfig/GetHandleExecEvents?EventId=" + eventId;
            return await GetApiInvoke<HandleExecEvent>(uri, apiContext);
        }
        public async Task<ResponseStatus> CheckRateExecution(int RateId,dynamic Rate, ApiContext apiContext)
        {
            var uri = Rating + "/api/RatingConfig/CheckRuleSets/CheckRuleSets/" + RateId;
            return await PostApiInvoke<dynamic,ResponseStatus>(uri, apiContext,Rate);
        }
    public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            LoggerManager logger = new LoggerManager(_configuration);

            logger.LogRequest("Rating", "Rating", url, "GetApiInvoke---First--Url", new ApiContext() { ProductType = "Mica", ServerType = "297" });

            // HttpClient client = new HttpClient();
            if (!string.IsNullOrEmpty(apiContext.Token))
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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
            return new TResponse();
        }
        public async Task<TResponse> GetApiInvokeSync<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            //HttpClient client = new HttpClient();
            if (!string.IsNullOrEmpty(apiContext.Token))
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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
            return new TResponse();
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

        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
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
    }
}
