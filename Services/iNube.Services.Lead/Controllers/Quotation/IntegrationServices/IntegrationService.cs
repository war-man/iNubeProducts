using iNube.Services.Lead.Models;
using iNube.Services.Quotation.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace iNube.Services.Quotation.Controllers.Quotation.IntegrationServices
{
    public interface IIntegrationService
    {
        //Task<PartnersDTO> GetPartnerDetailAsync(string partnerId,ApiContext apiContext);

        Task<IEnumerable<LeadDTO>> GetProspectInfo(int ContactId);
        Task<LeadDTO> SaveProspect(LeadDTO leadDTO);
        Task<ResponseStatus> SendNotificationAsync(Lead.Models.NotificationRequest notificationRequest, ApiContext apiContext);
        Task<AVOProductDTO> GetAVOProduct(int productid);
        Task<LifeQuoteDTO> GetQuotePremium(LifeQuoteDTO objQuote);
    }
    public class IntegrationService : IIntegrationService
    {

        //readonly string partnerUrl = "https://inubeservicespartners.azurewebsites.net";

        //readonly string productUrl = "https://inubeservicesproductconfiguration.azurewebsites.net";
        //readonly string notificationUrl = "https://inubeservicesnotification.azurewebsites.net";

        string notificationUrl = "https://inubeservicesnotification.azurewebsites.net";


        public async Task<LifeQuoteDTO> GetQuotePremium(LifeQuoteDTO objQuote)
        {
            var uri = "https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/CalculateQuotePremium?AnnualMode=false";

            return await PostApiInvoke<LifeQuoteDTO, LifeQuoteDTO>(uri, objQuote);
        }

        public async Task<AVOProductDTO> GetAVOProduct(int productid)
        {
            var uri = "https://localhost:44347/api/Product/GetProducts?ProductId=" + productid;
            return await GetApiInvoke<AVOProductDTO>(uri);
        }

        public async Task<IEnumerable<LeadDTO>> GetProspectInfo(int ContactId)
        {
            var uri = "https://localhost:44347/api/Lead/LoadSuspectInformation?ContactID="+ContactId;
            return await GetListApiInvoke<LeadDTO>(uri);
            
        }

        public async Task<LeadDTO>  SaveProspect(LeadDTO leadDTO)
        {
            var uri = "https://localhost:44347/api/Lead/SaveSuspect";
            return await PostApiInvoke<LeadDTO,LeadDTO>(uri, leadDTO);


        }


        
        public async Task<ResponseStatus> SendNotificationAsync(Lead.Models.NotificationRequest notificationRequest, ApiContext apiContext)
        {
            //local-http://localhost:53000
            notificationUrl = "https://inubeservicesnotification.azurewebsites.net";
            var uri = notificationUrl + "/api/Notifications/SendTemplateNotificationAsync";
            return await PostApiInvoke<Lead.Models.NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
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
            try
            {


                HttpClient client = new HttpClient();
                //    //  client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                client.BaseAddress = new Uri(url);
            //    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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
            catch (Exception)
            {

                //throw;
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
            catch (Exception)
            {

                return new TResponse();
            }
           
        }

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri, TRequest request) where TRequest : new() where TResponse : new()
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
                        return await content.ReadAsAsync<IEnumerable<TResponse>>();
                    }
                }
            }
            catch (Exception)
            {

                return new List<TResponse>();
            }

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
            catch (Exception)
            {

                return new TResponse();
            }

        }


    }
}
