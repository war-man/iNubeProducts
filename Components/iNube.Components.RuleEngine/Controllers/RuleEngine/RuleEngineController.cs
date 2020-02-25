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
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Dynamic;
using Z.Expressions;
using System.Reflection;
using iNube.Components.RuleEngine.Controllers.RuleConfig.RuleEngineService;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework;

namespace iNube.Components.RuleEngine.Controllers
{
    
    [Route("[controller]")]
    [ApiController]
    public class RuleEngineController : ControllerBase
    {
        private IRuleEngineService _userServiceRule;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        // For Join
        private RuleEngineContext _context_rule;

        public RuleEngineController(
            IRuleEngineService userServiceRule,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            // For Join
            RuleEngineContext context_rule)
        {
            _userServiceRule = userServiceRule;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context_rule = context_rule;
        }

        // For InListOperation
        private bool CheckRecordExistInMaster(string tableName , string colName, string value )
        {
            
            SqlConnection cnn = new SqlConnection("Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123");
            SqlCommand cmd;
            try
            {
                cnn.Open();
                String sql = "SELECT " + colName + " FROM " + tableName + " where " + colName + "='" + value + "'";
                cmd = new SqlCommand(sql, cnn);
                var res = cmd.ExecuteScalar();
                cnn.Close();
                if (res != null)
                {
                    return true;
                }
                return false;
                
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        

        // Generic Rule Conditions
        //RuleConfigCondition/Check_Rule_Condition/Veh_mm
        [HttpPost("CheckRuleSets/{RuleId}")]
        public ResponseStatus CheckRuleSets(String RuleId, [FromBody]dynamic dictionary_rule)
        {
            ResponseStatus response = new ResponseStatus();

            List<ErrorInfo> errorMsg = new List<ErrorInfo>();
            string[] words = RuleId.Split(',');
            var main_rule = from tblrules in _context_rule.TblRules
                            join tblrulecondition in _context_rule.TblRuleConditions on tblrules.RuleId equals tblrulecondition.RuleId
                            //join tblparamsetdetails in _context_rule.TblParamSetDetails on tblrulecondition.ConditionAttribute equals tblparamsetdetails.ParamSetDetailsId
                            join tblparameter in _context_rule.TblParameters on tblrulecondition.ConditionAttribute equals tblparameter.ParamId
                            //where tblrules.RuleName == RuleName
                            where words.Contains(tblrules.RuleId.ToString())
                            select new
                            {
                                rulecondition_id = tblrulecondition.RuleConditionId,
                                rule_id = tblrules.RuleId,
                                rule_name = tblrules.RuleName,
                                condition_attributes = tblparameter.ParamName,
                                param_type = tblparameter.ParamType,
                                condition_opr = tblrulecondition.ConditionOperator,
                                condition_valuefrom = tblrulecondition.ConditionValueFrom,
                                condition_valueto = tblrulecondition.ConditionValueTo,
                                condition_logical = tblrulecondition.ConditionLogicalOperator,
                                masterTableName = tblrulecondition.TableName,
                                masterColumnName = tblrulecondition.ColumnName,
                                condition_value_fromDate = tblrulecondition.FromDate,
                                condition_value_toDate = tblrulecondition.ToDate,
                                dobConditions = tblrulecondition.Dobconditions,
                            };
            
            var result = false;
            var finalResult = false;
            var prevResult = false;
            var lastOperation = "";
            int i = 0;
            foreach (var rule in main_rule)
            {
                i++;
                //var paramvalue =(string)dictionary_rule.GetType().GetProperty(rule.condition_attributes).GetValue(dictionary_rule);
                
                var paramvalue = (string)dictionary_rule[rule.condition_attributes];

                if (paramvalue != null)
                {
                    dynamic expandoObject = new ExpandoObject();
                    //string expresion = ""+paramvalue+" "+rule1.condition_operator+ " "+ rule1.condition_value_from;
                    // Change to int
                    if (rule.param_type == "Int")
                    {
                        if (rule.condition_opr == "InBetween")
                        {
                            int X = Convert.ToInt16(paramvalue);
                            int Y = Convert.ToInt16(rule.condition_valuefrom);
                            int Z = Convert.ToInt16(rule.condition_valueto);

                            if ((X >= Y) && (X <= Z))
                            {
                                result = true;
                                if (!result)
                                {
                                    response.ResponseMessage = "Fail";
                                }
                                else
                                {
                                    response.ResponseMessage = "True";
                                }
                            }
                            else
                            {
                                result = false;
                                if (!result)
                                {
                                    response.ResponseMessage = "Fail";
                                }
                                else
                                {
                                    response.ResponseMessage = "True";
                                }
                            }

                        }
                        else {
                            expandoObject.X = Convert.ToInt16(paramvalue);
                            expandoObject.Y = rule.condition_opr == "=" ? "==" : rule.condition_opr;
                            expandoObject.Z = Convert.ToInt16(rule.condition_valuefrom);

                            result = Eval.Execute<bool>("X " + expandoObject.Y + " Z", expandoObject);
                            if (!result)
                            {
                                response.ResponseMessage = "Fail";
                            }
                            else
                            {
                                response.ResponseMessage = "True";
                            }
                        }
                    }
                    // Check For DateRange
                    else if (rule.condition_opr == "DateRange")
                    {
                        var paramvalDate = Convert.ToDateTime(paramvalue);
                        result = (paramvalDate >= rule.condition_value_fromDate && paramvalDate < rule.condition_value_toDate);
                        if (!result)
                        {
                            response.ResponseMessage = "Invalid";
                        }
                        else
                        {
                            response.ResponseMessage = "Validation Done";
                        }
                    }

                    // Validation For Date and year
                    else if(rule.condition_opr == "ValidateDOB")
                    {
                        if(rule.dobConditions =="Age")
                        {
                            var paramvalDate = Convert.ToDateTime(paramvalue);
                            DateTime currentDate = DateTime.Today;
                            int age = currentDate.Year - paramvalDate.Year;
                            result = (age > Convert.ToInt32(rule.condition_valuefrom));
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }
                        }
                        else
                        {
                            var paramValData = Convert.ToDateTime(paramvalue);
                            DateTime toDate = DateTime.Today;
                            if (paramValData > toDate)
                            {
                                var days = (paramValData - toDate).TotalDays;
                                result = (Convert.ToInt32(days) > (Convert.ToInt32(rule.condition_valuefrom)));
                            }
                            else
                            {
                                var days = (toDate - paramValData).TotalDays;
                                result = (Convert.ToInt32(days) > (Convert.ToInt32(rule.condition_valuefrom)));
                            }
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }
                        }
                    }
                    // Check For Current Age
                    //else if (rule.condition_opr == "CurrentAge")
                    //{
                    //    var paramvalDate = Convert.ToDateTime(paramvalue);
                    //    int age = Convert.ToInt32(Convert.ToDateTime(rule.condition_value_toDate).Year - paramvalDate.Year);
                    //    result = (age > Convert.ToInt32(rule.condition_valueto));
                    //    if (!result)
                    //    {
                    //        response.ResponseMessage = "Invalid";
                    //    }
                    //    else
                    //    {
                    //        response.ResponseMessage = "Validation Done";
                    //    }
                    //}
                    //// Check For Validate Days
                    //else if (rule.condition_opr == "ValidateDays")
                    //{
                    //    var paramValData = Convert.ToDateTime(paramvalue);
                    //    var toDate = Convert.ToDateTime(rule.condition_value_toDate);
                    //    if(paramValData > toDate)
                    //    {
                    //        var days =(paramValData - toDate).TotalDays;
                    //        result = (Convert.ToInt32(days) > (Convert.ToInt32(rule.condition_valueto)));
                    //    }
                    //    else
                    //    {
                    //        var days = (toDate - paramValData).TotalDays;
                    //        result = (Convert.ToInt32(days) > (Convert.ToInt32(rule.condition_valueto)));
                    //    }
                    //    if (!result)
                    //    {
                    //        response.ResponseMessage = "Invalid";
                    //    }
                    //    else
                    //    {
                    //        response.ResponseMessage = "Validation Done";
                    //    }
                    //    //int days = Convert.ToInt32(Convert.ToDateTime)
                    //}

                    //Check For Partner Page Validation with Different Parameter
                    else if (rule.condition_opr == "Validate")
                    {
                        if (rule.param_type == "MobileNo")
                        {

                            var regex = @"^(?:(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$";
                            result = Regex.IsMatch(paramvalue, regex);
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid ";
                                //For Error Message 
                                ErrorInfo errMessage1 = new ErrorInfo();
                                errMessage1.ErrorMessage = "Mobile Validation Fail";
                                errorMsg.Add(errMessage1);
                                response.Errors = errorMsg;
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }

                        }       
                        else if(rule.param_type == "PassportNum") { 
                            
                            var regex = @"^(?!0{3,20})[a-zA-Z0-9]{3,20}$";
                            result = Regex.IsMatch(paramvalue, regex);
                            if (!result) {
                                response.ResponseMessage = "Invalid";
                                //For Error Message 
                                ErrorInfo errMessage2 = new ErrorInfo();
                                errMessage2.ErrorMessage = "Passport Validation Fail";
                                errorMsg.Add(errMessage2);
                                response.Errors = errorMsg;
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }

                        }
                        else
                        {
                            var regex = @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$";
                            result = Regex.IsMatch(paramvalue, regex);
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }
                        }
                    }
                    // Condition For String Case
                    else
                    {
                        if (rule.condition_opr == "IsListOf")
                        {
                            result = CheckRecordExistInMaster(rule.masterTableName, rule.masterColumnName, paramvalue);
                            if (!result)
                            {
                                response.ResponseMessage = "Record Doesn't Exit";
                            }
                            else
                            {
                                response.ResponseMessage = "Record Exists";
                            }
                        }
                        else if (rule.condition_opr == "StartsWith")
                        {
                            result = paramvalue.ToLower().StartsWith(rule.condition_valuefrom.ToLower());
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }

                        }
                        else if (rule.condition_opr == "EndsWith")
                        {
                            result = paramvalue.ToLower().EndsWith(rule.condition_valuefrom.ToLower());
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }

                        }
                        else if (rule.condition_opr == "Substring")
                        {
                            result = paramvalue.ToLower().Contains(rule.condition_valuefrom.ToLower());
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                            }
                        }

                        else
                        {
                            expandoObject.X = paramvalue;
                            expandoObject.Y = rule.condition_opr == "=" ? "==" : rule.condition_opr;
                            expandoObject.Z = rule.condition_valuefrom;

                            result = Eval.Execute<bool>("X " + expandoObject.Y + " Z", expandoObject);
                            if (!result)
                            {
                                response.ResponseMessage = "Fail";
                            }
                            else
                            {
                                response.ResponseMessage = "True";
                            }
                        }
                    }
                    
                    //result = true;
                    lastOperation = rule.condition_logical.ToLower();
                    if (i == 1)
                    {
                        prevResult = result;
                        //lastOperation = "";
                    }
                    //if (rule.condition_logical.ToLower() == "" && i == main_rule.Count())
                    {
                        // Here last was and in place of or , && in place of ||
                        if (lastOperation == "or")
                        {
                            finalResult = (prevResult || result);
                            if (!finalResult)
                            {
                                response.ResponseMessage = "False";
                            }
                            else
                            {
                                response.ResponseMessage = "True";
                            }

                        }
                        else
                            finalResult = (prevResult && result);
                        if (!finalResult)
                        {
                            response.Status = BusinessStatus.InputValidationFailed;
                            ///response.ResponseMessage = "False";
                            response.ResponseMessage = "Invalid";
                            
                        }
                        else
                        {
                            response.Status = BusinessStatus.Ok;
                            response.ResponseMessage = "Validation Done";
                        }
                        // return finalResult;
                    }

                    //else if (i == 1)
                    //{
                    //    if (lastOperation == "and")
                    //    {
                    //        if (!result)
                    //        {
                    //            return false;
                    //        }
                    //    }
                    //}
                    //else
                    //{
                    //    if (lastOperation == "and")
                    //    {
                    //        finalResult = (prevResult && result);
                    //        if (!finalResult)
                    //        {
                    //            return false;
                    //        }
                    //    }
                    //    else
                    //        finalResult = (prevResult || result);
                    //    prevResult = finalResult;
                    //}
                }
            }
            return response;


        }


        // Method for RuleWIthIdConditionAttributes
        [HttpGet("GetAllRulesWithParam")]
        public IActionResult GetAllRulesWithParam()
        {
            var rule = from tblRuleCondition in _context_rule.TblRuleConditions
                       join tblRules in _context_rule.TblRules on tblRuleCondition.RuleId equals tblRules.RuleId
                       join tblParameters in _context_rule.TblParameters on tblRuleCondition.ConditionAttribute equals tblParameters.ParamId
                       select new
                       {
                           rule_id = tblRules.RuleId,
                           ruleName = tblRules.RuleName,
                           startDate = tblRules.StartDate,
                           endDate = tblRules.EndDate,
                           conditionAttributes = tblRuleCondition.ConditionAttribute,
                           paramId = tblParameters.ParamId,
                           paramName = tblParameters.ParamName,
                           conditionOperator = tblRuleCondition.ConditionOperator,
                           conditionValue = tblRuleCondition.ConditionValueFrom
                       };

            return Ok(rule);
        }

        //Method For RuleConfigMasterDropDown
        [HttpGet("GetAllParamSetDetailsWithParamId")]
        public IActionResult GetAllParamSetDetailWithId()
        {
            var main_rule = from tblParamSetDetails in _context_rule.TblParamSetDetails
                            join tblParameter in _context_rule.TblParameters on tblParamSetDetails.ParamId equals tblParameter.ParamId

                            select new
                            {
                                paramSetDetail_id = tblParamSetDetails.ParamSetDetailsId,
                                paramSetId = tblParamSetDetails.ParamSetId,
                                paramId = tblParamSetDetails.ParamId,
                                paramName = tblParameter.ParamName
                            };

            return Ok(main_rule);
        }

        // Method for RuleWIthIdConditionAttributes
        [HttpGet("GetAllRulesForGrid")]
        public IActionResult GetAllRulesGridView()
        {
            var rule = from tblRuleCondition in _context_rule.TblRuleConditions
                       join tblRules in _context_rule.TblRules on tblRuleCondition.RuleId equals tblRules.RuleId
                       join tblParameters in _context_rule.TblParameters on tblRuleCondition.ConditionAttribute equals tblParameters.ParamId
                       select new
                       {
                           rule_id = tblRules.RuleId,
                           ruleName = tblRules.RuleName,
                           startDate = tblRules.StartDate,
                           endDate = tblRules.EndDate,
                           conditionAttributes = tblRuleCondition.ConditionAttribute,
                           paramName = tblParameters.ParamName,
                           conditionOperator = tblRuleCondition.ConditionOperator,
                           conditionValue = tblRuleCondition.ConditionValueFrom,
                           conditionvalueto = tblRuleCondition.ConditionValueTo,
                           tableName = tblRuleCondition.TableName,
                           columnName = tblRuleCondition.ColumnName,
                           FromDate = tblRuleCondition.FromDate,
                           ToDate= tblRuleCondition.ToDate,
                           conditionLogicOperator = tblRuleCondition.ConditionLogicalOperator
                       };

            return Ok(rule);
        }
        //Method For RuleConfigMasterDropDown
        [HttpGet("GetAllParamSetDetailsGrid")]
        public IActionResult GetAllParamSetDetailGridView()
        {
            var main_rule = from tblParamSetDetails in _context_rule.TblParamSetDetails
                            join tblParameter in _context_rule.TblParameters on tblParamSetDetails.ParamId equals tblParameter.ParamId
                            join tblParamSet in _context_rule.TblParamSet on tblParamSetDetails.ParamSetId equals tblParamSet.ParamSetId

                            select new
                            {
                                paramSetId = tblParamSetDetails.ParamSetId,
                                paramSetName = tblParamSet.ParamSetName,
                                paramId = tblParamSetDetails.ParamId,
                                paramName = tblParameter.ParamName
                            };

            return Ok(main_rule);
        }


        // Get All RuleCondition With Parameters
        [HttpGet("GetAllRulesWithParameterById")]
        public IActionResult GetAllRulesWithParameterById( int RulesId)
        {
            var rule = from tblRuleCondition in _context_rule.TblRuleConditions
                       join tblRules in _context_rule.TblRules on tblRuleCondition.RuleId equals tblRules.RuleId
                       join tblParameters in _context_rule.TblParameters on tblRuleCondition.ConditionAttribute equals tblParameters.ParamId
                       where tblRules.RuleId == RulesId 
                       select new
                       {
                           rule_id = tblRules.RuleId,
                           ruleName = tblRules.RuleName,
                           paramName = tblParameters.ParamName,
                       };
     
            return Ok(rule);
        }
    }
}