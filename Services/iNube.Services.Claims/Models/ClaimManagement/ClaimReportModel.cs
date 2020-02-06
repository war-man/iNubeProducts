using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimReportModel
    {
        public ClaimReportModel()
        {
            SurveyReportCollection = new List<SurveyReportModel>();
            InvestigationReportCollection = new List<InvestigationReportModel>();
        }
        public List<SurveyReportModel> SurveyReportCollection { get; set; }
        public List<InvestigationReportModel> InvestigationReportCollection { get; set; }

        public decimal TransactionID { get; set; }
        public string InvestigatorName { get; set; }
        public Nullable<System.DateTime> InvestigationAssignmentDate { get; set; }
        public string InvestigationRef { get; set; }
        public string InvestigatorType { get; set; }


        public string SurveyType { get; set; }
        public string SurveyorType { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyRegNo { get; set; }
        public Nullable<System.DateTime> SurveyorAppointmentDate { get; set; }
        public string RoleName { get; set; }
        public int ClaimTypeID { get; set; }
    }

    public class InvestigationReportModel
    {
        public string InsuredName { get; set; }
        public string DriverName { get; set; }
        public string Remark { get; set; }
        public decimal? TransactionID { get; set; }
        public decimal ClaimID { get; set; }
        public string InvestigationRef { get; set; }
        public string InvestigationType { get; set; }
        public string InvestigatorType { get; set; }
        public Nullable<System.DateTime> InvestigationAssignmentDate { get; set; }
        public Nullable<System.DateTime> InvestigationCompletionDate { get; set; }
        public string InvestigatorName { get; set; }
        public string InvestigationStatus { get; set; }
        public string DocumentName { get; set; }
        //all bool properties
        public bool? IsDrivingLicenceAvailable { get; set; }
        public bool? IsLicenceValid { get; set; }
        public bool? DriverStatementTaken { get; set; }
        public bool? IsEngineNosameAsInPolicy { get; set; }
        public bool? IsChassisNoSameAsInPolicy { get; set; }
        public bool? IsMakeModelSameAsInPolicy { get; set; }
        public bool? AnyAlterationsDoneInVehicle { get; set; }
        public bool? IsGuiltyPartyStatement { get; set; }
        public bool? IsVehileWasOverloaded { get; set; }
        public bool? IsVehileParkedDuringIncident { get; set; }
        public bool? IsVehicleOverSpeedDuringIncident { get; set; }
        public bool? IsPassengerStatementTaken { get; set; }
        public bool? IncidentLocationVarifed { get; set; }
        public bool? WitnessStatementTaken { get; set; }
        public bool? IsPermitValid { get; set; }
        public bool? IsFitnessCertificateValid { get; set; }
        public bool? IncidentDescriptionAasPerDriverTaken { get; set; }
        public bool? IncidentDescriptionAasPerPoliceRecordTaken { get; set; }
        public bool? IncidentDescriptionAasPerWitnessTaken { get; set; }
        public bool? IsHospitalRecordsVarified { get; set; }
        public bool? IsPoliceRecordsVarified { get; set; }
        public bool? IsIncidentDatetimeSameInAllRecords { get; set; }
        public bool? AnyHazardousMaterialsFoundInVehicle { get; set; }
        public bool? IsAnyThirdPartyInvolved { get; set; }
        public bool? ThirdPartyStatementTaken { get; set; }
        public bool? IsDamageTallyWithCauseOfAccident { get; set; }
        public bool? IsAnyIntentionalDamage { get; set; }
        public bool? IsAnyDiscripancyInDamagesAndInjuries { get; set; }
        public bool? NearbyHospitalsVisited { get; set; }
        public bool? NearbyPoliceStationVisited { get; set; }

        public string DrivingLicenceNo { get; set; }
        //public string IsLicenceValid { get; set; }
        public string DriverStatement { get; set; }
        public string EngineNoAsInPolicy { get; set; }
        public string ChassisNoAsInPolicy { get; set; }
        public string MakeModelNoAsInPolicy { get; set; }
        public string AlterationsDoneInVehicle { get; set; }
        public string GuiltyPartyStatement { get; set; }
        public string VehileOverloaded { get; set; }
        //public string IsVehileParkedDuringIncident { get; set; }
        public string VehicleSpeedDuringIncident { get; set; }
        public string PassengerStatement { get; set; }
        public string IncidentLocation { get; set; }
        public string WitnessStatement { get; set; }
        public DateTime? PermitValidDate { get; set; }
        public DateTime? FitnessCertificateValidDate { get; set; }
        public string IncidentDescriptionAasPerDriver { get; set; }
        public string IncidentDescriptionAasPerPoliceRecord { get; set; }
        public string IncidentDescriptionAasPerWitness { get; set; }
        // public string IsHospitalRecordsVarified { get; set; }
        //public string IsPoliceRecordsVarified { get; set; }
        public DateTime? IncidentDatetime { get; set; }
        public string HazardousMaterialsFoundInVehicle { get; set; }
        public string ThirdPartyInvolved { get; set; }
        public string ThirdPartyStatement { get; set; }
        public string DamageTallyWithCauseOfAccident { get; set; }
        public string IntentionalDamage { get; set; }
        public string DiscripancyInDamagesAndInjuries { get; set; }
        public string HospitalsVisited { get; set; }
        public string PoliceStationVisited { get; set; }
        //commented by Mohan
        //public List<SelectListItem> AreaOfOperation { get; set; }
        public decimal InvestigationDetailsId { get; set; }
        public List<PolicyDocumentModel> PolicyDocumentList { get; set; }
        public Dictionary<int, string> VehiclePartCollection { get; set; }
        public decimal? InvestigatorId { get; set; }
        public int? InvestigationStatusId { get; set; }
        public string RoleName { get; set; }
    }

    public class SurveyReportModel
    {

        public decimal SurveyReport_ID { get; set; }
        public string SurveyType { get; set; }
        public string SurveyorType { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyRegNo { get; set; }
        public decimal? TransactionID { get; set; }
        public string DocumentName { get; set; }
        public string SurveyStatus { get; set; }
        public Nullable<System.DateTime> DateOfReg { get; set; }
        public Nullable<System.DateTime> SurveyCompleteDate { get; set; }
        public Nullable<System.DateTime> SurveyorAppointmentDate { get; set; }
        //commented by Mohan
        //public List<SelectListItem> VehicleTypeCollection { get; set; }
        //public List<SelectListItem> VehicleModelCollection { get; set; }
        //public List<SelectListItem> CarMakeCollection { get; set; }
        //public List<SelectListItem> CarTypeCollection { get; set; }
        //public List<SelectListItem> VehicleBodyCollection { get; set; }
        public List<PolicyDocumentModel> PolicyDocumentList { get; set; }
        public string RegOwner { get; set; }
        public string VehicleColor { get; set; }

        public string ChassiNo { get; set; }
        public string EngineNo { get; set; }

        public Nullable<int> VehicleTypeID { get; set; }
        public string EngingeCapacity { get; set; }

        public Nullable<int> MakeID { get; set; }
        public Nullable<int> ModelID { get; set; }
        public Nullable<int> TypeOfCarsID { get; set; }
        public Nullable<int> VariantID { get; set; }
        public string TypeofBody { get; set; }

        public Nullable<int> SeatingCapacity { get; set; }
        public string FuelType { get; set; }

        public decimal? OdometerValue { get; set; }
        public string PreAccidentCondition { get; set; }

        public string FitnessCertificateNO { get; set; }
        public Nullable<System.DateTime> FitnessCertificateValidUpto { get; set; }

        public string PermitNo { get; set; }
        public Nullable<System.DateTime> PermitValidUpto { get; set; }

        public string TypeOfPermit { get; set; }
        public Nullable<int> AreaOfOperationId { get; set; }

        public string UnladenWeight { get; set; }
        public string GrossVehicleWeight { get; set; }

        public bool? Tax_OTTPaid { get; set; }
        public bool? DetailsVerified { get; set; }

        public string Remarks { get; set; }
        public string DriverName { get; set; }

        public string LisenceNumber { get; set; }
        public Nullable<System.DateTime> DateOfBirth { get; set; }

        public string BadgeNo { get; set; }
        public Nullable<System.DateTime> IssueDate { get; set; }

        public Nullable<System.DateTime> DateOfExpiry { get; set; }
        public string LisenceingAuthority { get; set; }

        public Nullable<bool> AuthorizationToDriveID { get; set; }
        public string Endorsement { get; set; }

        public Guid? CreatedBY { get; set; }
        public Nullable<System.DateTime> CreatedDatetime { get; set; }

        public Guid? ModifiedBY { get; set; }
        public Nullable<System.DateTime> ModifiedDatetime { get; set; }

        public bool Isvalid { get; set; }

        public string IncidentLocation { get; set; }
        public Nullable<System.DateTime> IncidentDateTime { get; set; }
        public string CarriedOn { get; set; }
        public string CarriedWorkshop { get; set; }
        public string CauseAndNatureOfAccident { get; set; }
        public int? DamageType { get; set; }
        public bool? TPLOSS { get; set; }
        public bool? IsOtherVehicleInvolved { get; set; }
        public string DetailsOfOtherVehicles { get; set; }
        public string ExtentOfDamages { get; set; }
        public Nullable<System.DateTime> InspectionDate { get; set; }


        public string FIRNo { get; set; }
        public string Injury { get; set; }
        public string LoadChallan { get; set; }
        public string NameOfCarrier { get; set; }
        public Nullable<System.DateTime> GRDate { get; set; }
        public int? GoodsId { get; set; }
        public bool? IsLoadCarriedPerLimit { get; set; }
        public decimal? Weight { get; set; }
        public string VehicleShiftedTo { get; set; }
        public string InsuredRep { get; set; }
        public string AdditionalRemarks { get; set; }
        public decimal? ReserveAmount { get; set; }
        public int? CauseOfLossId { get; set; }
        //commented by Mohan
        //public List<SelectListItem> AreaOfOperation { get; set; }
        //public List<SelectListItem> VehicleVarientCollection { get; set; }
        //public List<SelectListItem> CauseOfLossList { get; set; }
        public Dictionary<int, string> VehiclePartCollection { get; set; }
        public decimal? SurveyorId { get; set; }
        public string RoleName { get; set; }
    }
}
