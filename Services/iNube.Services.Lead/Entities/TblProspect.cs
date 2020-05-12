using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblProspect
    {
        public TblProspect()
        {
            TblSuspect = new HashSet<TblSuspect>();
        }

        public decimal ProspectId { get; set; }
        public string RecruitmentType { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Nic { get; set; }
        public string ApprovalStatus { get; set; }
        public DateTime? Dob { get; set; }
        public string OldAgentCode { get; set; }
        public string ProspectCode { get; set; }
        public string AgentType { get; set; }
        public string ApplicationNo { get; set; }
        public DateTime? ApplicationDate { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string Title { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string Profession { get; set; }
        public decimal? SalesExperience { get; set; }
        public decimal? IndustryExperience { get; set; }
        public string Sliino { get; set; }
        public decimal? PositionId { get; set; }
        public decimal? DesignationId { get; set; }
        public decimal? GradeId { get; set; }
        public decimal? MobileNo { get; set; }
        public decimal? AltMobileNo { get; set; }
        public string EmailId { get; set; }
        public decimal? CommAddressId { get; set; }
        public decimal? PermAddressId { get; set; }
        public DateTime? SliinoExpiryDate { get; set; }
        public string AgentCode { get; set; }
        public decimal? StatusId { get; set; }
        public string SubStatusId { get; set; }
        public decimal? InterviewCount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public string PreviousInsurerName { get; set; }
        public decimal? MaritalStatus { get; set; }
        public decimal? OfficePhNo { get; set; }
        public decimal? ResidencePhNo { get; set; }
        public decimal? Age { get; set; }
        public string SpecifyProfession { get; set; }
        public string NeedforIncome { get; set; }
        public string OthersforIncome { get; set; }
        public bool? IsNicclearnceOver { get; set; }
        public string ReceivedFrom { get; set; }
        public bool? IsIntegartionServiceSuccess { get; set; }
        public DateTime? InterviewScheduleDate { get; set; }
        public DateTime? InterviewScheduleTime { get; set; }
        public string HandledBy { get; set; }

        public virtual TblAddress CommAddress { get; set; }
        public virtual TblAddress PermAddress { get; set; }
        public virtual ICollection<TblSuspect> TblSuspect { get; set; }
    }
}
