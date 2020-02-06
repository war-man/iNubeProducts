using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class LitigationModel
    {
        public int ForumID { get; set; }
        public string Forum { get; set; }
        public string Place { get; set; }
        public string CaseID { get; set; }
        public string CaseFiledOn { get; set; }
        public int TypeofCaseHandling { get; set; }
        public string AdvocateName { get; set; }
        public string Address { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public int PincodeID { get; set; }
        public string Pincode { get; set; }
        public string ContactNo { get; set; }
        public string HearingDate { get; set; }
        public string Remarks { get; set; }
        public string LegalNotice { get; set; }

        public string TempHearingDate { get; set; }
        public string TempProceeding { get; set; }
        public bool IsFinalVerdict { get; set; }
        public string CaseProceedingRemarks { get; set; }
        public string FinalVerdictLetter { get; set; }
        public string PlantiffName { get; set; }
        public string PlantiffDetail { get; set; }
        public int NatureofDamageID { get; set; }
        public string NatureofDamage { get; set; }
        public string ReceivedOn { get; set; }
        public bool IsInsuredVakalatAccepted { get; set; }
        public string VakalatAcceptedDate { get; set; }
        public string SignedVakalat { get; set; }
        public string VakalatReceivedDate { get; set; }
        public string DateOfFiling { get; set; }

        public List<CaseProceedingModel> CaseProceedingModel { get; set; }
    }

    public class CaseProceedingModel
    {
        public string HearingDate { get; set; }
        public string Proceeding { get; set; }
    }
}
