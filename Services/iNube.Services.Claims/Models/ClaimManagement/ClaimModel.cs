using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class ClaimModel
    {
        public ClaimModel()
        {
            ClaimWitnessDetailModelList = new List<ClaimWitnessDetailModel>();
            ClaimOtherVehicleDetailModelList = new List<ClaimOtherVehicleDetailModel>();
            MstPurposeOfTravelModelListItem = new Dictionary<int, string>();
            MstRoadTypeModelListItem = new Dictionary<int, string>();
            MstRTODetailModelListItem = new Dictionary<int, string>();
            MstCountryListItem = new Dictionary<int, string>();
            MstStateListItem = new Dictionary<int, string>();
            MstDistrictListItem = new Dictionary<int, string>();
            MstCityListItem = new Dictionary<int, string>();
            MstAreaListItem = new Dictionary<int, string>();
            IntimationModeListItem = new Dictionary<int, string>();
            IntimationByListItem = new Dictionary<int, string>();
            DriverOfTheVehicleListItem = new Dictionary<int, string>();
            DLAuthorizedToDriveListItem = new Dictionary<int, string>();
            DriverQualificationListItem = new Dictionary<int, string>();
        }

        //// List Property Start ////
        public List<ClaimWitnessDetailModel> ClaimWitnessDetailModelList { get; set; }
        public List<ClaimOtherVehicleDetailModel> ClaimOtherVehicleDetailModelList { get; set; }
        //// List Property End ////

        //// Dictionary Propertry Start ////
        public Dictionary<int, string> MstPurposeOfTravelModelListItem { get; set; }
        public Dictionary<int, string> MstRoadTypeModelListItem { get; set; }
        public Dictionary<int, string> MstRTODetailModelListItem { get; set; }
        public Dictionary<int, string> MstCountryListItem { get; set; }
        public Dictionary<int, string> MstStateListItem { get; set; }
        public Dictionary<int, string> MstDistrictListItem { get; set; }
        public Dictionary<int, string> MstCityListItem { get; set; }
        public Dictionary<int, string> MstAreaListItem { get; set; }
        public Dictionary<int, string> IntimationModeListItem { get; set; }
        public Dictionary<int, string> IntimationByListItem { get; set; }
        public Dictionary<int, string> DriverOfTheVehicleListItem { get; set; }
        public Dictionary<int, string> DLAuthorizedToDriveListItem { get; set; }
        public Dictionary<int, string> DriverQualificationListItem { get; set; }
        //// Dictionary Propertry End ////

        //// Table Property Start ////
        public decimal ClaimID { get; set; }
        public Nullable<bool> IsValid { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public Nullable<System.Guid> CreatedBy { get; set; }
        public Nullable<System.Guid> ModifiedBy { get; set; }
        public string FNOL { get; set; }
        public Nullable<decimal> PolicyDetailsID { get; set; }
        public Nullable<int> CountryID { get; set; }
        public Nullable<int> StateID { get; set; }
        public Nullable<int> DistrictID { get; set; }
        public Nullable<int> CityID { get; set; }
        public Nullable<int> AreaID { get; set; }
        public Nullable<int> IntimationModeID { get; set; }
        public Nullable<int> IntimationByID { get; set; }
        public Nullable<System.DateTime> IncidentDateTime { get; set; }
        public string IncidentLocation { get; set; }
        public Nullable<bool> IsFIR { get; set; }
        public Nullable<System.DateTime> FIRDateTime { get; set; }
        public string FIRNo { get; set; }
        public string NameOfPoliceStation { get; set; }
        public Nullable<bool> IsAnyWitness { get; set; }
        public Nullable<bool> IsAnyOtherVehicleInAccident { get; set; }
        public Nullable<int> DriverOfTheVehicleID { get; set; }
        public string DriverName { get; set; }
        public string DriverLicenseNo { get; set; }
        public Nullable<System.DateTime> DriverLicenseExpiryDateTime { get; set; }
        public Nullable<int> DriverAge { get; set; }
        public Nullable<int> DrivingExperience { get; set; }
        public Nullable<int> DriverQualificationID { get; set; }
        public Nullable<int> RTODetailID { get; set; }
        public Nullable<int> DLAuthorizedToDriveID { get; set; }
        public Nullable<int> RoadTypeID { get; set; }
        public Nullable<int> PurposeOfTravelID { get; set; }
        public Nullable<bool> IsVehicleParked { get; set; }
        public Nullable<int> VehicleSpeed { get; set; }
        public Nullable<int> NumberOfPasanger { get; set; }
        public string WeatherCondition { get; set; }
        public Nullable<System.DateTime> DriverDOB { get; set; }
        public Nullable<decimal> NCBPercent { get; set; }
        public Nullable<bool> IsTrailerAttached { get; set; }
        public Nullable<decimal> RegisteredLadenWeight_KG { get; set; }
        public Nullable<decimal> RegisteredUnLadenWeight_KG { get; set; }
        public Nullable<decimal> WeightOfGoodsCarried_KG { get; set; }
        public string TypeOfGoodsCarried { get; set; }
        public string NatureOfGoodsCarried { get; set; }
        public Nullable<decimal> RegisteredPassengerCarryingCapacity { get; set; }
        public Nullable<decimal> PassengersCarried { get; set; }
        public string NatureOfPermit { get; set; }
        public string TypeOfPermit { get; set; }
        public string PermitValidForAreas { get; set; }
        public Nullable<System.DateTime> PermitValidUpTo { get; set; }
        public Nullable<System.DateTime> FitnessValidUpTo { get; set; }
        //// Table Property End ////

        public string PermitValidForAreasValue { get; set; }
    }

    public class WorkingDaysModel
    {
        public WorkingDaysModel()
        {
            Versions = new List<Versions>();
        }

        public List<Versions> Versions { get; set; }
    }

    public class Versions
    {
        public Versions()
        {
            HolidayModelList = new List<HolidayModel>();
        }

        public List<HolidayModel> HolidayModelList { get; set; }
        public int VersionID { get; set; }
        public string VersionNo { get; set; }
        public string EffectiveFrom { get; set; }
        public string EffectiveTo { get; set; }
        public bool IsMonday { get; set; }
        public bool IsTuesday { get; set; }
        public bool IsWednesday { get; set; }
        public bool IsThursday { get; set; }
        public bool IsFriday { get; set; }
        public bool IsSaturday { get; set; }
        public bool IsSunday { get; set; }
        public int HolidayID { get; set; }
    }

    public class HolidayModel
    {
        public int VersionID { get; set; }
        public string HolidayName { get; set; }
        public string HolidayDate { get; set; }
    }
}
