using iNube.Services.Lead.Models;
using iNube.Utility.Framework.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace iNube.Services.Lead.Controllers.Lead.LDIntegrationServices
{
    public interface ILDIntegrationService
    {
        Task<ResponseStatus> SendRuleValidateDataAsync(dynamic Serialize, ApiContext apiContext);
        Task<IEnumerable<GetRulesWithParameters>> GetRulesWithParamAsync(ApiContext apiContext);
        Task<IEnumerable<GetRulesWithParametersDropDown>> GetRulesWithParammAsync(ApiContext apiContext);
        Task<IEnumerable<GetRuleMappingDetails>> GetRuleMapAsync(ApiContext apiContext);

    }
    public class LDIntegrationService : ILDIntegrationService
    {
        readonly string ruleApiUrl = "http://localhost:59676/RuleEngine/CheckRuleSets/";
        readonly string rulesParamApi = "http://localhost:59676/RuleEngine/GetAllRulesWithParameterById?RulesId=";
        readonly string ruleswithParamApi = "http://localhost:59676/RuleEngine/GetAllRulesWithParam";
        readonly string rulesMappingApi = "http://localhost:59676/RuleConfig/GetAllRuleMap?ruleid=";

        // Callling of Another Rules Api with 

        public async Task<IEnumerable<GetRulesWithParameters>> GetRulesWithParamAsync(ApiContext apiContext)
        {
            var uri = rulesParamApi + 10005;
            var ruleListParam = await GetListApiInvoke<GetRulesWithParameters>(uri, apiContext);
            return ruleListParam;
        }

        // Calling Get ALl Rules with Param((For Showing DropDown in RuleMappping as for Selecting Rule 
        //GetAllRulesWithParam
        public Task<IEnumerable<GetRulesWithParametersDropDown>> GetRulesWithParammAsync(ApiContext apiContext)
        {
            var uri = ruleswithParamApi;
            var ruleListwithParam = GetListApiInvoke<GetRulesWithParametersDropDown>(uri, apiContext);
            return ruleListwithParam;
        }
        // Getting All Rules With Parameter
        public async Task<IEnumerable<GetRuleMappingDetails>> GetRuleMapAsync(ApiContext apiContext)
        {
            var uri = rulesMappingApi + 10005 + "&mastermodel=" + "Partner" + "&action=" + "CreatePartner" + "&modelName=" + "PartnerDTO";
            var ruleMapList = await GetListApiInvoke<GetRuleMappingDetails>(uri, apiContext);
            return ruleMapList;
        }
        // Rule Engine Validation Task
        public async Task<ResponseStatus> SendRuleValidateDataAsync(dynamic Serialize, ApiContext apiContext)
        {
            var uri = ruleApiUrl + 10005;
            var ruleExe = await PostApiInvoke<dynamic, ResponseStatus>(uri, apiContext, Serialize);
            return ruleExe;

        }

        private async Task<TResponse> PostApiInvoke<TRequest, TResponse>(string requestUri, ApiContext apiContext, TRequest request) where TRequest : new() where TResponse : new()
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiContext.Token.Split(" ")[1]);

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
                    try
                    {
                        //for 400 errors also same response is expected.
                        return await content.ReadAsAsync<TResponse>();
                    }
                    catch (Exception)
                    {
                        return new TResponse();
                    }
                }
            }
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

    }
}