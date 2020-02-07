using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblTreatyGroup
    {
        public TblTreatyGroup()
        {
            TblArrangement = new HashSet<TblArrangement>();
            TblRimappingDetail = new HashSet<TblRimappingDetail>();
        }

        public decimal TreatyGroupId { get; set; }
        public decimal TreatyId { get; set; }
        public string TreatyGroupName { get; set; }
        public int? BusinessTypeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual TblTreaty Treaty { get; set; }
        public virtual ICollection<TblArrangement> TblArrangement { get; set; }
        public virtual ICollection<TblRimappingDetail> TblRimappingDetail { get; set; }
    }
}
