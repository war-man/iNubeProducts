using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblMasPinCode
    {
        public TblMasPinCode()
        {
            TblCustAddress = new HashSet<TblCustAddress>();
            TblCustSpocDetails = new HashSet<TblCustSpocDetails>();
        }

        public int PincodeId { get; set; }
        public int? CityId { get; set; }
        public string Pincode { get; set; }
        public string AreaName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual ICollection<TblCustAddress> TblCustAddress { get; set; }
        public virtual ICollection<TblCustSpocDetails> TblCustSpocDetails { get; set; }
    }
}
