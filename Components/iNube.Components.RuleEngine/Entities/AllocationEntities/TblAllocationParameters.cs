using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class TblAllocationParameters
    {
        public TblAllocationParameters()
        {
            TblAllocParameterSet = new HashSet<TblAllocParameterSet>();
        }

        public decimal AllocParametersId { get; set; }
        public string Type { get; set; }
        public string AllocParamName { get; set; }

        public virtual ICollection<TblAllocParameterSet> TblAllocParameterSet { get; set; }
    }
}
