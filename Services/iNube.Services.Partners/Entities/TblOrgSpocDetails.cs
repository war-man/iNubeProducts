using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblOrgSpocDetails
    {
        public decimal OrgSpocId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string SpocfirstName { get; set; }
        public string Spocmobileno { get; set; }
        public string SpocemailId { get; set; }
        public string Spocdesignation { get; set; }
        public int? SpoccountryId { get; set; }
        public int? SpocstateId { get; set; }
        public int? SpocdistrictId { get; set; }
        public int? SpoccityId { get; set; }
        public string SpocaddressLine1 { get; set; }
        public string SpocaddressLine2 { get; set; }
        public string SpocaddressLine3 { get; set; }
        public int? SpocpincodeId { get; set; }
        public string SpocMiddleName { get; set; }
        public string SpocLastName { get; set; }
        public DateTime? Spocdob { get; set; }
        public DateTime? Spocdoj { get; set; }
        public string SpocpanNo { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }
        public string SpocUserName { get; set; }
        public int? SpocMaritalStatusId { get; set; }
        public int? SpocGenderId { get; set; }
        public string SpocBranchName { get; set; }
        public int? SpocBrachCode { get; set; }

        public virtual TblOrganization Organization { get; set; }
        public virtual TblMasCity Spoccity { get; set; }
        public virtual TblMasCountry Spoccountry { get; set; }
        public virtual TblMasDistrict Spocdistrict { get; set; }
        public virtual TblMasPinCode Spocpincode { get; set; }
        public virtual TblMasState Spocstate { get; set; }
    }
}
