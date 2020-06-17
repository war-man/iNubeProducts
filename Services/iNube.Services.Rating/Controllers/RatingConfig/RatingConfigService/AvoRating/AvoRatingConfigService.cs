using iNube.Services.Rating.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.AvoRating
{
    public class AvoRatingConfigService : IRatingConfigService
    {
        public async Task<RatingParameterResponce> CreateRatingParameter(RatingParametersDTO ratingParaDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<RatingRulesResponse> CreateRatingRules(RatingDTO ratingDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<RatingParametersDTO>> GetParameterName(ApiContext apiContext)
        {
            throw new NotImplementedException();

        }
        public async Task<IEnumerable<RuleConditionsDetailsDTO>> GetRateConditions(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<RatingDTO>> GetRules(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<ResponseStatus> CheckRuleSets(String RuleId, dynamic dictionary_rule, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<CalConfigResponse> CreateCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<CalculationConfigDTO>> GetCalculationConfig(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<CalculationConfigParamDTO>> GetCalculationParam(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<object> CheckCalculationRate(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<object> CalculationDisplaySearch(CalculationDisplayDTO calculationDisplay, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<HandleEvent> GetHandleEvents(String EventId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        
 public async Task<IEnumerable<ddDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<HandleExecEvent> GetHandleExecEvents(String EventId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<CalculationHeaderResponse> CreateCalculationHeader(CalculationHeaderDTO calculationHeader, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<CalculationResultResponse> CreateCalculationResult(CalculationResultDTO calculationResult, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet( ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<RatingParametersDTO>> SearchRateParameters(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddDTO>> GetRateConfigName(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CalConfigExpression>> GetCalConfigExpressions(decimal CalculationConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CalConfigParam>> GetCalConfigParam(decimal CalculationConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<CalConfigResponse> EditCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<EllConfigResponse> CreateIllustrationRules(IllustrationConfigDTO ellConfigDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IList<HandleEventIllustration>> GetHandleEventsIllustration(String EventIllutrationId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<object> CheckIllustration(String IllustrationConfigId, int From, int To, dynamic illustration_Param, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<object> CheckIllustrationRI(String IllustrationConfigId, int From, int To, dynamic illustration_Param, bool ArrayType, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<IllustrationConfigDTO>> GetIllustrationConfig(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        //CheckCalculationRating For Mapper
        public async Task<object> CheckCalculationRatingMapping(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<HandleEventConfig> GetInputOutputParam(String EventId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<FileUploadResponse> RateUpload(HttpRequest httpRequest, CancellationToken cancellationToken, string RateName, string RateObj, string StartDate, string Enddate, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
