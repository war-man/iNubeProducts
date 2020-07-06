using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework;

namespace iNube.Components.RuleEngine.Models
{
    public class ParametersDto
    {
        public decimal ParamId { get; set; }
        public string ParamName { get; set; }
        public string ParamType { get; set; }
        public string ParamMasterLink { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
    public class ParamSetDetailsDto
    {
        
        public decimal ParamSetDetailsId { get; set; }
        public decimal? ParamSetId { get; set; }
        public decimal? ParamId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        //public ParametersDto Param { get; set; }
        public ParamSetDto ParamSet { get; set; }
    }
    public class ParamSetDto
    {
        public ParamSetDto()
        {
            TblParamSetDetails = new List<ParamSetDetailsDto>();
        }
        public decimal ParamSetId { get; set; }
        public string ParamSetName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public ICollection<ParamSetDetailsDto> TblParamSetDetails { get; set; }

    }
    public partial class RuleConditionsDto
    {
        public decimal RuleConditionId { get; set; }
        public decimal? RuleId { get; set; }
        public decimal? ConditionAttribute { get; set; }
        public string ConditionOperator { get; set; }
        public string ConditionValueFrom { get; set; }
        public string ConditionValueTo { get; set; }
        public bool? IsListOfValues { get; set; }
        public string ConditionLogicalOperator { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Dobconditions { get; set; }
        public string ValidatorName { get; set; }
        public string SuccessMsg { get; set; }
        public string FailureMsg { get; set; }
        public string SuccessCode { get; set; }
        public string FailureCode { get; set; }
        public string RuleGroupName { get; set; }
        public string Type { get; set; }

        public RulesDto Rule { get; set; }
    }
    public partial class RuleConditionValuesDto
    {
        public decimal RuleConditionValueId { get; set; }
        public decimal? RuleConditionId { get; set; }
        public string ConditionValue { get; set; }

        public RuleConditionsDto RuleCondition { get; set; }
    }
    public class RuleParamSetMappingDto
    {
        public decimal RuleParamSetMappingId { get; set; }
        public decimal? RuleId { get; set; }
        public decimal? ParamSetId { get; set; }

        //public ParamSetDto ParamSet { get; set; }
        public RulesDto Rule { get; set; }
    }

    public class RulesDto
    {
        public decimal RuleId { get; set; }
        public string RuleName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string RuleObj { get; set; }
        public string RuleType { get; set; }

        public ICollection<RuleConditionsDto> TblRuleConditions { get; set; }
        public ICollection<RuleParamSetMappingDto> TblRuleParamSetMapping { get; set; }
    }

    public class TblCountryMasterDto
    {
        public string CountryName { get; set; }
        public decimal Id { get; set; }
    }

    public class TblVehTypeMasterDto
    {
        public decimal Id { get; set; }
        public string VehType { get; set; }
    }

    public partial class RuleMappingDto
    {
        public decimal RuleMapId { get; set; }
        public decimal? RuleId { get; set; }
        public string Param1 { get; set; }
        public string Param2 { get; set; }
        public string MasterModel { get; set; }
        public string Action { get; set; }
        public DateTime? CreatedBy { get; set; }
        public string ModelName { get; set; }
    }

    public class ErrorDetailsData
    {
        public string ValidatorName { get; set; }
        public string Outcome { get; set; }
        public string Message { get; set; }
        public string Code { get; set; }
    }
    public class HandleRuleDTO
    {
        public List<RateDTO> RateObj { get; set; }
        public string ParamName { get; set; }
    }
    public class HandleParamDTO
    {
        public List<RateDTO> RateObj { get; set; }
        public List<ParamDTO> ParamObj { get; set; }
    }
    //public class HandleRuleDTO
    //{
    //    public List<RateDTO> RateObj { get; set; }
    //    public List<ParamDTO> ParaObj { get; set; }
    //}
    public class HandleExecEvent
    {
        public HandleExecEvent()
        {
            ParameterList = new List<string>();
        }
        public List<string> ParameterList { get; set; }
    }
    public class RateDTO
    {
        public string RateParameter { get; set; }
    }
    public class ParamDTO
    {
        public string RuleParameter { get; set; }
    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }
    public class DynamicData
    {
        public dynamic ruleParameter { get; set; }
        public dynamic rateParameter { get; set; }
    }

    public class RuleDetails
    {
        public decimal rulecondition_id { get; set; }
        public decimal rule_id { get; set; }
        public string rule_name { get; set; }
        public string condition_attributes { get; set; }
        public string param_type { get; set; }
        public string condition_opr { get; set; }
        public string condition_valuefrom { get; set; }
        public string condition_valueto { get; set; }
        public bool? IsListOfValues { get; set; }
        public string condition_logical { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string masterTableName { get; set; }
        public string masterColumnName { get; set; }
        public DateTime? condition_value_fromDate { get; set; }
        public DateTime? condition_value_toDate { get; set; }
        public string dobConditions { get; set; }
        public string validatorName { get; set; }
        public string successMsg { get; set; }
        public string failureMsg { get; set; }
        public string successCode { get; set; }
        public string failureCode { get; set; }
        public string type { get; set; }
        
    }
}
