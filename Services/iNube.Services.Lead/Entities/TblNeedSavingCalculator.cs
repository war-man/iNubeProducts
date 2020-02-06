using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedSavingCalculator
    {
        public TblNeedSavingCalculator()
        {
            TblNeedSaveCar = new HashSet<TblNeedSaveCar>();
            TblNeedSaveHouse = new HashSet<TblNeedSaveHouse>();
            TblNeedSaveOthers = new HashSet<TblNeedSaveOthers>();
            TblNeedSaveTour = new HashSet<TblNeedSaveTour>();
            TblNeedSaveWedding = new HashSet<TblNeedSaveWedding>();
        }

        public int Id { get; set; }
        public int? NeedAnalysisId { get; set; }
        public int? Inflationrate { get; set; }
        public decimal? AnnualSavingExp { get; set; }
        public decimal? CurrReqTotal { get; set; }
        public decimal? EstAmountTotal { get; set; }
        public decimal? AvailableFund { get; set; }
        public decimal? GapTotal { get; set; }
        public decimal? MonthlySaveExp { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
        public virtual ICollection<TblNeedSaveCar> TblNeedSaveCar { get; set; }
        public virtual ICollection<TblNeedSaveHouse> TblNeedSaveHouse { get; set; }
        public virtual ICollection<TblNeedSaveOthers> TblNeedSaveOthers { get; set; }
        public virtual ICollection<TblNeedSaveTour> TblNeedSaveTour { get; set; }
        public virtual ICollection<TblNeedSaveWedding> TblNeedSaveWedding { get; set; }
    }
}
