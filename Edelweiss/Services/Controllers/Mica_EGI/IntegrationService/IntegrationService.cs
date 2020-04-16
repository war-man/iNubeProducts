using iNube.Utility.Framework.Model;
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

namespace iNube.Services.Controllers.EGI.IntegrationServices
{
    public interface IIntegrationService
    {

        Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData);
        Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext);

        //Scheduler Module AR
        Task<dynamic> GenerateCDTransaction(CDDTO cdModel, ApiContext apiContext);
        Task<List<PolicyDetailsDTO>> GetPolicyList(string productCode, ApiContext apiContext);
        Task<dynamic> CalculatePremium(SchedulerPremiumDTO premiumDTO, ApiContext apiContext);
        Task<dynamic> GetPolicyDetails(string PolicyNo, ApiContext apiContext);
        Task<dynamic> WrapperCalculateRatingPremium(SchedulerPremiumDTO dynamicData);

        //MICA Rating for CD Mapping
        Task<dynamic> RatingPremium(SchedulerPremiumDTO dynamicData, ApiContext apiContext);

        //Rule Engine
        Task<dynamic> RuleEngine(dynamic dynamicData, ApiContext apiContext);
        Task<dynamic> EndorsementCalculator(EndorsementCalDTO endorsementCal,ApiContext apiContext);


        //NEW CD METHOD
        Task<dynamic> MasterCDACC(ExtCDDTO extCDDTO, ApiContext apiContext);
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
            RuleEngineUrl = _configuration["Integration_Url:RuleEngine:AzureRuleEngineUrl"];
            ExtensionUrl = _configuration["Integration_Url:Extension:ExtensionUrl"];
            RatingUrl = _configuration["Integration_Url:Rating:RatingUrl"];
           
        }

        public async Task<EnvironmentResponse> GetEnvironmentConnection(string product, decimal EnvId)
        {
            LoggerManager logger = new LoggerManager(_configuration);
            
            var uri = UserUrl + "/api/Login/GetEnvironmentConnection?product=" + product + "&EnvId=" + EnvId;
            logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", uri, "3", new ApiContext() { ProductType = product, ServerType = EnvId.ToString() });
           // return await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
           var result = await GetApiInvoke<EnvironmentResponse>(uri, new ApiContext());
            logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", result.Dbconnection, "Final Return in integration Call", new ApiContext() { ProductType = product, ServerType = EnvId.ToString() });
            return result;
        }

        public async Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/CreatePolicy";
            return await PostApiInvoke<dynamic, PolicyResponse>(uri, apiContext, policyDetail);
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
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/50";
            return await PostApiInvoke<EndorsementCalDTO, dynamic>(uri, apiContext, endorsementCal);
        }

        //Calculation Premium for Rating
        public async Task<dynamic> CalCulateRatingPremium(SchedulerPremiumDTO dynamicData)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);
            var uri = PolicyUrl + "/api/Policy/CalCulatePremium";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }
        public async Task<dynamic> WrapperCalculateRatingPremium(SchedulerPremiumDTO dynamicData)
        {
            ApiContext apiContext = new ApiContext();
            apiContext.OrgId = Convert.ToDecimal(_configuration["Mica_ApiContext:OrgId"]);
            apiContext.UserId = _configuration["Mica_ApiContext:UserId"];
            apiContext.Token = _configuration["Mica_ApiContext:Token"];
            apiContext.ServerType = _configuration["Mica_ApiContext:ServerType"];
            apiContext.IsAuthenticated = Convert.ToBoolean(_configuration["Mica_ApiContext:IsAuthenticated"]);
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/41";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<dynamic> RatingPremium(SchedulerPremiumDTO dynamicData,ApiContext apiContext)
        {
            var uri = RatingUrl + "/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/37";
            return await PostApiInvoke<SchedulerPremiumDTO, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<dynamic> RuleEngine(dynamic dynamicData, ApiContext apiContext)
        {
            var RuleId = dynamicData.RuleName;

            var uri = RuleEngineUrl + "/RuleEngine/CheckRuleSets/"+ RuleId;
            return await PostApiInvoke<dynamic, dynamic>(uri, apiContext, dynamicData);
        }

        public async Task<dynamic> MasterCDACC(ExtCDDTO extCDDTO, ApiContext apiContext)
        {
            var uri = PartnerUrl + "/api/Accounts/MasterCDACC";
            return await PostApiInvoke<ExtCDDTO, dynamic>(uri, apiContext, extCDDTO);
        }

        public async Task<dynamic> InternalGetPolicyDetailsByNumber(string PolicyNo, ApiContext apiContext)
        {
            var uri = PolicyUrl + "/api/Policy/InternalGetPolicyDetailsByNumber?policyNumber=" + PolicyNo;
            return await GetApiInvoke<dynamic>(uri, apiContext);
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


        public async Task<TResponse> GetApiInvoke<TResponse>(string url, ApiContext apiContext) where TResponse : new()
        {
            HttpClient client = new HttpClient();
            LoggerManager logger = new LoggerManager(_configuration);          

           if (!string.IsNullOrEmpty(apiContext.Token))
            {
                logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", apiContext.Token, "--CHeck empty GETAPIInvoke--", new ApiContext() { ProductType = "Mica", ServerType = "297" });


                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);
            }

            using (var response = await client.GetAsync(url))
            using (var content = response.Content)
            {
                logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", response.ToString(), "GETAPIInvoke---Before", new ApiContext() { ProductType = "Mica", ServerType = "297" });

                if (response.IsSuccessStatusCode)
                {
                    var serviceResponse = await content.ReadAsAsync<TResponse>();
                    logger.LogRequest("GetVehicleMaster", "GetVehicleMaster", serviceResponse.ToString(), "GETAPIInvoke---After", new ApiContext() { ProductType = "Mica", ServerType = "297" });


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

    }
}
