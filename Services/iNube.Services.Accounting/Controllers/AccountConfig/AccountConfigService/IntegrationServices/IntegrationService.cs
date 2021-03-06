﻿using iNube.Services.Accounting.Models;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace iNube.Services.Accounting.Controllers.AccountConfig.IntegrationServices
{
    public interface IIntegrationService
    {
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {


        private IConfiguration _configuration;
        readonly string PolicyUrl, BillingUrl, ClaimUrl, NotificationUrl, PartnerUrl, ProductUrl, UserUrl, AccountingUrl, RuleEngineUrl,ExtensionUrl;
        private ILoggerManager _logger;
        private static readonly HttpClient _httpClient = new HttpClient();
        public IntegrationService(IConfiguration configuration, ILoggerManager logger)
        {
            _logger = logger;
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

        }
        
        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<TResponse> GetApiInvoke<TResponse>(string url,ApiContext apiContext) where TResponse : new()
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
                _logger.LogError(ex, "Accounting", MethodBase.GetCurrentMethod().Name, url, null, apiContext);
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
                _logger.LogError(ex, "Accounting", MethodBase.GetCurrentMethod().Name, url, null, apiContext);
            }
            return new List<TResponse>();
        }
        public async Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext)
        {

            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerSettings?customerid=" + apiContext.OrgId + "&type=" + TimeZone;//+"&envid="+apiContext.ServerType;

            return await GetApiInvoke<CustomerSettingsDTO>(uri, apiContext);

        }
        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri,ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
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
                _logger.LogError(ex, "Accounting", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);

                return new TResponse();
            }
           
        }

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri,ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
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
                _logger.LogError(ex, "Accounting", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);

                return new List<TResponse>();
            }

        }

        //public async Task<BillingEventDataDTO> GetProductBillingDetailAsync(policy pDTO, ApiContext apiContext)
        //{
        //    var uri = productUrl + "/api/Product/GetProductBillingData";
          
        //    //return await PostApiInvoke<ProductDTO>(uri, apiContext);
        //    return await PostApiInvoke<PolicyBilingDataDTO,ProductBilingDataDTO>(uri, apiContext, pDTO);
        //}

    }
}
