using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyClientAddress
    {
        public TblPolicyClientAddress()
        {
            TblPolicyClients = new HashSet<TblPolicyClients>();
            TblPolicyMemberDetailsAdress = new HashSet<TblPolicyMemberDetails>();
            TblPolicyMemberDetailsPermanetAddress = new HashSet<TblPolicyMemberDetails>();
        }

        public decimal AddressId { get; set; }
        public decimal? PolicyClientId { get; set; }
        public int AddressTypeId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public string Country { get; set; }
        public string District { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Status { get; set; }
        public decimal? SourceRowId { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public int? AreaId { get; set; }

        public virtual ICollection<TblPolicyClients> TblPolicyClients { get; set; }
        public virtual ICollection<TblPolicyMemberDetails> TblPolicyMemberDetailsAdress { get; set; }
        public virtual ICollection<TblPolicyMemberDetails> TblPolicyMemberDetailsPermanetAddress { get; set; }
    }
}
