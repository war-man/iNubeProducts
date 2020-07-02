using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblRuleConditions
    {
        public TblRuleConditions()
        {
            TblRuleConditionValues = new HashSet<TblRuleConditionValues>();
        }

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
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Dobconditions { get; set; }
        public string ValidatorName { get; set; }
        public string SuccessMsg { get; set; }
        public string FailureMsg { get; set; }
        public string SuccessCode { get; set; }
        public string FailureCode { get; set; }
        public string RuleGroupName { get; set; }
        public string Type { get; set; }

        public virtual TblRules Rule { get; set; }
        public virtual ICollection<TblRuleConditionValues> TblRuleConditionValues { get; set; }
    }
}
