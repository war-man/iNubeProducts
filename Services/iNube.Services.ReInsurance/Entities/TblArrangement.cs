using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblArrangement
    {
        public decimal ArrangementId { get; set; }
        public decimal TreatyGroupId { get; set; }
        public int? AllocationOnId { get; set; }
        public int? AllocationLogicId { get; set; }
        public int? Percentage { get; set; }
        public decimal? Amount { get; set; }
        public int? NoOfLines { get; set; }
        public int? HigherOrLowerId { get; set; }
        public int? AllocationBasisId { get; set; }
        public int? MaxCeidingLimit { get; set; }
        public string Pla { get; set; }
        public string Cla { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual TblTreatyGroup TreatyGroup { get; set; }
    }
}
