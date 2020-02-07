using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblTreaty
    {
        public TblTreaty()
        {
            TblParticipant = new HashSet<TblParticipant>();
            TblTreatyGroup = new HashSet<TblTreatyGroup>();
        }

        public decimal TreatyId { get; set; }
        public string TreatyCode { get; set; }
        public string TreatyDescription { get; set; }
        public int? TreatyCategoryId { get; set; }
        public int? TreatyTypeId { get; set; }
        public int? TreatyYearId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? TreatyBasisId { get; set; }
        public int? AccountingToId { get; set; }
        public int? CurrencyId { get; set; }
        public int? BorderauxFreqId { get; set; }
        public int? StatusId { get; set; }
        public string Remarks { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string IsApproved { get; set; }
        public Guid? ApprovedBy { get; set; }

        public virtual ICollection<TblParticipant> TblParticipant { get; set; }
        public virtual ICollection<TblTreatyGroup> TblTreatyGroup { get; set; }
    }
}
