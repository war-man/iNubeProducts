using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimGridModel
    {
        public decimal TransactionID { get; set; }
        public int StatusID { get; set; }
        public string FNOL { get; set; }
        public string Occurrence { get; set; }
        public string PolicyNo { get; set; }
        public string VehicleNo { get; set; }
        public string InsuredName { get; set; }
        public string ClaimType { get; set; }
        public string IncidentDateString { get; set; }
        public string IncidentTimeString { get; set; }
        public string IncidentLocation { get; set; }
        public string RequestedDateString { get; set; }
        public string RequestedTimeString { get; set; }
        public string SurveyorStatus { get; set; }
        public string WorkshopStatus { get; set; }
        public string InvestigatorStatus { get; set; }
        public Nullable<bool> IsSurveyorAssign { get; set; }
        public Nullable<bool> IsWorkShopAssign { get; set; }
        public Nullable<bool> IsInvestigatorAssign { get; set; }
        public Nullable<bool> IsBackByManager { get; set; }
        public string PriortyClaim { get; set; }
        public string Status { get; set; }

        public DateTime? IncidentDateTime { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime? RequestedDateTime { get; set; }
        public int? InvestigatorStatusId { get; set; }
        public string LegalCaseStatus { get; set; }
        public int? LegalCaseStatusID { get; set; }
        public decimal CaseID { get; set; }
    }
}
