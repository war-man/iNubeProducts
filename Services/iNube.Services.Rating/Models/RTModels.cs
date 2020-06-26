using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Rating.Models
{
   

    public class ParameterSetDTO
    {
        public ParameterSetDTO()
        {
            ParameterSetDetails = new HashSet<ParameterSetDetailsDTO>();
        }
        public decimal ParameterSetId { get; set; }
        public string ParameterSetName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<ParameterSetDetailsDTO> ParameterSetDetails { get; set; }

    }
    public class ParameterSetDataDTO
    {
        public decimal ParameterSetID { get; set; }
        public string ParameterSetName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class ParameterSetDetailsDTO
    {
        public decimal ParameterSetDetailsId { get; set; }
        public decimal? ParameterSetId { get; set; }
        public decimal? ParametersId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string RangeType { get; set; }

    }
    
    

    public class RatingParametersDTO
    {
        public decimal ParametersId { get; set; }
        public string ParameterName { get; set; }
        public string ParameterType { get; set; }
        public string ParameterMasterLink { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public class ParameterList
    {
        public decimal RatingParameterId { get; set; }
        public string RatingParamName { get; set; }
    }
    public class ParameterLt
    {
        public decimal RatingParameterId { get; set; }
        public string RatingParamName { get; set; }
        public string RangeType { get; set; }
    }

    public  class RatingDTO
    {
        public RatingDTO()
        {
            RatingRules = new HashSet<RatingRulesDTO>();
        }

        public decimal RatingId { get; set; }
        public string RateObj { get; set; }
        public string RateName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Rate { get; set; }
        public string RateType { get; set; }
        public bool? IsParameter { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public List<dynamic> DynamicList { get; set; }

    public virtual ICollection<RatingRulesDTO> RatingRules { get; set; }
    }

    public class RatingGridDTO
    {
        public List<Dictionary<string, string>> ltObj { get; set; }
    }
    public class RatingDetailDTO
    {
        public RatingDetailDTO()
        {
            RatingRules = new HashSet<RatingRulesDTO>();
        }

        public decimal RatingId { get; set; }
        public string RateObj { get; set; }
        public string RateName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Rate { get; set; }
        public string RateType { get; set; }
        public bool? IsParameter { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }


        public virtual ICollection<RatingRulesDTO> RatingRules { get; set; }
    }

    public class RatingRulesDTO
    {
        public RatingRulesDTO()
        {
            RatingRuleConditions = new HashSet<RatingRuleConditionsDTO>();
        }
        public decimal RatingRuleId { get; set; }
        public DateTime? EndDate { get; set; }
        public string Rate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public decimal? RatingId { get; set; }

        public virtual ICollection<RatingRuleConditionsDTO> RatingRuleConditions { get; set; }
    }

    public class RatingRuleConditionsDTO
    {
        public decimal RatingRuleConditionId { get; set; }
        public decimal? RatingRuleId { get; set; }
        public decimal? RatingParameters { get; set; }
        public string ConditionValueFrom { get; set; }
        public string ConditionValueTo { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
    }
    //Dtos for RuleCondition
    public class RuleConditionsDetailsDTO
    {
        public decimal RatingRuleId { get; set; }
        public string ParameterSetObj { get; set; }
        public string RuleName { get; set; }
        public string Rate { get; set; }
        public string RateType { get; set; }
        public bool? IsParameter { get; set; }
        public decimal? RatingParameters { get; set; }
        public string RatingParameterName { get; set; }
        public string ConditionOperator { get; set; }
        public string ConditionValueFrom { get; set; }
    }



    //Response Fileds
    public class RatingParameterResponce : ResponseStatus
    {
        public RatingParametersDTO CreatParam { get; set; }
    }
    public class CalConfigResponse : ResponseStatus
    {
        public CalculationConfigDTO CalConfig { get; set; }
    }
    public class EllConfigResponse : ResponseStatus
    {
        public IllustrationConfigDTO IllConfig { get; set; }
    }
    public class ParamSetResponce : ResponseStatus
    {
        public ParameterSetDTO CreatParam { get; set; }
    }
    public class RatingRulesResponse : ResponseStatus
    {
        public RatingRulesDTO createRules { get; set; }
    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }
    public class CalculationHeaderResponse:ResponseStatus
    {
        public CalculationHeaderDTO CalculationHeaderDTO { get; set; }
    }
    public class CalculationResultResponse : ResponseStatus
    {
        public CalculationResultDTO CalculationResultDTO { get; set; }
    }
    //For Rate Upload 
    public class FileUploadResponse : ResponseStatus
    {
        public RatingRulesDTO createRules { get; set; }
        public List<Dictionary<string,dynamic>> gridList { get; set; }
    }

    public class GetParamSetDetailDTO
    {
        public decimal ParameterSetID { get; set; }
        public decimal? ParametersID { get; set; }
        public string ParameterName { get; set; }
        public string ParameterSetName { get; set; }
        public string ParameterType { get; set; }
        public string RangeType { get; set; }
    }
    public class GetParamSetDetailItemsDTO
    {
        public decimal ParameterSetID { get; set; }
        public decimal? ParametersID { get; set; }
        public string ParameterName { get; set; }
        public string ParameterSetName { get; set; }
        public string ParameterType { get; set; }
        public string RangeType { get; set; }
    }


    public class CalculationConfigExpressionDTO
    {
        public decimal CalculationConfigExpressionId { get; set; }
        public decimal? CalculationConfigId { get; set; }
        public string ExpressionValue { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string ExpressionResult { get; set; }
        public int? Steps { get; set; }
    }
    public class CalculationConfigParamDTO
    {
        public decimal CalculationConfigParamId { get; set; }
        public decimal? CalculationConfigId { get; set; }
        public string CalculationConfigParamName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string Type { get; set; }
    }

    public partial class CalculationConfigDTO
    {
        public CalculationConfigDTO()
        {
            CalculationConfigExpression = new HashSet<CalculationConfigExpressionDTO>();
            CalculationConfigParam = new HashSet<CalculationConfigParamDTO>();
        }
        public decimal CalculationConfigId { get; set; }
        public string CalculationConfigName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<CalculationConfigExpressionDTO> CalculationConfigExpression { get; set; }
        public virtual ICollection<CalculationConfigParamDTO> CalculationConfigParam { get; set; }
    }

    public partial class IllustrationConfigDTO
    {
        public IllustrationConfigDTO()
        {
            IllustrationConfigParam = new HashSet<IllustrationConfigParamDTO>();
            IllustrationMapping = new HashSet<IllustrationMappingDTO>();
        }

        public decimal IllustrationConfigId { get; set; }
        public string IllustrationConfigName { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<IllustrationConfigParamDTO> IllustrationConfigParam { get; set; }
        public virtual ICollection<IllustrationMappingDTO> IllustrationMapping { get; set; }
    }

    public class IllustrationConfigParamDTO
    {
        public decimal IllustrationConfigParamId { get; set; }
        public decimal? IllustrationConfigId { get; set; }
        public string IllustrationConfigParamName { get; set; }
        public string Type { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
    }

    public  class IllustrationMappingDTO
    {
        public decimal IllustrationMappingId { get; set; }
        public decimal? IllustrationConfigId { get; set; }
        public string IllustrationInputParam { get; set; }
        public string IllustrationOutputParam { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        
    }

    public partial class Expressions
    {
        public string ExpressionResults { get; set; }
        public string ExpressionValue { get; set; }
    }
    public partial class Rules
    {
        public string Rule { get; set; }
    }
    public class DynamicData
    {
        public dynamic dictionary_rule { get; set; }
        public dynamic dictionary_rate { get; set; }
    }
    

    public partial class CalculationHeaderDTO
    {
        //public CalculationHeaderDTO()
        //{
        //    CalculationResultDTO = new HashSet<CalculationResultDTO>();
        //}

        public decimal CalculationHeaderId { get; set; }
        public string CalculationHeaderName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

       // public virtual ICollection<CalculationResultDTO> CalculationResultDTO { get; set; }
    }

    public class CalculationResultDTO
    {
        public decimal CalculationResultId { get; set; }
        public decimal? CalculationHeaderId { get; set; }
        public string CalculationResultName { get; set; }
        public decimal? CalculationResultValue { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

       // public virtual CalculationHeaderDTO CalculationHeaderDTO { get; set; }
    }

    public class CalculationDisplayDTO
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }

    public class CalculationResult
    {
        public string Entity { get; set; }
        public string EValue { get; set; }
    }
    public class CalculationResultDetails
    {
        public string Entity { get; set; }
        public string EValue { get; set; }
    }
    public class HandleEvent
    {
        public HandleEvent()
        {
            ParameterList = new List<string>();
            RateList = new List<string>();
        }
        public List<string> ParameterList { get; set; }
        public List<string> RateList { get; set; }
    }
    
    public class HandleEventIllustration
    {
        public string Parameter { get; set; }
    }

    public class HandleExecEvent
    {
        public HandleExecEvent()
        {
            ParameterList = new List<string>();
        }
        public List<string> ParameterList { get; set; }
    }
    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public partial class CalConfigExpression
    {
        public string ExpressionValue { get; set; }
        public string ExpressionResult { get; set; }
        public decimal CalculationConfigExpressionId { get; set; }
        public decimal? CalculationConfigId { get; set; }
        public int? Steps { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
    }
    public partial class CalConfigParam
    {
        public string CalculationConfigParamName { get; set; }
        public string Type { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
    }

    public partial class IllustrationModel
    {
        public string Balance { get; set; }
        public string EMI { get; set; }
        public string Interest { get; set; }
        public string Principle { get; set; }
        public string Year { get; set; }
        public string Duration { get; set; }
    }
    public partial class CustomerSettingsDTO
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? EnvId { get; set; }
    }

    public class HandleEventConfig
    {
        public HandleEventConfig()
        {
            ParameterList = new List<string>();
            OutputList = new List<string>();
            Rate = new List<string>();
        }
        public List<string> ParameterList { get; set; }
        public List<string> OutputList { get; set; }
        public List<string> Rate { get; set; }
    }
}
