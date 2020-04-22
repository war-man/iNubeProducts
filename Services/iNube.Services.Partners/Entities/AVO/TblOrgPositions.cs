using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgPositions
    {
        public TblOrgPositions()
        {
            InverseParent = new HashSet<TblOrgPositions>();
            InverseParentLine = new HashSet<TblOrgPositions>();
            InverseReporting = new HashSet<TblOrgPositions>();
            InverseReportingLine = new HashSet<TblOrgPositions>();
            TblOrgEmployee = new HashSet<TblOrgEmployee>();
        }

        public decimal PositionId { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal OfficeId { get; set; }
        public decimal? DesignationId { get; set; }
        public string PositionName { get; set; }
        public decimal? RepOrgId { get; set; }
        public decimal? RepOfficeId { get; set; }
        public decimal? ParentId { get; set; }
        public decimal? ParentLineId { get; set; }
        public decimal? ReportingId { get; set; }
        public decimal? ReportingLineId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsVacant { get; set; }
        public bool? IsActive { get; set; }

        public virtual TblOrgStructure Designation { get; set; }
        public virtual TblOrgOffice Office { get; set; }
        public virtual TblOrganization Organization { get; set; }
        public virtual TblOrgPositions Parent { get; set; }
        public virtual TblOrgPositions ParentLine { get; set; }
        public virtual TblOrgOffice RepOffice { get; set; }
        public virtual TblOrganization RepOrg { get; set; }
        public virtual TblOrgPositions Reporting { get; set; }
        public virtual TblOrgPositions ReportingLine { get; set; }
        public virtual ICollection<TblOrgPositions> InverseParent { get; set; }
        public virtual ICollection<TblOrgPositions> InverseParentLine { get; set; }
        public virtual ICollection<TblOrgPositions> InverseReporting { get; set; }
        public virtual ICollection<TblOrgPositions> InverseReportingLine { get; set; }
        public virtual ICollection<TblOrgEmployee> TblOrgEmployee { get; set; }
    }
}
