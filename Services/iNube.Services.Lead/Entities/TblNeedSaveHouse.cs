using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedSaveHouse
    {
        public int HouseId { get; set; }
        public int? SaveCalcId { get; set; }
        public decimal? CurrentReq { get; set; }
        public decimal? Term { get; set; }
        public decimal? MaturityAge { get; set; }
        public decimal? EstAmount { get; set; }
        public decimal? AvailableFund { get; set; }
        public decimal? Gap { get; set; }
        public string Relationship { get; set; }
        public int? Age { get; set; }

        public virtual TblNeedSavingCalculator SaveCalc { get; set; }
    }
}
