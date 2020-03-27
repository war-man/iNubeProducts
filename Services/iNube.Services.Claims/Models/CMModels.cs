using iNube.Services.Claims.Entities;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace iNube.Services.Claims.Models
{
    public partial class ClaimDTO
    {
        public ClaimDTO()
        {
            ClaimDetails = new HashSet<ClaimDetailsDTO>();
            ClaimTransaction = new HashSet<ClaimTransactionDTO>();
        }
        public decimal ClaimId { get; set; }
        public bool? IsValid { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime? ModifiedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string Fnol { get; set; }
        public decimal? PolicyDetailsId { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public int? AreaId { get; set; }
        public int? IntimationModeId { get; set; }
        public int? IntimationById { get; set; }
        public DateTime? IncidentDateTime { get; set; }
        public string IncidentLocation { get; set; }
        public bool? IsFir { get; set; }
        public DateTime? FirdateTime { get; set; }
        public string NameOfPoliceStation { get; set; }
        public bool? IsAnyWitness { get; set; }
        public bool? IsAnyOtherVehicleInAccident { get; set; }
        public int? DriverOfTheVehicleId { get; set; }
        public string DriverName { get; set; }
        public string DriverLicenseNo { get; set; }
        public DateTime? DriverLicenseExpiryDateTime { get; set; }
        public int? RtodetailId { get; set; }
        public int? DlauthorizedToDriveId { get; set; }
        public int? RoadTypeId { get; set; }
        public int? PurposeOfTravelId { get; set; }
        public bool? IsVehicleParked { get; set; }
        public int? VehicleSpeed { get; set; }
        public int? NumberOfPasanger { get; set; }
        public string WeatherCondition { get; set; }
        public string Firno { get; set; }
        public int? DriverAge { get; set; }
        public int? DrivingExperience { get; set; }
        public int? DriverQualificationId { get; set; }
        public DateTime? DriverDob { get; set; }
        public string FathersName { get; set; }
        public bool? IsTrailerAttached { get; set; }
        public decimal? RegisteredLadenWeightKg { get; set; }
        public decimal? RegisteredUnLadenWeightKg { get; set; }
        public decimal? WeightOfGoodsCarriedKg { get; set; }
        public string TypeOfGoodsCarried { get; set; }
        public string NatureOfGoodsCarried { get; set; }
        public decimal? RegisteredPassengerCarryingCapacity { get; set; }
        public decimal? PassengersCarried { get; set; }
        public string NatureOfPermit { get; set; }
        public string TypeOfPermit { get; set; }
        public string PermitValidForAreas { get; set; }
        public DateTime? PermitValidUpTo { get; set; }
        public DateTime? FitnessValidUpTo { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? ProductId { get; set; }
        public string EventId { get; set; }

        public virtual ICollection<ClaimDetailsDTO> ClaimDetails { get; set; }
        public virtual ICollection<ClaimTransactionDTO> ClaimTransaction { get; set; }
    }


    public partial class ClaimProcessDTO
    {
        public ClaimProcessDTO()
        {
            ClaimInsurable = new List<ClaimInsurableDTO>();
            ClaimHistory = new List<ClaimsHistoryDTO>();
            Alldoc = new List<Alldoc>();
            BankAccounts = new List<BankAccountsDTO>();

        }
        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimManagerRemarks { get; set; }
        public int? ApprovedClaimAmount { get; set; }
        public string EmailId { get; set; }
        public string PolicyNumber { get; set; }
        public int? PayeeTypeId { get; set; }
        public dynamic DataModelDTO { get; set; }
        // public string InsuredName { get; set; }
        // public decimal? ApprovedClaimAmounts { get; set; }
        // public string DmsdocId { get; set; }
        // public string DocumentName { get; set; }


        public virtual List<ClaimInsurableDTO> ClaimInsurable { get; set; }
        public virtual List<ClaimsHistoryDTO> ClaimHistory { get; set; }
        public virtual List<Alldoc> Alldoc { get; set; }
        public virtual List<BankAccountsDTO> BankAccounts { get; set; }
    }

    public partial class SearchClaimDTO
    {
        public string PolicyNo { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimStatus { get; set; }
        public int? ClaimStatusId { get; set; }
        public string InsuredReference { get; set; }
        public string InsuredEmail { get; set; }
        public string InsuredMobileNo { get; set; }
        public DateTime? EventDate { get; set; }
        public DateTime? lossDateTime { get; set; }
    }

    public partial class ClaimSearchResponseDTO : ResponseStatus
    {
        public ClaimSearchResponseDTO()
        {
            ClaimSearch = new List<SearchDTO>();
        }
        public List<SearchDTO> ClaimSearch { get; set; }

        // public SearchDTO ClaimSearch { get; set; }
    }

    public partial class SearchDTO
    {
        public int ClaimId { get; set; }
        // public decimal? PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimStatus { get; set; }
        // public string CoverEvent { get; set; }
        public dynamic CoverValue { get; set; }
        public string TypeOfLoss { get; set; }
        public string InsuredReference { get; set; }
        public string InsuredEmail { get; set; }
        public string InsuredMobileNo { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime? lossDateTime { get; set; }
        // public string AccountHolderName { get; set; }
        public int ClaimStatusId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string InsuredName { get; set; }
        public int? ProductIdPk { get; set; }
    }

    public partial class ClaimResponseDTO
    {
        public int ClaimId { get; set; }
        public decimal? PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimprevStatus { get; set; }
        public string ClaimcurrStatus { get; set; }
        public DateTime? lossDateTime { get; set; }
        public string AccountHolderName { get; set; }
        public int ClaimStatusId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }

    }

    public partial class BankDataDTO
    {
        public int ClaimId { get; set; }
        public string ClaimStatus { get; set; }
        public int ClaimStatusId { get; set; }
        public string AccountHolderName { get; set; }
    }

    public class SearchFinanceRequest
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Value { get; set; }
    }

    public partial class ClaimsRequest
    {
        public DateTime? ClaimFromDate { get; set; }
        public DateTime? ClaimToDate { get; set; }
        public int? ClaimStatusId { get; set; }
        public string CoverEvent { get; set; }
        public DateTime? lossDateTime { get; set; }
        public decimal ProductId { get; set; }
        public decimal PartnerId { get; set; }
        public string PartnerName { get; set; }
        public decimal PolicyId { get; set; }
        public int ClaimId { get; set; }
    }

    public partial class ClaimStatusDTO
    {
        public decimal ClaimId { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimStatus { get; set; }
        public int? ClaimAmount { get; set; }
        public decimal? PolicyId { get; set; }
    }

    public class PolicySearchbyPidDTO
    {
        public decimal? PartnerId { get; set; }
        public int? ProductId { get; set; }
    }

    public partial class ClaimDetailsDTO
    {
        public decimal ClaimDetailsId { get; set; }
        public string ClaimRequest { get; set; }
        public DateTime? LossDateTime { get; set; }
        public string LocationOfloss { get; set; }
        public string LossDescription { get; set; }
        public string MobileNumber { get; set; }
        public string BeneficiaryName { get; set; }
        public int? ClaimId { get; set; }

        public virtual ClaimsDTO Claim { get; set; }
    }

    public partial class ClaimTransactionDTO
    {
        public decimal TransactionId { get; set; }
        public bool? IsValid { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime? ModifiedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string Occurrence { get; set; }
        public decimal ClaimId { get; set; }
        public int? StatusId { get; set; }
        public int ClaimTypeId { get; set; }
        public int? ClaimServiceTypeId { get; set; }
        public int? CauseOfLossId { get; set; }
        public int? ActionId { get; set; }
        public bool? IsServeyorAssign { get; set; }
        public bool? IsWorkshopAssign { get; set; }
        public bool? IsInvestigatorAssign { get; set; }
        public bool? IsBackByManager { get; set; }
        public bool? IsReOpen { get; set; }
        public bool? IsRoadSideAssistance { get; set; }
        public decimal? ApproximateEstimatedCost { get; set; }
        public string Remark { get; set; }
        public string InternalRemark { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyEmail { get; set; }
        public string QueryReasonIds { get; set; }
        public string RejectionReasonIds { get; set; }
        public string AccidentFactor { get; set; }
        public string AccidentFactorDescription { get; set; }
        public bool? IsRead { get; set; }
        public decimal? ApprovedAmount { get; set; }
        public int? DecisionTypeid { get; set; }
        public int? SettlementTypeid { get; set; }
        public string CloseReasonIds { get; set; }
        public bool? IsPriorityClaim { get; set; }
        public string ReopenReasonIds { get; set; }
        public decimal? AdvanceAmount { get; set; }

        public virtual ClaimDTO Claim { get; set; }
    }
    public class ClaimResponse : ResponseStatus
    {
        public ClaimDTO claim { get; set; }
    }
    public class ClaimSearchResponse : ResponseStatus
    {
        public ClaimDTO Searchclaim { get; set; }
    }

    public partial class ClaimSearchDTO
    {
        public decimal ClaimId { get; set; }
        public decimal? PolicyDetailsId { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? ProductId { get; set; }
        public string EventId { get; set; }
        public string ClaimNo { get; set; }

    }

    public partial class ClaimsDTO : ResponseStatus
    {
        public ClaimsDTO()
        {
            TblBankAccounts = new HashSet<BankAccountsDTO>();
            TblClaimdoc = new HashSet<ClaimdocDTO>();
            TblPayment = new HashSet<PaymentDTO>();
            ClaimInsurable = new HashSet<ClaimInsurableDTO>();
            ClaimsHistory = new HashSet<ClaimsHistoryDTO>();
            ClaimAllocationDetails = new HashSet<ClaimAllocationDetailsDTO>();
        }

        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimNumber { get; set; }
        public int? ClaimAmount { get; set; }
        public string ClaimManagerRemarks { get; set; }
        public int? ApprovedClaimAmount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int? LossId { get; set; }
        public DateTime? LossDateTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public decimal? PolicyId { get; set; }
        public string PolicyNumber { get; set; }
        public bool? Active { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string PolicyNo { get; set; }
        public string ErroMessage { get; set; }
        public int? ProductIdPk { get; set; }
        public string ClaimFields { get; set; }


        public virtual TblmasCmcommonTypes ClaimStatus { get; set; }
        public virtual TblmasCmcommonTypes Loss { get; set; }
        public virtual ICollection<BankAccountsDTO> TblBankAccounts { get; set; }
        public virtual ICollection<ClaimdocDTO> TblClaimdoc { get; set; }
        public virtual ICollection<PaymentDTO> TblPayment { get; set; }
        public virtual ICollection<ClaimInsurableDTO> ClaimInsurable { get; set; }
        public virtual ICollection<ClaimsHistoryDTO> ClaimsHistory { get; set; }
        public virtual ICollection<ClaimAllocationDetailsDTO> ClaimAllocationDetails { get; set; }
    }


    public class ClaimResponses : ResponseStatus
    {
        public string PolicyNo { get; set; }
        public string ClaimNumber { get; set; }
    }



    public partial class ClaimDashboard
    {
        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public int? ClaimAmount { get; set; }
        public int? ApprovedClaimAmount { get; set; }
        public int PaymentId { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentMode { get; set; }
        public DateTime? PaymentDate { get; set; }
        public decimal? PaymentAmount { get; set; }
    }

    public partial class ClaimCounts
    {
        public int Intimated { get; set; }
        public int Approved { get; set; }
        public int Document { get; set; }
        public int Rejected { get; set; }
        public int Setteled { get; set; }
    }


    public partial class ClaimTransactionNewDTOs
    {
        public int ClaimTransId { get; set; }
        public int ClaimId { get; set; }
        public int BankId { get; set; }
        public int PaymentId { get; set; }
        public int LossId { get; set; }
        public int ClaimDocId { get; set; }
        public DateTime? LossDate { get; set; }
        public DateTime? LossTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }

        public virtual BankDTO Bank { get; set; }
        // public virtual ClaimsDTOs Claim { get; set; }
        public virtual ClaimdocDTO ClaimDoc { get; set; }
        public virtual masCmcommonTypesDTO Loss { get; set; }
        public virtual PaymentDTO Payment { get; set; }
    }


    public partial class BankDTO
    {
        //    public BankDTO()
        //    {
        //        ClaimTransactionNewDTOs = new HashSet<ClaimTransactionNewDTOs>();
        //    }

        public int BankId { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranchAddress { get; set; }
        public string Ifsccode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        // public virtual ICollection<ClaimTransactionNewDTOs> ClaimTransactionNewDTOs { get; set; }
    }


    public partial class masCmcommonTypesDTO
    {

        public masCmcommonTypesDTO()
        {
            //  ClaimTransactionNewDTOs = new HashSet<ClaimTransactionNewDTOs>();
            ClaimsClaimStatusDTO = new HashSet<ClaimsDTO>();
            ClaimsHistoryDTO = new HashSet<ClaimsHistoryDTO>();
            ClaimsLossDTO = new HashSet<ClaimsDTO>();
        }

        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }

        // public virtual ICollection<ClaimTransactionNewDTOs> ClaimTransactionNewDTOs { get; set; }
        public virtual ICollection<ClaimsDTO> ClaimsClaimStatusDTO { get; set; }
        public virtual ICollection<ClaimsHistoryDTO> ClaimsHistoryDTO { get; set; }
        public virtual ICollection<ClaimsDTO> ClaimsLossDTO { get; set; }
    }


    public partial class ClaimdocDTO
    {
        public ClaimdocDTO()
        {
            ClaimTransactionNewDTO = new HashSet<ClaimTransactionnewDTO>();
        }

        public int ClaimDocId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public string DocumentView { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public byte[] Document { get; set; }
        public DateTime? UploadDate { get; set; }
        public int ClaimId { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string DmsdocId { get; set; }

        public virtual TblClaims Claim { get; set; }
        public virtual ICollection<ClaimTransactionnewDTO> ClaimTransactionNewDTO { get; set; }
    }


    public class ClaimDocUpload : ResponseStatus
    {
        public ClaimdocDTO claimdocDTO { get; set; }
    }

    public class ClaimDocUploadDTO
    {
        public int ClaimDocId { get; set; }
        public string DocumentType { get; set; }
        public string DocumentName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public byte[] Document { get; set; }
        public DateTime? UploadDate { get; set; }
        public int ClaimId { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ClaimsDTO Claim { get; set; }
        public virtual ICollection<ClaimTransactionnewDTO> TblClaimTransactionNew { get; set; }
    }


    public class PolicysearchDTO
    {
        public string Policynumber;
        public string EventId;
        public string ProductId;
        public string PartnerId;
        public string MobileNumber;
        public string Email;
        public string Insuredreference;
        public string CoverEvent;
        public decimal? PolicyId { get; set; }
    }

    public partial class ClaimsHistoryDTO
    {
        public int ClaimHistoryId { get; set; }
        public int ClaimId { get; set; }
        public int ClaimStatusId { get; set; }
        public int? ClaimAmount { get; set; }
        public string ClaimManagerRemarks { get; set; }
        public int? ApprovedClaimAmount { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int? LossId { get; set; }
        public DateTime? LossDateTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public bool? Active { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrgId { get; set; }
        public string PolicyNo { get; set; }
        public string ClaimNumber { get; set; }

        // public virtual TblClaims Claim { get; set; }
        //  public virtual TblmasCmcommonTypes ClaimStatus { get; set; }
    }

    public partial class FinanceDTO
    {
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }

        public virtual PolicyDTO Policy { get; set; }
        public virtual ClaimsDTO Claims { get; set; }
        public virtual TblmasCmcommonTypes ClaimStatus { get; set; }
        public virtual BankAccountsDTO Bank { get; set; }
        public virtual PaymentDTO Payment { get; set; }

    }

    public partial class ClaimsActive
    {
        public string[] ClaimNumber { get; set; }
    }

    public partial class FinanceProcessDTO
    {
        public int BankFileId { get; set; }
        public string PolicyNo { get; set; }
        public int ClaimId { get; set; }
        public string ClaimNo { get; set; }
        public string ClaimStatus { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public string BankAccountHolderName { get; set; }
        public string BankName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankBranchAddress { get; set; }
        public string BankIfsccode { get; set; }
        public decimal Amount { get; set; }
        public string Utrno { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string PaymentStatus { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    public partial class PaymentDTO
    {
        //public PaymentDTO()
        //{
        //    TblClaimTransactionNew = new HashSet<ClaimTransactionnewDTO>();
        //}

        public int PaymentId { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentMode { get; set; }
        public int? Utrno { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int ClaimId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public decimal? PaymentAmount { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ClaimNo { get; set; }

        // public virtual ClaimsDTO Claim { get; set; }
        //public virtual ICollection<ClaimTransactionnewDTO> TblClaimTransactionNew { get; set; }
    }

    public partial class ClaimTransactionnewDTO
    {
        public int ClaimTransId { get; set; }
        public int ClaimId { get; set; }
        public int BankId { get; set; }
        public int PaymentId { get; set; }
        public int LossId { get; set; }
        public int ClaimDocId { get; set; }
        public DateTime? LossDate { get; set; }
        public DateTime? LossTime { get; set; }
        public string LocationOfEvent { get; set; }
        public string LossOfDescription { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual TblBank Bank { get; set; }
        public virtual TblClaims Claim { get; set; }
        public virtual TblClaimdoc ClaimDoc { get; set; }
        public virtual TblmasCmcommonTypes Loss { get; set; }
        public virtual TblPayment Payment { get; set; }
    }

    public partial class BankAccountsDTO
    {
        public int BankId { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranchAddress { get; set; }
        public string Ifsccode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ClaimId { get; set; }
        public int? AccountType { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? PayeeTypeId { get; set; }
        public string PayeeType { get; set; }
        public decimal? AmountPaid { get; set; }
        public DateTime? DataOfPayment { get; set; }
        //public virtual ClaimsDTO Claim { get; set; }
    }
    public partial class BankFileDTO
    {
        public int BankFileId { get; set; }
        public string PolicyNo { get; set; }
        public string ClaimNo { get; set; }
        public string ClaimStatus { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public string BankAccountHolderName { get; set; }
        public string BankName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankBranchAddress { get; set; }
        public string BankIfsccode { get; set; }
        public decimal Amount { get; set; }
        public string Utrno { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentDate { get; set; }
        public int? Active { get; set; }
        public string CreatedBy { get; set; }
        public decimal? BankDocId { get; set; }
        public string FailedReason { get; set; }
    }

    public partial class AccountDTO
    {
        public string PolicyNo { get; set; }
        public string ClaimNo { get; set; }
        public string ClaimStatus { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public decimal Amount { get; set; }
        public string Utrno { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentDate { get; set; }
    }

    public partial class AccountCheckDTO
    {
        public string PolicyNo { get; set; }
        public string ClaimNo { get; set; }
        public string ClaimStatus { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public decimal Amount { get; set; }
        public string Utrno { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentDate { get; set; }
    }

    public partial class ClaimDataDTO
    {
        public ClaimDataDTO()
        {
            ClaimInsurable = new List<ClaimInsurable>();
            BankAccounts = new List<BankAccounts>();
            Alldoc = new List<Alldoc>();
            ClaimAllocationDetails = new HashSet<ClaimAllocationDetailsDTO>();
        }
        public string PolicyNumber { get; set; }
        public DateTime? lossDateTime { get; set; }
        public string locationOfLoss { get; set; }
        public int lossIntimatedBy { get; set; }
        public string lossDescription { get; set; }
        public int? ClaimAmount { get; set; }
        //public string AccHolderName { get; set; }
        //public string AccNumber { get; set; }
        //public string BankName { get; set; }
        //public string BankBranchAdd { get; set; }
        //public string IfscCode { get; set; }
        // public string EmailId { get; set; }
        // public int? AccType { get; set; }
        public int ClaimStatusId { get; set; }
        // public bool? Active { get; set; }
        //public decimal? PolicyId { get; set; }
        //public int ClaimInsurableId { get; set; }
        //public string InsurableItem { get; set; }
        //public string Name { get; set; }
        //public string IdentificationNo { get; set; }
        //public string TypeOfLoss { get; set; }
        //public decimal? BenefitAmount { get; set; }
        //public int? ClaimAmounts { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public int? ProductIdPk { get; set; }
        public string ClaimNumber { get; set; }
        public virtual ICollection<ClaimAllocationDetailsDTO> ClaimAllocationDetails { get; set; }
        public virtual List<BankAccounts> BankAccounts { get; set; }
        public virtual List<ClaimInsurable> ClaimInsurable { get; set; }
        // public virtual List<ClaimdocDTO> Claimdocument { get; set; }
        public virtual List<Alldoc> Alldoc { get; set; }
        public dynamic AdditionalDetails { get; set; }
    }
    public partial class Alldoc
    {
        public string DocumentID { get; set; }
        public string FileName { get; set; }
        public string DocumentType { get; set; }
    }
    public partial class BankAccounts
    {
        public string AccountHolderName { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranchAddress { get; set; }
        public string IfscCode { get; set; }
        public int? AccountType { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
    public partial class ClaimInsurable
    {
        public string InsurableItem { get; set; }
        public string Name { get; set; }
        public string IdentificationNo { get; set; }
        public string CoverName { get; set; }
        //public decimal? BenefitAmount { get; set; }
        public decimal? ClaimAmounts { get; set; }
        public dynamic CoverValue { get; set; }

    }
    public partial class AllocDTO
    {
        public string State { get; set; }
    }

    public class SMSRequest
    {
        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string PolicyNumber { get; set; }
        public string SMSMessage { get; set; }
    }

    public partial class ClaimAllocationDetailsDTO
    {
        public int AllocationId { get; set; }
        public string AllocatedTo { get; set; }
        public string AllocationType { get; set; }
        public string AllocationDetails { get; set; }
        public string WorkFlowId { get; set; }
        public string StepId { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public int ClaimId { get; set; }
    }

    public class DemoResponse<T>
    {
        public int Code { get; set; }

        public string Msg { get; set; }

        public T Data { get; set; }

        public static DemoResponse<T> GetResult(int code, string msg, T data = default(T))
        {
            return new DemoResponse<T>
            {
                Code = code,
                Msg = msg,
                Data = data
            };
        }
    }

    #region Integration Model
    public class ProductRcbdetailsDTO
    {
        public decimal RcbdetailsId { get; set; }
        public int? ProductId { get; set; }
        public int InputId { get; set; }
        public string InputType { get; set; }
        public bool? IsReqired { get; set; }
    }

    public partial class PolicyListDTO
    {
        public string ProductId { get; set; }
        public string PartnerId { get; set; }
        public string PolicyId { get; set; }
    }
    public partial class PolicyDTO
    {
        public decimal PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public short? PolicyVersion { get; set; }
        public int? AgentBusinessTypeId { get; set; }
        public decimal? AgentId { get; set; }
        public int? SubAgentId { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public TimeSpan? InceptionTime { get; set; }
        public decimal? SumInsured { get; set; }
        public int? BranchIdPk { get; set; }
        public int? ProductIdPk { get; set; }
        public string PolicyTypeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Channel { get; set; }
        public string DocumentType { get; set; }
        public int? PolicyStatusId { get; set; }
        public int? BusinessTypeId { get; set; }
        public string QuoteNo { get; set; }
        public DateTime? QuoteDate { get; set; }
        public string ProposalNo { get; set; }
        public DateTime? ProposalDate { get; set; }
        public string CoverNoteNo { get; set; }
        public DateTime? CoverNoteIssueDate { get; set; }
        public int? PolicyStageStatusId { get; set; }
        public DateTime PolicyIssueDate { get; set; }
        public int? PolicyStageId { get; set; }
        public string MasterPolicyNo { get; set; }
        public string PolicyRemarks { get; set; }
        public string Smcode { get; set; }
        public int? Irccode { get; set; }
        public string CustomerId { get; set; }
        public int? Csoid { get; set; }
        public short IsUploadedToIcm { get; set; }
        public decimal? CorporateId { get; set; }
        public decimal? BundleId { get; set; }
        public string BundleTxnId { get; set; }
        public decimal? BundleParentId { get; set; }
        public bool? IsIrdaupdated { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string CoverEvent { get; set; }
        public string CoverName { get; set; }
        public decimal? OrganizationId { get; set; }
    }

    #endregion
    public class EmailTest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public class FileRequest
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] Content { get; set; }
    }

    public class ClaimDTOGWP
    {
        public decimal ProductId { get; set; }
        public string ProductName { get; set; }
        public string ClaimStatusId { get; set; }
    }

    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
    }

    public partial class commonddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }
    //public class BillingEventDataDTO
    //{
    //    public int Count { get; set; }
    //    public string ProductCode { get; set; }
    //    public string PorductName { get; set; }
    //    public decimal SumInsured { get; set; }
    //    public int? ProductId { get; set; }
    //    public decimal Premium { get; set; }
    //}

    public partial class PartnersDTO
    {
        public decimal PartnerId { get; set; }
        public int? PartnerTypeId { get; set; }
        public int? PartnerClassId { get; set; }
        public int? SalutationId { get; set; }
        public string PartnerName { get; set; }
        public string Fax { get; set; }
        public string Telephone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Pan { get; set; }
        public string Website { get; set; }
        public bool? Gst { get; set; }
        public string Gstnumber { get; set; }
        public string Pannumber { get; set; }
        public string Cinnumber { get; set; }
        public string PartnerCode { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string PartnerType { get; set; }
        public string PartnerClass { get; set; }
    }
    /// <summary>
    /// for invoice generation
    /// </summary>
    public class BillingEventDataDTO
    {
        public int Count { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public decimal SumInsured { get; set; }
        public int? ProductId { get; set; }
        public decimal Premium { get; set; }
    }
    public class PolicyDataForClaims
    {
        public decimal PolicyId { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
    }

    public class BillingEventResponseDTO
    {
        public BillingEventResponseDTO()
        {
            billingEventDataDTOs = new List<BillingEventDataDTO>();
            claimEventDTOs = new List<ClaimEventDTO>();
        }
        public List<BillingEventDataDTO> billingEventDataDTOs { get; set; }
        public List<ClaimEventDTO> claimEventDTOs { get; set; }
    }
    public class ClaimEventDTO
    {
        public string ClaimNo { get; set; }
        public string PolicyNo { get; set; }//policyId
        public string ProductName { get; set; }//
        public DateTime? LossDate { get; set; }
        public string InsuredName { get; set; }//
        public string InsuredRefNo { get; set; }//customerId
        public DateTime? CreatedDate { get; set; }
    }
    public class BillingEventRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public decimal CustomerId { get; set; }
        public decimal EvtId { get; set; }
    }

    public partial class ProductDTO
    {
        public int ProductId { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
        public int? ProductStatusId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public decimal? PremiumAmount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal OrganizationId { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
        public string LOB1 { get; set; }
        public string COB1 { get; set; }


        //public virtual ICollection<ProductBenefitsDTO> ProductBenefits { get; set; }
        public virtual ICollection<ProductChannelsDTO> ProductChannels { get; set; }
        public virtual ICollection<ProductClausesWarrentiesExclusionsDTO> ProductClausesWarrentiesExclusions { get; set; }
        // public virtual ICollection<ProductCoversDTO> ProductCovers { get; set; }
        public virtual ICollection<ProductInsurableItemsDTO> ProductInsurableItems { get; set; }
        public virtual ICollection<ProductRcbdetailsDTO> ProductRcbdetails { get; set; }
        //public virtual ICollection<ProductPremiumDTO> ProductPremium { get; set; }
        public virtual ICollection<ddDTOs> RiskDetails { get; set; }
        public virtual ICollection<ddDTOs> ClaimDetails { get; set; }
    }
    public partial class ProductCoversDTO
    {
        //public ProductCoversDTO()
        //{
        //    TblProductBenefits = new HashSet<ProductBenefitsDTO>();
        //    TblProductPremium = new HashSet<ProductPremiumDTO>();
        //}
        public decimal CoverId { get; set; }
        public int ProductId { get; set; }
        public int CoverTypeId { get; set; }
        public string CoverDescription { get; set; }
        public bool? SingleValue { get; set; }
        public string CoverEventFactorValueFrom { get; set; }
        public string CoverEventFactorValueTo { get; set; }
        public string CoverPeriod { get; set; }
        public int MaximumBenefitAmount { get; set; }
        public int CoverEventId { get; set; }
        public int CoverEventFactorId { get; set; }
        public int CoverEventFactorValueUnitId { get; set; }
        public string Cover { get; set; }
        public string CoverEvent { get; set; }
        public string CoverEventFactor { get; set; }
        public string CoverEventFactorValue { get; set; }
        public virtual ICollection<ProductBenefitsDTO> ProductBenefits { get; set; }
        public virtual ICollection<ProductPremiumDTO> ProductPremium { get; set; }


    }
    public partial class ProductChannelsDTO
    {
        public decimal ChannelId { get; set; }
        public int? ProductId { get; set; }
        public int? ChannelTypeId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public double? Brokage { get; set; }

        //public virtual string ChannelType { get; set; }
        //public virtual string ProductName { get; set; }
    }

    public partial class ProductBenefitsDTO
    {
        public decimal BenefitId { get; set; }
        public int? ProductId { get; set; }
        public int? BenefitTypeId { get; set; }
        public double? BenefitAmount { get; set; }
        public int? BenefitCriteria { get; set; }
        public int? BenefitCriteriaValue { get; set; }
        public int? MaxBenefitAmount { get; set; }
        public bool? SingleValue { get; set; }
        public string CurrencyId { get; set; }
        //public string BenefitType { get; set; }
        //public string Product { get; set; }
        public decimal? CoverId { get; set; }
        public string BenefitType { get; set; }


        public virtual ICollection<BenifitRangeDetails> BenifitRangeDetails { get; set; }
    }

    public partial class ProductClausesWarrentiesExclusionsDTO
    {
        public decimal Cweid { get; set; }
        public int? ProductId { get; set; }
        public int? CwetypeId { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public bool IsPrint { get; set; }
        public string Label { get; set; }
        public string Cwetypes { get; set; }
        //public string ProductName { get; set; }
    }

    public partial class ProductInsurableItemsDTO
    {
        //public ProductInsurableItemsDTO()
        //{
        //    TblProductCovers = new HashSet<ProductCoversDTO>();
        //}

        public decimal InsurableItemId { get; set; }
        public int ProductId { get; set; }
        public int InsurableItemTypeId { get; set; }

        //  public virtual ProductMasterDTO InsurableItemType { get; set; }

        public virtual ICollection<ProductCoversDTO> ProductCovers { get; set; }
    }



    public partial class BenifitRangeDetails
    {
        public decimal BenefitRangeId { get; set; }
        public decimal BenifitId { get; set; }
        public double FromValue { get; set; }
        public double ToValue { get; set; }
        public double BenefitAmount { get; set; }
    }
    public partial class ProductPremiumDTO
    {
        public decimal PremiumId { get; set; }
        public int? ProductId { get; set; }
        public int? CurrencyId { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? CoverId { get; set; }
    }
    public class PolicyBookingTransaction
    {
        public decimal PartnerId { get; set; }
        public decimal ProductId { get; set; }
        public string AccountNo { get; set; }
        public string PolicyNo { get; set; }
        public string TxnType { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal PaymentId { get; set; }
        public bool IsRefund { get; set; }
    }
    public partial class ddDTOs
    {
        //public int mID { get; set; }
        //public string mValue { get; set; }
        //public string mType { get; set; }
        //public bool mIsRequired { get; set; }
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool mIsRequired { get; set; }
        public string planCode { get; set; }
        public string lob { get; set; }
        public string cob { get; set; }
        public bool disable { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }




    }
    public partial class ProductSearchDTO
    {
        public int ProductId { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
        public int? ProductStatusId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public DateTime? ActiveFrom { get; set; }
        public DateTime? ActiveTo { get; set; }
        public int? PremiumAmount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortOn { get; set; }
        public string SortDirection { get; set; }

    }

    public partial class ClaimInsurableDTO
    {
        public int ClaimInsurableId { get; set; }
        public string InsurableItem { get; set; }
        public string Name { get; set; }
        public string IdentificationNo { get; set; }
        public string CoverName { get; set; }
        public decimal? BenefitAmount { get; set; }
        public decimal? ClaimAmounts { get; set; }
        public decimal? ApprovedClaimAmounts { get; set; }
        public int ClaimId { get; set; }
        public string CoverValue { get; set; }
        public List<Dictionary<string, string>> coverDynamic { get; set; }
    }

    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public class JsonWithFilesFormDataModelBinder : IModelBinder
    {
        private readonly IOptions<MvcJsonOptions> _jsonOptions;
        private readonly FormFileModelBinder _formFileModelBinder;

        public JsonWithFilesFormDataModelBinder(IOptions<MvcJsonOptions> jsonOptions)
        {
            _jsonOptions = jsonOptions;
            _formFileModelBinder = new FormFileModelBinder();
        }

        public async Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
                throw new ArgumentNullException(nameof(bindingContext));

            // Retrieve the form part containing the JSON
            var valueResult = bindingContext.ValueProvider.GetValue(bindingContext.FieldName);
            if (valueResult == ValueProviderResult.None)
            {
                // The JSON was not found
                var message = bindingContext.ModelMetadata.ModelBindingMessageProvider.MissingBindRequiredValueAccessor(bindingContext.FieldName);
                bindingContext.ModelState.TryAddModelError(bindingContext.ModelName, message);
                return;
            }

            var rawValue = valueResult.FirstValue;

            // Deserialize the JSON
            var model = JsonConvert.DeserializeObject(rawValue, bindingContext.ModelType, _jsonOptions.Value.SerializerSettings);

            // Now, bind each of the IFormFile properties from the other form parts
            foreach (var property in bindingContext.ModelMetadata.Properties)
            {
                if (property.ModelType != typeof(IFormFile))
                    continue;

                var fieldName = property.BinderModelName ?? property.PropertyName;
                var modelName = fieldName;
                var propertyModel = property.PropertyGetter(bindingContext.Model);
                ModelBindingResult propertyResult;
                using (bindingContext.EnterNestedScope(property, fieldName, modelName, propertyModel))
                {
                    await _formFileModelBinder.BindModelAsync(bindingContext);
                    propertyResult = bindingContext.Result;
                }

                if (propertyResult.IsModelSet)
                {
                    // The IFormFile was sucessfully bound, assign it to the corresponding property of the model
                    property.PropertySetter(model, propertyResult.Model);
                }
                else if (property.IsBindingRequired)
                {
                    var message = property.ModelBindingMessageProvider.MissingBindRequiredValueAccessor(fieldName);
                    bindingContext.ModelState.TryAddModelError(modelName, message);
                }
            }

            // Set the successfully constructed model as the result of the model binding
            bindingContext.Result = ModelBindingResult.Success(model);
        }

    }

    [ModelBinder(typeof(JsonWithFilesFormDataModelBinder), Name = "json")]
    public class CreatePostRequestModel
    {
        //public SearchClaimDTO claimSearch { get; set; }
        //public FileDetails fileList { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string[] Tags { get; set; }
        public IFormFile Image { get; set; }
    }

    public class FileDetails
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string UploadedBy { get; set; }
        public string FileUploaded { get; set; }
    }

    public class DocumentResponse : ResponseStatus
    {
        public List<BankFileDTO> bankFile { get; set; }
    }

    public partial class BankDocumentDTO
    {
        public decimal BankDocId { get; set; }
        public DateTime? DateTimeOfProcessing { get; set; }
        public int? TotalRecords { get; set; }
        public int? NoOfRecordsProcessed { get; set; }
        public int? NoOfRecordsFailed { get; set; }
        public string DocFileName { get; set; }
    }

    //Accoutnin Transaction 
    public class TransactionRuleMappingDto
    {
        public TransactionRuleMappingDto()
        {
            TransactionConditions = new HashSet<TransactionConditionsDto>();
            SubLedgerReferences = new HashSet<SubLedgerReferencesDto>();
        }

        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TransactionConditionsDto> TransactionConditions { get; set; }
        public virtual ICollection<SubLedgerReferencesDto> SubLedgerReferences { get; set; }
    }
    public class TransactionConditionsDto
    {
        public decimal TransactionConditionsId { get; set; }
        public string TypeofTransaction { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public string SubLedgerReference { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
    }

    public class SubLedgerReferencesDto
    {
        public decimal SubLedgerReferencesId { get; set; }
        public string LedgerObject { get; set; }
        public string LedgerColName { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string TableName { get; set; }

    }

    // Sending Transaction Data to One Shot In Accouting Transaction 
    public class TransactionHeaderDto
    {
        public TransactionHeaderDto()
        {
            Transaction = new List<TransactionDto>();
            TransactionSubLedger = new List<TransactionSubLedgerDto>();
        }

        public decimal TransactionHeaderId { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual List<TransactionDto> Transaction { get; set; }
        public virtual List<TransactionSubLedgerDto> TransactionSubLedger { get; set; }
    }
    public class TransactionDto
    {
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public decimal? Amount { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public int? AccountCode { get; set; }
        public string Currency { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? ContractId { get; set; }
        public decimal? TransactionHeaderId { get; set; }
        public decimal? ProductId { get; set; }
    }
    public class TransactionSubLedgerDto
    {
        public decimal TransactionSubLedgerId { get; set; }
        public decimal TransactionHeaderId { get; set; }
        public decimal SubLedgerReferencesId { get; set; }
        public string Value { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
    }
    public class TransactionsResponse : ResponseStatus
    {
        public TransactionHeaderDto Transactions { get; set; }
    }



}
