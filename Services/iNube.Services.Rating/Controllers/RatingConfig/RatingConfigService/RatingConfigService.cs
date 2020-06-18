using AutoMapper;
using iNube.Services.Rating.Entities;
using iNube.Services.Rating.Helpers;
using iNube.Services.Rating.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService
{
    public interface IRateConfigService
    {
        Task<RatingParameterResponce> CreateRatingParameter(RatingParametersDTO ratingParaDto, ApiContext apiContext);
        Task<ParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext);
        Task<RatingRulesResponse> CreateRatingRules(RatingDTO ratingDto, ApiContext apiContext);
        Task<CalConfigResponse> CreateCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext);
        Task<EllConfigResponse> CreateIllustrationRules(IllustrationConfigDTO ellConfigDto, ApiContext apiContext);
        Task<IEnumerable<RatingParametersDTO>> GetParameterName(ApiContext apiContext);
        Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(ApiContext apiContext);
        Task<IEnumerable<RuleConditionsDetailsDTO>> GetRateConditions(ApiContext apiContext);
        Task<IEnumerable<RatingDTO>> GetRules(ApiContext apiContext);
        Task<ResponseStatus> CheckRuleSets(String RuleId, dynamic dictionary_rule, ApiContext apiContext);
        Task<object> CheckCalculationRate(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext);
        Task<IEnumerable<CalculationConfigDTO>> GetCalculationConfig(ApiContext apiContext);
        Task<IEnumerable<CalculationConfigParamDTO>> GetCalculationParam(ApiContext apiContext);
        Task<object> CalculationDisplaySearch(CalculationDisplayDTO calculationDisplay, ApiContext apiContext);
        Task<CalculationHeaderResponse> CreateCalculationHeader(CalculationHeaderDTO calculationHeader, ApiContext apiContext);
        Task<CalculationResultResponse> CreateCalculationResult(CalculationResultDTO calculationResult, ApiContext apiContext);
        Task<HandleEvent> GetHandleEvents(String EventId, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext);
        Task<HandleExecEvent> GetHandleExecEvents(String EventId, ApiContext apiContext);
        Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet(ApiContext apiContext);
        Task<IEnumerable<RatingParametersDTO>> SearchRateParameters(ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetRateConfigName(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<CalConfigExpression>> GetCalConfigExpressions(decimal CalculationConfigId, ApiContext apiContext);
        Task<IEnumerable<CalConfigParam>> GetCalConfigParam(decimal CalculationConfigId, ApiContext apiContext);
        Task<CalConfigResponse> EditCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext);
        Task<IList<HandleEventIllustration>> GetHandleEventsIllustration(String EventIllutrationId, ApiContext apiContext);
        Task<object> CheckIllustration(String IllustrationConfigId, int From, int To, dynamic illustration_Param, ApiContext apiContext);
        Task<object> CheckIllustrationRI(String IllustrationConfigId, int From, int To, dynamic illustration_Param,bool ArrayType, ApiContext apiContext);
        Task<IEnumerable<IllustrationConfigDTO>> GetIllustrationConfig(ApiContext apiContext);
        Task<HandleEventConfig> GetInputOutputParam(String EventId, ApiContext apiContext);
        Task<object> CheckCalculationRatingMapping(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext);
        //For Rates Rules
        Task<FileUploadResponse> RateUpload(HttpRequest httpRequest, CancellationToken cancellationToken, string RateName, string RateObj, string StartDate, string Enddate, ApiContext apiContext);
        Task<RatingGridDTO> GetRateRulesGrid(ApiContext apiContext);
    }

    public class RatingConfigService : IRateConfigService
    {
        private MICARTContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IRatingConfigService> _ratesService;

        public RatingConfigService(Func<string, IRatingConfigService> ratesService, IMapper mapper, MICARTContext context,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _ratesService = ratesService;
        }

        public async Task<RatingParameterResponce> CreateRatingParameter(RatingParametersDTO ratingParaDto, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateRatingParameter(ratingParaDto, apiContext);
        }
        public async Task<ParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateParamSet(paramSetDto, apiContext);
        }
        public async Task<RatingRulesResponse> CreateRatingRules(RatingDTO ratingDto, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateRatingRules(ratingDto, apiContext);
        }
        public async Task<CalConfigResponse> CreateCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateCalConfigRules(calConfigDto, apiContext);
        }
        public async Task<EllConfigResponse> CreateIllustrationRules(IllustrationConfigDTO ellConfigDto, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateIllustrationRules(ellConfigDto, apiContext);
        }
        public async Task<IEnumerable<RatingParametersDTO>> GetParameterName(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetParameterName(apiContext);
        }

        public async Task<IEnumerable<RuleConditionsDetailsDTO>> GetRateConditions(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetRateConditions(apiContext);
        }
        public async Task<IEnumerable<RatingDTO>> GetRules(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetRules(apiContext);
        }
        public async Task<ResponseStatus> CheckRuleSets(String RuleId, dynamic dictionary_rule, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CheckRuleSets(RuleId, dictionary_rule, apiContext);
        }

        public async Task<object> CheckCalculationRate(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CheckCalculationRate(CalculationConfigId, dynamic, apiContext);
        }

        public async Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetRateRule(apiContext);
        }
        public async Task<IEnumerable<CalculationConfigDTO>> GetCalculationConfig(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetCalculationConfig(apiContext);
        }
        public async Task<IEnumerable<CalculationConfigParamDTO>> GetCalculationParam(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetCalculationParam(apiContext);
        }

        public async Task<object> CalculationDisplaySearch(CalculationDisplayDTO calculationDisplay, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CalculationDisplaySearch(calculationDisplay,apiContext);
        }
        public async Task<CalculationHeaderResponse> CreateCalculationHeader(CalculationHeaderDTO calculationHeader, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateCalculationHeader(calculationHeader, apiContext);
        }
        
        public async Task<CalculationResultResponse> CreateCalculationResult(CalculationResultDTO calculationResult, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CreateCalculationResult(calculationResult, apiContext);
        }
        public async Task<HandleEvent> GetHandleEvents(String EventId, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetHandleEvents(EventId, apiContext);
        }
        
        public async Task<IEnumerable<ddDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetHandleEventsMaster(lMasterlist, apiContext);
        }
        public async Task<HandleExecEvent> GetHandleExecEvents(String EventId, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetHandleExecEvents(EventId, apiContext);
        }

        public async Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetParameterSet(apiContext);
        }
        public async Task<IEnumerable<RatingParametersDTO>> SearchRateParameters(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).SearchRateParameters(apiContext);
        }
        public async Task<IEnumerable<ddDTO>> GetRateConfigName(string lMasterlist, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetRateConfigName(lMasterlist, apiContext);
        }
        public async Task<IEnumerable<CalConfigExpression>> GetCalConfigExpressions(decimal CalculationConfigId, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetCalConfigExpressions(CalculationConfigId, apiContext);
        }
        public async Task<IEnumerable<CalConfigParam>> GetCalConfigParam(decimal CalculationConfigId, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetCalConfigParam(CalculationConfigId, apiContext);
        }
        public async Task<CalConfigResponse> EditCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).EditCalConfigRules(calConfigDto, apiContext);
        }
        public async Task<IList<HandleEventIllustration>> GetHandleEventsIllustration(String EventIllutrationId, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetHandleEventsIllustration(EventIllutrationId, apiContext);
        }
        public async Task<object> CheckIllustration(String IllustrationConfigId, int From, int To, dynamic illustration_Param, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CheckIllustration(IllustrationConfigId, From, To, illustration_Param, apiContext);
        }
        public async Task<object> CheckIllustrationRI(String IllustrationConfigId, int From, int To, object illustration_Param, bool ArrayType, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CheckIllustrationRI(IllustrationConfigId, From, To, illustration_Param, ArrayType, apiContext);
        }
        public async Task<IEnumerable<IllustrationConfigDTO>> GetIllustrationConfig(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetIllustrationConfig(apiContext);
        }
        public async Task<HandleEventConfig> GetInputOutputParam(String EventId, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetInputOutputParam(EventId, apiContext);
        }
        public async Task<object> CheckCalculationRatingMapping(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).CheckCalculationRatingMapping(CalculationConfigId, dynamic, apiContext);
        }
        //For Rate Upload
        public async Task<FileUploadResponse> RateUpload(HttpRequest httpRequest, CancellationToken cancellationToken, string RateName, string RateObj, string StartDate, string Enddate, ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).RateUpload(httpRequest, cancellationToken, RateName, RateObj, StartDate, Enddate, apiContext);
        }
        public async Task<RatingGridDTO> GetRateRulesGrid(ApiContext apiContext)
        {
            return await _ratesService(apiContext.ProductType).GetRateRulesGrid(apiContext);
        }

    }
}


