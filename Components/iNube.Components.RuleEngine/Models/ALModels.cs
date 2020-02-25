using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Components.RuleEngine.Models
{
    public class ALModels
    {
        public partial class ddDTOs
        {
            public decimal mID { get; set; }
            public string mValue { get; set; }
            public string mType { get; set; }

        }
        public class HandleExecEvent
        {
            public HandleExecEvent()
            {
                ParameterList = new List<string>();
            }
            public List<string> ParameterList { get; set; }
        }

        public class AllocationDTO
        {
            public AllocationDTO()
            {
                RatingRules = new HashSet<RatingRulesDTO>();
            }

            public decimal AllocationId { get; set; }
            public string RateObj { get; set; }
            public string AllocationName { get; set; }
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
        public class RatingDetailDTO
        {
            public RatingDetailDTO()
            {
                RatingRules = new HashSet<RatingRulesDTO>();
            }

            public decimal AllocationId { get; set; }
            public string RateObj { get; set; }
            public string AllocationName { get; set; }
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
                RatingRuleConditions = new HashSet<AllocationRuleConditionsDTO>();
            }
            public decimal AllocationRuleId { get; set; }
            public DateTime? EndDate { get; set; }
            public string Rate { get; set; }
            public DateTime? CreatedDate { get; set; }
            public bool? IsActive { get; set; }
            public decimal? AllocationId { get; set; }

            public virtual ICollection<AllocationRuleConditionsDTO> RatingRuleConditions { get; set; }
        }

        public class AllocationRuleConditionsDTO
        {
            public decimal AllocationId { get; set; }
            public decimal? AllocationRuleId { get; set; }
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

    }
}
