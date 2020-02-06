using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblMasDistrict
    {
        public TblMasDistrict()
        {
            TblMasCity = new HashSet<TblMasCity>();
            TblOfficeSpocDetails = new HashSet<TblOfficeSpocDetails>();
            TblOrgAddress = new HashSet<TblOrgAddress>();
            TblOrgOffice = new HashSet<TblOrgOffice>();
            TblOrgSpocDetails = new HashSet<TblOrgSpocDetails>();
            TblPartnerAddress = new HashSet<TblPartnerAddress>();
        }

        public int DistrictId { get; set; }
        public int? StateId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasState State { get; set; }
        public virtual ICollection<TblMasCity> TblMasCity { get; set; }
        public virtual ICollection<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual ICollection<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual ICollection<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual ICollection<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
        public virtual ICollection<TblPartnerAddress> TblPartnerAddress { get; set; }
    }
}
