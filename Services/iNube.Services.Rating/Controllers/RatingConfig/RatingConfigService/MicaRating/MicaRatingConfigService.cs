using AutoMapper;
using iNube.Services.Rating.Entities;
using iNube.Services.Rating.Helpers;
using iNube.Services.Rating.Models;
using iNube.Services.Accounting.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Data;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using Microsoft.Extensions.Configuration;
using iNube.Utility.Framework.LogPrivider.LogService;
using System.Reflection;
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.IntegrationServices;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Net.Http.Headers;
using OfficeOpenXml;

namespace iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.MicaRating
{
    public class MicaRatingConfigService : IRatingConfigService
    {
        private MICARTContext _context = null;
        private IMapper _mapper;
        public IIntegrationService _integrationService;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IRatingConfigService> _ratingService;
        private IConfiguration _configuration;
        private ILoggerManager _logger;
        public MicaRatingConfigService(Func<string, IRatingConfigService> ratingService, ILoggerManager logger, IMapper mapper, MICARTContext context, IConfiguration configuration, IIntegrationService integrationService,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _configuration = configuration;
            _appSettings = appSettings.Value;
            _integrationService = integrationService;
            /// _context = context;
            _ratingService = ratingService;
            _logger = logger;
        }

        //Service COde 
        //Creation of RatingParameters
        public async Task<RatingParameterResponce> CreateRatingParameter(RatingParametersDTO ratingParaDto, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var dto = _mapper.Map<TblRatingParameters>(ratingParaDto);
                _context.TblRatingParameters.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<RatingParametersDTO>(dto);
                return new RatingParameterResponce { Status = BusinessStatus.Created, ResponseMessage = $"Parameters successfully created! \n Parameter Name: {acntDTO.ParameterName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        //Creation of ParamSetDetails
        public async Task<ParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var dto = _mapper.Map<TblParameterSet>(paramSetDto);
                _context.TblParameterSet.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<ParameterSetDTO>(dto);
                return new ParamSetResponce { Status = BusinessStatus.Created, ResponseMessage = $"Configuration of Parameter Succesfully Done! \n Rating Config Name: {acntDTO.ParameterSetName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }

        public async Task<RatingRulesResponse> CreateRatingRules(RatingDTO ratingDto, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }

            if (ratingDto.RateObj != "")
            {
                RatingDetailDTO ratingDetails = new RatingDetailDTO();
                var name = _context.TblParameterSet.Where(x => x.ParameterSetId == Convert.ToInt32(ratingDto.RateObj)).Select(x => x.ParameterSetName).Single();


                //var name = _context.TblParameterSet.Where(x => x.ParameterSetId == Convert.ToInt32(ratingDto.RateObj)).Select(x => x.ParameterSetName).Single();

                Dictionary<decimal, String> dict = new Dictionary<decimal, string>();
                var parameterDetails = (from tblRateSet in _context.TblParameterSet
                                        join tblSetDetails in _context.TblParameterSetDetails on tblRateSet.ParameterSetId equals tblSetDetails.ParameterSetId
                                        join tblParamerer in _context.TblRatingParameters on tblSetDetails.ParametersId equals tblParamerer.ParametersId
                                        where tblRateSet.ParameterSetName == name
                                        // where tblRateSet.ParameterSetId == Convert.ToInt32(ratingDto.RateObj)
                                        select new ParameterList
                                        {
                                            RatingParameterId = tblParamerer.ParametersId,
                                            RatingParamName = tblParamerer.ParameterName
                                        }).ToList();

                try
                {
                    if (ratingDto.IsParameter == false)
                    {

                    }
                    else
                    {

                        try
                        {
                            foreach (var item in ratingDto.DynamicList)
                            {
                                foreach (var itemDetail in item)
                                {
                                    // Create object for RatingRulesDTO
                                    RatingRulesDTO ratingRulesDTO = new RatingRulesDTO();

                                    foreach (var property in itemDetail)
                                    {
                                        if (property.Name.ToString() == "Rate")
                                        {
                                            ratingRulesDTO.Rate = property.Value.ToString();
                                        }
                                        else
                                        {
                                            RatingRuleConditionsDTO ruleConditionsDTO = new RatingRuleConditionsDTO();
                                            var str = property.Name.ToString();
                                            var result = str.Substring(str.Length - 2);
                                            if (result == "To")
                                            {
                                                ruleConditionsDTO.ConditionValueTo = property.Value.ToString();
                                            }
                                            else
                                            {
                                                ruleConditionsDTO.ConditionValueFrom = property.Value.ToString();
                                            }

                                            var spl = property.Name.Split(' ')[0];
                                            //foreach(var i in parameterDetails)
                                            //{
                                            //    if(i.RatingParamName == spl.ToString())
                                            //    {
                                            //        ruleConditionsDTO.RatingParameters = i.RatingParameterId;

                                            //    }
                                            //}
                                            try
                                            {
                                                ruleConditionsDTO.RatingParameters = parameterDetails.First(it => it.RatingParamName.Remove(it.RatingParamName.Length - 1) == spl.ToString()).RatingParameterId;//add
                                                ratingRulesDTO.RatingRuleConditions.Add(ruleConditionsDTO);
                                            }
                                            catch (Exception ex)
                                            {
                                                ruleConditionsDTO.RatingParameters = parameterDetails.First(it => it.RatingParamName == spl.ToString()).RatingParameterId;//add
                                                ratingRulesDTO.RatingRuleConditions.Add(ruleConditionsDTO);
                                            }
                                        }
                                    }
                                    ratingDto.RatingRules.Add(ratingRulesDTO);
                                }
                            }
                        }
                        catch (Exception ex)
                        {


                        }


                        var res = 1;
                    }

                    var dto = _mapper.Map<TblRating>(ratingDto);
                    // dto.DynamicList.push();
                    //dto[0]. = ratingDto[0].RatingRules[0].RatingRuleConditions;
                    dto.RateObj = _context.TblParameterSet.First(x => x.ParameterSetId == Convert.ToInt32(ratingDto.RateObj)).ParameterSetName;
                    _context.TblRating.Add(dto);
                    _context.SaveChanges();
                    var acntDTO = _mapper.Map<RatingDTO>(dto);
                    return new RatingRulesResponse { Status = BusinessStatus.Created, ResponseMessage = $"Rules Conditions Succesfully Done! \n Rating Config Name: {acntDTO.RatingId}" };

                }
                catch (Exception ex)
                {

                }
                //if
            }
            else
            {
                try
                {
                    var dto = _mapper.Map<TblRating>(ratingDto);
                    // dto.DynamicList.push();
                    //dto[0]. = ratingDto[0].RatingRules[0].RatingRuleConditions;
                    //dto.RateObj = _context.TblParameterSet.First(x => x.ParameterSetId == Convert.ToInt32(ratingDto.RateObj)).ParameterSetName;
                    _context.TblRating.Add(dto);
                    _context.SaveChanges();
                    var acntDTO = _mapper.Map<RatingDTO>(dto);
                    return new RatingRulesResponse { Status = BusinessStatus.Created, ResponseMessage = $"Rules Conditions Succesfully Done! \n Rating Config Name: {acntDTO.RatingId}" };
                }
                catch (Exception ex)
                {

                }

            }

            return null;
        }


        public async Task<CalConfigResponse> CreateCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var dto = _mapper.Map<TblCalculationConfig>(calConfigDto);
                _context.TblCalculationConfig.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<CalculationConfigDTO>(dto);
                return new CalConfigResponse { Status = BusinessStatus.Created, ResponseMessage = $"Calculation Configuration Succesfully Done! \n Cal Config Name: {acntDTO.CalculationConfigName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<EllConfigResponse> CreateIllustrationRules(IllustrationConfigDTO ellConfigDto, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var dto = _mapper.Map<TblIllustrationConfig>(ellConfigDto);
                _context.TblIllustrationConfig.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<IllustrationConfigDTO>(dto);
                return new EllConfigResponse { Status = BusinessStatus.Created, ResponseMessage = $"Illustration Configuration Succesfully Done! \n Cal Ellustration Name: {acntDTO.IllustrationConfigName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }


        public async Task<IEnumerable<RatingDTO>> GetRules(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var param_list = _context.TblRating.ToList();
                IEnumerable<RatingDTO> parameterDTOS;
                parameterDTOS = param_list.Select(c => new RatingDTO
                {
                    RatingId = c.RatingId,
                    RateName = c.RateName,
                    CreatedDate = c.CreatedDate,
                    IsActive = c.IsActive
                });
                return parameterDTOS;
            }
            catch (Exception ex)
            {
            }
            return null;
        }
        public async Task<IEnumerable<RatingParametersDTO>> GetParameterName(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                var param_list = _context.TblRatingParameters.ToList();
                IEnumerable<RatingParametersDTO> parameterDTOS;
                parameterDTOS = param_list.Select(c => new RatingParametersDTO
                {
                    ParametersId = c.ParametersId,
                    ParameterName = c.ParameterName,
                    ParameterType = c.ParameterType,
                    ParameterMasterLink = c.ParameterMasterLink,
                    CreatedDate = c.CreatedDate,
                    IsActive = c.IsActive
                });
                return parameterDTOS;
            }
            catch (Exception ex)
            {
            }
            return null;
        }

        public async Task<IEnumerable<RuleConditionsDetailsDTO>> GetRateConditions(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var ruleConditionList = from tblRules in _context.TblRating
                                    join tblConditions in _context.TblRatingRuleConditions on tblRules.RatingId equals tblConditions.RatingRuleId
                                    join tblRatingRules in _context.TblRatingRules on tblRules.RatingId equals tblRatingRules.RatingId
                                    join tblParameter in _context.TblRatingParameters on tblConditions.RatingParameters equals tblParameter.ParametersId
                                    select new RuleConditionsDetailsDTO
                                    {
                                        RatingRuleId = tblRules.RatingId,
                                        ParameterSetObj = tblRules.RateObj,
                                        RuleName = tblRules.RateName,
                                        Rate = tblRatingRules.Rate,
                                        RateType = tblRules.RateType,
                                        IsParameter = tblRules.IsParameter,
                                        RatingParameters = tblConditions.RatingParameters,
                                        RatingParameterName = tblParameter.ParameterName,
                                        ConditionValueFrom = tblConditions.ConditionValueFrom,

                                    };
            var rateConditionList = _mapper.Map<IEnumerable<RuleConditionsDetailsDTO>>(ruleConditionList);
            return rateConditionList;
        }

        //RuleExecution
        public async Task<ResponseStatus> CheckRuleSets(String RuleId, dynamic dictionary_rule, ApiContext apiContext)
        {
            ResponseStatus response = new ResponseStatus();
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //Get rateObjFOr particular and IN main_rule Where condition is added
            var ruleObj = (from tblrate in _context.TblRating.Where(r => r.RatingId == Convert.ToDecimal(RuleId))
                           join tblParamset in _context.TblParameterSet on tblrate.RateObj equals tblParamset.ParameterSetName
                           select new
                           {
                               ObjID = tblParamset.ParameterSetId
                           }).FirstOrDefault();
            string[] words = RuleId.Split(',');
            var main_rule = (from tblrate in _context.TblRating.Where(r => r.RatingId == Convert.ToDecimal(RuleId))
                             join tblratingcondition in _context.TblRatingRules on tblrate.RatingId equals tblratingcondition.RatingId
                             join tblrulecondition in _context.TblRatingRuleConditions on tblratingcondition.RatingRuleId equals tblrulecondition.RatingRuleId
                             join tblparameter in _context.TblRatingParameters on tblrulecondition.RatingParameters equals tblparameter.ParametersId
                             join tblparamsetdetails in _context.TblParameterSetDetails.Where(it => it.ParameterSetId == ruleObj.ObjID)
                             on tblparameter.ParametersId equals tblparamsetdetails.ParametersId
                             select new
                             {
                                 rulecondition_id = tblrulecondition.RatingRuleConditionId,
                                 rule_id = tblrate.RatingId,
                                 rule_name = tblrate.RateName,
                                 ParamSetObj = tblrate.RateObj,
                                 RatingParameter = tblparameter.ParameterName,
                                 param_type = tblparameter.ParameterType,
                                 condition_valuefrom = tblrulecondition.ConditionValueFrom,
                                 IsParameter = tblrate.IsParameter,
                                 ParameterId = tblparameter.ParametersId,
                                 ParamName = tblparameter.ParameterName,
                                 IsRange = tblparamsetdetails.RangeType
                             }).ToList();

            //Storing Value in Dictionary
            Dictionary<string, string> dict = new Dictionary<string, string>();

            if (main_rule.Count() == 0)
            {
                try
                {
                    //var Rate = 0;
                    var single_Rule = (from tblrules in _context.TblRating
                                       where tblrules.RatingId == Convert.ToDecimal(RuleId)
                                       select new
                                       {
                                           rule_id = tblrules.RatingId,
                                           rule_name = tblrules.RateName,
                                           ParamSetObj = tblrules.RateObj,
                                           IsParameter = tblrules.IsParameter
                                       }).ToList().FirstOrDefault();

                    var RatingRuleId = (int)single_Rule.rule_id;
                    //string connectionString = _configuration.GetConnectionString("DefaultConnection");
                    //string connectionString = "Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;";

                    DbHelper dbHelper = new DbHelper(new IntegrationService(_configuration, new LoggerManager(_configuration)));
                    string connectionString = dbHelper.GetEnvironmentConnectionAsync(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType)).Result;

                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        string queryForCol = "select Rate from [RT].[tblRating] where RatingID =" + RatingRuleId;
                        connection.Open();
                        using (SqlCommand command = new SqlCommand(queryForCol, connection))
                        {
                            SqlDataReader reader = command.ExecuteReader();
                            while (reader.Read())
                            {
                                int columNumber = 0;
                                response.ResponseMessage = (string)reader[columNumber];
                                //response.ResponseMessage = Rate.ToString();
                            }
                        }
                        connection.Close();
                    }
                    //foreach (var ruleRate in single_Rule)
                    //{
                    //    var RatingRuleId = (int)ruleRate.rule_id;
                    //    string connectionString = "Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;";
                    //    using (SqlConnection connection = new SqlConnection(connectionString))
                    //    {
                    //        string queryForCol = "select Rate from [RT].[tblRating] where RatingID =" + RatingRuleId;
                    //        connection.Open();
                    //        using (SqlCommand command = new SqlCommand(queryForCol, connection))
                    //        {
                    //            SqlDataReader reader = command.ExecuteReader();
                    //            while (reader.Read())
                    //            {
                    //                int columNumber = 0;
                    //                response.ResponseMessage = (string)reader[columNumber];
                    //                //response.ResponseMessage = Rate.ToString();
                    //            }
                    //        }
                    //        connection.Close();
                    //    }
                    //}
                }
                catch (Exception ex)
                {

                }
            }

            else
            {
                //Check Param to Check Parameter 
                //var checkIsParam = (from tblRateParamSetDetails in _context.TblParameterSetDetails
                //                    join tblParam in _context.TblRatingParameters on tblRateParamSetDetails.ParametersId equals tblParam.ParametersId
                //                    select new
                //                    {
                //                        ParameterId = tblRateParamSetDetails.ParametersId,
                //                        ParamName = tblParam.ParameterName,
                //                        IsRange = tblRateParamSetDetails.RangeType
                //                    }).ToList().Distinct();

                string condition = "";
                string paramvalue = "";
                int count = 0;
                int checkCount = 0;
                for (int i = 0; i < main_rule.Count(); i++)
                {
                    if (!dict.ContainsKey(main_rule[i].RatingParameter))
                    {
                        dict.Add(main_rule[i].RatingParameter, (string)dictionary_rule[main_rule[i].RatingParameter]);
                    }
                }
                //foreach (var countVar in dict)
                //{
                //    count = count + 1;
                //}
                count = dict.Count;
                foreach (var itemdict in dict)
                {
                    var itemParamRange = main_rule.FirstOrDefault(r => r.ParamName == itemdict.Key);
                    //foreach (var itemParamRange in main_rule)
                    //{
                    //if (itemdict.Key == itemParamRange.ParamName)
                    //{
                    if (itemParamRange.IsRange == "Yes")
                    {
                        if (checkCount < count - 1)
                        {
                            paramvalue = itemdict.Value + " " + "between" + " " + "CONVERT(numeric(10,2)," + itemdict.Key + "From" + ")" + " " + "and" + " " + "CONVERT(numeric," + itemdict.Key + "To" + ")" + " " + "and" + " ";
                        }
                        else
                        {
                            paramvalue = itemdict.Value + " " + "between" + " " + "CONVERT(numeric(10,2)," + itemdict.Key + "From" + ")" + " " + "and" + " " + "CONVERT(numeric," + itemdict.Key + "To" + ")" + " ";
                        }
                        checkCount = checkCount + 1;
                        condition = String.Concat(condition, paramvalue);
                    }
                    else
                    {
                        //Change to Down
                        //checkCount = checkCount + 1;
                        // + " " + "and" + " "
                        if (checkCount < count - 1)
                        {
                            paramvalue = itemdict.Key + "From" + '=' + '\'' + '\'' + itemdict.Value + '\'' + '\'' + " " + "and" + " ";
                        }
                        else
                        {
                            paramvalue = itemdict.Key + "From" + '=' + '\'' + '\'' + itemdict.Value + '\'' + '\'';
                        }
                        checkCount = checkCount + 1;
                        condition = String.Concat(condition, paramvalue);
                    }
                    //    }
                    //}
                }


                condition = condition.Trim('"');
                //Main
                int countMainRule = 0;
                foreach (var rule in main_rule.Where(r => r.IsParameter == true))
                {
                    if (countMainRule == 0)
                    {
                        try
                        {
                            var RatingRuleId = (int)rule.rule_id;
                            string connectionString = _configuration.GetConnectionString("DefaultConnection");
                            //string connectionString = "Server=inubepeg.database.windows.net;Database=MICADev;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;";
                            using (SqlConnection connection = new SqlConnection(connectionString))
                            {
                                string queryForCol = "DECLARE @columns NVARCHAR(MAX) = '' ,@sql NVARCHAR(MAX) = '';SELECT @columns+=QUOTENAME(RatingParameters) + ',' from (Select t1.RatingID,t1.RateObj,t1.RateName,t4.Rate, t3.ParameterName+(case when t2.ConditionValueFrom is Not Null Then 'From' when t2.ConditionValueTo is Not Null then 'To' End) as  RatingParameters , IsNull(t2.ConditionValueFrom,t2.ConditionValueTo) as Value From [RT].[tblRating] t1  inner join [RT].[tblRatingRules] t4 on t1.RatingID = t4.RatingID inner join [RT].[tblRatingRuleConditions] t2 on t2.RatingRuleID = t4.RatingRuleID join [RT].[tblRatingParameters] t3 on  t3.ParametersID = t2.RatingParameters) as B where B.RatingID = " + RatingRuleId + " group by B.RatingParameters SET @columns = LEFT(@columns, LEN(@columns) - 1); set @sql = 'select Rate from ( select B.RatingID,B.RateObj,B.RateName,B.Rate,B.RatingParameters,B.Value,B.RatingRuleID from (Select t1.RatingID,t1.RateObj,t1.RateName,t4.Rate,t4.RatingRuleID, t3.ParameterName+(case when t2.ConditionValueFrom is Not Null Then ''From'' when t2.ConditionValueTo is Not Null then ''To'' End) as  RatingParameters , IsNull(t2.ConditionValueFrom,t2.ConditionValueTo) as Value From [RT].[tblRating] t1 inner join [RT].[tblRatingRules] t4 on t1.RatingID = t4.RatingID inner join [RT].[tblRatingRuleConditions] t2 on t2.RatingRuleID = t4.RatingRuleID join [RT].[tblRatingParameters] t3 on  t3.ParametersID = t2.RatingParameters) as B ) t PIVOT (max(Value) for RatingParameters in ('+ @columns +')) as pvt where RatingID =''" + RatingRuleId + "'' and " + condition + "' EXECUTE sp_executesql @sql;";
                                connection.Open();
                                using (SqlCommand command = new SqlCommand(queryForCol, connection))
                                {
                                    SqlDataReader reader = command.ExecuteReader();
                                    while (reader.Read())
                                    {
                                        int columNumber = 0;
                                        response.ResponseMessage = (string)reader[columNumber];
                                        //response.ResponseMessage = Rate.ToString();
                                    }
                                }
                                connection.Close();
                            }
                        }
                        catch (Exception ex)
                        {
                            countMainRule++;
                        }
                        countMainRule++;
                    }
                }
            }
            return response;
        }

        public async Task<object> CheckCalculationRate(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext)
        {
            ResponseStatus errorResponse = new ResponseStatus();
            ResponseStatus response = new ResponseStatus();
            ResponseStatus rateresponse = new ResponseStatus();
            List<CalculationResult> calcultion = new List<CalculationResult>();
            try
            {
                _logger.LogRequest("Rating", "Rating", response.ToString(), "_context---Before",null, new ApiContext() { ProductType = "Mica", ServerType = "297" });


                if (_context == null)
                {
                    _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                }

                _logger.LogRequest("Rating", "Rating", _context.ToString(), "_context---After", null,new ApiContext() { ProductType = "Mica", ServerType = "297" });


                var Expression = _context.TblCalculationConfigExpression.Where(item => item.CalculationConfigId == Convert.ToDecimal(CalculationConfigId)).OrderBy(it => it.Steps);
                //For ODSI RUles
                var CalculationConigParam = _context.TblCalculationConfigParam.Where(item => item.Type == "Rate" && item.CalculationConfigId == Convert.ToDecimal(CalculationConfigId));

                var ConfigParamName = "";
                var ConfigId = "";
                Dictionary<string, object> rate = new Dictionary<string, object>();
                //Sending of Particular Array for for Rate Execution


                Dictionary<string, object> dictSendingValue = new Dictionary<string, object>();
                bool isPrefix = false;
                if (CalculationConigParam.Count() > 1)
                {
                    isPrefix = true;
                }
                var ratingNameList = CalculationConigParam.Select(r => r.CalculationConfigParamName).ToArray();
                //var ratingList = _context.TblRating.Where(item => ratingNameList.Contains(item.RateName));

                var ruleParameterss = (from tblRate in _context.TblRating.Where(c => ratingNameList.Contains(c.RateName))
                                       join tblRateRule in _context.TblRatingRules on tblRate.RatingId equals tblRateRule.RatingId
                                       join tblRateConditions in _context.TblRatingRuleConditions on tblRateRule.RatingRuleId equals tblRateConditions.RatingRuleId
                                       join tblParameter in _context.TblRatingParameters on tblRateConditions.RatingParameters equals tblParameter.ParametersId
                                       select new
                                       {
                                           RateId = tblRate.RatingId,
                                           RatingName = tblRate.RateName,
                                           RateParameter = tblParameter.ParameterName
                                       }).ToList();
                string ratingId = "";
                foreach (var calParam in CalculationConigParam)
                {
                    ConfigParamName = calParam.CalculationConfigParamName;//rating name
                    var ruleParameters = ruleParameterss.Where(item => item.RatingName == ConfigParamName).ToList();
                    if (ruleParameters.Count > 0)
                    {

                        //Add into dictionary here only 
                        //try
                        //{
                        dynamic sendRate = new ExpandoObject();
                        foreach (var sendDicItem in ruleParameters)
                        {
                            var paramName = sendDicItem.RateParameter;
                            if (isPrefix)
                            {
                                paramName = sendDicItem.RatingName + "_" + paramName;
                            }
                            var value = dynamic.dictionary_rate[paramName];
                            AddProperty(sendRate, sendDicItem.RateParameter, value.ToString());
                            ratingId = sendDicItem.RateId.ToString();
                        }
                        //Previous Code
                        //rateresponse = await CheckRuleSets(ConfigId, dynamic.dictionary_rate, apiContext);
                        dynamic serlise = JsonConvert.SerializeObject(sendRate);
                        dynamic dcRateExec = JsonConvert.DeserializeObject(serlise);
                        rateresponse = await CheckRuleSets(ratingId, dcRateExec, apiContext);
                        if (!rate.ContainsKey(ConfigParamName))
                        {
                            rate.Add(ConfigParamName, rateresponse.ResponseMessage);
                        }
                        //}
                        //catch(Exception ex)
                        //{
                        //    errorResponse.ResponseMessage = "Incorrect Input Rate Parameter";
                        //    return errorResponse;
                        //}
                    }
                    else
                    {
                        //try
                        //{
                        dynamic sendRate = new ExpandoObject();
                        var rating = _context.TblRating.FirstOrDefault(item => item.RateName == ConfigParamName);
                        ratingId = rating.RatingId.ToString();
                        dynamic serlise = JsonConvert.SerializeObject(sendRate);
                        dynamic dcRateExec = JsonConvert.DeserializeObject(serlise);
                        rateresponse = await CheckRuleSets(rating.RatingId.ToString(), dcRateExec, apiContext);
                        if (!rate.ContainsKey(ConfigParamName))
                        {
                            rate.Add(ConfigParamName, rateresponse.ResponseMessage);
                        }
                        //}
                        //catch(Exception ex)
                        //{
                        //    errorResponse.ResponseMessage = "Incorrect Input Rate Parameter";
                        //    return errorResponse;
                        //}
                    }
                }

                //Convert Json in Dictionary 
                string json = Convert.ToString(dynamic.dictionary_rule);
                Dictionary<string, object> json_Dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);

                string json_rate = Convert.ToString(dynamic.dictionary_rate);
                Dictionary<string, object> jsonRate_Dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(json_rate);


                foreach (var dict in jsonRate_Dictionary)
                {
                    json_Dictionary.Add(dict.Key, dict.Value);
                    calcultion.Add(new CalculationResult { Entity = dict.Key, EValue = dict.Value.ToString() });
                }
                //try
                //{
                foreach (var dictrate in rate)
                {
                    json_Dictionary.Add(dictrate.Key, dictrate.Value);
                    calcultion.Add(new CalculationResult { Entity = dictrate.Key, EValue = dictrate.Value.ToString() });
                }
                //}
                //catch(Exception ex)
                //{
                //    errorResponse.ResponseMessage = "Incorrect Input Rate Parameter";
                //    return errorResponse;
                //}

                var expression = "";
                var resultExpression = "";

                //try
                //{
                foreach (var rateitem in Expression)
                {

                    expression = rateitem.ExpressionValue;
                    resultExpression = Replace(expression, json_Dictionary);
                    double result = Convert.ToDouble(new DataTable().Compute(resultExpression, null));
                    calcultion.Add(new CalculationResult { Entity = rateitem.ExpressionResult, EValue = result.ToString() });
                    json_Dictionary.Add(rateitem.ExpressionResult, result.ToString());


                    //calcultion.Add(new CalculationResult { Entity = rateitem.ExpressionResult, EValue = (Math.Round((Convert.ToDecimal(result)), 2)).ToString("0.00")
                    //{
                    //    json_Dictionary.Add(tr.Entity, tr.EValue);
                    //}
                    //foreach (var returnVal in json_Dictionary)
                    //{
                    //    calcultion.Add(new CalculationResult { Entity = returnVal.Key, EValue = returnVal.Value.ToString() });
                    //}
                }
                //}
                //catch(Exception ex)
                //{
                //    //calcultion.Add(new CalculationResult { Entity = "Error", EValue = "Incorrect Input Parameter" });
                //    //return calcultion.ToList();
                //    errorResponse.ResponseMessage = "Incorrect Input Parameter";
                //    return errorResponse;
                //}

                //Dictionary<string, string> myResult = new Dictionary<string, string>();
                //foreach (var dicItem in calcultion)
                //{
                //    if (!myResult.ContainsKey(dicItem.Entity))
                //    {
                //        myResult.Add(dicItem.Entity, dicItem.EValue);
                //    }
                //}
                //calcultion.Clear();
                //foreach (var dicIyemData in myResult)
                //{
                //    calcultion.Add(new CalculationResult { Entity = dicIyemData.Key, EValue = dicIyemData.Value.ToString() });
                //}
            }
            catch (Exception ex)
            {
                // _logger.LogError(ex, "RatingConfig", MethodBase.GetCurrentMethod().Name, null, null, apiContext);
                _logger.LogRequest("Rating", "Rating", ex.ToString(), "CatchBlock-Rating-Final",null, new ApiContext() { ProductType = "Mica", ServerType = "297" });

                errorResponse.ResponseMessage = "Incorrect Input Parameter";
                return errorResponse;
            }
            return calcultion.ToList();
            //return reslt.ToList();
        }

        //Illustration Execution 
        public async Task<object> CheckIllustration(String IllustrationConfigId, int From, int To, dynamic illustration_Param, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
                var illustrationDetails = _context.TblIllustrationConfig.Where(i => i.IllustrationConfigId == Convert.ToDecimal(IllustrationConfigId)).Include(add => add.TblIllustrationConfigParam).Include(add => add.TblIllustrationMapping);
                Dictionary<string, dynamic> dictResult = new Dictionary<string, dynamic>();
                List<Dictionary<string, dynamic>> MyResultList = new List<Dictionary<string, dynamic>>();
                var calConfig = from tblcalConfig in _context.TblCalculationConfig
                                select new
                                {
                                    CalculationConfigId = tblcalConfig.CalculationConfigId,
                                    CalculationConfigName = tblcalConfig.CalculationConfigName
                                };
                foreach (var item in illustrationDetails)
                {
                    string calculationConfigId = "";
                    foreach (var it in item.TblIllustrationConfigParam)
                    {
                        foreach (var c in calConfig)
                        {
                            if (c.CalculationConfigName == it.IllustrationConfigParamName)
                            {
                                calculationConfigId = c.CalculationConfigId.ToString();
                            }
                        }
                    }
                    //int flag = 0;
                    JObject parent = new JObject();
                    JObject child1 = new JObject();
                    JObject child2 = new JObject();
                    //JObject child2 = new JObject();
                    for (int i = From; i <= To; i++)
                    {
                        //if(flag ==0)
                        //{
                        int check = 0;
                        int checkRate = 0;
                        foreach (var ad in item.TblIllustrationConfigParam)
                        {
                            if (ad.Type == "Param")
                            {
                                if (check == 0)
                                {
                                    var value = illustration_Param[ad.IllustrationConfigParamName];
                                    child1 = new JObject(
                                            new JProperty(ad.IllustrationConfigParamName, value));
                                    check++;
                                }
                                else
                                {
                                    var value = illustration_Param[ad.IllustrationConfigParamName];
                                    child1.Add(new JProperty(ad.IllustrationConfigParamName, value));
                                }
                            }
                            if (ad.Type == "Rate")
                            {
                                if (checkRate == 0)
                                {
                                    var value = illustration_Param[ad.IllustrationConfigParamName];
                                    child2 = new JObject(
                                            new JProperty(ad.IllustrationConfigParamName, value));
                                    checkRate++;
                                }
                                else
                                {
                                    var value = illustration_Param[ad.IllustrationConfigParamName];
                                    child2.Add(new JProperty(ad.IllustrationConfigParamName, value));
                                }
                            }
                        }
                        parent = new JObject(
                                       new JProperty("dictionary_rule", child1));
                        parent.Add(new JProperty("dictionary_rate", child2));
                        var SendJSON = JsonConvert.SerializeObject(parent);
                        dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(SendJSON.ToString());

                        var result = await _integrationService.RatingCall(calculationConfigId, jsonApi, apiContext);
                        //var result = await CheckCalculationRate(calculationConfigId, jsonApi, apiContext);
                        Dictionary<string, dynamic> d = new Dictionary<string, dynamic>();


                        //foreach (var st in result)
                        //{
                        //    foreach (var it in item.TblIllustrationConfigParam)
                        //    {
                        //        if(st.entity == it.IllustrationConfigParamName)
                        //        {
                        //            dictResult.Add(it.IllustrationConfigParamName +i, st.eValue);
                        //        try
                        //        {
                        //            d.Add(it.IllustrationConfigParamName, st.eValue);
                        //        }
                        //        catch(Exception ex)
                        //        {

                        //        }

                        //        }
                        //    }
                        //}
                        //MyResultList.Add(d);
                        d.Add("Period", i);
                        foreach (var st in result)
                        {
                            foreach (var c in item.TblIllustrationMapping)
                            {
                                if (st.entity == c.IllustrationOutputParam)
                                {
                                    illustration_Param[c.IllustrationInputParam] = st.eValue;
                                }
                            }
                            foreach (var cd in item.TblIllustrationConfigParam)
                            {
                                if (st.entity == cd.IllustrationConfigParamName)
                                {
                                    d.Add(cd.IllustrationConfigParamName, st.eValue);
                                }
                            }
                        }
                        MyResultList.Add(d);
                        // IF want to return from Input 
                        //foreach(var cd in item.TblIllustrationConfigParam)
                        //{
                        //    var value = illustration_Param[cd.IllustrationConfigParamName];
                        //    if (value != null)
                        //    {
                        //        d.Add(cd.IllustrationConfigParamName, value);
                        //    }
                        //}


                        //foreach (var c in item.TblIllustrationMapping)
                        //{
                        //    illustration_Param[c.IllustrationInputParam] = dictResult[c.IllustrationOutputParam + i];
                        //}

                        //}

                    }
                }
                return MyResultList;
            }
            catch (Exception ex)
            {
            }

            return null;
        }

        public async Task<object> CheckIllustrationRI(String IllustrationConfigId, int From, int To, dynamic illustration_Param, bool ArrayType, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }

            try
            {
                //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
                var illustrationDetails = _context.TblIllustrationConfig.Where(i => i.IllustrationConfigId == Convert.ToDecimal(IllustrationConfigId)).Include(add => add.TblIllustrationConfigParam).Include(add => add.TblIllustrationMapping);
                Dictionary<string, dynamic> dictResult = new Dictionary<string, dynamic>();
                List<Dictionary<string, dynamic>> MyResultList = new List<Dictionary<string, dynamic>>();
                var calConfig = from tblcalConfig in _context.TblCalculationConfig
                                select new
                                {
                                    CalculationConfigId = tblcalConfig.CalculationConfigId,
                                    CalculationConfigName = tblcalConfig.CalculationConfigName
                                };
                foreach (var item in illustrationDetails)
                {
                    string calculationConfigId = "";
                    foreach (var it in item.TblIllustrationConfigParam)
                    {
                        foreach (var c in calConfig)
                        {
                            if (c.CalculationConfigName == it.IllustrationConfigParamName)
                            {
                                calculationConfigId = c.CalculationConfigId.ToString();
                            }
                        }
                    }
                    //int flag = 0;
                    JObject parent = new JObject();
                    JObject child1 = new JObject();
                    JObject child2 = new JObject();
                    //JObject child2 = new JObject();
                    for (int i = From; i <= To; i++)
                    {
                        //if(flag ==0)
                        //{
                        int check = 0;
                        int checkRate = 0;
                        foreach (var ad in item.TblIllustrationConfigParam)
                        {
                            if (ad.Type == "Param")
                            {
                                if (check == 0)
                                {
                                    var value = illustration_Param[i - 1][ad.IllustrationConfigParamName];
                                    child1 = new JObject(
                                            new JProperty(ad.IllustrationConfigParamName, value));
                                    check++;
                                }
                                else
                                {
                                    var value = illustration_Param[i - 1][ad.IllustrationConfigParamName];
                                    child1.Add(new JProperty(ad.IllustrationConfigParamName, value));
                                }
                            }
                            if (ad.Type == "Rate")
                            {
                                if (checkRate == 0)
                                {
                                    var value = illustration_Param[i - 1][ad.IllustrationConfigParamName];
                                    child2 = new JObject(
                                            new JProperty(ad.IllustrationConfigParamName, value));
                                    checkRate++;
                                }
                                else
                                {
                                    var value = illustration_Param[i - 1][ad.IllustrationConfigParamName];
                                    child2.Add(new JProperty(ad.IllustrationConfigParamName, value));
                                }
                            }
                        }
                        parent = new JObject(
                                       new JProperty("dictionary_rule", child1));
                        parent.Add(new JProperty("dictionary_rate", child2));
                        var SendJSON = JsonConvert.SerializeObject(parent);
                        dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(SendJSON.ToString());

                        var result = await _integrationService.RatingCall(calculationConfigId, jsonApi, apiContext);
                        //var result = await CheckCalculationRate(calculationConfigId, jsonApi, apiContext);
                        Dictionary<string, dynamic> d = new Dictionary<string, dynamic>();


                        //foreach (var st in result)
                        //{
                        //    foreach (var it in item.TblIllustrationConfigParam)
                        //    {
                        //        if(st.entity == it.IllustrationConfigParamName)
                        //        {
                        //            dictResult.Add(it.IllustrationConfigParamName +i, st.eValue);
                        //        try
                        //        {
                        //            d.Add(it.IllustrationConfigParamName, st.eValue);
                        //        }
                        //        catch(Exception ex)
                        //        {

                        //        }

                        //        }
                        //    }
                        //}
                        //MyResultList.Add(d);
                        d.Add("Period", i);
                        foreach (var st in result)
                        {
                            foreach (var c in item.TblIllustrationMapping)
                            {
                                if (st.entity == c.IllustrationOutputParam)
                                {
                                    try
                                    {
                                        illustration_Param[i][c.IllustrationInputParam] = st.eValue;
                                    }
                                    catch (Exception ex)
                                    {
                                        // In array we are mapping it to the next one so , if its last one so mapping is not required to next 
                                        illustration_Param[i - 1][c.IllustrationInputParam] = st.eValue;
                                    }
                                }
                            }
                            foreach (var cd in item.TblIllustrationConfigParam)
                            {
                                if (st.entity == cd.IllustrationConfigParamName)
                                {
                                    d.Add(cd.IllustrationConfigParamName, st.eValue);
                                }
                            }
                        }
                        MyResultList.Add(d);
                        // IF want to return from Input 
                        //foreach(var cd in item.TblIllustrationConfigParam)
                        //{
                        //    var value = illustration_Param[cd.IllustrationConfigParamName];
                        //    if (value != null)
                        //    {
                        //        d.Add(cd.IllustrationConfigParamName, value);
                        //    }
                        //}


                        //foreach (var c in item.TblIllustrationMapping)
                        //
                        //    illustration_Param[c.IllustrationInputParam] = dictResult[c.IllustrationOutputParam + i];
                        //}

                        //}

                    }
                }
                return MyResultList;
            }
            catch (Exception ex)
            {
            }

            return null;
        }
        //public async Task<object> CheckIllustration(String IllustrationConfigId, dynamic illustration_Param, ApiContext apiContext)
        //{

        //    if (_context == null)
        //    {
        //        _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
        //    }
        //    var illustrationDetails = from tblIllConfig in _context.TblIllustrationConfigParam.Where(i => i.Type == "Param" && i.IllustrationConfigId == Convert.ToDecimal(IllustrationConfigId))
        //                              select new
        //                              {
        //                                  Parameter = tblIllConfig.IllustrationConfigParamName
        //                              };
        //    long Year = 0;
        //    Dictionary<string, object> dict = new Dictionary<string, object>();
        //    foreach (var item in illustrationDetails)
        //    {
        //        var paramValue = illustration_Param[item.Parameter];
        //        dict.Add(item.Parameter.ToString(), paramValue);
        //        if (item.Parameter == "Year")
        //        {
        //            Year = Convert.ToInt64(illustration_Param[item.Parameter]);
        //        }
        //    }
        //    //Mapping Details Availbale for That Particular IllustrationConfigID
        //    var illustrationMappingDetails = from tblIllMap in _context.TblIllustrationMapping.Where(i => i.IllustrationConfigId == Convert.ToDecimal(IllustrationConfigId))
        //                                     select new
        //                                     {
        //                                         Input = tblIllMap.IllustrationInputParam,
        //                                         Output = tblIllMap.IllustrationOutputParam
        //                                     };
        //    Dictionary<string, string> mappingDict = new Dictionary<string, string>();
        //    foreach (var item in illustrationMappingDetails)
        //    {
        //        mappingDict.Add(item.Input, item.Output);
        //    }
        //    //Calling for CalYear Function
        //    var result = CalYear(dict, Year, mappingDict);

        //    return result;
        //}
        public void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)
        {
            // ExpandoObject supports IDictionary so we can extend it like this
            var expandoDict = expando as IDictionary<string, object>;
            if (expandoDict.ContainsKey(propertyName))
                expandoDict[propertyName] = propertyValue;
            else
                expandoDict.Add(propertyName, propertyValue);
        }

        public static string Replace(string input, Dictionary<string, object> replacement)
        {
            var regex = new Regex("{(?<placeholder>[a-z_][a-z0-9_]*?)}",
                RegexOptions.Compiled | RegexOptions.IgnoreCase);
            return regex.Replace(input, m =>
            {
                var key = m.Groups["placeholder"].Value;
                if (replacement.TryGetValue(key, out var value))
                    return value.ToString();
                throw new Exception($"Unknown key {key}");
            });
        }
        //For Year Calculation (Ellustration)
        public static List<IllustrationModel> CalYear(Dictionary<string, object> json, long Year, Dictionary<string, string> mappingDict)
        {
            Dictionary<string, object> resultValue = new Dictionary<string, object>();
            List<IllustrationModel> illModel = new List<IllustrationModel>();
            try
            {
                var resultExpression = "";
                string yearExpression = "{EMI}-({Principle}*{Interest}/100)/12";
                for (int i = 1; i <= Convert.ToInt64(Year); i++)
                {
                    resultExpression = Replace(yearExpression, json);
                    double calResult = Convert.ToDouble(new DataTable().Compute(resultExpression, null));
                    resultValue.Add("Balance" + i, Math.Round((Convert.ToDecimal(calResult)), 2).ToString());
                    foreach (var it in json)
                    {
                        resultValue.Add(it.Key + i, Math.Round((Convert.ToDecimal(it.Value)), 2).ToString());
                    }
                    foreach (var item in mappingDict)
                    {
                        if (item.Key != item.Value)
                        {
                            json[item.Key] = resultValue[item.Value + i];
                        }
                    }
                }

                // Saving
                Dictionary<string, string> dt = new Dictionary<string, string>();
                foreach (var it in resultValue)
                {
                    dt.Add(it.Key, it.Value.ToString());
                }

                int count = resultValue.Count();
                for (int j = 1; j <= count / 5; j++)
                {
                    IllustrationModel obj = new IllustrationModel();
                    obj.Balance = dt["Balance" + j];
                    obj.Year = j.ToString();
                    obj.Duration = dt["Year" + j];
                    obj.Interest = dt["Interest" + j];
                    obj.EMI = dt["EMI" + j];
                    obj.Principle = dt["Principle" + j];

                    illModel.Add(obj);
                }

            }
            catch (Exception ex)
            {

            }
            return illModel;
        }
        //RateRule
        public async Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var Rate_list = (from tblParameter in _context.TblParameterSet
                             join tblParamSet in _context.TblParameterSetDetails on tblParameter.ParameterSetId equals tblParamSet.ParameterSetId
                             join tblRatingParam in _context.TblRatingParameters on tblParamSet.ParametersId equals tblRatingParam.ParametersId
                             select new GetParamSetDetailItemsDTO
                             {
                                 ParameterSetName = tblParameter.ParameterSetName,
                                 ParametersID = tblParamSet.ParametersId,
                                 ParameterName = tblRatingParam.ParameterName,
                                 ParameterSetID = tblParameter.ParameterSetId,
                                 ParameterType = tblRatingParam.ParameterType,
                                 RangeType = tblParamSet.RangeType

                             }).ToList();



            var data = "";
            List<GetParamSetDetailDTO> dataObj = new List<GetParamSetDetailDTO>();
            foreach (var item in Rate_list)
            {
                if (item.RangeType == "Yes")
                {
                    dataObj.Add(new GetParamSetDetailDTO
                    {
                        ParameterSetID = item.ParameterSetID,
                        ParametersID = item.ParametersID,
                        ParameterName = item.ParameterName + " From",
                        ParameterSetName = item.ParameterSetName,
                        ParameterType = item.ParameterType,
                        RangeType = item.RangeType
                    });
                    dataObj.Add(new GetParamSetDetailDTO
                    {
                        ParameterSetID = item.ParameterSetID,
                        ParametersID = item.ParametersID,
                        ParameterName = item.ParameterName + " To",
                        ParameterSetName = item.ParameterSetName,
                        ParameterType = item.ParameterType,
                        RangeType = item.RangeType
                    });
                }
                else
                {
                    dataObj.Add(new GetParamSetDetailDTO
                    {
                        ParameterSetID = item.ParameterSetID,
                        ParametersID = item.ParametersID,
                        ParameterName = item.ParameterName,
                        ParameterSetName = item.ParameterSetName,
                        ParameterType = item.ParameterType,
                        RangeType = item.RangeType
                    });
                }
            }
            //foreach (var item in Rate_list)
            //{
            //    if (item.RangeType == "Yes")
            //    {
            //        item.ParameterName = item.ParameterName + "From";
            //    }
            //}
            //foreach (var check in dataObj)
            //{
            //    check.ParameterName = check.ParameterName + "To";
            //    Rate_list.Add(new GetParamSetDetailDTO
            //    {
            //        ParameterSetID = check.ParameterSetID,
            //        ParametersID = check.ParametersID,
            //        ParameterName = check.ParameterName,
            //        ParameterSetName = check.ParameterSetName,
            //        ParameterType = check.ParameterType,
            //        RangeType = check.RangeType
            //    });
            //}

            return dataObj;
        }
        public async Task<IEnumerable<CalculationConfigDTO>> GetCalculationConfig(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var tblCalConfig = _context.TblCalculationConfig.OrderBy(item => item.CreatedDate).Include(add => add.TblCalculationConfigExpression).Include(add => add.TblCalculationConfigParam);
            var coaDTO = _mapper.Map<IList<CalculationConfigDTO>>(tblCalConfig);
            return coaDTO;
        }
        public async Task<IEnumerable<IllustrationConfigDTO>> GetIllustrationConfig(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var tblCalConfig = _context.TblIllustrationConfig.OrderBy(item => item.CreatedDate);
            var coaDTO = _mapper.Map<IList<IllustrationConfigDTO>>(tblCalConfig);
            return coaDTO;
        }


        public async Task<IEnumerable<CalculationConfigParamDTO>> GetCalculationParam(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var tblCalConfig = _context.TblCalculationConfigParam.OrderBy(item => item.CreatedDate);
            var calDTO = _mapper.Map<IList<CalculationConfigParamDTO>>(tblCalConfig);
            return calDTO;
        }

        public async Task<object> CalculationDisplaySearch(CalculationDisplayDTO calculationDisplay, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            var data = from tblheader in _context.TblCalculationHeader
                       join tblresult in _context.TblCalculationResult on tblheader.CalculationHeaderId equals tblresult.CalculationHeaderId
                       where (tblheader.CreatedDate >= calculationDisplay.FromDate && tblheader.CreatedDate <= calculationDisplay.ToDate)
                       select new { tblresult.CalculationResultName, tblresult.CalculationResultValue };
            return data.ToList();
        }
        public async Task<HandleEvent> GetHandleEvents(String EventId, ApiContext apiContext)
        {
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            HandleEvent objEvent = new HandleEvent();
            var ruleConditionList = from tblRules in _context.TblRating
                                    join tblRatingRules in _context.TblRatingRules on tblRules.RatingId equals tblRatingRules.RatingId
                                    join tblConditions in _context.TblRatingRuleConditions on tblRatingRules.RatingRuleId equals tblConditions.RatingRuleId
                                    join tblParameter in _context.TblRatingParameters on tblConditions.RatingParameters equals tblParameter.ParametersId
                                    select new RuleConditionsDetailsDTO
                                    {
                                        RatingRuleId = tblRules.RatingId,
                                        ParameterSetObj = tblRules.RateObj,
                                        RuleName = tblRules.RateName,
                                        Rate = tblRatingRules.Rate,
                                        RateType = tblRules.RateType,
                                        IsParameter = tblRules.IsParameter,
                                        RatingParameters = tblConditions.RatingParameters,
                                        RatingParameterName = tblParameter.ParameterName,
                                        ConditionValueFrom = tblConditions.ConditionValueFrom,

                                    };


            var tblCalConfig = _context.TblCalculationConfigParam.Where(c => c.CalculationConfigId == Convert.ToDecimal(EventId));
            bool isPrefix = false;
            if (tblCalConfig.Where(r => r.Type == "Rate").Count() > 1)
            {
                isPrefix = true;
            }
            foreach (var calConfg in tblCalConfig)
            {
                if (calConfg.CalculationConfigId == Convert.ToDecimal(EventId))
                {
                    if (calConfg.Type == "Param")
                    {
                        objEvent.ParameterList.Add(calConfg.CalculationConfigParamName);
                    }
                    else if (calConfg.Type == "Rate")
                    {
                        foreach (var item in ruleConditionList.Where(r => r.RuleName == calConfg.CalculationConfigParamName))
                        {

                            if (item.IsParameter == true)
                            {
                                var paramName = item.RatingParameterName;
                                if (isPrefix)
                                {
                                    paramName = item.RuleName + "_" + paramName;
                                }
                                objEvent.RateList.Add(paramName);
                                IEnumerable<string> ditinct = objEvent.RateList.Distinct();
                                objEvent.RateList = ditinct.ToList();
                            }


                        }
                    }
                }
            }
            //var dtos = _mapper.Map<IList<HandleEvent>>(objEvent);
            return objEvent;
        }

        public async Task<HandleEventConfig> GetInputOutputParam(String EventId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            HandleEventConfig objEvent = new HandleEventConfig();
            var ruleConditionList = from tblRules in _context.TblRating
                                    join tblRatingRules in _context.TblRatingRules on tblRules.RatingId equals tblRatingRules.RatingId
                                    join tblConditions in _context.TblRatingRuleConditions on tblRatingRules.RatingRuleId equals tblConditions.RatingRuleId
                                    join tblParameter in _context.TblRatingParameters on tblConditions.RatingParameters equals tblParameter.ParametersId
                                    select new RuleConditionsDetailsDTO
                                    {
                                        RatingRuleId = tblRules.RatingId,
                                        ParameterSetObj = tblRules.RateObj,
                                        RuleName = tblRules.RateName,
                                        Rate = tblRatingRules.Rate,
                                        RateType = tblRules.RateType,
                                        IsParameter = tblRules.IsParameter,
                                        RatingParameters = tblConditions.RatingParameters,
                                        RatingParameterName = tblParameter.ParameterName,
                                        ConditionValueFrom = tblConditions.ConditionValueFrom,

                                    };



            var tblCalConfig = _context.TblCalculationConfigParam.Where(c => c.CalculationConfigId == Convert.ToDecimal(EventId));
            bool isPrefix = false;
            if (tblCalConfig.Where(r => r.Type == "Rate").Count() > 1)
            {
                isPrefix = true;
            }
            foreach (var calConfg in tblCalConfig)
            {
                if (calConfg.CalculationConfigId == Convert.ToDecimal(EventId))
                {
                    if (calConfg.Type == "Param")
                    {
                        objEvent.ParameterList.Add(calConfg.CalculationConfigParamName);
                    }
                    else if (calConfg.Type == "")
                    {
                        objEvent.OutputList.Add(calConfg.CalculationConfigParamName);
                    }
                    else
                    {
                        foreach (var item in ruleConditionList.Where(r => r.RuleName == calConfg.CalculationConfigParamName))
                        {

                            if (item.IsParameter == true)
                            {
                                //var paramName = item.RatingParameterName;
                                //objEvent.Rate.Add(paramName);
                                //IEnumerable<string> ditinct = objEvent.Rate.Distinct();
                                //objEvent.Rate = ditinct.ToList();

                                var paramName = item.RatingParameterName;
                                if (isPrefix)
                                {
                                    paramName = item.RuleName + "_" + paramName;
                                }
                                objEvent.Rate.Add(paramName);
                                IEnumerable<string> ditinct = objEvent.Rate.Distinct();
                                objEvent.Rate = ditinct.ToList();
                            }
                        }

                    }
                }
            }
            //var dtos = _mapper.Map<IList<HandleEvent>>(objEvent);
            return objEvent;
        }

        //HandleEvent for Illustration Config
        public async Task<IList<HandleEventIllustration>> GetHandleEventsIllustration(String EventIllutrationId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var illustrationList = from tblIllConfigParam in _context.TblIllustrationConfigParam.Where(i => i.IllustrationConfigId == Convert.ToDecimal(EventIllutrationId) && i.Type != "OutputParam" && i.Type != "Illustration")
                                   select new HandleEventIllustration
                                   {
                                       Parameter = tblIllConfigParam.IllustrationConfigParamName
                                   };


            var dto = _mapper.Map<IList<HandleEventIllustration>>(illustrationList);
            //var dtos = _mapper.Map<IList<HandleEvent>>(objEvent);
            return dto;
        }

        public async Task<IEnumerable<ddDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> objEvent;
            //objEvent = from tblRules in _context.TblRating
            //                        join tblRatingRules in _context.TblRatingRules on tblRules.RatingId equals tblRatingRules.RatingId
            //                        join tblConditions in _context.TblRatingRuleConditions on tblRatingRules.RatingRuleId equals tblConditions.RatingRuleId
            //                        join tblParameter in _context.TblRatingParameters on tblConditions.RatingParameters equals tblParameter.ParametersId
            //                        select new ddDTO
            //                        {
            //                            mID = tblRules.RatingId,
            //                            mValue = tblRules.RateName,
            //                           mType = lMasterlist
            //                        };
            objEvent = _context.TblCalculationConfigParam.OrderBy(item => item.CreatedDate)
               .Select(c => new ddDTO
               {
                   mID = Convert.ToInt32(c.CalculationConfigParamId),
                   mValue = c.CalculationConfigParamName,
                   mType = lMasterlist
               });

            IEnumerable<ddDTO> objparam = _context.TblRatingParameters.OrderBy(i => i.CreatedDate)
                .Select(p => new ddDTO
                {
                    mID = Convert.ToInt32(p.ParametersId),
                    mValue = p.ParameterName,
                    mType = lMasterlist
                });
            IEnumerable<ddDTO> obj = objEvent.Union(objparam);
            IEnumerable<ddDTO> objval = obj.GroupBy(x => x.mValue).Select(o => o.FirstOrDefault());
            return objval;
        }

        public async Task<HandleExecEvent> GetHandleExecEvents(String EventId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            HandleExecEvent objEvent = new HandleExecEvent();
            var ruleConditionList = from tblRules in _context.TblRating
                                    join tblRatingRules in _context.TblRatingRules on tblRules.RatingId equals tblRatingRules.RatingId
                                    join tblConditions in _context.TblRatingRuleConditions on tblRatingRules.RatingRuleId equals tblConditions.RatingRuleId
                                    join tblParameter in _context.TblRatingParameters on tblConditions.RatingParameters equals tblParameter.ParametersId

                                    select new RuleConditionsDetailsDTO
                                    {
                                        RatingRuleId = tblRules.RatingId,
                                        RuleName = tblRules.RateName,
                                        Rate = tblRatingRules.Rate,
                                        RateType = tblRules.RateType,
                                        IsParameter = tblRules.IsParameter,
                                        RatingParameters = tblConditions.RatingParameters,
                                        RatingParameterName = tblParameter.ParameterName,
                                        ConditionValueFrom = tblConditions.ConditionValueFrom,
                                    };


            var tblCalConfig = _context.TblCalculationConfigParam.OrderBy(item => item.CreatedDate);
            foreach (var ruleCondition in ruleConditionList)
            {
                if (ruleCondition.RatingRuleId == Convert.ToDecimal(EventId))
                {
                    objEvent.ParameterList.Add(ruleCondition.RatingParameterName);
                }
            }

            IEnumerable<string> ditinct = objEvent.ParameterList.Distinct();
            objEvent.ParameterList = ditinct.ToList();
            //objEvent.ParameterList.Distinct();
            //objEvent.ParameterList.Distinct();
            //objEvent.ParameterList.Distinct();
            return objEvent;
        }


        public async Task<CalculationHeaderResponse> CreateCalculationHeader(CalculationHeaderDTO calculationHeader, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            try
            {
                var dto = _mapper.Map<TblCalculationHeader>(calculationHeader);
                _context.TblCalculationHeader.Add(dto);
                _context.SaveChanges();
                var response = _mapper.Map<TblCalculationHeader>(dto);
                return new CalculationHeaderResponse { Status = BusinessStatus.Created, ResponseMessage = $"Calculation Header successfully created! \n Header Name: {response.CalculationHeaderName}" };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CalculationResultResponse> CreateCalculationResult(CalculationResultDTO calculationResult, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            try
            {
                var dto = _mapper.Map<TblCalculationResult>(calculationResult);
                _context.TblCalculationResult.Add(dto);
                _context.SaveChanges();
                var response = _mapper.Map<TblCalculationResult>(dto);
                return new CalculationResultResponse { Status = BusinessStatus.Created, ResponseMessage = $"Calculation Result successfully created! \n Header Name: {response.CalculationResultName}" };
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            try
            {
                var data = from tblParam in _context.TblParameterSet.OrderBy(item => item.CreatedDate)
                           select new ParameterSetDataDTO
                           {
                               ParameterSetID = tblParam.ParameterSetId,
                               ParameterSetName = tblParam.ParameterSetName,
                               IsActive = tblParam.IsActive,
                               CreatedDate = tblParam.CreatedDate
                           };
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<RatingParametersDTO>> SearchRateParameters(ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var searchData = from t1 in _context.TblRatingParameters.OrderBy(a => a.CreatedDate)
                             select new RatingParametersDTO
                             {
                                 ParameterName = t1.ParameterName,
                                 ParameterType = t1.ParameterType,
                                 ParameterMasterLink = t1.ParameterMasterLink
                             };
            return searchData;
        }

        public async Task<IEnumerable<ddDTO>> GetRateConfigName(string lMasterlist, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> obj;
            obj = from pr in _context.TblCalculationConfig.OrderByDescending(p => p.CreatedDate)
                  select new ddDTO
                  {
                      mID = Convert.ToInt32(pr.CalculationConfigId),
                      mValue = pr.CalculationConfigName,
                      mType = lMasterlist,

                  };
            return obj;
        }

        public async Task<IEnumerable<CalConfigExpression>> GetCalConfigExpressions(decimal CalculationConfigId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                var calData = from t1 in _context.TblCalculationConfigExpression.OrderBy(i => i.Steps)
                              where (t1.CalculationConfigId == CalculationConfigId)
                              select new CalConfigExpression
                              {
                                  Steps = t1.Steps,
                                  ExpressionValue = t1.ExpressionValue,
                                  ExpressionResult = t1.ExpressionResult,
                                  CalculationConfigExpressionId = t1.CalculationConfigExpressionId,
                                  CalculationConfigId = t1.CalculationConfigId,
                                  CreatedDate = t1.CreatedDate,
                                  IsActive = t1.IsActive
                              };
                var calItemData = calData.ToList();
                foreach (var i in calItemData)
                {
                    i.ExpressionValue = i.ExpressionValue.Replace("{", "(").Replace("}", ")");
                }

                return calItemData;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<IEnumerable<CalConfigParam>> GetCalConfigParam(decimal CalculationConfigId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            var paramData = from t1 in _context.TblCalculationConfigParam.Where(x => x.CalculationConfigId == CalculationConfigId)
                            select new CalConfigParam
                            {
                                CalculationConfigParamId = t1.CalculationConfigParamId,
                                CalculationConfigParamName = t1.CalculationConfigParamName,
                                Type = t1.Type,
                                CreatedDate = t1.CreatedDate,
                                IsActive = t1.IsActive
                            };
            return paramData;
        }

        public async Task<CalConfigResponse> EditCalConfigRules(CalculationConfigDTO calConfigDto, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            try
            {
                
                //checking Configurationi parameter weather exists or not 
                foreach (var item in calConfigDto.CalculationConfigExpression)
                {
                    item.ExpressionValue = item.ExpressionValue.Replace("(", "{").Replace(")", "}");
                }
                var dto = _mapper.Map<TblCalculationConfig>(calConfigDto);
                _context.TblCalculationConfig.Update(dto);
                _context.SaveChanges();
                var modifydata = _mapper.Map<CalculationConfigDTO>(dto);
                return new CalConfigResponse { Status = BusinessStatus.Created, ResponseMessage = $"Updation is successful for! \n Cal Config Name: {modifydata.CalculationConfigName}" };

            }
            catch (Exception ex)
            {

            }
            return null;
        }

        //CheckCalculationRating For Mapper
        public async Task<object> CheckCalculationRatingMapping(String CalculationConfigId, DynamicData dynamic, ApiContext apiContext)
        {
            ResponseStatus errorResponse = new ResponseStatus();
            ResponseStatus response = new ResponseStatus();
            ResponseStatus rateresponse = new ResponseStatus();
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            var Expression = _context.TblCalculationConfigExpression.Where(item => item.CalculationConfigId == Convert.ToDecimal(CalculationConfigId)).OrderBy(it => it.Steps);
            //For ODSI RUles
            var CalculationConigParam = _context.TblCalculationConfigParam.Where(item => item.Type == "Rate" && item.CalculationConfigId == Convert.ToDecimal(CalculationConfigId));

            var ConfigParamName = "";
            var ConfigId = "";
            Dictionary<string, object> rate = new Dictionary<string, object>();
            //Sending of Particular Array for for Rate Execution


            Dictionary<string, object> dictSendingValue = new Dictionary<string, object>();
            bool isPrefix = false;
            if (CalculationConigParam.Count() > 1)
            {
                isPrefix = true;
            }
            var ratingNameList = CalculationConigParam.Select(r => r.CalculationConfigParamName).ToArray();
            //var ratingList = _context.TblRating.Where(item => ratingNameList.Contains(item.RateName));

            var ruleParameterss = (from tblRate in _context.TblRating.Where(c => ratingNameList.Contains(c.RateName))
                                   join tblRateRule in _context.TblRatingRules on tblRate.RatingId equals tblRateRule.RatingId
                                   join tblRateConditions in _context.TblRatingRuleConditions on tblRateRule.RatingRuleId equals tblRateConditions.RatingRuleId
                                   join tblParameter in _context.TblRatingParameters on tblRateConditions.RatingParameters equals tblParameter.ParametersId
                                   select new
                                   {
                                       RateId = tblRate.RatingId,
                                       RatingName = tblRate.RateName,
                                       RateParameter = tblParameter.ParameterName
                                   }).ToList();
            string ratingId = "";
            foreach (var calParam in CalculationConigParam)
            {
                ConfigParamName = calParam.CalculationConfigParamName;//rating name
                var ruleParameters = ruleParameterss.Where(item => item.RatingName == ConfigParamName).ToList();
                if (ruleParameters.Count > 0)
                {

                    //Add into dictionary here only 
                    try
                    {
                        dynamic sendRate = new ExpandoObject();
                        foreach (var sendDicItem in ruleParameters)
                        {
                            var paramName = sendDicItem.RateParameter;
                            if (isPrefix)
                            {
                                paramName = sendDicItem.RatingName + "_" + paramName;
                            }
                            var value = dynamic.dictionary_rate[paramName];
                            AddProperty(sendRate, sendDicItem.RateParameter, value.ToString());
                            ratingId = sendDicItem.RateId.ToString();
                        }
                        //Previous Code
                        //rateresponse = await CheckRuleSets(ConfigId, dynamic.dictionary_rate, apiContext);
                        dynamic serlise = JsonConvert.SerializeObject(sendRate);
                        dynamic dcRateExec = JsonConvert.DeserializeObject(serlise);
                        rateresponse = await CheckRuleSets(ratingId, dcRateExec, apiContext);
                        if (!rate.ContainsKey(ConfigParamName))
                        {
                            rate.Add(ConfigParamName, rateresponse.ResponseMessage);
                        }
                    }
                    catch (Exception ex)
                    {
                        errorResponse.ResponseMessage = "Incorrect Input Rate Parameter";
                        return errorResponse;
                    }
                }
                else
                {
                    try
                    {
                        dynamic sendRate = new ExpandoObject();
                        var rating = _context.TblRating.FirstOrDefault(item => item.RateName == ConfigParamName);
                        ratingId = rating.RatingId.ToString();
                        dynamic serlise = JsonConvert.SerializeObject(sendRate);
                        dynamic dcRateExec = JsonConvert.DeserializeObject(serlise);
                        rateresponse = await CheckRuleSets(rating.RatingId.ToString(), dcRateExec, apiContext);
                        if (!rate.ContainsKey(ConfigParamName))
                        {
                            rate.Add(ConfigParamName, rateresponse.ResponseMessage);
                        }
                    }
                    catch (Exception ex)
                    {
                        errorResponse.ResponseMessage = "Incorrect Input Rate Parameter";
                        return errorResponse;
                    }
                }
            }

            //Convert Json in Dictionary 
            string json = Convert.ToString(dynamic.dictionary_rule);
            Dictionary<string, object> json_Dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);

            string json_rate = Convert.ToString(dynamic.dictionary_rate);
            Dictionary<string, object> jsonRate_Dictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(json_rate);

            List<CalculationResult> calcultion = new List<CalculationResult>();
            foreach (var dict in jsonRate_Dictionary)
            {
                json_Dictionary.Add(dict.Key, dict.Value);
                calcultion.Add(new CalculationResult { Entity = dict.Key, EValue = dict.Value.ToString() });
            }
            try
            {
                foreach (var dictrate in rate)
                {
                    json_Dictionary.Add(dictrate.Key, dictrate.Value);
                    calcultion.Add(new CalculationResult { Entity = dictrate.Key, EValue = dictrate.Value.ToString() });
                }
            }
            catch (Exception ex)
            {
                errorResponse.ResponseMessage = "Incorrect Input Rate Parameter";
                return errorResponse;
            }

            var expression = "";
            var resultExpression = "";

            try
            {
                foreach (var rateitem in Expression)
                {

                    expression = rateitem.ExpressionValue;
                    resultExpression = Replace(expression, json_Dictionary);
                    double result = Convert.ToDouble(new DataTable().Compute(resultExpression, null));
                    calcultion.Add(new CalculationResult { Entity = rateitem.ExpressionResult, EValue = (Math.Round((Convert.ToDecimal(result)), 2)).ToString("0.00") });
                    json_Dictionary.Add(rateitem.ExpressionResult, result.ToString());
                    // calcultion.Add(new CalculationResult { Entity = rateitem.ExpressionResult, EValue = result.ToString() });
                    //foreach(var tr in calcultion)
                    //{
                    //    json_Dictionary.Add(tr.Entity, tr.EValue);
                    //}
                    //foreach (var returnVal in json_Dictionary)
                    //{
                    //    calcultion.Add(new CalculationResult { Entity = returnVal.Key, EValue = returnVal.Value.ToString() });
                    //}
                }
            }
            catch (Exception ex)
            {
                //calcultion.Add(new CalculationResult { Entity = "Error", EValue = "Incorrect Input Parameter" });
                //return calcultion.ToList();
                errorResponse.ResponseMessage = "Incorrect Input Parameter";
                return errorResponse;
            }
            Dictionary<string, string> finalResultDict = new Dictionary<string, string>();
            foreach (var item in calcultion)
            {
                finalResultDict.Add(item.Entity, item.EValue);
            }

            return finalResultDict;
        }

        //Rate Data Upload 
        public async Task<FileUploadResponse> RateUpload(HttpRequest httpRequest, CancellationToken cancellationToken, string RateName, string RateObj, string StartDate, string Enddate, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            string filePath = "";
            var name = _context.TblParameterSet.Where(x => x.ParameterSetId == Convert.ToInt32(RateObj)).Select(x => x.ParameterSetName).Single();
            //var name = RateObj;
            RatingDTO ratingdto = new RatingDTO();
            ratingdto.RateName = RateName;
            ratingdto.RateObj = RateObj;
            ratingdto.IsParameter = true;
            //DateTime now = DateTime.Now;
            //ratingdto.CreatedDate = Convert.ToDateTime(StartDate);
            ratingdto.IsActive = true;
            ratingdto.Rate = "";
            ratingdto.RateType = "";
            //DateTime sDate = Convert.ToDateTime(StartDate);
            //ratingdto.StartDate = sDate;
            //DateTime eDate = Convert.ToDateTime(Enddate);
            //ratingdto.EndDate = eDate;

            var parameterDetails = (from tblRateSet in _context.TblParameterSet
                                    join tblSetDetails in _context.TblParameterSetDetails on tblRateSet.ParameterSetId equals tblSetDetails.ParameterSetId
                                    join tblParamerer in _context.TblRatingParameters on tblSetDetails.ParametersId equals tblParamerer.ParametersId
                                    where tblRateSet.ParameterSetName == name
                                    // where tblRateSet.ParameterSetId == Convert.ToInt32(ratingDto.RateObj)
                                    select new ParameterLt
                                    {
                                        RatingParameterId = tblParamerer.ParametersId,
                                        RatingParamName = tblParamerer.ParameterName,
                                        RangeType = tblSetDetails.RangeType
                                    }).ToList();
            int step1 = 0;
            try
            {
                // Have to uncomment 
                var files = httpRequest.Form.Files;
                DataTable dt = new DataTable();
                if (_context == null)
                {
                    _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
                }

                foreach (var file in files)
                {
                    step1++;

                    if (file == null || file.Length <= 0)
                    {
                        return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                    }
                    var filename = ContentDispositionHeaderValue
                                       .Parse(file.ContentDisposition)
                                       .FileName
                                       .Trim('"');
                    var path = Path.Combine("", filename);
                    filePath = Path.GetFullPath(path);
                    //filePath = @"C:\Users\dinkar.kumar\Downloads\Check.xls";

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }

                    step1++;

                    var sheetName = System.IO.Path.GetFileNameWithoutExtension(path).ToString();

                    var fileExt = Path.GetExtension(file.FileName);

                    //For Display Grid
                    List<Dictionary<string, dynamic>> dictObj = new List<Dictionary<string, dynamic>>();


                    if (fileExt.Equals(".xlsx", StringComparison.OrdinalIgnoreCase) || fileExt.Equals(".csv", StringComparison.OrdinalIgnoreCase))
                    {
                        var sheetNameValue = "";
                        using (var stream = new MemoryStream())
                        {
                            await file.CopyToAsync(stream, cancellationToken);
                            try
                            {
                                using (var package = new ExcelPackage(stream))
                                {
                                    foreach (var sheetName1 in package.Workbook.Worksheets)
                                    {
                                        sheetNameValue = sheetName1.Name;
                                    }
                                    ExcelWorksheet worksheet = package.Workbook.Worksheets[sheetNameValue];
                                    Dictionary<string, dynamic> dictExParam = new Dictionary<string, dynamic>();
                                    foreach (var item in parameterDetails)
                                    {
                                        if (item.RangeType == "Yes")
                                        {
                                            var itemdataTo = item.RatingParamName + " From";
                                            var dataTo = worksheet
                                                  .Cells["1:1"]
                                                  .First(c => c.Value.ToString() == itemdataTo)
                                                  .Start
                                                  .Column;
                                            dictExParam.Add(itemdataTo, dataTo);

                                            var itemdataFrom = item.RatingParamName + " To";
                                            var dataFrom = worksheet
                                                  .Cells["1:1"]
                                                  .First(c => c.Value.ToString() == itemdataFrom)
                                                  .Start
                                                  .Column;
                                            dictExParam.Add(itemdataFrom, dataFrom);
                                        }
                                        else
                                        {
                                            var itemdata = item.RatingParamName;
                                            var data = worksheet
                                                  .Cells["1:1"]
                                                  .First(c => c.Value.ToString() == itemdata)
                                                  .Start
                                                  .Column;
                                            dictExParam.Add(itemdata, data);
                                        }
                                    }
                                    var itemdatart = "Rate";
                                    var datart = worksheet
                                          .Cells["1:1"]
                                          .First(c => c.Value.ToString() == itemdatart)
                                          .Start
                                          .Column;
                                    dictExParam.Add(itemdatart, datart);

                                    if (worksheet != null)
                                    {
                                        var rowCount = worksheet.Dimension.Rows;
                                        for (int row = 2; row <= rowCount; row++)
                                        {
                                            // Fro Grid 
                                            Dictionary<string, dynamic> objdct = new Dictionary<string, dynamic>();

                                            RatingRulesDTO ratingRulesDTO = new RatingRulesDTO();
                                            foreach (var dtex in dictExParam)
                                            {
                                                var data = worksheet.Cells[row, dtex.Value].Text.ToString().Trim();
                                                // For DIsplaying into Grid
                                                var strGrid = dtex.Key.ToString();
                                                objdct.Add(strGrid, data);

                                                if (dtex.Key == "Rate")
                                                {
                                                    ratingRulesDTO.Rate = data;
                                                }

                                                else
                                                {
                                                    RatingRuleConditionsDTO ruleConditionsDTO = new RatingRuleConditionsDTO();
                                                    var str = dtex.Key.ToString();
                                                    var result = str.Substring(str.Length - 2);
                                                    if (result == "To")
                                                    {
                                                        ruleConditionsDTO.ConditionValueTo = data.ToString();
                                                    }
                                                    else
                                                    {
                                                        ruleConditionsDTO.ConditionValueFrom = data.ToString();
                                                    }
                                                    var spl = dtex.Key.Split(' ')[0];
                                                    try
                                                    {
                                                        ruleConditionsDTO.RatingParameters = parameterDetails.First(it => it.RatingParamName.Remove(it.RatingParamName.Length - 1) == spl.ToString()).RatingParameterId;//add
                                                        ratingRulesDTO.RatingRuleConditions.Add(ruleConditionsDTO);
                                                    }
                                                    catch (Exception ex)
                                                    {
                                                        ruleConditionsDTO.RatingParameters = parameterDetails.First(it => it.RatingParamName == spl.ToString()).RatingParameterId;//add
                                                        ratingRulesDTO.RatingRuleConditions.Add(ruleConditionsDTO);
                                                    }
                                                }
                                                ratingdto.RatingRules.Add(ratingRulesDTO);
                                            }
                                            //For Grid Display 
                                            dictObj.Add(objdct);
                                        }
                                    }

                                    var dto = _mapper.Map<TblRating>(ratingdto);
                                    // dto.DynamicList.push();
                                    //dto[0]. = ratingDto[0].RatingRules[0].RatingRuleConditions;
                                    dto.RateObj = _context.TblParameterSet.First(x => x.ParameterSetId == Convert.ToInt32(ratingdto.RateObj)).ParameterSetName;
                                    _context.TblRating.Add(dto);
                                    _context.SaveChanges();
                                    var acntDTO = _mapper.Map<RatingDTO>(dto);

                                    return new FileUploadResponse { Status = BusinessStatus.Created, gridList = dictObj, ResponseMessage = $"Rules Conditions Succesfully Done! \n Rating Config Name: {acntDTO.RatingId}" };
                                }
                            }
                            catch (Exception ex)
                            {
                                var error = ex.ToString();
                                return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, Please re-enter", MessageKey = step1.ToString() };
                            }
                        }

                    }
                    else
                    {
                        return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx/csv file" };
                    }
                }

            }
            catch (Exception ex)
            {
                return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document upload error!" + ex.ToString(), MessageKey = step1.ToString() + " " + filePath };
            }

            return new FileUploadResponse { Status = BusinessStatus.Error, ResponseMessage = $"Document upload successfully! for Rating Config Name: {RateName}" };
        }

        public async Task<RatingGridDTO> GetRateRulesGrid(string RuleId, ApiContext apiContext)
        {
            if (_context == null)
            {
                _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }
            try
            {
                //var data = _context.TblRating.Include(add => add.TblRatingRules).Include("TblRatingRules.TblRatingRuleConditions").LastOrDefault();

                //Get rateObjFOr particular and IN main_rule Where condition is added
                RatingGridDTO ratinggridObj = new RatingGridDTO();
                var ruleObj = (from tblrate in _context.TblRating.Where(r => r.RatingId == Convert.ToDecimal(RuleId))
                               join tblParamset in _context.TblParameterSet on tblrate.RateObj equals tblParamset.ParameterSetName
                               select new
                               {
                                   ObjID = tblParamset.ParameterSetId
                               }).FirstOrDefault();

                var ruleObjParameter = (from tblrate in _context.TblRating.Where(r => r.RatingId == Convert.ToDecimal(RuleId))
                                        join tblParamset in _context.TblParameterSet on tblrate.RateObj equals tblParamset.ParameterSetName
                                        join tblParamSetDetails in _context.TblParameterSetDetails on tblParamset.ParameterSetId equals tblParamSetDetails.ParameterSetId
                                        join tblParameter in _context.TblRatingParameters on tblParamSetDetails.ParametersId equals tblParameter.ParametersId
                                        select new
                                        {
                                            ObjID = tblParamset.ParameterSetId,
                                            ParameterId = tblParamSetDetails.ParametersId,
                                            RangeType = tblParamSetDetails.RangeType,
                                            Parameter = tblParameter.ParameterName
                                        });
                int count = 0;
                foreach(var item in ruleObjParameter)
                {
                    if(item.RangeType == "Yes")
                    {
                        count = count + 2;
                    }
                    else
                    {
                        count = count + 1;
                    }
                }

                var main_rule = (from tblrate in _context.TblRating.Where(r => r.RatingId == Convert.ToDecimal(RuleId))
                                 join tblratingcondition in _context.TblRatingRules on tblrate.RatingId equals tblratingcondition.RatingId
                                 join tblrulecondition in _context.TblRatingRuleConditions.OrderBy(it => it.RatingRuleId) on tblratingcondition.RatingRuleId equals tblrulecondition.RatingRuleId
                                 join tblparameter in _context.TblRatingParameters on tblrulecondition.RatingParameters equals tblparameter.ParametersId
                                 join tblparamsetdetails in _context.TblParameterSetDetails.Where(it => it.ParameterSetId == ruleObj.ObjID)
                                 on tblparameter.ParametersId equals tblparamsetdetails.ParametersId
                                 select new
                                 {
                                     rulecondition_id = tblrulecondition.RatingRuleConditionId,
                                     rule_id = tblrate.RatingId,
                                     rule_name = tblrate.RateName,
                                     ParamSetObj = tblrate.RateObj,
                                     Rate = tblratingcondition.Rate,
                                     RatingParameter = tblparameter.ParameterName,
                                     param_type = tblparameter.ParameterType,
                                     condition_valuefrom = tblrulecondition.ConditionValueFrom,
                                     condition_valueto = tblrulecondition.ConditionValueTo,
                                     IsParameter = tblrate.IsParameter,
                                     ParameterId = tblparameter.ParametersId,
                                     ParamName = tblparameter.ParameterName,
                                     IsRange = tblparamsetdetails.RangeType,
                                     RatingRuleId = tblrulecondition.RatingRuleId
                                 }).ToList();
                if(main_rule.Count == 0)
                {
                    return ratinggridObj;
                }

                List<Dictionary<string, string>> ltObj = new List<Dictionary<string, string>>();
                Dictionary<string, string> dtObj = new Dictionary<string, string>();
                int countData = 0;
                foreach (var item in main_rule)
                {
                    countData = countData + 1;
                    if(item.IsRange =="No")
                    {
                        dtObj.Add(item.RatingParameter, item.condition_valuefrom);
                    }
                    else
                    {
                        if (item.condition_valuefrom != null)
                        {
                            var parameter = item.RatingParameter + "From";
                            dtObj.Add(parameter, item.condition_valuefrom);
                        }
                        else
                        {
                            var parameter = item.RatingParameter + "To";
                            dtObj.Add(parameter, item.condition_valueto);
                        }
                    }
                    if(countData == count)
                    {
                        var rate = "Rate";
                        dtObj.Add(rate, item.Rate);
                        countData = 0;
                        ltObj.Add(dtObj);
                        dtObj = new Dictionary<string, string>();
                    }
                    
                }
                ratinggridObj.ltObj = ltObj;
                return ratinggridObj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

