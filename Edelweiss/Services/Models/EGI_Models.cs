using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;

namespace iNube.Services.MicaExtension_EGI.Models
{

    public class ScheduleDTO
    {
        public string PolicyNo { get; set; }
        public string VehicleRegistrationNo { get; set; }
        public string VehicleType { get; set; }
        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }

    }

    public class ScheduleResponseDTO : ResponseStatus
    {
        public ScheduleResponseDTO()
        {
            ScheduleDTO = new ScheduleDTO();
        }
        public ScheduleDTO ScheduleDTO { get; set; }
    }

    public class GetScheduleDTO
    {
        public string VehicleRegistrationNo { get; set; }
        public string PolicyNo { get; set; }
        public string VehicleType { get; set; }
        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }
        public bool? SwitchStatus { get; set; }
        public bool SwitchEnabled { get; set; }
    }

    public class GetScheduleResponse : ResponseStatus
    {
        public GetScheduleResponse()
        {
            GetSchedule = new GetScheduleDTO();
        }
        public GetScheduleDTO GetSchedule { get; set; }

    }

    public class AllScheduleResponse : ResponseStatus
    {
        public AllScheduleResponse()
        {
            GetSchedule = new List<GetScheduleDTO>();
        }
        public List<GetScheduleDTO> GetSchedule { get; set; }

    }

    public class DynamicData
    {
        public RuleDTO dictionary_rule { get; set; }
        public RateDTO dictionary_rate { get; set; }
    }

    public class CalculationResult
    {
        public string Entity { get; set; }
        public string EValue { get; set; }
    }

    public partial class taxDto
    {
        public decimal IGST { get; set; }
        public decimal CGST { get; set; }
        public decimal UGST { get; set; }
        public decimal SGST { get; set; }
    }

    public partial class PremiumDTO
    {
        public PremiumDTO()
        {
            premiumObj = new DynamicData();
        }

        // public int CityId { get; set; }
        public DynamicData premiumObj { get; set; }
    }

    public class InsurableFieldsDTO
    {
        public string Name { get; set; }
        public string IdentificationNumber { get; set; }
    }

    public partial class PremiumReturn
    {
        public decimal FTPerDay { get; set; }
        public decimal FT30Day { get; set; }
        public decimal FT60Day { get; set; }
        public decimal AD60Days { get; set; }
        public decimal AD365Days { get; set; }
        public string FState { get; set; }
        public string TState { get; set; }
        public decimal FStateValue { get; set; }
        public decimal TStateValue { get; set; }
        public decimal TotalPremium { get; set; }
    }

    public class TaxTypeDTO
    {
        public string FSTTAX_TAXTYPE { get; set; }
        public string TSTTAX_TAXTYPE { get; set; }
    }

    public class PolicyResponse : ResponseStatus
    {
        public Dictionary<string, string> policy { get; set; }
        public BusinessStatus Status { get; internal set; }
        public int QuotationNumber { get; set; }
    }

    public class SchedulerPremiumDTO
    {
        public SchedulerPremiumDTO()
        {
            dictionary_rule = new RuleDTO();
            dictionary_rate = new RateDTO();
        }

        public RuleDTO dictionary_rule { get; set; }
        public RateDTO dictionary_rate { get; set; }
    }

    public class RuleDTO
    {
        public string SI { get; set; }
        public string NOOFTW { get; set; }
        public string NOOFPC { get; set; }
    }

    public class RateDTO
    {
        public string DEXPRT_Exp { get; set; }
        public string PDAGERT_PAge { get; set; }
        public string ADDRVRT_DRV { get; set; }
        public string AVFACTORPC_PC_NOOFPC { get; set; }
        public string AVFACTORTW_TW_NOOFPC { get; set; }
        public string AVFACTORTW_TW_NOOFTW { get; set; }
        public string FSTTAX_TAXTYPE { get; set; }
        public string TSTTAX_TAXTYPE { get; set; }

    }


    public class CDDTO
    {
        public string AccountNo { get; set; }
        public string TxnType { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal PaymentId { get; set; }
        public string Description { get; set; }
    }


    public class PolicyDetailsDTO
    {
        public string PolicyNumber { get; set; }
        public string PolicyStartDate { get; set; }
        public string PartnerName { get; set; }
        public string PolicyEndDate { get; set; }
        public string ProductName { get; set; }
        public decimal? PremiumAmount { get; set; }
        public decimal? SumInsured { get; set; }
    }

    public partial class PremiumRequestDTO
    {
        public string StateCode { get; set; }
        public int SI { get; set; }
        public int NoOfPC { get; set; }
        public int NoOfTW { get; set; }
        public int DriverAge { get; set; }
        public int DriverExp { get; set; }
        public int AdditionalDriver { get; set; }
        public string BillingFrequency { get; set; }
    }
    public partial class PremiumReturnDto : ResponseStatus
    {
        public decimal PerDayPremium { get; set; }
        public decimal FireTheft { get; set; }
        public decimal ADPremium { get; set; }
        public decimal GST { get; set; }
        public decimal Total { get; set; }
        public decimal MonthlyPremium { get; set; }
        public decimal FinalAmount { get; set; }
    }

    public partial class WrapperPremiumReturnDto : ResponseStatus
    {
        public WrapperPremiumReturnDto()
        {
            driverList = new DriverList();

        }
        public decimal FTPM { get; set; }
        public DriverList driverList { get; set; }
    }
    public class DriverList
    {
        public DriverList()
        {
            driver1 = new Driver1();
            driver2 = new Driver2();
            driver3 = new Driver3();
        }

        public Driver1 driver1 { get; set; }
        public Driver2 driver2 { get; set; }
        public Driver3 driver3 { get; set; }
    }

    public class Driver1
    {
        public decimal D1ADPM { get; set; }
        public decimal D1TotalPM { get; set; }
    }
    public class Driver2
    {
        public decimal D2ADPM { get; set; }
        public decimal D2TotalPM { get; set; }
    }
    public class Driver3
    {
        public decimal D3ADPM { get; set; }
        public decimal D3TotalPM { get; set; }
    }
    public partial class WrapperPremiumRequestDTO
    {

        // public int SI { get; set; }
        public int NoOfPC { get; set; }
        public int NoOfTW { get; set; }
        public int DriverAge { get; set; }
        public int DriverExp { get; set; }

    }

    public class PolicyPremiumDetailsDTO
    {
        public decimal SumInsured { get; set; }
        public int PD_Age { get; set; }
        public int PD_DriveExperince { get; set; }
        public int NoOfTW { get; set; }
        public int NoOfPC { get; set; }
        public int AdditionalDriver { get; set; }
        public string StateCode { get; set; }
    }

    public class SwitchOnOffResponse : ResponseStatus
    {
        //public bool FinalResponse { get; set; }
    }

    public class EndorsementPremiumDTO
    {
        public string PolicyNo { get; set; }
        public int SI { get; set; }
        public int PcCount { get; set; }
        public int TwCount { get; set; }
        public string TypeOfEndorsement { get; set; }
        public DateTime EndorsementEffectiveDate { get; set; }

    }

    public class ActivityDTO
    {
        public DateTime? DateTime { get; set; }
        public string VehicleNo { get; set; }
        public string SwitchState { get; set; }
        public string SwitchType { get; set; }
    }

    public class ActivityResponse : ResponseStatus
    {
        public ActivityResponse()
        {
            ActivityDTO = new List<ActivityDTO>();
        }
        public List<ActivityDTO> ActivityDTO { get; set; }
    }

    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }
   
    public partial class BillingDTO
    {

        public decimal? OpeningBalance { get; set; }
        public decimal? ClosingBalance { get; set; }
        public List<AccountDetails> BillingDetails { get; set; }

    }

    public class BillingResponse : ResponseStatus
    {
        public BillingResponse()
        {
            BillingDTO = new BillingDTO();
        }
        public BillingDTO BillingDTO { get; set; }
    }


    public partial class AccountDetails
    {
        public DateTime? Date { get; set; }
        public string TransactionType { get; set; }
        public string Description { get; set; }
        public decimal? TransactionAmountDebit { get; set; }
        public decimal? TransactionAmountCredit { get; set; }
        public decimal? Gst { get; set; }
        public decimal? TotalAmount { get; set; }

    }
    public partial class CDAccountDTO : ResponseStatus
    {

        public decimal? OpeningBalance { get; set; }
        public decimal? ClosingBalance { get; set; }
        public List<AccountDetails> AccountDetails { get; set; }

    }
    public partial class CDAccountRequest
    {
        public string accountnumber { get; set; }
        public string TxnEventType { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

    }


    public partial class SwitchOnOffDTO
    {
        public string VehicleRegistrationNo { get; set; }
        public string PolicyNo { get; set; }
        public bool SwitchState { get; set; }
    }

    public class CDTaxTypeDTO
    {
        public string Type { get; set; }
        public decimal TaxAmount { get; set; }
    }

    public class CDTaxAmountDTO
    {
        public CDTaxAmountDTO()
        {
            Tax = new List<CDTaxTypeDTO>();
        }

        public decimal TaxAmount { get; set; }
        public List<CDTaxTypeDTO> Tax { get; set; }
    }

    public class CDPremiumDTO
    {
        public CDPremiumDTO()
        {
            TaxAmount = new CDTaxAmountDTO();
        }

        public string Type { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public CDTaxAmountDTO TaxAmount { get; set; }
    }

    public class MicaCDDTO
    {
        public MicaCDDTO()
        {
            PremiumDTO = new List<CDPremiumDTO>();
        }

        public string TxnType { get; set; }
        public string Type { get; set; }    
        public decimal FtPerDay { get; set; }
        public decimal AdPerDay { get; set; }
        public decimal CumFtPerDay { get; set; }
        public decimal CumAdPerDay { get; set; }
        public decimal TxnAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public List<CDPremiumDTO> PremiumDTO { get; set; }

    }

    public class RuleOneDTO
    {
        public string RuleName { get; set; }
        public string DriverAge { get; set; }
        public string NoofVehicles { get; set; }
        public string NoofDrivers { get; set; }
    }

    public class RuleTwoDTO
    {
        public string RuleName { get; set; }
        public string NoofVehiclesDelitionCount { get; set; }
        public string NoOfVehiclesAdditionCount { get; set; }
    }

    public class RuleThreeDTO
    {
        public string RuleName { get; set; }
        public string DriverDocumentPage { get; set; }
        public string RCCopy { get; set; }
        public string DriverLicence { get; set; }
        public string UnderBodyImage { get; set; }
        public string WindScreenGlassImage { get; set; }
    }

    public class RuleEngineResponse
    {
        public string ValidatorName { get; set; }
        public string Outcome { get; set; }
        public string Message { get; set; }
        public string Code { get; set; }
    }

    public class EndorsementCalDTO
    {
        public EndorsementCalDTO()
        {
            dictionary_rule = new EndoRuleDTO();
            dictionary_rate = new EndoRateDTO();
        }

        public EndoRuleDTO dictionary_rule { get; set; }
        public EndoRateDTO dictionary_rate { get; set; }
    }

    public class EndoRuleDTO
    {
        public string AD { get; set; }
        public string FT { get; set; }
        public string ADDAYS { get; set; }        
        public string FTDAYS { get; set; }
    }

    public class EndoRateDTO
    {        
        public string FSTTAX_TAXTYPE { get; set; }
        public string TSTTAX_TAXTYPE { get; set; }
    }

    public class EndoAddDTO
    {
        public string Type { get; set; }
        public List<dynamic> Data { get; set; }
    }

    public class ExtCDDTO
    {
        public ExtCDDTO()
        {
            micaCDDTO = new List<MicaCDDTO>();
        }

        public string AccountNo { get; set; }
        public string Description { get; set; }
        public string Frequency { get; set; }
        public List<MicaCDDTO> micaCDDTO { get; set; }
    }

    public partial class EndoPremiumReturnDto : ResponseStatus
    {
        public decimal PerDayPremium { get; set; }
        public decimal FireTheft { get; set; }
        public decimal ADPremium { get; set; }
        public decimal GST { get; set; }
        public decimal Total { get; set; }
        public decimal MonthlyPremium { get; set; }
        public decimal FinalAmount { get; set; }
        public decimal FtPerDay { get; set; }
        public decimal AdPerDay { get; set; }
    }

    public class CDDailyDTO : ResponseStatus
    {
        public string AccountNo { get; set; }
        public decimal? AvailableAmount { get; set; }
        public string TxnEventType { get; set; }
        //public CdTransactionsMasterDTO cdTransactionsMasterDTO { get; set; }

    }

    public partial class PolicyCancelReturnDto : ResponseStatus
    {
        public decimal FireTheft { get; set; }   
        public decimal FtPerDay { get; set; }
        public decimal AdPerDay { get; set; }
        public decimal FTFromTax { get; set; }
        public decimal FTToTax { get; set; }
        public decimal Total { get; set; }
        public decimal FinalTotal { get; set; }
        public string FromTaxType { get; set; }
        public string ToTaxType { get; set; }
       
    }

    public partial class VehicleActivityDTO
    {
        public string PolicyNumber { get; set; }
        public string ClaimNumber { get; set; }
        public List<string> VehicleNumbers { get; set; }
    }

    public partial class ResponseVehicleActivity : ResponseStatus
    {
        public ResponseVehicleActivity()
        {
            VehicleData = new List<VehicleActivity>();
        }

        public string PolicyNumber { get; set; }
         public List<VehicleActivity> VehicleData { get; set; }
    }
    public class VehicleActivity
    {
        public VehicleActivity()
        {
            activityDTOs = new List<VehActivityDTO>();
        }
        public string VehicleNumber { get; set; }
        public List<VehActivityDTO> activityDTOs { get; set; }
    }
    public class PolicyCancelRequest
    {
        public string ProposalNumber { get; set; }
        public string PolicyNumber { get; set; }
        public DateTime? EffectiveDate { get; set; }
        public DateTime? CancelRequestDate { get; set; }
    }
    public class PolicyCancelResponse
    {
        public double NoofDayRemaining { get; set; }
        public double NoofUnusedDays { get; set; }
        public decimal? FTPremium { get; set; }
        public decimal? ADPremium { get; set; }
        public decimal? TotalPremium { get; set; }

    }

  
    public class CDBalanceDTO : ResponseStatus
    {
        public string AccountNo { get; set; }
        public string TxnEventType { get; set; }
        public DateTime? TxnDateTime { get; set; }
        public decimal? TxnAmountBalance { get; set; }
        public decimal? TaxAmountBalance { get; set; }
        public decimal? TotalAvailableBalance { get; set; }



    }

    public class PolicyStatusDTO
    {
        public int Id { get; set; }
        public string PolicyNumber { get; set; }
        public int? PolicyStatus { get; set; }
        public DateTime? TxnDateTime { get; set; }

    }

    public class PolicyStatusResponseDTO : ResponseStatus
    {
        public PolicyStatusResponseDTO()
        {
            PolicyStatus = new PolicyStatusDTO();
        }
        public PolicyStatusDTO PolicyStatus { get; set; }
    }
    public class VehActivityDTO
    {
        public DateTime? DateTime { get; set; }
        //public string SwitchState { get; set; }
        public string TriggerSwitch { get; set; }
        public string Status { get; set; }
        public string Activity { get; set; }
    }

    public  class PolicyMonthlySiDTO
    {
        public int ReportId { get; set; }
        public DateTime? DueDate { get; set; }
        public string PolicyNo { get; set; }
        public string PolicyStatus { get; set; }
        public string InsuredName { get; set; }
        public int? NumberOfDaysChargeable { get; set; }
        public decimal? PerDayPremium { get; set; }
        public decimal? PremiumChargeable { get; set; }
        public decimal? GstOnPremiumChargeable { get; set; }
        public decimal? TotalAmountChargeable { get; set; }
        public string AuthPayUid { get; set; }
        public decimal? Amount { get; set; }
        public string Txnid { get; set; }
        public string UserCredentials { get; set; }
        public string CardToken { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PayUid { get; set; }
        public string PayAmount { get; set; }
        public string PayStatus { get; set; }
        public DateTime? ReportCreatedDate { get; set; }
        public string PremiumDetails { get; set; }
    }

    public class CDDetailsRequestDTO
    {
        public string PolicyNumber { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }

    public class CDDetailsResponseDTO
    {
        public string EndorsementNo { get; set; }
        public DateTime? EndorsementEffectivedate { get; set; }
        public string Action { get; set; }
        public string UpdatedResponse { get; set; }
    }

    public  class ClaimDataDTO
    {
        public string PolicyNumber { get; set; }
        public DateTime? lossDateTime { get; set; }
        public string locationOfLoss { get; set; }
        public int lossIntimatedBy { get; set; }
        public string lossDescription { get; set; }
        public int? ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public int? ProductIdPk { get; set; }
        public string ClaimNumber { get; set; }
    }

    public class MonthlySIUploadDTO : ResponseStatus
    {
       
    }
    public class GlobalVariables
    {
        
        public string CdaccountNumber { get; set; }
        public string BillingFrequency { get; set; }
        public DateTime PolicyEndDate { get; set; }
        public dynamic PolicyData { get; set; }
    }
}

