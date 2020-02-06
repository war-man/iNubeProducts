using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedEduForeign
    {
        public int ForeignId { get; set; }
        public int? EduCalcId { get; set; }
        public decimal? CurrentReq { get; set; }
        public decimal? Term { get; set; }
        public decimal? EstAmount { get; set; }
        public decimal? AvailableFund { get; set; }
        public decimal? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }
        public decimal? MaturityAge { get; set; }

        public virtual TblNeedEducationCalculator EduCalc { get; set; }
    }
}
