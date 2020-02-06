using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimTransactionModel
    {
        public ClaimTransactionModel()
        {
            ClaimModel = new ClaimModel();
            DocumentReviewModel = new ReviewDocumentModel();
            ClaimInvestigatorAssignDetailModel = new ClaimInvestigatorAssignDetailModel();
            ClaimSurveyorAssignDetailModel = new ClaimSurveyorAssignDetailModel();
            ClaimWorkShopAssignDetailModel = new ClaimWorkShopAssignDetailModel();
            ClaimDocumentModelList = new List<ClaimDocumentModel>();
            RecommendedHistoryList = new List<InternalRemarkModel>();
            MstMotorActionListItem = new Dictionary<int, string>();
            MstCauseOfLossListItem = new Dictionary<int, string>();
            MstClaimTypeListItem = new Dictionary<int, string>();
            ClaimServiceTypeListItem = new Dictionary<int, string>();
            MstClaimRejectionReasonListItem = new Dictionary<int, string>();
            MstClaimCloseReasonListItem = new Dictionary<int, string>();
            MstClaimQueryReasonListItem = new Dictionary<int, string>();
            SurveyorServiceTypeListItem = new Dictionary<int, string>();
            AccidentFactorListItem = new Dictionary<string, string>();
            DocumentsList = new List<ClaimDocumentList>();
            DocumentsListjpg = new List<ClaimDocumentList>();
            VideoEvidenceModeldet = new VideoEvidenceModel();
            MstMotorDecisiontypeListItem = new Dictionary<int, string>();
            Paymentlist = new List<ClaimPaymentList>();
            MstPermitValidAreasListItem = new Dictionary<int, string>();
        }

        public ClaimModel ClaimModel { get; set; }
        public VideoEvidenceModel VideoEvidenceModeldet { get; set; }
        public ReviewDocumentModel DocumentReviewModel { get; set; }
        public ClaimInvestigatorAssignDetailModel ClaimInvestigatorAssignDetailModel { get; set; }
        public ClaimSurveyorAssignDetailModel ClaimSurveyorAssignDetailModel { get; set; }
        public ClaimWorkShopAssignDetailModel ClaimWorkShopAssignDetailModel { get; set; }
        public List<ClaimDocumentModel> ClaimDocumentModelList { get; set; }
        public List<InternalRemarkModel> RecommendedHistoryList { get; set; }

        public List<ClaimDocumentList> DocumentsList { get; set; }
        public List<ClaimPaymentList> Paymentlist { get; set; }

        public List<ClaimDocumentList> DocumentsListjpg { get; set; }

        //// Dictionary Propertry Start ////
        public Dictionary<int, string> MstMotorActionListItem { get; set; }
        public Dictionary<int, string> MstCauseOfLossListItem { get; set; }
        public Dictionary<int, string> MstClaimTypeListItem { get; set; }
        public Dictionary<int, string> ClaimServiceTypeListItem { get; set; }
        public Dictionary<int, string> MstClaimRejectionReasonListItem { get; set; }
        public Dictionary<int, string> MstClaimQueryReasonListItem { get; set; }
        public Dictionary<int, string> SurveyorServiceTypeListItem { get; set; }
        public Dictionary<string, string> AccidentFactorListItem { get; set; }
        public Dictionary<int, string> MstMotorDecisiontypeListItem { get; set; }
        public Dictionary<int, string> MstMotorSettlementtypeListItem { get; set; }
        public Dictionary<int, string> MstClaimCloseReasonListItem { get; set; }
        public Dictionary<int, string> MstPermitValidAreasListItem { get; set; }
        //// Dictionary Propertry End ////


        //// Table Property Start ////
        public decimal TransactionID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public string Occurrence { get; set; }
        public decimal ClaimID { get; set; }
        public Nullable<int> StatusID { get; set; }
        public int ClaimTypeID { get; set; }
        public String ClaimType { get; set; }
        public Nullable<int> ClaimServiceTypeID { get; set; }
        public Nullable<int> CauseOfLossID { get; set; }
        public Nullable<int> ActionID { get; set; }
        public Nullable<int> DecisionTypeid { get; set; }
        public Nullable<int> SettlementTypeid { get; set; }
        public Nullable<bool> IsServeyorAssign { get; set; }
        public Nullable<bool> IsWorkshopAssign { get; set; }
        public Nullable<bool> IsInvestigatorAssign { get; set; }
        public Nullable<bool> IsBackByManager { get; set; }
        public Nullable<bool> IsReOpen { get; set; }
        public Nullable<bool> IsRoadSideAssistance { get; set; }
        public Nullable<decimal> ApproximateEstimatedCost { get; set; }
        public Nullable<decimal> AutoReservedAmount { get; set; }
        public string Remark { get; set; }
        public string InternalRemark { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyEmail { get; set; }
        public string QueryReasonIDs { get; set; }
        public string RejectionReasonIDs { get; set; }
        public string CloseReasonIDs { get; set; }
        public string AccidentFactor { get; set; }
        public string AccidentFactorDescription { get; set; }
        public string Description { get; set; }
        public Nullable<bool> IsPriorityClaim { get; set; }
        public Nullable<decimal> AdvanceAmountPayment { get; set; }
        //// Table Property End ////

        //// Extra Property Start ////
        public string IntimationMode { get; set; }
        public string IntimationBy { get; set; }
        public string IncidentDateTime { get; set; }
        public string IncidentLocation { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string Area { get; set; }
        public string PinCode { get; set; }
        public bool? IsFIR { get; set; }
        public string FIRNo { get; set; }
        public string FIRDate { get; set; }
        public string NameOfPoliceStation { get; set; }
        public string DriverName { get; set; }
        public string DriverLicenseNo { get; set; }
        public string PolicyNo { get; set; }
        public string PolicyStartDate { get; set; }
        public string PolicyEndDate { get; set; }
        public string InsuredName { get; set; }
        public string VehicleNo { get; set; }
        public string VehicleType { get; set; }
        public string FNOLNumber { get; set; }
        public string OccurrenceNumber { get; set; }
        public string ddlAccidentFactor { get; set; }
        public string Emailid { get; set; }
        public string Mobileno { get; set; }
        public string Name { get; set; }
        public string DocumentUploads { get; set; }
        public string FatherName { get; set; }
        //// Extra Property End ////

        //// Extra Property For Condition Check Start////
        public bool IsRejectionReasonShow { get; set; }
        public string Rolename { get; set; }

        public bool IsApprovedDecisionShow { get; set; }
        public bool IsClosedDecisionShow { get; set; }

        //// Extra Property For Condition Check End////

        public class GeneratePaymentAdvice
        {
            public GeneratePaymentAdvice()
            {
                this.PaymentAdviceDetail = new HashSet<PaymentAdviceDetail>();
            }

            public decimal PaymentAdviceID { get; set; }
            public decimal OrganizationID { get; set; }
            public string PaymentAdviceNo { get; set; }
            public Nullable<decimal> Level1Office { get; set; }
            public Nullable<decimal> Level2Office { get; set; }
            public Nullable<decimal> Level3Office { get; set; }
            public Nullable<System.DateTime> ClaimApprovedFrom { get; set; }
            public Nullable<System.DateTime> ClaimApprovedTo { get; set; }
            public string FileName { get; set; }
            public Nullable<int> TotalClaim { get; set; }
            public Nullable<int> PendingClaim { get; set; }
            public Nullable<System.Guid> UserID { get; set; }
            public Nullable<System.DateTime> CreateDatetime { get; set; }
            public Nullable<bool> IsValid { get; set; }
            public string FilePath { get; set; }
            public string ProceesedFile { get; set; }
            public string ErrorFile { get; set; }
            public int ReportID { get; set; }
            public List<decimal> LstTransactionID { get; set; }
            //commented by Mohan
            //public IEnumerable<SelectListItem> LstOfTPAsforpayment { get; set; }
            public IEnumerable<MasterListItem> LstTransaction { get; set; }
            public virtual ICollection<PaymentAdviceDetail> PaymentAdviceDetail { get; set; }
            public Nullable<System.DateTime> EffectiveFrom { get; set; }
            public Nullable<System.DateTime> EffectiveTo { get; set; }
            public string NICFormat { get; set; }
            public decimal? OfficeID { get; set; }

            public string ClaimNo { get; set; }
            public int ClaimType { get; set; }
            public string ClaimSubType { get; set; }
            public string DownloadType { get; set; }
            public string IndexID { get; set; }
            public string Username { get; set; }

            public string ICFileFormat { get; set; }
        }
        public partial class PaymentAdviceDetail
        {
            public decimal PaymentAdvDetailID { get; set; }
            public decimal PaymentAdviceID { get; set; }
            public Nullable<decimal> TransactionID { get; set; }
            public string PaymentAdviceNo { get; set; }
            public Nullable<System.Guid> UserID { get; set; }
            public Nullable<System.DateTime> CreateDatetime { get; set; }
            public Nullable<bool> IsValid { get; set; }

            //  public virtual ClaimTransaction ClaimTransaction { get; set; }
            public virtual GeneratePaymentAdvice GeneratePaymentAdvice { get; set; }

        }
        public class PaymentModelGrid
        {
            public int Srno { get; set; }
            public string InsCompany { get; set; }
            public string OfficeLevel { get; set; }
            public string PayAdvNo { get; set; }
            public DateTime? GenDate { get; set; }
            public int TotalClaimCount { get; set; }
            public int ClaimCount { get; set; }
            public string AdviceValue { get; set; }
            public int SuccessCount { get; set; }
            public int FailureCount { get; set; }
            public DateTime? ClaimApprovedFrom { get; set; }
            public DateTime? ClaimApprovedTo { get; set; }
            public bool? IsIntimation { get; set; }
            public string UserName { get; set; }
            public string TpaName { get; set; }
            public string UploadedFileName { get; set; }
            public string ProcessedFileName { get; set; }
            public string Status { get; set; }


        }

        public class VideoEvidenceModel
        {
            public string ContactNo { get; set; }
            public Nullable<int> SendTokenid { get; set; }
        }
        public class MasterListItem
        {
            public decimal IDWithDecimal { get; set; }
            public int ID { get; set; }
            public string Value { get; set; }
            public string Text { get; set; }
            public int selected { get; set; }
        }

        public class NEFTReverseRejectionDownload
        {

            public string ClaimNumber { get; set; }
            public string TransactionNumber { get; set; }
            public string PartyCode { get; set; }
            public string PayeeName { get; set; }
            public string Amount { get; set; }
            public string AccountNumber { get; set; }
            public string BankName { get; set; }
            public string IFSC { get; set; }
            public string UTRNumber { get; set; }
            public string UTRDate { get; set; }
            public string Remarks { get; set; }

        }

        public class ClaimPaymentList
        {
            public int PaymentDetailsId { get; set; }
            public string FNOLNo { get; set; }
            public string OccurrenceNo { get; set; }
            public Nullable<decimal> Transactionid { get; set; }
            public Nullable<int> ClaimTypeId { get; set; }
            public Nullable<int> ClaimSubtypeId { get; set; }
            public Nullable<decimal> ApprovedAmount { get; set; }
            public Nullable<int> PayToId { get; set; }
            public string PaymentMode { get; set; }
            public string PayeeName { get; set; }
            public string AccType { get; set; }
            public string paytoname { get; set; }
            public Nullable<int> BankNameID { get; set; }
            public string BranchNameID { get; set; }
            public string AccountNo { get; set; }
            public string IFSCcode { get; set; }
            public string MICRNo { get; set; }
            public Nullable<bool> Isvalid { get; set; }
            public Nullable<System.Guid> CreatedBy { get; set; }
            public Nullable<System.DateTime> CreatedDate { get; set; }
            public Nullable<System.DateTime> ModifiedDate { get; set; }
            public Nullable<System.Guid> Modifiedby { get; set; }
            public Nullable<int> NEFT_No { get; set; }
            public Nullable<System.DateTime> NEFT_Date { get; set; }
            public Nullable<decimal> NEFT_Amount { get; set; }
            public Nullable<int> Status { get; set; }
            public string Reason { get; set; }
            public string UploadedFileName { get; set; }
            public string UserName { get; set; }
            public string NEFTNo { get; set; }
            public Nullable<System.DateTime> NEFTDate { get; set; }
            public Nullable<decimal> NEFTAmount { get; set; }
        }
        public class ClaimDocumentList
        {
            public ClaimDocumentList()
            {
                DocList = new List<ClaimDocumentList>();
                List<DocIndexList12> DocIndexList1 = new List<DocIndexList12>();

            }
            public decimal DocID { get; set; }
            public decimal DetailID { get; set; }
            public string DocumentName { get; set; }
            public string DocumentIndex { get; set; }
            public Nullable<System.DateTime> UploadedDateTime { get; set; }
            public Nullable<bool> IsValid { get; set; }
            public Nullable<decimal> ClaimDocID { get; set; }
            public string FilePath { get; set; }
            public string DMSFilePath { get; set; }
            public string SPMDocName { get; set; }
            public Nullable<int> FlowTypeID { get; set; }


            public List<ClaimDocumentList> DocList { get; set; }
            public List<DocIndexList12> DocIndexList1 { get; set; }
        }

        public class DocIndexList12
        {
            public string DocumentIndex { get; set; }
            public string FilePath { get; set; }
            public string DMSFilePath { get; set; }
            public string ActualDocumentName { get; set; }
            public Nullable<decimal> ClaimDocID { get; set; }
        }

        public class CommunicationLogDetails
        {
            public decimal CommunicationDetailID { get; set; }
            public Nullable<int> CommunicationID { get; set; }
            public string TransactionID { get; set; }
            public string PolicyNo { get; set; }
            public string UHID { get; set; }
            public string ProviderID { get; set; }
            public string ClaimNo { get; set; }
            public string RequestID { get; set; }
            public string UserName { get; set; }
            public string MessageSubject { get; set; }
            public string Sender { get; set; }
            public string Recipient { get; set; }
            public Nullable<bool> IsSent { get; set; }
            public Nullable<System.DateTime> SentDateTime { get; set; }
            public string SMSBatchID { get; set; }
            public string ErrorInfo { get; set; }
            public string MessageBody { get; set; }
            public Nullable<int> StatusID { get; set; }
            public Nullable<int> AutoStatusID { get; set; }
            public string DocIndex { get; set; }
            public Nullable<bool> IsEmail { get; set; }
            public Nullable<bool> IsSMS { get; set; }
            public bool IsEmailApproval { get; set; }
            public bool IsrbnBoolProperty { get; set; }
        }


    }
}
