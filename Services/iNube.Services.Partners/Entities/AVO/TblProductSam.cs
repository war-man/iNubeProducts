using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblProductSam
    {
        public int SamId { get; set; }
        public int? PlanId { get; set; }
        public int MinSam { get; set; }
        public int MixSam { get; set; }
        public int MinAge { get; set; }
        public int MixAge { get; set; }
    }
}
