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
            //SqlConnection cnn = new SqlConnection("Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123");
            SqlConnection cnn = new SqlConnection("Data Source=edelweissdb1.coow0ess1gft.ap-south-1.rds.amazonaws.com,1433;Initial Catalog=EdelweissTest;User Id=admin;Password=micaadmin");
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
        public List<ErrorDetailsData> CheckRuleSets(String RuleId, [FromBody]dynamic dictionary_rule)
        {
            ResponseStatus response = new ResponseStatus();
            List<ErrorInfo> errorMsg = new List<ErrorInfo>();
            //List for Error and Response Value
            List<ErrorDetailsData> errorList = new List<ErrorDetailsData>();

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
                                validatorName = tblrulecondition.ValidatorName,
                                successMsg = tblrulecondition.SuccessMsg,
                                successCode = tblrulecondition.SuccessCode,
                                failureMsg = tblrulecondition.FailureMsg,
                                failureCode = tblrulecondition.FailureCode

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
                            int X=0, Y=0, Z=0;
                            if (Regex.IsMatch(rule.condition_valuefrom, @"^\d+$") && Regex.IsMatch(rule.condition_valueto, @"^\d+$"))
                            {
                                X = Convert.ToInt16(paramvalue);
                                Y = Convert.ToInt16(rule.condition_valuefrom);
                                Z = Convert.ToInt16(rule.condition_valueto);
                            }
                            else
                            {
                                var conditionValueFrom = Convert.ToInt16(dictionary_rule[rule.condition_valuefrom]);
                                var conditionValueTo = Convert.ToInt16(dictionary_rule[rule.condition_valueto]);
                                X = Convert.ToInt16(paramvalue);
                                Y = Convert.ToInt16(conditionValueFrom);
                                Z = Convert.ToInt16(conditionValueTo);
                            }
                            

                            if ((X >= Y) && (X <= Z))
                            {
                                result = true;
                                if (!result)
                                {
                                    response.ResponseMessage = "Fail";
                                    errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail" ,Message = rule.failureMsg+" "+ paramvalue + " where "+X+ " InBetwen "+"("+Y+","+Z+")",Code =rule.failureCode });
                                }
                                else
                                {
                                    response.ResponseMessage = "True";
                                    errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName, Outcome = "Success", Message = rule.successMsg+" " + paramvalue + " where " + X + " InBetwen " + "( " + Y + " , " + Z + ")", Code = rule.successCode });
                                }
                            }
                            else
                            {
                                result = false;
                                if (!result)
                                {
                                    response.ResponseMessage = "Fail";
                                    errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg+" "+paramvalue + " where " + X + " "+ rule.condition_opr+" " + "(" + Y + "," + Z + ")", Code =rule.failureCode });

                                }
                                else
                                {
                                    response.ResponseMessage = "True";
                                    errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Success", Message = rule.successMsg+" "+paramvalue + " where " + X + " " + rule.condition_opr + " " + "(" + Y + "," + Z + ")", Code= rule.successCode });

                                }
                            }

                        }
                        else {
                            
                            if (Regex.IsMatch(rule.condition_valuefrom, @"^\d+$"))
                            {
                                expandoObject.X = Convert.ToInt16(paramvalue);
                                expandoObject.Y = rule.condition_opr == "=" ? "==" : rule.condition_opr;
                                expandoObject.Z = Convert.ToInt16(rule.condition_valuefrom);
                            }
                            else
                            {
                                var conditionValueFrom = Convert.ToInt16(dictionary_rule[rule.condition_valuefrom]);
                                expandoObject.X = Convert.ToInt16(paramvalue);
                                expandoObject.Y = rule.condition_opr == "=" ? "==" : rule.condition_opr;
                                expandoObject.Z = Convert.ToInt16(conditionValueFrom);
                            }
                            result = Eval.Execute<bool>("X " + expandoObject.Y + " Z", expandoObject);
                            if (!result)
                            {
                                response.ResponseMessage = "Fail";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg +" "+paramvalue+ " where " + expandoObject.X + " " + expandoObject.Y + " " + expandoObject.Z ,Code = rule.failureCode });

                            }
                            else
                            {
                                response.ResponseMessage = "True";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg +" "+paramvalue + " where " + expandoObject.X + " " + expandoObject.Y + " " + expandoObject.Z, Code = rule.successCode });

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
                            errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Fail" ,Message = rule.failureMsg +" "+ paramvalue+ " where " + paramvalDate + " " + rule.condition_opr + " in " + rule.condition_value_fromDate+" and " + rule.condition_valueto, Code = rule.failureCode});

                        }
                        else
                        {
                            response.ResponseMessage = "Validation Done";
                            errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg +" "+paramvalue+ " where " + paramvalDate + " " + rule.condition_opr + " in " + rule.condition_value_fromDate + " and " + rule.condition_valueto, Code =rule.successCode });

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
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg+" "+paramvalue + " where " + age + " > " + rule.condition_value_fromDate , Code=rule.failureCode });

                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Success", Message = rule.successMsg+" "+paramvalue + " where " + age + " > " + rule.condition_value_fromDate, Code = rule.successCode });

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
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg+" " +paramvalue+ " where " + paramValData + " > " + rule.condition_value_fromDate, Code =rule.failureCode });

                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg +" "+paramvalue + " where " + paramValData + " > " + rule.condition_value_fromDate, Code = rule.successCode });

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
                            int count = paramvalue.Count();
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid ";
                                //For Error Message 
                                //ErrorInfo errMessage1 = new ErrorInfo();
                                //errMessage1.ErrorMessage = "Mobile Validation Fail";
                                //errorMsg.Add(errMessage1);
                                //response.Errors = errorMsg;
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Fail", Message = rule.failureMsg+" "+paramvalue +" as length is "+count,Code= rule.failureCode });
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Success", Message = rule.successMsg+" "+paramvalue , Code = rule.successCode });

                            }

                        }       
                        else if(rule.param_type == "PassportNum") { 
                            
                            var regex = @"^(?!0{3,20})[a-zA-Z0-9]{3,20}$";
                            result = Regex.IsMatch(paramvalue, regex);
                            if (!result) {
                                response.ResponseMessage = "Invalid";
                                //For Error Message 
                                //ErrorInfo errMessage2 = new ErrorInfo();
                                //errMessage2.ErrorMessage = "Passport Validation Fail";
                                //errorMsg.Add(errMessage2);
                                //response.Errors = errorMsg;

                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg+" for "+paramvalue , Code=rule.failureCode });
                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg+" for "+paramvalue , Code =rule.successCode });

                            }

                        }
                        else
                        {
                            var regex = @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$";
                            result = Regex.IsMatch(paramvalue, regex);
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Fail", Message = rule.failureMsg+" "+paramvalue + " Validation Failed",Code = rule.failureCode });

                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Success", Message = rule.successMsg +" "+paramvalue+ " Validation Success",Code=rule.successCode });

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
                                response.ResponseMessage = "Record Doesn't Exist";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg +" "+paramvalue + " Record Doesn't Exist",Code =rule.failureCode });

                            }
                            else
                            {
                                response.ResponseMessage = "Record Exists";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Success", Message = rule.successMsg +" "+paramvalue +" Record Exists",Code = rule.successCode });

                            }
                        }
                        else if (rule.condition_opr == "StartsWith")
                        {
                            result = paramvalue.ToLower().StartsWith(rule.condition_valuefrom.ToLower());
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg +" "+paramvalue+ " Validation Failed",Code =rule.failureCode });

                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg +" "+paramvalue+ " Validation Success",Code = rule.successCode });

                            }

                        }
                        else if (rule.condition_opr == "EndsWith")
                        {
                            result = paramvalue.ToLower().EndsWith(rule.condition_valuefrom.ToLower());
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Fail", Message = rule.failureMsg+" "+paramvalue + " Validation Failed" ,Code  =rule.failureCode});

                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg +" "+paramvalue+ " Validation Success",Code =rule.successCode });

                            }

                        }
                        else if (rule.condition_opr == "Substring")
                        {
                            result = paramvalue.ToLower().Contains(rule.condition_valuefrom.ToLower());
                            if (!result)
                            {
                                response.ResponseMessage = "Invalid";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Fail", Message = rule.failureMsg +" "+paramvalue +" Validation Failed" ,Code=rule.failureCode});

                            }
                            else
                            {
                                response.ResponseMessage = "Validation Done";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success", Message = rule.successMsg +" "+paramvalue+ " Validation Success",Code =rule.successCode });

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
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome ="Fail", Message = rule.failureMsg +" "+paramvalue+ " Validation Failed for "+ expandoObject.X +" " + expandoObject.Y +" " +expandoObject.Z ,Code=rule.failureCode});

                            }
                            else
                            {
                                response.ResponseMessage = "True";
                                errorList.Add(new ErrorDetailsData { ValidatorName = rule.validatorName,Outcome="Success" ,Message = rule.successMsg +" "+paramvalue+ " Validation Success " + expandoObject.X + " " + expandoObject.Y + " " + expandoObject.Z, Code =rule.successCode });

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
                                //errorList.Add(new ErrorDetailsData { ValidatorName = "Final Result", ErrorMessage = " False" });

                            }
                            else
                            {
                                response.ResponseMessage = "True";
                                //errorList.Add(new ErrorDetailsData { ValidatorName = "Final Result", ErrorMessage = " True" });

                            }

                        }
                        else
                            finalResult = (prevResult && result);
                        if (!finalResult)
                        {
                            response.Status = BusinessStatus.InputValidationFailed;
                            ///response.ResponseMessage = "False";
                            response.ResponseMessage = "Invalid";
                            //errorList.Add(new ErrorDetailsData { ValidatorName = "Final Result", ErrorMessage = " Invalid" });

                        }
                        else
                        {
                            response.Status = BusinessStatus.Ok;
                            response.ResponseMessage = "Validation Done";
                            //errorList.Add(new ErrorDetailsData { ValidatorName = "Final Result", ErrorMessage = " Validation Done" });
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
            //Returning Final Result Value 
            if (response.ResponseMessage == "Invalid" || response.ResponseMessage == "False")
            {
                errorList.Add(new ErrorDetailsData { ValidatorName = "Final Result",Outcome="Fail", Message = " Invalid",Code="10001" });
            }
            else
            {
                errorList.Add(new ErrorDetailsData { ValidatorName = "Final Result",Outcome="Success", Message = " Validation Done",Code="10002" });
            }
            return errorList;

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

        //Trial For RuleEngine
        [HttpGet("CheckTimeZone")]
        public IActionResult CheckTimeZonw(string userTimeZone, string utcDateTime)
        {
            string localDate = "";
            try
            {
                var datetoUTC = ConvertDateToUTC(localDate);

                //string userTimeZone = "India Standard Time";
                //string utcDateTime = "02-04-2020 06:19:07";
                var utctoZone = ConvertUTCToZone(utcDateTime, userTimeZone);
                var timeZone = GetDateTimeByZone(userTimeZone);

                Dictionary<string, string> dt = new Dictionary<string, string>();
                dt.Add("DateToUTC", datetoUTC.ToString());
                dt.Add("UTCToZone", utctoZone.ToString());
                dt.Add("TimeZone", timeZone.ToString());
                return Ok(dt);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message.ToString());
            }
        }

        public static DateTime ConvertUTCToZone(string utcDateTime, string userTimeZone)
        {
            DateTime dateTime = DateTime.Parse(utcDateTime);
            TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);
            DateTime zoneDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTime, TimeZone);
            return zoneDateTime;
        }
        public static DateTime ConvertDateToUTC(string userDate)
        {
            if (userDate != "")
            {
                DateTime datNowLocal = Convert.ToDateTime(userDate);
                return TimeZoneInfo.ConvertTimeToUtc(datNowLocal);
            }
            else
            {
                DateTime datNowLocal = DateTime.UtcNow;
                return datNowLocal;
            }
        }
        public static DateTime GetDateTimeByZone(string userTimeZone)
        {
            TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);
            DateTime dateTimeUTC = DateTime.UtcNow;
            DateTime zonelocalDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTimeUTC, TimeZone);
            return zonelocalDateTime;
        }
    }
}