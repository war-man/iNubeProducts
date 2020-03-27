using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using iNube.Utility.Framework.Model;
using iNube.Components.RuleEngine.Helpers;
using iNube.Components.RuleEngine.Entities.AllocationEntities;
using iNube.Components.RuleEngine.Models;
using iNube.Components.RuleEngine.Controllers.AllocationConfig.AllocationConfigService;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.Extensions.Options;
using static iNube.Components.RuleEngine.Models.ALModels;
using iNube.Utility.Framework.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iNube.Components.RuleEngine.Controllers.AllocationConfig
{


    [Route("api/[controller]/[action]")]
    //[ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    //[Route("[controller]")]
    [ApiController]
    public class AllocationConfigController : BaseApiController
    {
        public IAllocationConfigService _allocationConfigService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        //  private IIntegrationService _integrationService;


        public AllocationConfigController(IAllocationConfigService allocationConfigService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _allocationConfigService = allocationConfigService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            //_integrationService = integrationService;
        }

        [AllowAnonymous]

        [HttpGet]

        public IActionResult MastertypeData()

        {
            var isFilter = true;
            var response = _allocationConfigService.MastertypeData();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllocationRules()
        {
            bool isFilter = true;
            var paramDtos = await _allocationConfigService.GetAllocationRules(Context);
            //if (isFilter)
            //{
            //    var masterdata = paramDtos.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            //    return Ok(masterdata);
            //}
            return Ok(paramDtos);
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateParamSet(ParameterSetDTO tblAllocParameterSet)
        {
            var response = await _allocationConfigService.CreateParamSet(tblAllocParameterSet, Context);
            // return Ok(response);
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


        //[HttpPost]
        //public async Task<IActionResult> CreateRateRulesSet(AllocationDTO tblRateRuleSet)
        //{
        //    var response = await _allocationConfigService.CreateRatingRules(tblRateRuleSet, Context);
        //    return Ok(response);
        //}


        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetParameterSet()
        {
            var Param_list = await _allocationConfigService.GetParameterSet(Context);
            return Ok(Param_list);
        }
        [HttpGet]
        public async Task<IActionResult> GetRateRule(decimal paramid)
        {
            var Rate_list = await _allocationConfigService.GetRateRule(paramid, Context);
            return Ok(Rate_list);
        }

        [AllowAnonymous]
        [HttpPost("CheckRuleSets/{EventId}")]
        public IActionResult CheckRuleSets(String EventId, dynamic expression)
        {
            var eventDetails = _allocationConfigService.CheckRuleSets(EventId, expression, Context);
            return Ok(eventDetails);
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateAllocationRules(AllocationDTO allocDto)
        {
            var response = await _allocationConfigService.CreateAllocationRules(allocDto, Context);
            //return Ok(response);
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




    }
}



