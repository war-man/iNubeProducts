using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService;
using iNube.Services.Rating.Helpers;
using iNube.Services.Rating.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace iNube.Services.Rating.Controllers.RatingConfig
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class RatingConfigController : BaseApiController
    {
        private IRateConfigService _rateService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public RatingConfigController(IRateConfigService rateService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _rateService = rateService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        public async Task<IActionResult> CreateParameter([FromBody]RatingParametersDTO tblratingParamDto)
        {
            var response = await _rateService.CreateRatingParameter(tblratingParamDto,Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateParamSet([FromBody]ParameterSetDTO tblParameterSet)
        {
            var response = await _rateService.CreateParamSet(tblParameterSet, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRateRulesSet([FromBody]RatingDTO tblRateRuleSet)
        {
            var response = await _rateService.CreateRatingRules(tblRateRuleSet, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateCalConfigRules([FromBody]CalculationConfigDTO tblCalConfig)
        {
            var response = await _rateService.CreateCalConfigRules(tblCalConfig, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpPost("CheckRuleSets/{RuleId}")]
        public async Task<IActionResult> CheckRuleSets(String RuleId, [FromBody]dynamic dictionary_rule)
        {
            var response = await _rateService.CheckRuleSets(RuleId, dictionary_rule, Context);
            return Ok(response);
        }

        [HttpPost("CheckRateCalculation/{CalcualtionId}")]
        public async Task<IActionResult> CheckCalculationRate(String CalcualtionId, [FromBody]DynamicData dynamic)
        {
            var response = await _rateService.CheckCalculationRate(CalcualtionId, dynamic, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetParameter()
        {
            var paramDtos = await _rateService.GetParameterName(Context);
            return Ok(paramDtos);
        }
        [HttpGet]
        public async Task<IActionResult> GetRulesCondition()
        {
            var paramDtos = await _rateService.GetRateConditions(Context);
            return Ok(paramDtos);
        }
        [HttpGet]
        public async Task<IActionResult> GetRules()
        {
            var paramDtos = await _rateService.GetRules(Context);
            return Ok(paramDtos);
        }
        [HttpGet]
        public async Task<IActionResult> GetHandleEvents(String EventId)
        {
            var eventDetails = await _rateService.GetHandleEvents(EventId,Context);
            return Ok(eventDetails);
        }
       [HttpGet]
        public async Task<IActionResult> GetHandleEventsMaster(string lMasterlist)
        {
            var objectval = await _rateService.GetHandleEventsMaster(lMasterlist, Context);
            return Ok(objectval);
        }
        [HttpGet]
        public async Task<IActionResult> GetHandleExecEvents(String EventId)
        {
            var eventDetails = await _rateService.GetHandleExecEvents(EventId, Context);
            return Ok(eventDetails);
        }
        [HttpGet]
        public async Task<IActionResult> GetCalculationConfig()
        {
            var rateCalDtos = await _rateService.GetCalculationConfig(Context);
            return Ok(rateCalDtos);
        }
        [HttpGet]
        public async Task<IActionResult> GetCalculationParam()
        {
            var rateCalDtos = await _rateService.GetCalculationParam(Context);
            return Ok(rateCalDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetRateRule()
        {
            var Rate_list = await _rateService.GetRateRule(Context);
            return Ok(Rate_list);
        }

        [HttpPost]
        public async Task<IActionResult> CalculationDisplaySearch(CalculationDisplayDTO calculationDisplay)
        {
            var data = await _rateService.CalculationDisplaySearch(calculationDisplay, Context);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCalculationHeader([FromBody]CalculationHeaderDTO calculationHeader)
        {
            var response = await _rateService.CreateCalculationHeader(calculationHeader, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCalculationResult([FromBody]CalculationResultDTO calculationResult)
        {
            var response = await _rateService.CreateCalculationResult(calculationResult, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetParameterSet()
        {
            var Param_list = await _rateService.GetParameterSet(Context);
            return Ok(Param_list);
        }

        [HttpPost]
        public async Task<IActionResult> SearchRateParameters()
        {
            var searchData = await _rateService.SearchRateParameters(Context);
            return Ok(searchData);
        }

        [HttpGet]
        public async Task<IActionResult> GetRateConfigName(string lMasterlist, bool isFilter = true)
        {
            var objectval = await _rateService.GetRateConfigName(lMasterlist, Context);
            //if (isFilter)
            //{
            //    var objdata = objectval.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            //    return Ok(objdata);
            //}

            return Ok(objectval);
        }

        [HttpGet]
        public async Task<IActionResult> GetCalConfigExpressions(decimal CalculationConfigId, bool isFilter = true)
        {
            var objectval = await _rateService.GetCalConfigExpressions(CalculationConfigId, Context);
            return Ok(objectval);
        }

        [HttpGet]
        public async Task<IActionResult> GetCalConfigParam(decimal CalculationConfigId, bool isFilter = true)
        {
            var objectval = await _rateService.GetCalConfigParam(CalculationConfigId, Context);
            return Ok(objectval);
        }

        [HttpPost]
        public async Task<IActionResult> EditCalConfigRules([FromBody]CalculationConfigDTO tblCalConfig)
        {
            var response = await _rateService.EditCalConfigRules(tblCalConfig, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }
    }
}
