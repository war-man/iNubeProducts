using iNube.Services.Rating.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService
{
    public interface IRatingConfigService
    {
        Task<RatingParameterResponce> CreateRatingParameter(RatingParametersDTO ratingParaDto, ApiContext apiContext);
        Task<ParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext);
        Task<RatingRulesResponse> CreateRatingRules(RatingDTO ratingDto, ApiContext apiContext);
        Task<CalConfigResponse> CreateCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext);
        Task<EllConfigResponse> CreateIllustrationRules(IllustrationConfigDTO ellConfigDto, ApiContext apiContext);
        Task<IEnumerable<RatingParametersDTO>> GetParameterName(ApiContext apiContext);
        Task<IEnumerable<RuleConditionsDetailsDTO>> GetRateConditions(ApiContext apiContext);
        Task<IEnumerable<RatingDTO>> GetRules(ApiContext apiContext);
        Task<IEnumerable<CalculationConfigDTO>> GetCalculationConfig(ApiContext apiContext);
        Task<IEnumerable<CalculationConfigParamDTO>> GetCalculationParam(ApiContext apiContext);
        //Execution
        Task<ResponseStatus> CheckRuleSets(String RuleId, dynamic dictionary_rule, ApiContext apiContext);
        Task<object> CheckCalculationRate(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext);
        //raterule
        Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(ApiContext apiContext);
        Task<object> CalculationDisplaySearch(CalculationDisplayDTO calculationDisplay, ApiContext apiContext);
        //Handle State 
        Task<HandleEvent> GetHandleEvents(String EventId ,ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext);
        //Handle State Execution 
        Task<HandleExecEvent> GetHandleExecEvents(String EventId, ApiContext apiContext);
        Task<CalculationHeaderResponse> CreateCalculationHeader(CalculationHeaderDTO calculationHeader, ApiContext apiContext);
        Task<CalculationResultResponse> CreateCalculationResult(CalculationResultDTO calculationResult, ApiContext apiContext);
        Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet(ApiContext apiContext);
        Task<IEnumerable<RatingParametersDTO>> SearchRateParameters(ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetRateConfigName(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<CalConfigExpression>> GetCalConfigExpressions(decimal CalculationConfigId, ApiContext apiContext);
        Task<IEnumerable<CalConfigParam>> GetCalConfigParam(decimal CalculationConfigId, ApiContext apiContext);
        Task<CalConfigResponse> EditCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext);
        Task<IList<HandleEventIllustration>> GetHandleEventsIllustration(String EventIllutrationId, ApiContext apiContext);
        Task<object> CheckIllustration(String IllustrationConfigId, dynamic illustration_Param, ApiContext apiContext);
        Task<IEnumerable<IllustrationConfigDTO>> GetIllustrationConfig(ApiContext apiContext);



    }
}
