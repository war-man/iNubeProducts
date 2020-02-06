using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ServiceProviderAssignModel
    {
        public ServiceProviderAssignModel()
        {
            AdvocateAssignList = new List<ClaimAdvocateAssignDetailModel>();
            InvestigatorAssignList = new List<ClaimInvestigatorAssignDetailModel>();
            SurveyorAssignList = new List<ClaimSurveyorAssignDetailModel>();
            WorkshopAssignList = new List<ClaimWorkShopAssignDetailModel>();
            ClaimInvestigatorAssignDetailModel = new ClaimInvestigatorAssignDetailModel();
            ClaimSurveyorAssignDetailModel = new ClaimSurveyorAssignDetailModel();
            ClaimWorkShopAssignDetailModel = new ClaimWorkShopAssignDetailModel();
            SurveyorServiceTypeListItem = new Dictionary<int, string>();
        }
        public decimal AssignCaseAdvocateId { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public System.DateTime ModifiedDateTime { get; set; }

        public string CreateBy { get; set; }
        public string ModifyBy { get; set; }

        public decimal TransactionID { get; set; }
        public int ClaimTypeID { get; set; }
        public decimal CaseID { get; set; }

        public bool IsSurveyorAlreadyAssign { get; set; }
        public decimal SurveyorAssignDetailID { get; set; }
        public decimal ServeyorDetailID { get; set; }
        public int? ServeyTypeID { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorNo { get; set; }
        public string SurveyorType { get; set; }
        public string SurveyorStatus { get; set; }
        public string SurveyType { get; set; }
        public string SurveyorContact { get; set; }
        public string SurveyorRemark { get; set; }
        public Dictionary<int, string> SurveyorServiceTypeListItem { get; set; }


        public bool IsWorkShopAlreadyAssign { get; set; }
        public decimal WorkShopAssignDetailID { get; set; }
        public decimal WorkShopDetailID { get; set; }
        public string WorkShopName { get; set; }
        public string WorkShopNo { get; set; }
        public string WorkShopContact { get; set; }
        public string WorkShopRemark { get; set; }


        public bool IsInvestigatorAlreadyAssign { get; set; }
        public decimal InvestigatorAssignDetailID { get; set; }
        public decimal InvestigatorDetailID { get; set; }
        public string InvestigatorName { get; set; }
        public string InvestigatorNo { get; set; }
        public string InvestigatorContact { get; set; }
        public string InvestigatorRemark { get; set; }

        public ClaimInvestigatorAssignDetailModel ClaimInvestigatorAssignDetailModel { get; set; }
        public ClaimSurveyorAssignDetailModel ClaimSurveyorAssignDetailModel { get; set; }
        public ClaimWorkShopAssignDetailModel ClaimWorkShopAssignDetailModel { get; set; }
        public List<ClaimInvestigatorAssignDetailModel> InvestigatorAssignList { get; set; }
        public List<ClaimSurveyorAssignDetailModel> SurveyorAssignList { get; set; }
        public List<ClaimWorkShopAssignDetailModel> WorkshopAssignList { get; set; }
        public List<ClaimAdvocateAssignDetailModel> AdvocateAssignList { get; set; }
        public Dictionary<int, string> LegalServiceType { get; set; }

    }

    public class ClaimInvestigatorAssignDetailModel
    {
        public ClaimInvestigatorAssignDetailModel()
        {

        }

        public decimal InvestigatorAssignDetailID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<decimal> InvestigatorDetailID { get; set; }
        public string Remark { get; set; }
        public Nullable<bool> IsInvestigatorReportReceived { get; set; }
        public string InvestigatorName { get; set; }
        public string InvestigatorNo { get; set; }
        public string InvestigatorContact { get; set; }
        public string InvestigatorRemark { get; set; }
        public string InvestigatorType { get; set; }
        public string InvestigatorStatus { get; set; }
        public int? InvestigatorStatusID { get; set; }
    }

    public class ClaimAdvocateAssignDetailModel
    {
        public ClaimAdvocateAssignDetailModel()
        {

        }

        public decimal AdvocateAssignDetailID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<decimal> AdvocateDetailID { get; set; }
        public string Remark { get; set; }
        public Nullable<bool> IsAdvocateReportReceived { get; set; }
        public string AdvocateName { get; set; }
        public string AdvocateNo { get; set; }
        public string AdvocateContact { get; set; }
        public string AdvocateRemark { get; set; }
        public string AdvocateType { get; set; }
        public string AdvocateStatus { get; set; }
        public int? AdvocateStatusID { get; set; }
        public string AdvocateOpinion { get; set; }
        public DateTime AdvocateAssignDate { get; set; }
        public int? LegalServiceTypeID { get; set; }
        public int? AdvocateOpinionID { get; set; }
    }

    public class ClaimSurveyorAssignDetailModel
    {
        public ClaimSurveyorAssignDetailModel()
        {

        }

        public decimal SurveyorAssignDetailID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<decimal> ServeyorDetailID { get; set; }
        public Nullable<int> ServeyTypeID { get; set; }
        public string Remark { get; set; }
        public Nullable<bool> IsServeyReportReceived { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorNo { get; set; }
        public string SurveyorType { get; set; }
        public string SurveyorStatus { get; set; }
        public string SurveyType { get; set; }
        public string SurveyorContact { get; set; }
        public string SurveyorRemark { get; set; }
        public Dictionary<int, string> SurveyorServiceTypeListItem { get; set; }
    }

    public class ClaimWorkShopAssignDetailModel
    {
        public ClaimWorkShopAssignDetailModel()
        {

        }

        public decimal WorkShopAssignDetailID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<decimal> WorkShopDetailID { get; set; }
        public string Remark { get; set; }
        public Nullable<bool> IsWorkShopReportReceived { get; set; }
        public string WorkShopName { get; set; }
        public string WorkShopNo { get; set; }
        public string WorkShopContact { get; set; }
        public string WorkShopRemark { get; set; }
        public string WorkshopStatus { get; set; }
    }
}
