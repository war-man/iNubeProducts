using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblMasCountry
    {
        public TblMasCountry()
        {
            TblMasState = new HashSet<TblMasState>();
            TblOfficeSpocDetails = new HashSet<TblOfficeSpocDetails>();
            TblOrgAddress = new HashSet<TblOrgAddress>();
            TblOrgEmpAddress = new HashSet<TblOrgEmpAddress>();
            TblOrgOffice = new HashSet<TblOrgOffice>();
            TblOrgSpocDetails = new HashSet<TblOrgSpocDetails>();
        }

        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual ICollection<TblMasState> TblMasState { get; set; }
        public virtual ICollection<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual ICollection<TblOrgAddress> TblOrgAddress { get; set; }
        public virtual ICollection<TblOrgEmpAddress> TblOrgEmpAddress { get; set; }
        public virtual ICollection<TblOrgOffice> TblOrgOffice { get; set; }
        public virtual ICollection<TblOrgSpocDetails> TblOrgSpocDetails { get; set; }
    }
}
