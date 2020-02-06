using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.Policy.IntegrationServices
{
    public interface IIntegrationService
    {
        Task<PartnersDTO> GetPartnerDetailAsync(string partnerId,ApiContext apiContext);
        Task<ProductDTO> GetProductDetailAsync(string productId, ApiContext apiContext);
        Task<IEnumerable<ProductRcbdetailsDTO>> GetRiskPolicyDetailAsync(string productId,ApiContext apiContext);
        Task<CdTransactionsResponse> DoTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext);
        Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext);
        Task<CdTransactionsResponse> RefundTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext);

        Task<CdTransactionsDTO> GetcddataAsync(int Txnid, ApiContext apiContext);
        Task<IEnumerable<CdTransactionsResponse>> ReverseCdAsync(PolicyCancelTransaction transaction, ApiContext apiContext);

        Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetProductMasterAsync(ApiContext apiContext);
        //  Task<ProductBilingDataDTO> GetProductBillingDetailAsync(PolicyBilingDataDTO pDTO, ApiContext apiContext);
        //Transaction Mapping
        Task<IEnumerable<AccountMapDetailsDto>> GetAccountMapAsync(ApiContext apiContext);
        Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext);
        Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(string productId, ApiContext apiContext);
        Task<ProductDTO> GetProductDetailByCodeAsync(string productId, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<ResponseStatus> SendMultiCoverNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext);
        Task<LeadInfoDTO> GetLeadInfo(int customerid, ApiContext apiContext);
        Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext);
    }
    public class IntegrationService : IIntegrationService
    {

        //readonly string partnerUrl = "https://inubeservicespartners.azurewebsites.net";
        //readonly string partnerUrl = "https://localhost:44315";
		readonly string partnerUrl = "http://dev2-mica-partner.aws.vpc.:9005";
        
       //readonly string productUrl = "https://inubeservicesproductconfiguration.azurewebsites.net";
       //readonly string productUrl = "https://localhost:44347";
	  readonly string productUrl = "http://dev2-mica-product.aws.vpc.:9007";
	   
      // readonly string notificationUrl = "https://inubeservicesnotification.azurewebsites.net";
       //readonly string notificationUrl = "http://localhost:53000";
	    readonly string notificationUrl = "http://dev2-mica-notification.aws.vpc.:9004";
	   
        //CHECKING FOR ACCOUNTING
       // readonly string accountApiUrl = "https://inubeservicesaccounting.azurewebsites.net/api/AccountConfig/GetTransactionMappingDetails";
        //readonly string accountApiUrl = "http://localhost:52166/api/AccountConfig/GetTransactionMappingDetails";
		readonly string accountApiUrl = "http://dev2-mica-accounnting.aws.vpc.:9011/api/AccountConfig/GetTransactionMappingDetails";

		
        //readonly string createTransactionApi = "https://inubeservicesaccounting.azurewebsites.net/api/AccountConfig/CreateTransaction";
        //readonly string createTransactionApi = "http://localhost:52166/api/AccountConfig/CreateTransaction";
		 readonly string createTransactionApi = "http://dev2-mica-accounting.aws.vpc.:9011/api/AccountConfig/CreateTransaction";
       

        //readonly string UsermanangementUrl = "https://localhost:44367";
        //readonly string UsermanangementUrl = "https://inubeservicesusermanagement.azurewebsites.net";
		readonly string UsermanangementUrl = "http://dev2-mica-user.aws.vpc.:9009";


        //readonly string billingUrl = "https://inubeservicesbilling.azurewebsites.net/";
        //readonly string billingUrl = "https://localhost:44362";
		readonly string billingUrl = "http://dev2-mica-billing.aws.vpc.:9001";

        //Acccounting Module
        public async Task<IEnumerable<AccountMapDetailsDto>> GetAccountMapAsync(ApiContext apiContext)
        {
            var uri = accountApiUrl;
            var accountMapList = await GetListApiInvoke<AccountMapDetailsDto>(uri, apiContext);
            return accountMapList;
        }
        //Accounting CreateTransaction
        public async Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction ,ApiContext apiContext)
        {
            var uri = createTransactionApi;
            return await PostApiInvoke<TransactionHeaderDto, TransactionsResponse>(uri, apiContext, transaction);
        }
        /// <summary>
        /// ///////////////////////////
        /// </summary>
        /// <param name="transaction"></param>
        /// <param name="apiContext"></param>
        /// <returns></returns>

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UsermanangementUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<IEnumerable<CdTransactionsResponse>> ReverseCdAsync(PolicyCancelTransaction transaction,ApiContext apiContext)

        {

            var uri = partnerUrl+"/api/Accounts/ReverseCDTransaction";

            return await PostListApiInvoke<PolicyCancelTransaction, CdTransactionsResponse>(uri,apiContext, transaction);

        }

        public async Task<IEnumerable<ddDTOs>> GetProductMasterAsync(ApiContext apiContext)
        {
             var uri = productUrl + "/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            //var uri ="https://localhost:44347/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            var productList = await GetListApiInvoke<ddDTOs>(uri, apiContext);
            return productList;
        }

        public async Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO,ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/SearchProduct";

            return await PostListApiInvoke<ProductSearchDTO, ProductDTO>(uri,apiContext, productSearchDTO);
        }


        public async Task<PartnersDTO> GetPartnerDetailAsync(string partnerId, ApiContext apiContext)
        {
            var uri = partnerUrl + "/api/Partner/GetPartnerDetails?partnerId="+ partnerId;
            return await GetApiInvoke<PartnersDTO>(uri,apiContext);
        }

        //for Customer
        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext)
        {
            var uri = billingUrl + "/api/Billing/GetCustomerById?Customerid="+ Customerid;
           
            return await GetApiInvoke<CustomersDTO>(uri, apiContext);
        }
        public async Task<ProductDTO> GetProductDetailAsync(string productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductById?productId="+productId;
            return await GetApiInvoke<ProductDTO>(uri,apiContext);
        }

        public async Task<LeadInfoDTO> GetLeadInfo(int customerid, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetLeadInfo?LeadID=" + customerid;
            return await GetApiInvoke<LeadInfoDTO>(uri, apiContext);
        }
        public async Task<ProductDTO> GetProductDetailByCodeAsync(string productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductByCode?productCode=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }
        public async Task<IEnumerable<ProductRcbdetailsDTO>> GetRiskPolicyDetailAsync(string productId,ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetProductRiskDetails?ProductId="+productId;
            return await GetListApiInvoke<ProductRcbdetailsDTO>(uri,apiContext);
           
        }
        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(string productId, ApiContext apiContext)
        {
            var uri = productUrl + "/api/Product/GetInsurableRiskDetails?ProductId=" + productId;
            return await GetApiInvoke<ProductRiskDetailsDTO>(uri, apiContext);

        }
        public async Task<CdTransactionsDTO> GetcddataAsync(int Txnid, ApiContext apiContext)
        {
            var uri = partnerUrl + "/api/Accounts/GetCDTransactionById?txnId=" + Txnid;
            return await GetApiInvoke<CdTransactionsDTO>(uri,apiContext);
        }



        public async Task<CdTransactionsResponse> DoTransaction(PolicyBookingTransaction  policyBookingTransaction,ApiContext apiContext)
        {
            var uri = partnerUrl + "/api/Accounts/GenerateCDTransaction";
           // var uri = "https://localhost:44315/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<PolicyBookingTransaction, CdTransactionsResponse>(uri,apiContext, policyBookingTransaction);
        }
        public async Task<CdTransactionsResponse> RefundTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext)
        {
            var uri = partnerUrl + "/api/Accounts/ReverseCDTransaction";
            // var uri = "https://localhost:44315/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<PolicyBookingTransaction, CdTransactionsResponse>(uri,apiContext,policyBookingTransaction);
        }
        public async Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = notificationUrl + "/api/Notifications/SendMultiCoverNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri,apiContext, notificationRequest);
        }

        public async Task<ResponseStatus> SendMultiCoverNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = notificationUrl + "/api/Notifications/SendMultiCoverNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }
        public async Task<ResponseStatus> GeneratePDF(string productId)
        {
            //var uri = productUrl + "/api/Product/GetProductById?productId=" + productId;
            //return await GetApiInvoke<ProductDTO>(uri);
            return null;
        }
        public async Task<TResponse> GetApiInvoke<TResponse>(string url,ApiContext apiContext) where TResponse : new()
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
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url , ApiContext apiContext) where TResponse : new()
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

        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri,ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
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

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri,ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
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

        //public async Task<BillingEventDataDTO> GetProductBillingDetailAsync(policy pDTO, ApiContext apiContext)
        //{
        //    var uri = productUrl + "/api/Product/GetProductBillingData";
          
        //    //return await PostApiInvoke<ProductDTO>(uri, apiContext);
        //    return await PostApiInvoke<PolicyBilingDataDTO,ProductBilingDataDTO>(uri, apiContext, pDTO);
        //}

    }
}
