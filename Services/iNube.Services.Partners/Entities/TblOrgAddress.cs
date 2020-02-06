using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblOrgAddress
    {
        public decimal OrgAddressId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string OrgAddressType { get; set; }
        public int? OrgCountryId { get; set; }
        public int? OrgStateId { get; set; }
        public int? OrgDistrictId { get; set; }
        public int? OrgCityId { get; set; }
        public string OrgAddressLine1 { get; set; }
        public string OrgAddressLine2 { get; set; }
        public string OrgAddressLine3 { get; set; }
        public int? OrgPincodeId { get; set; }

        public virtual TblMasCity OrgCity { get; set; }
        public virtual TblMasCountry OrgCountry { get; set; }
        public virtual TblMasDistrict OrgDistrict { get; set; }
        public virtual TblMasPinCode OrgPincode { get; set; }
        public virtual TblMasState OrgState { get; set; }
        public virtual TblOrganization Organization { get; set; }
    }
}
