using iNube.Services.Claims.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices
{
    public interface IIntegrationService
    {
        //Task<PartnersDTO> GetPartnerDetailAsync(string partnerId);
        //Task<ProductDTO> GetProductDetailAsync(string productId);
        Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext);
        Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext);
        Task<IEnumerable<ProductRcbdetailsDTO>> GetProductClaimsDetailsAsync(string productId, ApiContext apiContext);
        Task<PolicyDTO> GetPolicyByNumber(string policyNo, ApiContext apiContext);
        Task<ClaimDTO> CreatePostCallAsync(string requestUri, FileRequest request, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext);
        Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext);
        Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO claimDashBoard, ApiContext apiContext);
        Task<BillingEventResponseDTO> PolicyData(BillingEventRequest pDTO, ApiContext apiContext);
        Task<IEnumerable<PolicyDataForClaims>> GetPolicyForClaimsInvoice(BillingEventRequest EventRequet, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<String> GetEnvironmentConnectionforDoc(string product, decimal EnvId);
        Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext);
        // Task<IEnumerable<PolicyDTO>> GetPolicyNoByPolicyIds(decimal?[] policyId, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {

       // readonly string partnerUrl = "https://inubeservicespartners.azurewebsites.net";
        //readonly string partnerUrl = "https://localhost:44315";
		readonly string partnerUrl = "http://dev2-mica-partner.aws.vpc.:9005";

        //readonly string policyUrl = "https://inubeservicespolicy.azurewebsites.net";
       // readonly string policyUrl = "https://localhost:44351";
	   readonly string policyUrl = "http://dev2-mica-policy.aws.vpc.:9006";

       // readonly string productUrl = "https://inubeservicesproductconfiguration.azurewebsites.net";
        //readonly string productUrl = "https://localhost:44347";
		readonly string productUrl = "http://dev2-mica-product.aws.vpc.:9007";

       // readonly string UsermanangementUrl = "https://localhost:44367";
          //readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
		  readonly string UsermanangementUrl = "http://dev2-mica-user.aws.vpc.:9009";

        public async Task<PartnersDTO> GetPartnerDetailAsync(string partnerId)
        {
            var uri = partnerUrl + "/api/Partner/GetPartnerDetails?partnerId=" + partnerId;
            return await GetApiInvoke<PartnersDTO>(uri);
        }

        private Task<T> GetApiInvoke<T>(string uri)
        {
            throw new NotImplementedException();
        }

        //public async Task<ProductDTO> GetProductDetailAsync(string productId)
        //{
        //    var uri = productUrl + "/api/Product/GetProductById?productId="+productId;
        //    return await GetApiInvoke<ProductDTO>(uri);
        //}

        public async Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetMasterData?sMasterlist=" + sMasterList;
            return await GetListApiInvoke<ddDTOs>(uri, apiContext);
        }

        public async Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductById?productId=" + ProductId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }

        public async Task<ProductDTO> GetProductNameAsync(decimal productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductById?productId=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UsermanangementUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            var result= await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            return result;
        }
        public async Task<String> GetEnvironmentConnectionforDoc(string product, decimal EnvId)
        {
            var uri = UsermanangementUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            var result= await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            return result.Dbconnection;
        }

        //public async Task<IEnumerable<PolicyDTO>> GetPolicyNoByPolicyIds(decimal?[] policyId)
        //{
        //    var uri = policyUrl + "/api/Policy/GetPolicyNoByPolicyIds?policyId=" + policyId;
        //    return await PostListApiInvoke<decimal?[], PolicyDTO>(uri,policyId);
        //}

        public async Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch,ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/PolicySearch";
            return await PostListApiInvoke<PolicysearchDTO, PolicyDTO>(uri, apiContext, policysearch);
        }

        public async Task<PolicyDTO> ModifyPolicy(string policyNo, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/ModifyPolicy?policyNumber=" + policyNo;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetPolicyDetails";
            return await GetListApiInvoke<PolicyDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO claimDashBoard, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetPolicyByDetails";
            return await PostListApiInvoke<PolicySearchbyPidDTO, decimal>(uri, apiContext,claimDashBoard);
        }

        public async Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetPolicyById?policyId=" + policyId;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }
        public async Task<PolicyDTO> GetPolicyByNumber(string policyNo, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetPolicyByNumber?policyNumber=" + policyNo;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<ProductRcbdetailsDTO>> GetProductClaimsDetailsAsync(string productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductClaimsDetails?ProductId=" + productId;
            return await GetListApiInvoke<ProductRcbdetailsDTO>(uri, apiContext);
        }
        public async Task<ClaimDTO> CreatePostCallAsync(string requestUri, FileRequest request, ApiContext apiContext)
        {
            return await PostApiInvoke<FileRequest, ClaimDTO>(requestUri, request, apiContext);
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


        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, TRequest request, ApiContext apiContext) where TRequest : new() where TResponse : new()
        {
            try
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                HttpContent contentPost = null;
                if (request != null)
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //client.BaseAddress = new Uri(baseUrl);
                    //client.DefaultRequestHeaders.Accept.Clear();
                    // client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken.auth_token);
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


        public async Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/SearchProduct";

            return await PostListApiInvoke<ProductSearchDTO, ProductDTO>(uri, apiContext, productSearchDTO);
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
            catch (Exception ex)
            {

                return new List<TResponse>();
            }

        }

        public async Task<BillingEventResponseDTO> PolicyData(BillingEventRequest pDTO, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/BillingEventResponse";
            return await GetApiInvoke<BillingEventResponseDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<PolicyDataForClaims>> GetPolicyForClaimsInvoice(BillingEventRequest EventRequet, ApiContext apiContext)
        {
            var uri = policyUrl + "/api/Policy/GetPolicyForClaimsInvoice";
            return await PostListApiInvoke<BillingEventRequest, PolicyDataForClaims>(uri, apiContext, EventRequet);
        }
    }
}
