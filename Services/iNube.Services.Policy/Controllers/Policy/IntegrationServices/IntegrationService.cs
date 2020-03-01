using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;
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
        Task<PremiumReturnDto> PremiumCalCulattion(PremiumRequestDTO dynamicData, ApiContext apiContext);
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
        //Task<IEnumerable<AccountMapDetailsDto>> GetAccountMapAsync(ApiContext apiContext);
        Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext);

        Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext);
        Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(string productId, ApiContext apiContext);
        Task<ProductDTO> GetProductDetailByCodeAsync(string producCode, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);
        Task<ResponseStatus> SendMultiCoverNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext);
        Task<LeadInfoDTO> GetLeadInfo(int customerid, ApiContext apiContext);
        Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext);
        Task<Dictionary<string, string>> DoTransactionByPayment(decimal policyId,decimal money,string mobileNumber,ApiContext apiContext);
        Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(ApiContext apiContext);
        Task<MasterCDDTO> CreateMasterCD(MasterCDDTO masterCDDTO, ApiContext apiContext);
        Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string PolicNo, ApiContext apiContext);
        Task<object> CalCulateRatingPremium(DynamicData dynamicData, ApiContext apiContext);
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
            //UserUrl = "http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9009";
            AccountingUrl = _configuration["Integration_Url:Accounting:AccountingUrl"];
            RuleEngineUrl = _configuration["Integration_Url:RuleEngine:RuleEngineUrl"];
            ExtensionUrl = _configuration["Integration_Url:Extension:ExtensionUrl"];
            RatingUrl = _configuration["Integration_Url:Rating:RatingUrl"];

        }


  //      //Acccounting Module
  //      //public async Task<IEnumerable<AccountMapDetailsDto>> GetAccountMapAsync(ApiContext apiContext)
  //      //{
  //      //    var uri = accountApiUrl;
  //      //    var accountMapList = await GetListApiInvoke<AccountMapDetailsDto>(uri, apiContext);
  //      //    return accountMapList;
  //      //}
        public async Task<IEnumerable<TransactionRuleMappingDto>> GetAccountMapDetailsAsync(ApiContext apiContext)
        {
            var uri = AccountingUrl+"/api/AccountConfig/GetTransactionConditionDetails";
            var accountMapListDetails = await GetListApiInvoke<TransactionRuleMappingDto>(uri, apiContext);
            return accountMapListDetails;
        }
        //Accounting CreateTransaction
        public async Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction ,ApiContext apiContext)
        {
            var uri = AccountingUrl + "/api/AccountConfig/CreateTransaction";
            return await PostApiInvoke<TransactionHeaderDto, TransactionsResponse>(uri, apiContext, transaction);
        }

        //Calculation Premium for Rating

        public async Task<PremiumReturnDto> PremiumCalCulattion(PremiumRequestDTO dynamicData, ApiContext apiContext)

        {

            var uri = "http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/CalCulatePremium";

            return await PostApiInvoke<PremiumRequestDTO, PremiumReturnDto>(uri, apiContext, dynamicData);

        }


        //Calculation Premium for Rating
        public async Task<object> CalCulateRatingPremium(DynamicData dynamicData, ApiContext apiContext)
        {
            var uri = RatingUrl+ "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/37";
            return await PostApiInvoke<DynamicData, object>(uri, apiContext, dynamicData);
        }


        /// <summary>
        /// ///////////////////////////
        /// </summary>
        /// <param name="transaction"></param>
        /// <param name="apiContext"></param>
        /// <returns></returns>

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
        }

        public async Task<IEnumerable<CdTransactionsResponse>> ReverseCdAsync(PolicyCancelTransaction transaction,ApiContext apiContext)

        {

            var uri = PartnerUrl + "/api/Accounts/ReverseCDTransaction";

            return await PostListApiInvoke<PolicyCancelTransaction, CdTransactionsResponse>(uri,apiContext, transaction);

        }

        public async Task<MasterCDDTO> CreateMasterCD(MasterCDDTO masterCDDTO, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Accounts/MasterPolicyCD";

            return await PostApiInvoke<MasterCDDTO, MasterCDDTO>(uri, apiContext, masterCDDTO);

        }



        public async Task<IEnumerable<ddDTOs>> GetProductMasterAsync(ApiContext apiContext)
        {
             var uri = ProductUrl + "/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            //var uri ="https://localhost:44347/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            var productList = await GetListApiInvoke<ddDTOs>(uri, apiContext);
            return productList;
        }

        public async Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Partner/GetPartnerDetailsData";
            var data=await GetListApiInvoke<PartnerDetailsDTO>(uri, apiContext);
            return data;
            
        }

        public async Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO,ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/SearchProduct";

            return await PostListApiInvoke<ProductSearchDTO, ProductDTO>(uri,apiContext, productSearchDTO);
        }


        public async Task<PartnersDTO> GetPartnerDetailAsync(string partnerId, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Partner/GetPartnerDetails?partnerId="+ partnerId;
            return await GetApiInvoke<PartnersDTO>(uri,apiContext);
        }

        //for Customer
        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext)
        {
            var uri = BillingUrl + "/api/Billing/GetCustomerById?Customerid="+ Customerid;
           
            return await GetApiInvoke<CustomersDTO>(uri, apiContext);
        }
        public async Task<ProductDTO> GetProductDetailAsync(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductById?productId="+productId;
            return await GetApiInvoke<ProductDTO>(uri,apiContext);
        }

        public async Task<LeadInfoDTO> GetLeadInfo(int customerid, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetLeadInfo?LeadID=" + customerid;
            return await GetApiInvoke<LeadInfoDTO>(uri, apiContext);
        }
        public async Task<ProductDTO> GetProductDetailByCodeAsync(string productCode, ApiContext apiContext)
            {
            var uri = ProductUrl + "/api/Product/GetProductByCode?productCode=" + productCode;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }
        public async Task<IEnumerable<ProductRcbdetailsDTO>> GetRiskPolicyDetailAsync(string productId,ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductRiskDetails?ProductId="+productId;
            return await GetListApiInvoke<ProductRcbdetailsDTO>(uri,apiContext);
           
        }
        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetInsurableRiskDetails?ProductId=" + productId;
            return await GetApiInvoke<ProductRiskDetailsDTO>(uri, apiContext);

        }
        public async Task<CdTransactionsDTO> GetcddataAsync(int Txnid, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GetCDTransactionById?txnId=" + Txnid;
            return await GetApiInvoke<CdTransactionsDTO>(uri,apiContext);
        }
        public async Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string PolicNo, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GetCDTransactionById?txnId=" + PolicNo;
            return await GetApiInvoke<CdTransactionsDTO>(uri, apiContext);
        }


        public async Task<Dictionary<string,string>> DoTransactionByPayment(decimal policyId,decimal Amount, string mobileNumber, ApiContext apiContext)
        {
            var uri = BillingUrl + "/api/DMS/PaytmPayment?policyId=" + policyId + "&Amount=" + Amount + "&mobileNumber=" + mobileNumber;
            return await GetApiInvoke<Dictionary<string,string>>(uri, apiContext);
        }


        public async Task<CdTransactionsResponse> DoTransaction(PolicyBookingTransaction  policyBookingTransaction,ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GenerateCDTransaction";
           // var uri = "https://localhost:44315/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<PolicyBookingTransaction, CdTransactionsResponse>(uri,apiContext, policyBookingTransaction);
        }
        public async Task<CdTransactionsResponse> RefundTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/ReverseCDTransaction";
            // var uri = "https://localhost:44315/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<PolicyBookingTransaction, CdTransactionsResponse>(uri,apiContext,policyBookingTransaction);
        }
        public async Task<ResponseStatus> SendNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendMultiCoverNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri,apiContext, notificationRequest);
        }

        public async Task<ResponseStatus> SendMultiCoverNotificationAsync(NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendMultiCoverNotificationAsync";
            return await PostApiInvoke<NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }
        public async Task<ResponseStatus> GeneratePDF(string productId)
        {
            //var uri = ProductUrl + "/api/Product/GetProductById?productId=" + productId;
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
        //    var uri = ProductUrl + "/api/Product/GetProductBillingData";

        //    //return await PostApiInvoke<ProductDTO>(uri, apiContext);
        //    return await PostApiInvoke<PolicyBilingDataDTO,ProductBilingDataDTO>(uri, apiContext, pDTO);
        //}

    }
}
