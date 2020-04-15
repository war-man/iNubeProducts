using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblProductAllocationRate
    {
        public int AllocationRateId { get; set; }
        public string Product { get; set; }
        public int? Yr { get; set; }
        public double? AllocChg { get; set; }
        public double? FreqChg { get; set; }
    }
}
