using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class SearchModel
    {
        public SearchModel()
        {
            SurveyorTypeListItem = new Dictionary<int, string>();
            AreaOfOperationListItem = new Dictionary<int, string>();

            StateListItem = new Dictionary<int, string>();
            DistrictListItem = new Dictionary<int, string>();
            CityListItem = new Dictionary<int, string>();

            ClaimSearchByListItem = new Dictionary<int, string>();
        }



        public string SearchType { get; set; }

        //// Policy Search Property Start ////
        public string PolicyNo { get; set; }
        public string VehicleNo { get; set; }
        public string CoverNoteNo { get; set; }
        public string ChassisNo { get; set; }
        public string EngineNo { get; set; }
        //// Policy Search Property End ////

        //// Surveyor Search Property Start ////
        public int? SurveyorTypeID { get; set; }
        public int? AreaOfOperationID { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorNo { get; set; }

        public Dictionary<int, string> SurveyorTypeListItem { get; set; }
        public Dictionary<int, string> AreaOfOperationListItem { get; set; }
        //// Surveyor Search Property End ////

        //// WorkShop Search Property Start ////
        public int? CountryID { get; set; }
        public int? StateID { get; set; }
        public int? DistrictID { get; set; }
        public int? CityID { get; set; }
        public int? AreaID { get; set; }
        public string WorkShopName { get; set; }
        public string WorkShopNo { get; set; }
        public int? NetorkTypeID { get; set; }
        public Dictionary<int, string> LstNetworkType { get; set; }
        public Dictionary<int, string> StateListItem { get; set; }
        public Dictionary<int, string> DistrictListItem { get; set; }
        public Dictionary<int, string> CityListItem { get; set; }
        //// WorkShop Search Property End ////


        //// Investigator Search Property Start ////
        public string InvestigatorName { get; set; }
        public string InvestigatorNo { get; set; }
        //// Investigator Search Property End ////

        public string FNOLNo { get; set; }


        //// Claim Search Property Start ////
        public int ClaimSearchByID { get; set; }
        public string ClaimSearchValue { get; set; }

        public Dictionary<int, string> ClaimSearchByListItem { get; set; }
        //// Claim Search Property End ////

    }


    public class SearchDetail
    {
        public SearchDetail()
        {

        }

        public string SearchType { get; set; }

        //// Policy Search Details Start ////
        public decimal PolicyDetailID { get; set; }
        public string PolicySearchButton { get; set; }
        public string PolicySearchButtonRaw { get; set; }
        public string PolicyNo { get; set; }
        public string VehicleNo { get; set; }
        public string CoverNoteNo { get; set; }
        public string ChassisNo { get; set; }
        public string EngineNo { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public string PolicyStatus { get; set; }
        public string PolicyStartDateString { get; set; }
        public string PolicyEndDateString { get; set; }
        public string VehicleType { get; set; }
        public string InsuredName { get; set; }
        public string PolicyType { get; set; }
        public string CertificateNo { get; set; }
        //// Policy Search Details End ////


        //// Surveyour Search Details Start ////
        public decimal SurveyorDetailID { get; set; }
        public string SurveyorSearchButton { get; set; }
        public string SurveyorSearchButtonRaw { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorNo { get; set; }
        public string SurveyorContact { get; set; }
        public string SurveyorType { get; set; }
        public string AreaOfOperation { get; set; }
        //// Surveyour Search Details End ////

        //// Workshop Search Details Start ////
        public decimal WorkshopDetailID { get; set; }
        public string WorkshopSearchButton { get; set; }
        public string WorkshopSearchButtonRaw { get; set; }
        public string WorkshopName { get; set; }
        public string WorkshopNo { get; set; }
        public string WorkshopContact { get; set; }
        public string WorkshopState { get; set; }
        public string WorkshopDistrict { get; set; }
        public string WorkshopCity { get; set; }
        //// Workshop Search Details End ////


        //// Investigator Search Details Start ////
        public decimal InvestigatorDetailID { get; set; }
        public string InvestigatorSearchButton { get; set; }
        public string InvestigatorSearchButtonRaw { get; set; }
        public string InvestigatorName { get; set; }
        public string InvestigatorNo { get; set; }
        public string InvestigatorContact { get; set; }
        public string InvestigatorState { get; set; }
        public string InvestigatorDistrict { get; set; }
        public string InvestigatorCity { get; set; }
        //// Investigator Search Details End ////


        //// FNOL Search Details Start ////
        public decimal ClaimID { get; set; }
        public string FNOLSearchButton { get; set; }
        public string FNOLSearchButtonRaw { get; set; }
        public string FNOLNo { get; set; }
        //// FNOL Search Details End ////

        //// Common Details Start ////
        public decimal TransactionID { get; set; }
        public string Occurrence { get; set; }
        public string ClaimType { get; set; }
        public string DateOfIncidentString { get; set; }
        public string TimeOfIncidentString { get; set; }
        public string IntimationDateString { get; set; }
        public string RequestedDateString { get; set; }
        public string RequestedTimeString { get; set; }
        public string ClaimStatus { get; set; }
        public string IncidentLocation { get; set; }
        public string IsSurveyorAssign { get; set; }
        public string IsWorkShopAssign { get; set; }
        public string IsBackByManager { get; set; }
        public string IsReOpen { get; set; }
        public DateTime? DateOfIncident { get; set; }
        public DateTime? IntimationDate { get; set; }
        public DateTime? RequestedDate { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string WorkshopStatus { get; set; }
        public string SurveyorStatus { get; set; }
        public string InvestigatorStatus { get; set; }
        public int? InvestigatorStatusID { get; set; }
        public decimal LegalServiceDetailID { get; set; }
        public string AdvocateName { get; set; }
        public string AdvocateNo { get; set; }
        public string AdvocateContact { get; set; }
        public string AdvocateState { get; set; }
        public string AdvocateDistrict { get; set; }
        public string AdvocateCity { get; set; }
        public int? LegalStatusID { get; set; }
        public string LegalStatus { get; set; }
        public decimal? NCBValue { get; set; }
        public int? NetworkTypeID { get; set; }
        //// Common Details End ////

    }


    public class SearchChildDetail
    {
        public string FNOLNo { get; set; }
        public string Occurrence { get; set; }
        public string RoleName { get; set; }
        public string UserName { get; set; }
        public string Status { get; set; }
        public string CreatedDateString { get; set; }
        public string CreatedTimeString { get; set; }
        public DateTime? CreatedDateTime { get; set; }

    }
}
