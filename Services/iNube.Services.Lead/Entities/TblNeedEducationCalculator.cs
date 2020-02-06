using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblNeedEducationCalculator
    {
        public TblNeedEducationCalculator()
        {
            TblNeedEduForeign = new HashSet<TblNeedEduForeign>();
            TblNeedEduGceal = new HashSet<TblNeedEduGceal>();
            TblNeedEduHigher = new HashSet<TblNeedEduHigher>();
            TblNeedEduLocal = new HashSet<TblNeedEduLocal>();
        }

        public int Id { get; set; }
        public int? NeedAnalysisId { get; set; }
        public int? Inflationrate { get; set; }
        public decimal? AnnualEduExp { get; set; }
        public decimal? EduMaturityValue { get; set; }
        public decimal? LumpSum { get; set; }
        public decimal? EduGapTotal { get; set; }
        public decimal? MonthlyEduExp { get; set; }

        public virtual TblLifeNeedAnalysis NeedAnalysis { get; set; }
        public virtual ICollection<TblNeedEduForeign> TblNeedEduForeign { get; set; }
        public virtual ICollection<TblNeedEduGceal> TblNeedEduGceal { get; set; }
        public virtual ICollection<TblNeedEduHigher> TblNeedEduHigher { get; set; }
        public virtual ICollection<TblNeedEduLocal> TblNeedEduLocal { get; set; }
    }
}
