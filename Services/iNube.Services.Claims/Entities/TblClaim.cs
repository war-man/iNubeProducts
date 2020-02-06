using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblClaim
    {
        public TblClaim()
        {
            TblClaimTransaction = new HashSet<TblClaimTransaction>();
        }

        public decimal ClaimId { get; set; }
        public bool? IsValid { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public DateTime? ModifiedDateTime { get; set; }
        public Guid? CreatedBy { get; set; }
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
        public string ClaimStatus { get; set; }

        public virtual ICollection<TblClaimTransaction> TblClaimTransaction { get; set; }
    }
}
