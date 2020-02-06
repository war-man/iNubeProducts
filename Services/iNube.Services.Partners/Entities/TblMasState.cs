using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblMasState
    {
        public TblMasState()
        {
            TblMasDistrict = new HashSet<TblMasDistrict>();
            TblOfficeSpocDetails = new HashSet<TblOfficeSpocDetails>();
            TblOrgAddress = new HashSet<TblOrgAddress>();
            TblOrgOffice = new HashSet<TblOrgOffice>();
            TblOrgSpocDetails = new HashSet<TblOrgSpocDetails>();
            TblPartnerAddress = new HashSet<TblPartnerAddress>();
        }

        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasCountry Country { get; set; }
        public virtual ICollection<TblMasDistrict> TblMasDistrict { get; set; }
        public virtual ICollection<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual ICollection<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual ICollection<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual ICollection<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
        public virtual ICollection<TblPartnerAddress> TblPartnerAddress { get; set; }
    }
}
