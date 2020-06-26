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
        Task<PartnersDTO> GetPartnerDetailAsync(string partnerId, ApiContext apiContext);
        Task<PartnersDTO> GetPartnerDetailByCodeAsync(string partnerId, ApiContext apiContext);
        Task<ProductDTO> GetProductDetailAsync(string productId, ApiContext apiContext);
        Task<IEnumerable<ProductRcbdetailsDTO>> GetRiskPolicyDetailAsync(string productId, ApiContext apiContext);
        Task<CdTransactionsResponse> DoTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext);
        Task<ResponseStatus> SendNotificationAsync(Models.NotificationRequest notificationRequest, ApiContext apiContext);
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
        Task<ResponseStatus> SendMultiCoverNotificationAsync(Models.NotificationRequest notificationRequest, ApiContext apiContext);
        Task<LeadInfoDTO> GetLeadInfo(int customerid, ApiContext apiContext);
        Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext);
        Task<Dictionary<string, string>> DoTransactionByPayment(decimal policyId, decimal money, string mobileNumber, ApiContext apiContext);
        Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(ApiContext apiContext);
        Task<MasterCDDTO> CreateMasterCD(MasterCDDTO masterCDDTO, ApiContext apiContext);
        Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string PolicNo, ApiContext apiContext);
        Task<object> CalCulateRatingPremium(DynamicData dynamicData, ApiContext apiContext);
        Task<dynamic> GetMappingParams(string mappingname, ApiContext apiContext);
        Task<MasterCDDTO> CreateMasterCDAccount(MicaCD cdTransactionsMaster, ApiContext apiContext);
     //   Task<TaxTypeDTO> TaxTypeForStateCode(string stateabbreviation, ApiContext apiContext);
        Task<List<MicaCDDTO>> CDMapper(dynamic PolicyRequest, string type, ApiContext apiContext);
        Task<List<MicaCDDTO>> CDMapperList(dynamic PolicyRequest, string type, ApiContext apiContext);
        Task<dynamic> RuleMapper(dynamic InputRequest, string type, ApiContext apiContext);
        Task<MasterCDDTO> CDAccountCreation(string accountnumber, ApiContext apiContext);
        Task<ProductDTO> GetProductDetailByIdAsync(string productId, ApiContext apiContext);
        Task<DailyDTO> GetDailyTransaction(string accountnumber,int month, int year,string TxnEventType, ApiContext apiContext);
        Task<CDBalanceDTO> GetCDAccountDetails(string accountnumber, string type, ApiContext apiContext);
        Task<PolicyCancelResponse> GetRefundDetails(PolicyCancelRequest policyCancelRequest, ApiContext apiContext);
        Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext);
        Task<PolicyStatusResponseDTO> PolicyStatusUpdate(PolicyStatusDTO policyStatusDTO, ApiContext apiContext);
        Task<ResponseStatus> VehicleStatusUpdate(VehicleStatusDTO VehicleStatusDTO, ApiContext apiContext);
        Task<PolicyAgreementResponse> ValidateAssignProduct(string partnerCode, int productId, ApiContext apiContext);
        Task<PolicyExceptionDTO> GetPolicyExceptionDetails(dynamic SourceRequest, ApiContext apiContext);
        //GetMappingParams(string mappingname, ApiContext apiContext)


        Task<ResponseStatus> SendSMSAsync(Models.SMSRequest SmsRequest, ApiContext apiContext);
        Task<ResponseStatus> SendEmailAsync(EmailRequest EmailRequest, ApiContext apiContext);
        //Adjustment Amount
        Task<IEnumerable<CustomerSettingsDTO>> GetAdjustmentCustomerSettings(string Type, ApiContext apiContext);
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

        public async Task<ResponseStatus> SendSMSAsync(Models.SMSRequest SmsRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendSMSAsync";
            return await PostApiInvoke<Models.SMSRequest, ResponseStatus>(uri, apiContext, SmsRequest);
        }

        public async Task<ResponseStatus> SendEmailAsync(EmailRequest EmailRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendEmailAsync";
            return await PostApiInvoke<Models.EmailRequest, ResponseStatus>(uri, apiContext, EmailRequest);
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
            var uri = AccountingUrl + "/api/AccountConfig/GetTransactionConditionDetails";
            var accountMapListDetails = await GetListApiInvoke<TransactionRuleMappingDto>(uri, apiContext);
            return accountMapListDetails;
        }
        //Accounting CreateTransaction
        public async Task<TransactionsResponse> CreateTranasactionAsync(TransactionHeaderDto transaction, ApiContext apiContext)
        {
            var uri = AccountingUrl + "/api/AccountConfig/CreateTransaction";
            return await PostApiInvoke<TransactionHeaderDto, TransactionsResponse>(uri, apiContext, transaction);
        }

        //Calculation Premium for Rating

        public async Task<PremiumReturnDto> PremiumCalCulattion(PremiumRequestDTO dynamicData, ApiContext apiContext)

        {

            var uri = ExtensionUrl + "/api/Mica_EGI/CalCulatePremium";

            return await PostApiInvoke<PremiumRequestDTO, PremiumReturnDto>(uri, apiContext, dynamicData);

        }


        //Calculation Premium for Rating
        public async Task<object> CalCulateRatingPremium(DynamicData dynamicData, ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/37";
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

        public async Task<IEnumerable<CdTransactionsResponse>> ReverseCdAsync(PolicyCancelTransaction transaction, ApiContext apiContext)

        {

            var uri = PartnerUrl + "/api/Accounts/ReverseCDTransaction";

            return await PostListApiInvoke<PolicyCancelTransaction, CdTransactionsResponse>(uri, apiContext, transaction);

        }

        public async Task<MasterCDDTO> CreateMasterCD(MasterCDDTO masterCDDTO, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Accounts/MasterPolicyCD";

            return await PostApiInvoke<MasterCDDTO, MasterCDDTO>(uri, apiContext, masterCDDTO);

        }



        public async Task<IEnumerable<ddDTOs>> GetProductMasterAsync(ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetMasterData?sMasterlist=Product&isFilter=false";
            var productList = await GetListApiInvoke<ddDTOs>(uri, apiContext);
            return productList;
        }

        public async Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Partner/GetPartnerDetailsData";
            var data = await GetListApiInvoke<PartnerDetailsDTO>(uri, apiContext);
            return data;

        }

        public async Task<IEnumerable<ProductDTO>> GetProductIdAsync(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/SearchProduct";

            return await PostListApiInvoke<ProductSearchDTO, ProductDTO>(uri, apiContext, productSearchDTO);
        }


        public async Task<PartnersDTO> GetPartnerDetailAsync(string partnerId, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Partner/GetPartnerDetails?partnerId=" + partnerId;
            return await GetApiInvoke<PartnersDTO>(uri, apiContext);
        }
          public async Task<PartnersDTO> GetPartnerDetailByCodeAsync(string partnerCode, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Partner/GetPartnerDetailsByPartnerCode?partnerCode=" + partnerCode;
            return await GetApiInvoke<PartnersDTO>(uri, apiContext);
        }

        //for Customer
        public async Task<CustomersDTO> GetCustomerById(decimal Customerid, ApiContext apiContext)
        {
            var uri = BillingUrl + "/api/Billing/GetCustomerById?Customerid=" + Customerid;

            return await GetApiInvoke<CustomersDTO>(uri, apiContext);
        }
        public async Task<ProductDTO> GetProductDetailAsync(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductById?productId=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
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
        public async Task<ProductDTO> GetProductDetailByIdAsync(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductById?productId=" + productId;
            return await GetApiInvoke<ProductDTO>(uri, apiContext);
        }
        public async Task<IEnumerable<ProductRcbdetailsDTO>> GetRiskPolicyDetailAsync(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetProductRiskDetails?ProductId=" + productId;
            return await GetListApiInvoke<ProductRcbdetailsDTO>(uri, apiContext);

        }
        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(string productId, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetInsurableRiskDetails?ProductId=" + productId;
            return await GetApiInvoke<ProductRiskDetailsDTO>(uri, apiContext);

        }
        public async Task<CdTransactionsDTO> GetcddataAsync(int Txnid, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GetCDTransactionById?txnId=" + Txnid;
            return await GetApiInvoke<CdTransactionsDTO>(uri, apiContext);
        }
        public async Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string PolicNo, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GetCDTransactionById?txnId=" + PolicNo;
            return await GetApiInvoke<CdTransactionsDTO>(uri, apiContext);
        }


        public async Task<Dictionary<string, string>> DoTransactionByPayment(decimal policyId, decimal Amount, string mobileNumber, ApiContext apiContext)
        {
            var uri = BillingUrl + "/api/DMS/PaytmPayment?policyId=" + policyId + "&Amount=" + Amount + "&mobileNumber=" + mobileNumber;
            return await GetApiInvoke<Dictionary<string, string>>(uri, apiContext);
        }


        public async Task<CdTransactionsResponse> DoTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GenerateCDTransaction";
            return await PostApiInvoke<PolicyBookingTransaction, CdTransactionsResponse>(uri, apiContext, policyBookingTransaction);
        }
        public async Task<CdTransactionsResponse> RefundTransaction(PolicyBookingTransaction policyBookingTransaction, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/ReverseCDTransaction";
            return await PostApiInvoke<PolicyBookingTransaction, CdTransactionsResponse>(uri, apiContext, policyBookingTransaction);
        }
        public async Task<ResponseStatus> SendNotificationAsync(Models.NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendMultiCoverNotificationAsync";
            return await PostApiInvoke<Models.NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }

        public async Task<ResponseStatus> SendMultiCoverNotificationAsync(Models.NotificationRequest notificationRequest, ApiContext apiContext)
        {
            var uri = NotificationUrl + "/api/Notifications/SendMultiCoverNotificationAsync";
            return await PostApiInvoke<Models.NotificationRequest, ResponseStatus>(uri, apiContext, notificationRequest);
        }
        public async Task<ResponseStatus> GeneratePDF(string productId)
        {
            //var uri = ProductUrl + "/api/Product/GetProductById?productId=" + productId;
            //return await GetApiInvoke<ProductDTO>(uri);
            return null;
        }


        //Getmappedparams

        public async Task<dynamic> GetMappingParams(string mappingname, ApiContext apiContext)
        {
            var uri = ProductUrl + "/api/Product/GetMappingParams?mappingname=" + mappingname;
            //api/Product/GetMappingParams?mappingname=

            return await GetApiInvoke<dynamic>(uri, apiContext);
        }
        public async Task<MasterCDDTO> CreateMasterCDAccount(MicaCD cdTransactionsMaster, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Accounts/MasterCDACC";

            return await PostApiInvoke<MicaCD, MasterCDDTO>(uri, apiContext, cdTransactionsMaster);

        }
        public async Task<PolicyCancelResponse> GetRefundDetails(PolicyCancelRequest policyCancelRequest, ApiContext apiContext)
        {

            var uri = ExtensionUrl + "/api/Mica_EGI/GetRefundDetails";

            return await PostApiInvoke<PolicyCancelRequest, PolicyCancelResponse>(uri, apiContext, policyCancelRequest);

        }
        //Get State Code
        //public async Task<TaxTypeDTO> TaxTypeForStateCode(string stateabbreviation, ApiContext apiContext)
        //{
        //    var uri = "http://elwei-publi-1sxquhk82c0h4-688030859.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/TaxTypeForStateCode?stateabbreviation=" + stateabbreviation;
        //    return await GetApiInvoke<TaxTypeDTO>(uri, apiContext);
        //}

        //Get CD Map 

        public async Task<List<MicaCDDTO>> CDMapper(dynamic PolicyRequest, string type, ApiContext apiContext)
        {

            var uri = ExtensionUrl + "/api/Mica_EGI/CDMapper?TxnType=" + type;

            return await PostApiInvoke<dynamic, List<MicaCDDTO>>(uri, apiContext, PolicyRequest);

        }
        public async Task<PolicyStatusResponseDTO> PolicyStatusUpdate(PolicyStatusDTO policyStatusDTO, ApiContext apiContext)
        {

            var uri = ExtensionUrl + "/api/Mica_EGI/PolicyStatusUpdate";

            return await PostApiInvoke<dynamic, PolicyStatusResponseDTO>(uri, apiContext, policyStatusDTO);

        }
        public async Task<ResponseStatus> VehicleStatusUpdate(VehicleStatusDTO VehicleStatusDTO, ApiContext apiContext)
        {

            var uri = ExtensionUrl + "/api/Mica_EGI/VehicleStatusUpdate";

            return await PutApiInvoke<VehicleStatusDTO, ResponseStatus>(uri, apiContext, VehicleStatusDTO);

        }


        public async Task<MasterCDDTO> CDAccountCreation(string accountnumber, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Accounts/CDAccountCreation?accountnumber=" + accountnumber;

            return await GetApiInvoke<MasterCDDTO>(uri, apiContext);

        }
        public async Task<CDBalanceDTO> GetCDAccountDetails(string accountnumber, string type, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Accounts/GetAccountBalance?accountnumber=" + accountnumber + "&TxnEventType=" + type;

            return await GetApiInvoke<CDBalanceDTO>(uri, apiContext);

        }

        public async Task<DailyDTO> GetDailyTransaction(string accountnumber, int month, int year, string TxnEventType, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Accounts/GetDailyTransaction?accountnumber=" + accountnumber + "&month=" + month + "&year=" + year + "&TxnEventType=" + TxnEventType;

            return await GetApiInvoke<DailyDTO>(uri, apiContext);

        }
        public async Task<dynamic> RuleMapper(dynamic InputRequest, string type, ApiContext apiContext)
        {
            var uri = ExtensionUrl + "/api/Mica_EGI/RuleMapper?TxnType=" + type;

            return await PostListApiInvoke<dynamic, dynamic>(uri, apiContext, InputRequest);
        }
        public async Task<List<MicaCDDTO>> CDMapperList(dynamic PolicyRequest, string type, ApiContext apiContext)
        {

            var uri = ExtensionUrl + "/api/Mica_EGI/CDMapper?TxnType=" + type;

            return await PostListApiInvoke<dynamic, MicaCDDTO>(uri, apiContext, PolicyRequest);

        }
        public async Task<CustomerSettingsDTO> GetCustomerSettings(string TimeZone, ApiContext apiContext)
        {

            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerSettings?customerid=" + apiContext.OrgId + "&type=" + TimeZone;//+"&envid="+apiContext.ServerType;

            return await GetApiInvoke<CustomerSettingsDTO>(uri, apiContext);

        }
        public async Task<PolicyAgreementResponse> ValidateAssignProduct(string partnerCode, int productId, ApiContext apiContext)
        {

            var uri = PartnerUrl + "/api/Partner/ValidateAssignProduct?partnerCode=" + partnerCode + "&productId=" + productId;

            return await GetApiInvoke<PolicyAgreementResponse>(uri, apiContext);

        }
        public async Task<PolicyExceptionDTO> GetPolicyExceptionDetails(dynamic SourceRequest, ApiContext apiContext)
        {
       
            var uri = ExtensionUrl + "/api/Mica_EGI/GetPolicyExceptionDetails";

            return await PostApiInvoke<dynamic, PolicyExceptionDTO>(uri, apiContext, SourceRequest);

        }
        public async Task<IEnumerable<CustomerSettingsDTO>> GetAdjustmentCustomerSettings(string Type, ApiContext apiContext)
        {
            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerTypeSettings?customerid=" + apiContext.OrgId + "&type=" + Type + "&envid=" + apiContext.ServerType;
            return await GetListApiInvoke<CustomerSettingsDTO>(uri, apiContext);
        }
        public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
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
                    client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
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
                    client.DefaultRequestHeaders.Add("X-CorrelationId", apiContext.CorrelationId);
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




        private async Task<TResponse> PutApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
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
                using (var response = await client.PutAsync(requestUri, contentPost))
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
    }
}
