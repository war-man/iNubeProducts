using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities
{
    public partial class TblRuleConditionValues
    {
        public decimal RuleConditionValueId { get; set; }
        public decimal? RuleConditionId { get; set; }
        public string ConditionValue { get; set; }

        public virtual TblRuleConditions RuleCondition { get; set; }
    }
}
