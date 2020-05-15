using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static iNube.Services.Policy.Models.ProposalModel;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;

namespace iNube.Services.Policy.Controllers.Proposal.IntegrationService
{
  

        public interface IPOIntegrationService
        {
            Task<IEnumerable<LifeQqDTO>> fetchLifeQqDataAsync();
            Task<IEnumerable<LeadDTO>> FetchTblContactsdataAsync();
        Task<IEnumerable<EmpHierarchy>> GetEmpHierarchyAsync(string Empcode, ApiContext apiContext);

    }

        public class POIntegrationService : IPOIntegrationService
        {
            readonly string lifeQqUrl = "https://localhost:44347/api/Lead/GetLifeQqData";

            public async Task<IEnumerable<LifeQqDTO>> fetchLifeQqDataAsync()
            {
                var uri = lifeQqUrl;
                var lifeQqdata = await GetListApiInvoke<LifeQqDTO>(uri);
                return lifeQqdata;
            }

            public async Task<IEnumerable<LeadDTO>> FetchTblContactsdataAsync()
            {
                var uri = "https://localhost:44347/api/Lead/GettblConatctsData";
                var tblContactsData = await GetListApiInvoke<LeadDTO>(uri);
                return tblContactsData;
            }

        public async Task<IEnumerable<EmpHierarchy>> GetEmpHierarchyAsync(string Empcode, ApiContext apiContext)
        {
            var uri = "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Organization/GetEmpHierarchy?Empcode=" + Empcode;
            var empDetails = await GetListApiInvoke<EmpHierarchy>(uri, apiContext);
            return empDetails;
        }
        public async Task<TResponse> GetApiInvoke<TResponse>(string url) where TResponse : new()
            {
                HttpClient client = new HttpClient();
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

            private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, TRequest request) where TRequest : new() where TResponse : new()
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
                            return await content.ReadAsAsync<TResponse>();
                        }
                    }
                }
                catch (Exception ex)
                {

                    return new TResponse();
                }

            }
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            HttpClient client = new HttpClient();

            if (!string.IsNullOrEmpty(apiContext.Token))
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
            }
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


    }
}

