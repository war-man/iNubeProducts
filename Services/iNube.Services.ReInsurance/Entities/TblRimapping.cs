using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblRimapping
    {
        public TblRimapping()
        {
            TblRimappingDetail = new HashSet<TblRimappingDetail>();
        }

        public decimal RimappingId { get; set; }
        public int? Year { get; set; }
        public string Level { get; set; }
        public string LobProductCover { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TblRimappingDetail> TblRimappingDetail { get; set; }
    }
}
