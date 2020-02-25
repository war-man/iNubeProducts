using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class TblAllocationRules
    {
        public TblAllocationRules()
        {
            TblAllocationRuleConditions = new HashSet<TblAllocationRuleConditions>();
        }

        public decimal AllocationRuleId { get; set; }
        public string Input { get; set; }
        public string Output { get; set; }
        public string IsMulti { get; set; }
        public decimal? AllocationId { get; set; }

        public virtual TblAllocation Allocation { get; set; }
        public virtual ICollection<TblAllocationRuleConditions> TblAllocationRuleConditions { get; set; }
    }
}
