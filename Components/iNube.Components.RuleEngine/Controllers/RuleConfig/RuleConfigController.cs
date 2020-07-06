using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using iNube.Components.RuleEngine.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using iNube.Components.RuleEngine.Models;
using iNube.Components.RuleEngine.Entities;
using iNube.Components.RuleEngine.Controllers.RuleConfig.RuleConfigService;
using iNube.Utility.Framework.Model;
using System.Threading.Tasks;

namespace iNube.Components.RuleEngine.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RuleConfigController : ControllerBase
    {
        private IRuleConfigService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public RuleConfigController(
            IRuleConfigService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        // View All Parameters
        [HttpGet("GetAllParameter")]
        public IActionResult GetAllParameters()
        {
            var tblparameters = _userService.GetAllParameters();
            var tblparameterDtos = _mapper.Map<IList<ParametersDto>>(tblparameters);
            return Ok(tblparameterDtos);
        }
        

        // View All ParamSet
        [HttpGet("GetAllParamSet")]
        public IActionResult GetAllParamset()
        {
            var tblparamset = _userService.GetAllParamset();
            var tblparamsetDtos = _mapper.Map<IList<ParamSetDto>>(tblparamset);
            return Ok(tblparamsetDtos);
        }
        
        // View All ParamSetDetails
        [HttpGet("GetAllParamSetDetails")]
        public IActionResult GetAllParamsetDetail()
        {
            var tblparamsetdetails = _userService.GetAllParamsetDetail();
            var tblparamsetdetailsDtos = _mapper.Map<IList<ParamSetDetailsDto>>(tblparamsetdetails);
            return Ok(tblparamsetdetailsDtos);
        }
        
        // View All Rules
        [HttpGet("GetAllRules")]
        public IActionResult GetAllRules()
        {
            var tblrules = _userService.GetAllRules();
            var tblrulesDtos = _mapper.Map<IList<RulesDto>>(tblrules);
            return Ok(tblrulesDtos);
        }

        // View All RulesConditions
        [HttpGet("GetAllRulesCondition")]
        public IActionResult GetAllRuleCondition()
        {
            var tblrulescondition = _userService.GetAllRuleCondition();
            var tblrulesconditionDtos = _mapper.Map<IList<RuleConditionsDto>>(tblrulescondition);
            return Ok(tblrulesconditionDtos);
        }

        
        // View All RulesConditionsValue
        [HttpGet("GetAllRulesConditionValue")]
        public IActionResult GetAll_RuleConditionValue()
        {
            var tblrulesconditionvalue = _userService.GetAllRuleConditionValue();
            var tblrulesconditionvalueDtos = _mapper.Map<IList<RuleConditionValuesDto>>(tblrulesconditionvalue);
            return Ok(tblrulesconditionvalueDtos);
        }
        
        // View All RulesSetMapping
        [HttpGet("GetAllRuleSetMapping")]
        public IActionResult GetAllRuleSetMapping()
        {
            var tblrulesetmap = _userService.GetAllRuleSetMapping();
            var tblrulesetmapDtos = _mapper.Map<IList<RuleParamSetMappingDto>>(tblrulesetmap);
            return Ok(tblrulesetmapDtos);
        }

        [HttpGet("GetAllRuleMap")]
        public IActionResult GetAllRuleMapping(int ruleid, string mastermodel, string action, string modelName)
        {
            var tblruleMap = _userService.GetAllRuleMapping(ruleid ,mastermodel,action,modelName);
            var tblrulemapDtos = _mapper.Map<IList<RuleMappingDto>>(tblruleMap);
            return Ok(tblrulemapDtos);
        }
             

        
        // Creating the Parameters
        [AllowAnonymous]
        [HttpPost("CreateParameters")]
        public IActionResult CreateParameters([FromBody]ParametersDto tblParametersDto)
        {
            // map dto to entity
            var tbl_parameter = _mapper.Map<TblParameters>(tblParametersDto);
            try
            {
                // save 
                _userService.CreateParameters(tbl_parameter);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // Updating Parameters
        [HttpPut("{id}")]
        public IActionResult UpdateParameters(int id, [FromBody]ParametersDto tblparameterdto)
        {
            // map dto to entity and set id
            var tbl_parameter = _mapper.Map<TblParameters>(tblparameterdto);
            tbl_parameter.ParamId = id;

            try
            {
                // save 
                _userService.UpdateParameters(tbl_parameter);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // Creating Parameter Set
        [AllowAnonymous]
        [HttpPost("CreateParamset")]
        public IActionResult CreateParamset([FromBody]ParamSetDto tblParamsetDto)
        {
            // map dto to entity
            var tbl_paramset = _mapper.Map<TblParamSet>(tblParamsetDto);

            try
            {
                // save 
                _userService.CreateParamset(tbl_paramset);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
        
        // Creating ParamSetDetails
        [AllowAnonymous]
        [HttpPost("CreateParamSetDetails")]
        public IActionResult Insert_ParamSetDetails([FromBody]ParamSetDetailsDto tblParamsetDetailsDto)
        {
            // map dto to entity
            var tbl_paramsetdetails = _mapper.Map<TblParamSetDetails>(tblParamsetDetailsDto);

            try
            {
                // save 
                _userService.CreateParamsetDetail(tbl_paramsetdetails);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // Creating Rules
        [AllowAnonymous]
        [HttpPost("CreateRules")]
        public IActionResult CreateRules([FromBody]RulesDto tblrulesDto)
        {
            // map dto to entity
            var tbl_rules = _mapper.Map<TblRules>(tblrulesDto);
            try
            {
                // save 
                _userService.CreateRules(tbl_rules);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }


        // Creating RulesConditions

        [AllowAnonymous]
        [HttpPost("CreateRuleCondition")]
        public IActionResult CreateRuleConditions([FromBody]RuleConditionsDto tblrulesconditionDto)
        {
            // map dto to entity
            var tbl_rulescondition = _mapper.Map<TblRuleConditions>(tblrulesconditionDto);
            try
            {
                // save 
                _userService.CreateRuleCondition(tbl_rulescondition);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // Creating RuleConditionsValue
        [AllowAnonymous]
        [HttpPost("CreateRuleConditionValue")]
        public IActionResult CreateRuleConditionValue([FromBody]RuleConditionValuesDto tblrulesconditionvalueDto)
        {
            // map dto to entity
            var tbl_rulesconditionvalue = _mapper.Map<TblRuleConditionValues>(tblrulesconditionvalueDto);
            try
            {
                // save 
                _userService.CreateRuleConditionValue(tbl_rulesconditionvalue);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // Inserting into the ParamSetMapping 

        [AllowAnonymous]
        [HttpPost("CreateRuleParamSetMapping")]
        public IActionResult CreateRuleSetMapping([FromBody]RuleParamSetMappingDto tblrulesetmapDto)
        {
            // map dto to entity
            var tbl_rulesetmap = _mapper.Map<TblRuleParamSetMapping>(tblrulesetmapDto);
            try
            {
                // save
                _userService.CreateRuleSetMapping(tbl_rulesetmap);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //For Handle State 
        [AllowAnonymous]
        [HttpGet("HandleRuleState")]
        public async Task<IActionResult> HandleRuleState(decimal RuleId)
        {
            var tblrulesetmap = await _userService.HandleRuleState(RuleId);
            return Ok(tblrulesetmap);
        }

        [HttpGet("HC")]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }




    }
}