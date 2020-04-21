using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgOffice
    {
        public TblOrgOffice()
        {
            InverseOfficeReportingOffice = new HashSet<TblOrgOffice>();
            TblOfficeSpocDetails = new HashSet<TblOfficeSpocDetails>();
            TblOrgOfficeMappingPrimaryOffice = new HashSet<TblOrgOfficeMapping>();
            TblOrgOfficeMappingReportingOffice = new HashSet<TblOrgOfficeMapping>();
            TblOrgPositionsOffice = new HashSet<TblOrgPositions>();
            TblOrgPositionsRepOffice = new HashSet<TblOrgPositions>();
        }

        public decimal OrgOfficeId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string OfficeName { get; set; }
        public string OfficeCode { get; set; }
        public string OfficePhoneNo { get; set; }
        public string OfficeFaxNo { get; set; }
        public int? OfficeLevelId { get; set; }
        public decimal? OfficeReportingOfficeId { get; set; }
        public int? OfficeCountryId { get; set; }
        public int? OfficeStateId { get; set; }
        public int? OfficeDistrictId { get; set; }
        public int? OfficeCityId { get; set; }
        public string OfficeAddressLine1 { get; set; }
        public string OfficeAddressLine2 { get; set; }
        public string OfficeAddressLine3 { get; set; }
        public int? OfficePincodeId { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblMasCity OfficeCity { get; set; }
        public virtual TblMasCountry OfficeCountry { get; set; }
        public virtual TblMasDistrict OfficeDistrict { get; set; }
        public virtual TblMasPinCode OfficePincode { get; set; }
        public virtual TblOrgOffice OfficeReportingOffice { get; set; }
        public virtual TblMasState OfficeState { get; set; }
        public virtual TblOrganization Organization { get; set; }
        public virtual ICollection<TblOrgOffice> InverseOfficeReportingOffice { get; set; }
        public virtual ICollection<TblOfficeSpocDetails> TblOfficeSpocDetails { get; set; }
        public virtual ICollection<TblOrgOfficeMapping> TblOrgOfficeMappingPrimaryOffice { get; set; }
        public virtual ICollection<TblOrgOfficeMapping> TblOrgOfficeMappingReportingOffice { get; set; }
        public virtual ICollection<TblOrgPositions> TblOrgPositionsOffice { get; set; }
        public virtual ICollection<TblOrgPositions> TblOrgPositionsRepOffice { get; set; }
    }
}
