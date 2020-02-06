using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblMasCountry
    {
        public TblMasCountry()
        {
            TblCustAddress = new HashSet<TblCustAddress>();
            TblCustSpocDetails = new HashSet<TblCustSpocDetails>();
            TblMasState = new HashSet<TblMasState>();
        }

        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual ICollection<TblCustAddress> TblCustAddress { get; set; }
        public virtual ICollection<TblCustSpocDetails> TblCustSpocDetails { get; set; }
        public virtual ICollection<TblMasState> TblMasState { get; set; }
    }
}
