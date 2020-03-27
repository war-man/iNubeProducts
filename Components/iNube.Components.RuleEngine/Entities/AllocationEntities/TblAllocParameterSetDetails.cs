using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class TblAllocParameterSetDetails
    {
        public decimal AllocParamSetDetId { get; set; }
        public string Output { get; set; }
        public decimal? AllocParametersId { get; set; }

        public virtual TblAllocationParameters AllocParameters { get; set; }
    }
}
