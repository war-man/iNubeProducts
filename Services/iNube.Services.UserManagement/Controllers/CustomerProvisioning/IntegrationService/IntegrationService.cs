using iNube.Services.UserManagement.Models;
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

namespace iNube.Services.UserManagement.Controllers.CustomerProvisioning.IntegrationService
{
    public interface IIntegrationService
    {
        Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetReportNameForPermissionsDetails(string Url, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetGraphNameForPermissionsDetails(string Url, ApiContext apiContext);
        Task<EmployeeRoles> GetEmployeeRoles(string empCode, ApiContext apiContext);
        Task<ResponseStatus> SendEmailAsync(EmailRequest EmailRequest, ApiContext apiContext);
    }



    public class IntegrationService : IIntegrationService
    {
        private IConfiguration _configuration;
        readonly string PolicyUrl, BillingUrl, ClaimUrl, NotificationUrl, PartnerUrl, ProductUrl, UserUrl, AccountingUrl, RuleEngineUrl, DMSUrl, RatingUrl, ExtensionUrl, PartnerDevUrl;

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

        }

        //      //readonly string BillingConfigUrl = "https://localhost:44362";
        //      readonly string BillingConfigUrl = "https://inubeservicesbilling.azurewebsites.net";
        ////readonly string BillingConfigUrl = "http://mica-inube-billing-service.mica-internal.:9001";

        public async Task<ResponseStatus> SendEmailAsync(EmailRequest EmailRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendEmailAsync";
            //var uri = "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Notifications/SendEmailAsync";
            return await PostApiInvoke<EmailRequest, ResponseStatus>(uri, apiContext, EmailRequest);
        }

        public async Task<CustomersDTO> GetCustProvisioningDetailsAsync(decimal customerId, ApiContext apiContext)
        {
            //var uri = BillingUrl + "/api/Billing/GetCustProvisioningDetailsAsync?customerId=" + customerId;
            var uri = "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Billing/GetCustProvisioningDetailsAsync?customerId=" + customerId;
            return await GetApiInvoke<CustomersDTO>(uri, apiContext);
        }

        public async Task<EmployeeRoles> GetEmployeeRoles(string empCode, ApiContext apiContext)
        {
            //var uri = PartnerUrl + "/api/Organization/GetEmployeeRoles?empCode=" + empCode;
            var uri = "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Organization/GetEmployeeRoles?empCode=" + empCode;
            return await GetApiInvoke<EmployeeRoles>(uri, apiContext);
        }

        public async Task<IEnumerable<ddDTO>> GetReportNameForPermissionsDetails(string Url, ApiContext apiContext)
        {
            var uri = Url;
            //var uri = "https://localhost:44351/api/Report/GetReportNameForPermissions";
            return await GetListApiInvoke<ddDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<ddDTO>> GetGraphNameForPermissionsDetails(string Url, ApiContext apiContext)
        {
            var uri = Url;
            //var uri = "https://localhost:44351/api/Report/GetReportNameForPermissions";
            return await GetListApiInvoke<ddDTO>(uri, apiContext);
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