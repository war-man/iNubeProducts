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

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iNube.Components.RuleEngine.Controllers.AllocationConfig
{


    [Route("api/[controller]/[action]")]
    //[ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    //[Route("[controller]")]
    [ApiController]
    public class AllocationConfigController : BaseApiController { 
        public IAllocationConfigService _allocationConfigService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        //  private IIntegrationService _integrationService;


        public AllocationConfigController(IAllocationConfigService allocationConfigService,IMapper mapper, IOptions<AppSettings> appSettings)
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
        [HttpPost("CheckRuleSets/{EventId}")]
        public IActionResult CheckRuleSets(String EventId, dynamic expression)
        {
            var eventDetails =  _allocationConfigService.CheckRuleSets(EventId, expression,Context);
            return Ok(eventDetails);
        }
        //[HttpPost("CheckRuleSets/{RuleId}")]
        //public async Task<IActionResult> CheckRuleSets(String RuleId, [FromBody]dynamic dictionary_rule)
        //{
        //    var response = await _rateService.CheckRuleSets(RuleId, dictionary_rule, Context);
        //    return Ok(response);
        //}

    }
}



