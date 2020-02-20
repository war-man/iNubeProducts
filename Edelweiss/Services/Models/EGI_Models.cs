using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.MicaExtension_EGI.Models
{

    public partial class QuotationDTO
    {

        public decimal QuoteId { get; set; }
        public string QuotationNumber { get; set; }
        public string PrimaryDriverName { get; set; }
        public string Mobileno { get; set; }
        public decimal? Age { get; set; }
        public decimal? Experience { get; set; }
        public string VehicleAge { get; set; }
        public int? City { get; set; }
        public string VehicleMakeModelId { get; set; }
        public string PolicyNumber { get; set; }
        public string SumInsured { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public decimal? NumberOfDrivers { get; set; }
        public decimal? NumberOfVehicle { get; set; }
        public decimal? Premium { get; set; }
        public string Frequency { get; set; }
        public DateTime? StartDate { get; set; }
    }

    public class ScheduleDTO
    {

        public decimal ScheduleId { get; set; }
        public string VehicleRegistrationNo { get; set; }
        public string PolicyNo { get; set; }
        public bool? Mon { get; set; }
        public bool? Tue { get; set; }
        public bool? Wed { get; set; }
        public bool? Thu { get; set; }
        public bool? Fri { get; set; }
        public bool? Sat { get; set; }
        public bool? Sun { get; set; }
        public bool? RepeatWeek { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? ModifyCount { get; set; }
        public bool? IsActive { get; set; }
        public int VehicleMasId { get; set; }
        public string VehicleType { get; set; }
    }

    public class ScheduleStatusDTO : ResponseStatus
    {

        public ScheduleDTO scheduleDTO { get; set; }
        public string CarModel { get; set; }
        public byte[] CarImageBytes { get; set; }
        public bool SwitchEnabled { get; set; }
    }
    public class DynamicData
    {   
        public RuleDTO dictionary_rule { get; set; }
        public RateDTO dictionary_rate { get; set; }
    }

    public partial class VehicleDetailsDTO
    {
        public int VehicleId { get; set; }
        public string VehicleModel { get; set; }
        public string VehicleType { get; set; }
        public byte[] VehicleImage { get; set; }
        public DateTime? CreatedDate { get; set; }

    }

    public partial class VehicleDetailsDataDTO
    {
        public decimal VehicleDetailsDataId { get; set; }
        public int? VehicleId { get; set; }
        public decimal? AgeOfVehicle { get; set; }
        public decimal? SumInsured { get; set; }
        public bool? IsActive { get; set; }
    }

    public partial class SendOtpDTO
    {
        public decimal Id { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Otp { get; set; }

    }
    public class CalculationResult
    {
        public string Entity { get; set; }
        public string EValue { get; set; }
    }
    //Response fields
    public class VehicleDetailsResponse : ResponseStatus
    {
        public VehicleDetailsDTO vehicleDetails { get; set; }
    }

    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public class SendOtpResponse : ResponseStatus
    {
        public SendOtp sendOtp { get; set; }
    }

    public class SendOtp
    {

        public decimal Id { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Otp { get; set; }
    }

    public class VerifyOTPResponse : ResponseStatus
    {
        public VerifyOTP verifyotp { get; set; }
    }

    public partial class VerifyOTP
    {

        public decimal Id { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Otp { get; set; }
    }

    public class EmailTest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public class SMSRequest
    {

        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string SMSMessage { get; set; }
    }

    public partial class MasCityDTO
    {

        public int CityId { get; set; }
        public int? StateId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
        public string Type { get; set; }

       // public virtual TblMasState State { get; set; }
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

    //public partial class context
    //{
    //    public string ProductType { get; set; }
    //    public decimal PartnerId { get; set; }
    //    public decimal OrgId { get; set; }
    //    public string Role { get; set; }
    //    public string Email { get; set; }
    //    public string SessionId { get; set; }
    //    public string CorrelationId { get; set; }
    //    public string Name { get; set; }
    //    public string UserId { get; set; }
    //    public bool IsAuthenticated { get; set; }
    //    public string MediaType { get; set; }
    //    public string ClientIpAddress { get; set; }
    //    public string RequestId { get; set; }
    //    public string ApplicationIdentifier { get; set; }
    //    public string Locale { get; set; }
    //    public string Token { get; set; }
    //    public string UserName { get; set; }
    //    public string ServerType { get; set; }
    //    public string MobileNumber { get; set; }

    //}

    public class MasterPolicyDTO
    {
        public MasterPolicyDTO()
        {
            InsurableItem = new List<MasterInsurableDTO>();
        }
        public string PolicyNumber { get; set; }
        public List<MasterInsurableDTO> InsurableItem { get; set; }

    }

    public class MasterInsurableDTO
    {
        public MasterInsurableDTO()
        {
            InsurableFields = new List<InsurableFieldsDTO>();
        }

        public string InsurableName { get; set; }
        public List<InsurableFieldsDTO> InsurableFields { get; set; }

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

    public class PolicyDTO
    {
        public PolicyDTO()
        {
            QuotationDTO = new QuotationDTO();
        }
        public dynamic PolicyObj { get; set; }
        public QuotationDTO QuotationDTO { get; set; }
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

    public partial class CityMasDTO
    {            
        public int? CityId { get; set; }
        public string CityName { get; set; }
        public string StateCode { get; set; }
    }

    public partial class PremiumRequestDTO
    {
        public string StateCode { get; set; }
        public string SI { get; set; }
        public string NoOfPC { get; set; }
        public string NoOfTW { get; set; }
        public string DriverAge { get; set; }
        public string DriverExp { get; set; }
        public string AdditionalDriver { get; set; }
        public string BillingFrequency { get; set; }
    }
   public partial class PremiumReturnDto
    {
        public decimal PerDayPremium { get; set; }
        public decimal FireTheft365 { get; set; }
        public decimal ADPremium { get; set; }
        public decimal GST { get; set; }
        public decimal Total { get; set; }
        public decimal MonthlyPremium { get; set; }
    }


    public class PolicyPremiumDetailsDTO
    {
        public string SumInsured { get; set; }
        public string PD_Age { get; set; }
        public string PD_DriveExperince { get; set; }
        public string NoOfTW { get; set; }
        public string NoOfPC { get; set; }
        public string AdditionalDriver { get; set; }
        public string FromStateTax { get; set; }
        public string ToStateTax { get; set; }
    }

    public class SwitchOnOffResponse : ResponseStatus
    {
       //public bool FinalResponse { get; set; }
    }

}

