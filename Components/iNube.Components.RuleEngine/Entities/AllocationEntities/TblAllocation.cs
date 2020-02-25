using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class TblAllocation
    {
        public TblAllocation()
        {
            TblAllocationRules = new HashSet<TblAllocationRules>();
        }

        public decimal AllocationId { get; set; }
        public string AllocationObj { get; set; }
        public string AllocationName { get; set; }

        public virtual ICollection<TblAllocationRules> TblAllocationRules { get; set; }
    }
}
