using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblAddress
    {
        public TblAddress()
        {
            TblContacts = new HashSet<TblContacts>();
            TblCustomers = new HashSet<TblCustomers>();
            TblOrganizationCorporateAddress = new HashSet<TblOrganization>();
            TblOrganizationMailingAddress = new HashSet<TblOrganization>();
            TblOrganizationRegisteredAddres = new HashSet<TblOrganization>();
            TblOrganizationSpocAdderss = new HashSet<TblOrganization>();
            TblPolicyClientsAdress = new HashSet<TblPolicyClients>();
            TblPolicyClientsPermanetAddress = new HashSet<TblPolicyClients>();
            TblPolicyMemberDetailsAdress = new HashSet<TblPolicyMemberDetails>();
            TblPolicyMemberDetailsPermanetAddress = new HashSet<TblPolicyMemberDetails>();
        }

        public decimal AddressId { get; set; }
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

        public virtual ICollection<TblContacts> TblContacts { get; set; }
        public virtual ICollection<TblCustomers> TblCustomers { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationCorporateAddress { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationMailingAddress { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationRegisteredAddres { get; set; }
        public virtual ICollection<TblOrganization> TblOrganizationSpocAdderss { get; set; }
        public virtual ICollection<TblPolicyClients> TblPolicyClientsAdress { get; set; }
        public virtual ICollection<TblPolicyClients> TblPolicyClientsPermanetAddress { get; set; }
        public virtual ICollection<TblPolicyMemberDetails> TblPolicyMemberDetailsAdress { get; set; }
        public virtual ICollection<TblPolicyMemberDetails> TblPolicyMemberDetailsPermanetAddress { get; set; }
    }
}
