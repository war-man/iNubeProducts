using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Utility.Framework.Model;

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
        public class ParameterSetDataDTO
        {
            public decimal mID { get; set; }
            public string mType { get; set; }
            public string mValue { get; set; }
        }

        public class ParameterSetDTO
        {
            public ParameterSetDTO()
            {
                TblAllocParameterSet = new HashSet<ParameterSetDetailsDTO>();
                TblAllocParameterSetDetails = new HashSet<ParamSetDetailsDTO>();
            }

            // public decimal AllocParametersId { get; set; }
            public string Type { get; set; }
            public string AllocParamName { get; set; }


            public virtual ICollection<ParameterSetDetailsDTO> TblAllocParameterSet { get; set; }
            public virtual ICollection<ParamSetDetailsDTO> TblAllocParameterSetDetails { get; set; }

        }
        public class HandleModel
        {
            public decimal? AllocParametersID { get; set; }
            public string Parameter { get; set; }
        }

        public class ParameterSetDetailsDTO
        {
            //public ParameterSetDetailsDTO()
            //{
            //    TblAllocParameterSetDetails = new HashSet<ParamSetDetailsDTO>();

            //}


            public decimal AllocParamSetId { get; set; }
            public string Input { get; set; }
            //public decimal? AllocParametersId { get; set; }
            public string ParamType { get; set; }
            public string DataType { get; set; }
            public string Output { get; set; }

            // public virtual ParameterSetDTO AllocParameters { get; set; }
            //public virtual ICollection<ParamSetDetailsDTO> TblAllocParameterSetDetails { get; set; }
        }
        public class ParamSetDetailsDTO
        {
            public decimal AllocParamSetDetId { get; set; }
            public string Output { get; set; }
            public decimal? AllocParametersId { get; set; }
        }


        //GetrateRule
        public class GetParamSetDetailDTO
        {
            public decimal? AllocParamSetID { get; set; }
            public decimal? AllocParametersID { get; set; }
            public string Type { get; set; }
            public string Input { get; set; }
            public string Output { get; set; }

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
        public class HandleExecEvent
        {
            public HandleExecEvent()
            {
                ParameterList = new List<string>();
            }
            public List<string> ParameterList { get; set; }
        }
        public partial class AllocationDTO
        {
            public AllocationDTO()
            {
                TblAllocationRules = new HashSet<AllocationRulesDTO>();
            }

            public decimal AllocationId { get; set; }
            public string AllocationObj { get; set; }
            public string AllocationName { get; set; }
            public List<dynamic> DynamicList { get; set; }

            public virtual ICollection<AllocationRulesDTO> TblAllocationRules { get; set; }
            public BusinessStatus Status { get; internal set; }
        }
        public partial class AllocationRulesDTO
        {
            public AllocationRulesDTO()
            {
                TblAllocationRuleConditions = new HashSet<AllocationRuleConditionsDTO>();
            }

            //  public decimal AllocationRuleId { get; set; }
            public string Input { get; set; }
            public string Output { get; set; }
            public string IsMulti { get; set; }
            //   public decimal? AllocationId { get; set; }

            // public virtual TblAllocation Allocation { get; set; }
            public virtual ICollection<AllocationRuleConditionsDTO> TblAllocationRuleConditions { get; set; }
        }

        public partial class AllocationRuleConditionsDTO
        {
            // public decimal AllocationRuleConditionId { get; set; }
            //  public decimal? AllocationRuleId { get; set; }
            public string Output { get; set; }

            // public virtual TblAllocationRules AllocationRule { get; set; }
        }
        //public class AllocationDTO
        //{
        //    public AllocationDTO()
        //    {
        //        RatingRules = new HashSet<RatingRulesDTO>();
        //    }

        //    public decimal AllocationId { get; set; }
        //    public string RateObj { get; set; }
        //    public string AllocationName { get; set; }
        //    public DateTime? StartDate { get; set; }
        //    public DateTime? EndDate { get; set; }
        //    public string Rate { get; set; }
        //    public string RateType { get; set; }
        //    public bool? IsParameter { get; set; }
        //    public DateTime? CreatedDate { get; set; }
        //    public bool? IsActive { get; set; }
        //    public List<dynamic> DynamicList { get; set; }

        //    public virtual ICollection<RatingRulesDTO> RatingRules { get; set; }
        //}
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

        //public class AllocationRuleConditionsDTO
        //{
        //    public decimal AllocationId { get; set; }
        //    public decimal? AllocationRuleId { get; set; }
        //    public decimal? RatingParameters { get; set; }
        //    public string ConditionValueFrom { get; set; }
        //    public string ConditionValueTo { get; set; }
        //    public DateTime? FromDate { get; set; }
        //    public DateTime? ToDate { get; set; }
        //    public DateTime? CreatedDate { get; set; }
        //    public bool? IsActive { get; set; }
        //}
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
        public class AllocationResponse : ResponseStatus
        {
            public AllocationDTO createRules { get; set; }
        }
        public class AllocParamSetResponce : ResponseStatus
        {
            public ParameterSetDTO createParam { get; set; }
        }



    }
}
