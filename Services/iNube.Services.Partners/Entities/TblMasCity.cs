using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblMasCity
    {
        public TblMasCity()
        {
            TblMasPinCode = new HashSet<TblMasPinCode>();
            TblOfficeSpocDetails = new HashSet<TblOfficeSpocDetails>();
            TblOrgAddress = new HashSet<TblOrgAddress>();
            TblOrgOffice = new HashSet<TblOrgOffice>();
            TblOrgSpocDetails = new HashSet<TblOrgSpocDetails>();
            TblPartnerAddress = new HashSet<TblPartnerAddress>();
        }

        public int CityId { get; set; }
        public int? DistrictId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasDistrict District { get; set; }
        public virtual ICollection<TblMasPinCode> TblMasPinCode { get; set; }
        public virtual ICollection<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual ICollection<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual ICollection<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual ICollection<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
        public virtual ICollection<TblPartnerAddress> TblPartnerAddress { get; set; }
    }
}
