using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimProcessModel
    {
        public ClaimProcessModel()
        {

        }

        public decimal TransactionID { get; set; }
        public decimal CaseId { get; set; }
        public string Rolename { get; set; }
        public int ClaimTypeID { get; set; }
        public Nullable<int> SettlementTypeid { get; set; }
        public int? AdvocateType { get; set; }
        public int? DecisionTypeid { get; set; }
    }

    public class SearchExistingClaimModel
    {
        public string Link { get; set; }
        public decimal TransactionID { get; set; }
        public string FNOL { get; set; }
        public string Occurrence { get; set; }
        public string ClaimType { get; set; }
        public string PolicyNo { get; set; }
        public string InsuredName { get; set; }
        public DateTime? IncidentDate { get; set; }
        public string IncidentDateString { get; set; }
        public string IncidentTimeString { get; set; }
        public string IncidentLocation { get; set; }
        public string Status { get; set; }

    }

    public class InternalRemarkModel
    {
        public decimal TransactionID { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
        public string InternalRemark { get; set; }
        public string Action { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public string Notes { get; set; }
    }

    public class ClaimCustomerAccountDetailModel
    {
        public ClaimCustomerAccountDetailModel()
        {
            AccountTypeListItem = new Dictionary<int, string>();
            PaymentMethodListItem = new Dictionary<int, string>();
        }

        public decimal CustomerAccountDetailID { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<decimal> PolicyDetailID { get; set; }
        public string PayeeName { get; set; }
        public string PAN { get; set; }
        public string AccountNo { get; set; }
        public string BranchName { get; set; }
        public string MICRNumber { get; set; }
        public Nullable<int> AccountTypeID { get; set; }
        public Nullable<int> PaymentMethodID { get; set; }
        public Nullable<bool> IsAccountdetailavailable { get; set; }
        public string BankName { get; set; }
        public string IFSCCode { get; set; }
        public string BranchAddress { get; set; }

        public Dictionary<int, string> AccountTypeListItem { get; set; }
        public Dictionary<int, string> PaymentMethodListItem { get; set; }
    }

    public class ViewPolicyModel
    {
        public string PolicyNo { get; set; }
        public string PolicyType { get; set; }
        public int ProductCodeID { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public DateTime? PrevPolicyExpDate { get; set; }
        public string CoverNoteNo { get; set; }
        public DateTime? CoverNoteDate { get; set; }
        public string AddOnCoversOpted { get; set; }
        public string PolicyStatus { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string IssueOfficeCode { get; set; }
        public string IssueOfficeName { get; set; }
        public string IssueOfficeAddress { get; set; }
        public string PolicyIssueZone { get; set; }
        public string PreviousPolicyNo { get; set; }
        public string PreviousInsurerName { get; set; }
        public bool BreakInPolicy { get; set; }
        public bool RollOverPolicy { get; set; }
        public string AgentCode { get; set; }
        public string AgentName { get; set; }
        public decimal? NCB { get; set; }
        public decimal? PolicyExcess { get; set; }
        public decimal? VoluntartExcess { get; set; }
        public decimal? ImposedExcess { get; set; }
        public decimal? TotalExcess { get; set; }
        public string VB { get; set; }
        public bool Is64VB { get; set; }
        public bool Hypothication { get; set; }
        public decimal? Premium { get; set; }
        public string NameOfFinancingAuthority { get; set; }
        public string LocationBranchName { get; set; }
        public bool IsNILDepreciationCovered { get; set; }
        public string EndorsementNo { get; set; }
        public string PolicyCopyDocumentName { get; set; }
        public string ProposalFormDocumentName { get; set; }
        public string RegistrationNo { get; set; }
        public string EngineNo { get; set; }
        public string ChassisNo { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string RegistrationDate { get; set; }
        public string YearOfManufacturing { get; set; }
        public string TypeOfVehicle { get; set; }
        public string FuelType { get; set; }
        public string SeatingCapacity { get; set; }
        public string TypeOfBody { get; set; }
        public string VehicleColor { get; set; }
        public string CubicCapacity { get; set; }
        public string EndorsementForCNGPNG { get; set; }
        public string GVW { get; set; }
        public string PreRiskInspectionDetail { get; set; }
        public string IDVForSideCar { get; set; }
        public decimal? IDVFortheVehicle { get; set; }
        public string IDVValueOfLPGCNGKit { get; set; }
        public string IDVForNonElectricAccessories { get; set; }
        public string IDVForElectricAccessories { get; set; }
        public decimal? TotalIDV { get; set; }
        public string ProductCode { get; set; }
        public int FuelTypeId { get; set; }
        public decimal? Transactionid { get; set; }
        public ViewInsuredModel InsuredModel { get; set; }
        public int ModelID { get; set; }
        public int CarMakeID { get; set; }
        public int TypeOfVehicleID { get; set; }
        public int TypeOfCarsID { get; set; }
        public int VariantID { get; set; }
        //commented by Mohan
        //public List<SelectListItem> VehicleModelListItem { get; set; }
        //public List<SelectListItem> VehicleTypeListItem { get; set; }
        //commented by Mohan
        public List<PolicyDocumentModel> PolicyDocumentList { get; set; }
        ////public List<SelectListItem> CarMakeCollection { get; set; }
        ////public List<SelectListItem> CarTypeCollection { get; set; }
        ////public List<SelectListItem> ProductCollection { get; set; }
        ////public List<SelectListItem> VehicleVariantListItem { get; set; }
        ////public List<SelectListItem> PolicyTypeCollection { get; set; }
        ////public List<SelectListItem> VehicleFuelTypeList { get; set; }
        
        ////public List<SelectListItem> LstNetworkType { get; set; }
        public string FNOL { get; set; }
        public string TypeOfCar { get; set; }
        public decimal? VehicleAfterDepreciation { get; set; }
        public decimal? VehicleMarketValue { get; set; }
        public decimal? NetClaimLibility { get; set; }
        public bool? isAnyDamageNoticed { get; set; }
        public bool? IsVehicleRecovered { get; set; }
        public int TheftLiabilityID { get; set; }

        public string Remarks { get; set; }
        public int OpinionID { get; set; }
        //commented by Mohan
        //public List<SelectListItem> AdvocateOpinionList { get; set; }
        public decimal CaseId { get; set; }
        public int NetworkTypeID { get; set; }
    }

    public class PolicyDocumentModel
    {
        //public List<SelectListItem> VehiclePartsList { get; set; }
        public int VehiclePartId { get; set; }
        public string PartName { get; set; }
        public string DocumentName { get; set; }
        public decimal TransactionId { get; set; }
    }


    public class ViewInsuredModel
    {
        public string InsuredCode { get; set; }
        public string InsuredName { get; set; }
        public string InsuredAddress { get; set; }
        public string CustomerType { get; set; }
        public string Nationality { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string Area { get; set; }
        public string PinCode { get; set; }
        public string TelephoneNo { get; set; }
        public string MobileNo { get; set; }
        public string WhatsAppNo { get; set; }
        public string DateOfBirth { get; set; }
        public string EMailID { get; set; }
        public string DriverLicenceNumber { get; set; }
        public string DLAuthorizeToDrive { get; set; }
        public string LicenceDOI { get; set; }
        public string LicenceExpiryDate { get; set; }
        public string PANNo { get; set; }
        public string AadharNo { get; set; }
        public string Zone { get; set; }

        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int DistrictID { get; set; }
        public int CityID { get; set; }
        public int AreaID { get; set; }
        //commented by Mohan
        //public List<SelectListItem> MstCountryListItem { get; set; }
        //public List<SelectListItem> MstStateListItem { get; set; }
        //public List<SelectListItem> MstDistrictListItem { get; set; }
        //public List<SelectListItem> MstCityListItem { get; set; }
        //public List<SelectListItem> MstAreaListItem { get; set; }
    }

    public class ReviewDocumentModel
    {
        public ReviewDocumentModel()
        {
            MstDocumentListItem = new Dictionary<int, string>();
            DocumentTypeListItem = new Dictionary<int, string>();
            DocumentReviewStatusListItem = new Dictionary<int, string>();
            ReviewDocumentList = new List<ClaimDocumentModel>();
        }

        public decimal DocumentID { get; set; }
        public int VehiclePartId { get; set; }
        public Nullable<decimal> TrasactionID { get; set; }
        public Nullable<int> ClaimDocumentID { get; set; }
        public string DocumentIndex { get; set; }
        public string DocumentPath { get; set; }
        public Nullable<int> DocumentTypeID { get; set; }
        public Nullable<bool> IsOriginalVerified { get; set; }
        public Nullable<int> DocumentReviewStatusID { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public string DocumentName { get; set; }
        public string Notes { get; set; }
        public Dictionary<int, string> MstDocumentListItem { get; set; }
        public Dictionary<int, string> DocumentTypeListItem { get; set; }
        public Dictionary<int, string> DocumentReviewStatusListItem { get; set; }
        public List<ClaimDocumentModel> ReviewDocumentList { get; set; }
        public List<ClaimDocumentModel> BeforeAccidentImageList { get; set; }
        public List<ClaimDocumentModel> AfterAccidentImageList { get; set; }
        public string FNOL { get; set; }
        public string BeforeFnol { get; set; }
        public string AfterFnol { get; set; }
        public bool WhilePolicyInsuranceBefore { get; set; }
        public bool WhilePolicyInsuranceAfter { get; set; }
        public string Rolename { get; set; }
        public int DropDownValue { get; set; }
        public int AfterDropDownValue { get; set; }
    }
}
