using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgEmployee
    {
        public TblOrgEmployee()
        {
            TblOrgEmpAddress = new HashSet<TblOrgEmpAddress>();
            TblOrgEmpEducation = new HashSet<TblOrgEmpEducation>();
        }

        public decimal OrgEmpId { get; set; }
        public string StaffCode { get; set; }
        public string StaffName { get; set; }
        public decimal? PositionId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public decimal? StaffTypeId { get; set; }
        public string Function { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string Smcode { get; set; }
        public string Imdcode { get; set; }
        public string StaffStatus { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? SalutationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public int? MaritalStatusId { get; set; }
        public int? GenderId { get; set; }
        public string PhoneNumber1 { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string AccountNumber { get; set; }
        public decimal? ReportingTo { get; set; }
        public string RecruitmentNo { get; set; }

        public virtual TblOrgPositions Position { get; set; }
        public virtual ICollection<TblOrgEmpAddress> TblOrgEmpAddress { get; set; }
        public virtual ICollection<TblOrgEmpEducation> TblOrgEmpEducation { get; set; }
    }
}
