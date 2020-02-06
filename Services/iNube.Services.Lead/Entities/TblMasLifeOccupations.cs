using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblMasLifeOccupations
    {
        public decimal Id { get; set; }
        public string CompanyCode { get; set; }
        public string OccupationCode { get; set; }
        public string ClassType { get; set; }
        public decimal? Rate { get; set; }
        public DateTime? EffectiveFromDate { get; set; }
        public DateTime? EffectiveTodate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? Code { get; set; }
        public string EmploymentType { get; set; }
        public string SinhalaDesc { get; set; }
        public string TamilDesc { get; set; }
        public string SinglishDesc { get; set; }
        public string TanglishDesc { get; set; }
    }
}
