using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class TblAllocationRuleConditions
    {
        public decimal AllocationRuleConditionId { get; set; }
        public decimal? AllocationRuleId { get; set; }
        public string Output { get; set; }

        public virtual TblAllocationRules AllocationRule { get; set; }
    }
}
