using System;
using System.Collections.Generic;

namespace iNube.Components.RuleEngine.Entities.AllocationEntities
{
    public partial class TblAllocParameterSet
    {
        public decimal AllocParamSetId { get; set; }
        public string Input { get; set; }
        public decimal? AllocParametersId { get; set; }
        public string ParamType { get; set; }
        public string DataType { get; set; }

        public virtual TblAllocationParameters AllocParameters { get; set; }
    }
}
