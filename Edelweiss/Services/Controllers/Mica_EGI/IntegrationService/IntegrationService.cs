﻿using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using iNube.Services.MicaExtension_EGI.Models;
using Microsoft.Extensions.Configuration;
using iNube.Utility.Framework.LogPrivider.LogService;
using System.Reflection;
using MicaExtension_EGI.Helpers;

namespace iNube.Services.Controllers.EGI.IntegrationServices
{
    public interface IIntegrationService
    {

        Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData,ApiContext context);
        
        //Scheduler Module AR
        Task<dynamic> GenerateCDTransaction(CDDTO cdModel, ApiContext apiContext);
        Task<List<PolicyDetailsDTO>> GetPolicyList(string productCode, ApiContext apiContext);
        Task<dynamic> CalculatePremium(SchedulerPremiumDTO premiumDTO, ApiContext apiContext);
        Task<dynamic> GetPolicyDetails(string PolicyNo, ApiContext apiContext);
        Task<dynamic> WrapperCalculateRatingPremium(SchedulerPremiumDTO dynamicData,ApiContext context);

        //MICA Rating for CD Mapping
        Task<dynamic> RatingPremium(SchedulerPremiumDTO dynamicData, ApiContext apiContext);

        //Rule Engine
        Task<dynamic> RuleEngine(dynamic dynamicData, ApiContext apiContext);
        Task<dynamic> EndorsementCalculator(EndorsementCalDTO endorsementCal,ApiContext apiContext);


        //NEW CD METHOD
        Task<MasterCDDTO> MasterCDACC(ExtCDDTO extCDDTO, ApiContext apiContext);
        Task<CDDailyDTO> GetDailyAccountDetails(string PolicyNo,int Month,int Year,ApiContext apiContext);

        //NEW Internal Policy Method for Account Number
        Task<dynamic> InternalGetPolicyDetailsByNumber(string PolicyNo, ApiContext apiContext);

        //AD Call In CD Account Details table
        Task<CDBalanceDTO> GetCDAccountDetails(string accountnumber, string TxnEventType, ApiContext apiContext);

        //Get All the Policy + CD Data entire Policy Object 
        Task<IEnumerable<CDDetailsResponseDTO>> GetCDMapperDetails(CDDetailsRequestDTO detailsRequestDTO,ApiContext apiContext);
        Task<ClaimDataDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext);

        //Billing Details - Partner New CR
        Task<CDAccountDTO> GetAccountDetails(CDAccountRequest accountRequest, ApiContext apiContext);
      
        //NEW Internal Proposal Method for Account Number
        Task<dynamic> InternalGetProposalDetailsByNumber(string proposalNumber, ApiContext apiContext);
        Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId);

        Task<PolicyDTO> GetPolicyByNumber(string PolicyNumber, ApiContext apiContext);

        Task<ResponseStatus> PolicyActivate(ApiContext apiContext);

        Task<MobileAlertResponseDTO> MobileNotification(MobileAlertRequestDTO alertRequestDTO);

        //PB Monthly-SI Adjustment Amount
        Task<IEnumerable<CustomerSettingsDTO>> GetCustomerSettings(string Type, ApiContext apiContext);

        //New Rating Calculator
        Task<dynamic> NewRatingCalculator(SchedulerPremiumDTO dynamicData, ApiContext apiContext);

    }
    public class IntegrationService : IIntegrationService
    {

        private IConfiguration _configuration;
        readonly string PolicyUrl, BillingUrl, ClaimUrl, NotificationUrl, PartnerUrl, ProductUrl, UserUrl, AccountingUrl, RuleEngineUrl, RatingUrl, ExtensionUrl;
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
            RatingUrl = _configuration["Integration_Url:Rating:RatingUrl"];
           
        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {                      
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
       
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

        public async Task<dynamic> EndorsementCalculator(EndorsementCalDTO endorsementCal, ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/" + ModuleConstants.EGIEndoRatingId;
            return await PostApiInvoke<EndorsementCalDTO, dynamic>(uri, apiContext, endorsementCal);
        }

        //Calculation Premium for Rating
        public async Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData,ApiContext context)
        {
            var uri = PolicyUrl + "/api/Policy/CalCulatePremium";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, context, dynamicData);
        }
        public async Task<dynamic> WrapperCalculateRatingPremium(SchedulerPremiumDTO dynamicData,ApiContext context)
        {          
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/" + ModuleConstants.EGIWrapperRatingId;
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, context, dynamicData);
        }

        public async Task<dynamic> RatingPremium(SchedulerPremiumDTO dynamicData,ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/"+ ModuleConstants.EGIRatingId;
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<dynamic> RuleEngine(dynamic dynamicData, ApiContext apiContext)
        {
            var RuleId = dynamicData.RuleName;

            var uri = RuleEngineUrl + "/RuleEngine/CheckRuleSets/"+ RuleId;
            return await PostApiInvoke<dynamic, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<MasterCDDTO> MasterCDACC(ExtCDDTO extCDDTO, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/MasterCDACC";
            var FinalResult = await PostApiInvoke<ExtCDDTO, MasterCDDTO>(uri, apiContext, extCDDTO);

            if (FinalResult.Status == BusinessStatus.Created)
            {
                return FinalResult;
            }
            else
            {
                return null;
            }

        }

        public async Task<dynamic> InternalGetPolicyDetailsByNumber(string PolicyNo, ApiContext apiContext)
        {
            try
            {
                var uri = PolicyUrl + "/api/Policy/InternalGetPolicyDetailsByNumber?policyNumber=" + PolicyNo;
                var finalresult = await GetApiInvoke<dynamic>(uri, apiContext);

                if (finalresult.ToString() == "System.Object")
                {
                    return null;
                }
                else
                {
                    return finalresult;
                }
            }
            catch
            {
                return null;
            }
        }
         public async Task<dynamic> InternalGetProposalDetailsByNumber(string proposalNumber, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/InternalGetProposalDetailsByNumber?proposalNumber=" + proposalNumber;
            return await GetApiInvoke<dynamic>(uri, apiContext);
        }

        public async Task<CDDailyDTO> GetDailyAccountDetails(string PolicyNo, int Month, int Year, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetDailyAccountDetails?policyNumber="+ PolicyNo +"&month=" + Month + "&year="+ Year +"&TxnEventType=AD";
            return await GetApiInvoke<CDDailyDTO>(uri, apiContext);
        }

        public async Task<CDBalanceDTO> GetCDAccountDetails(string accountnumber, string TxnEventType, ApiContext apiContext)
        {
        
            var uri = PartnerUrl + "/api/Accounts/GetAccountBalance?accountnumber=" + accountnumber + "&TxnEventType=" + TxnEventType;
            return await GetApiInvoke<CDBalanceDTO>(uri, apiContext);
        }

        public async Task<IEnumerable<CDDetailsResponseDTO>> GetCDMapperDetails(CDDetailsRequestDTO detailsRequestDTO, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetCDMapperDetails";
            return await PostListApiInvoke<CDDetailsRequestDTO, CDDetailsResponseDTO>(uri, apiContext, detailsRequestDTO);
        }

        public async Task<ClaimDataDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext)
        {
            var uri = ClaimUrl + "/api/ClaimManagement/GetClaimByNumber?claimNumber=" + claimNumber ;
            return await GetApiInvoke<ClaimDataDTO>(uri, apiContext);
        }

        public async Task<CDAccountDTO> GetAccountDetails(CDAccountRequest accountRequest, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/GetAccountDetails";
            return await PostApiInvoke<CDAccountRequest,CDAccountDTO>(uri, apiContext, accountRequest);
        }


        public async Task<PolicyDTO> GetPolicyByNumber(string PolicyNumber, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/GetPolicyByNumber?policyNumber=" + PolicyNumber;
            return await GetApiInvoke<PolicyDTO>(uri, apiContext);
        }


        public async Task<ResponseStatus> PolicyActivate(ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/PolicyActivate";
            return await GetApiInvoke<ResponseStatus>(uri, apiContext);
        }

        public async Task<MobileAlertResponseDTO> MobileNotification(MobileAlertRequestDTO alertRequestDTO)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.Token = _configuration["MobileNotification:BearerToken"].ToString();

            string MobileAppUrl = _configuration["MobileNotification:BaseUrl"].ToString();

            var uri = MobileAppUrl;

             var request = JsonConvert.SerializeObject(alertRequestDTO);

            _logger.LogRequest(request, "MobileAppNotifyCall", "Mobile Call", uri,null, apiContext);


            return await ExternalPostApiInvoke<MobileAlertRequestDTO, MobileAlertResponseDTO>(uri, apiContext, alertRequestDTO);
        }

        public async Task<dynamic> NewRatingCalculator(SchedulerPremiumDTO dynamicData, ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/"+ ModuleConstants.EGINewRatingId;
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<IEnumerable<CustomerSettingsDTO>> GetCustomerSettings(string Type, ApiContext apiContext)
        {
            var uri = UserUrl + "/api/CustomerProvisioning/GetCustomerTypeSettings?customerid=" + apiContext.OrgId + "&type=" + Type + "&envid=" + apiContext.ServerType;
            return await GetListApiInvoke<CustomerSettingsDTO>(uri, apiContext);
        }

        public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
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
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Rating", MethodBase.GetCurrentMethod().Name, url, null, apiContext);
            }
            return new TResponse();
        }
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url) where TResponse : new()
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
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
                _logger.LogError(ex, "Rating", MethodBase.GetCurrentMethod().Name, url, null, new ApiContext());
            }
            return new List<TResponse>();
        }

        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                 HttpContent contentPost = null;
                if (request != null)
                {
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    if (!string.IsNullOrEmpty(apiContext.Token))
                    {
                        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    }
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
                _logger.LogError(ex, "Mica_EGI", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);
                return new TResponse();
            }

        }

        private async Task<IEnumerable<TResponse>> PostListApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
                HttpContent contentPost = null;
                if (request != null)
                {
                    _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    if (!string.IsNullOrEmpty(apiContext.Token))
                    {
                        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
                    }
                    string postBody = JsonConvert.SerializeObject(request);
                    //dynamic dynamicObject = JsonConvert.DeserializeObject(postBody);
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

                _logger.LogError(ex, "Mica_EGI", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);
                return new List<TResponse>();
            }

        }
        public async Task<IEnumerable<TResponse>> GetListApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
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

                //throw;
            }
            return new List<TResponse>();
        }


        private async Task<TResponse> ExternalPostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            try
            {
               
                HttpContent contentPost = null;
                if (request != null)
                {
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token);                    
                    string postBody = JsonConvert.SerializeObject(request);
                    var content = new StringContent(postBody, Encoding.UTF8, "application/json");
                    contentPost = content;
                }
                using (var response = await _httpClient.PostAsync(requestUri, contentPost))
                {
                    var data = JsonConvert.SerializeObject(response);
                    var data2 = JsonConvert.SerializeObject(contentPost);

                    _logger.LogRequest(data, data2, "Mobile Call", response.IsSuccessStatusCode.ToString(), null,apiContext);


                    if (response.IsSuccessStatusCode)
                    {
                        using (var content = response.Content)
                        {
                            return await content.ReadAsAsync<TResponse>();
                        }
                    }
                    else
                    {
                        return new TResponse();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Mica_EGI", MethodBase.GetCurrentMethod().Name, requestUri + ":" + JsonConvert.SerializeObject(request), null, apiContext);

                return new TResponse();
            }

        }
    }
}
