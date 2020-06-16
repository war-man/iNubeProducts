using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.ReInsurance.Models
{
    //public class RIModels
    //{

    //}
    public partial class CalulationDto
    {
        public int Year { get; set; }
        public string level { get; set; }
        public string ProductName { get; set; }
        public decimal SumInsured { get; set; }
        public decimal PremiumAmount { get; set; }
        public string PolicyNo { get; set; }

    }

    public class Mapping
    {
        public decimal AllocationAmmount { get; set; }
        public decimal Premium { get; set; }
        public string PolicyNo { get; set; }
        public int Year { get; set; }
        public string ProductName { get; set; }
        public string Level { get; set; }
        public List<Map> maps { get; set; }
    }
    public class Map
    {
        public decimal AllocatedRetention { get; set; }
        public decimal Limit { get; set; }
        public string HL { get; set; }
        public string Type { get; set; }
        public int Percentage { get; set; }
       // public int High { get; set; }
        public string AllocationMethod { get; set; }
        public decimal Balance { get; set; }
        public decimal AllocationBasis { get; set; }
        public decimal TotalAllocation { get; set; }
        public decimal AllocatedQS { get; set; }
        public string AllocatedBasedOn { get; set; }
        public int NoOfLines { get; set; }

    }
    public partial class TblArrangementDto
    {
        public decimal ArrangementId { get; set; }
        public decimal TreatyGroupId { get; set; }
        public int? AllocationOnId { get; set; }
        public int? AllocationLogicId { get; set; }
        public int? Percentage { get; set; }
        public decimal? Amount { get; set; }
        public int? NoOfLines { get; set; }
        public int? HigherOrLowerId { get; set; }
        public int? AllocationBasisId { get; set; }
        public int? MaxCeidingLimit { get; set; }
        public string Pla { get; set; }
        public string Cla { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

       // public virtual TblTreatyGroupDto TreatyGroup { get; set; }
    }
    public partial class TblMasRicommonTypesDto
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }
    public partial class TblParticipantDto
    {
        public decimal ParticipantId { get; set; }
        public decimal TreatyId { get; set; }
        public decimal ReInsurerId { get; set; }
        public decimal ReInsurerBranchId { get; set; }
        public decimal BrokerId { get; set; }
        public decimal BrokerBranchId { get; set; }
        public int? SharePercentage { get; set; }
        public int? BrokeragePercentage { get; set; }
        public int? RicommissionPercentage { get; set; }
        public int? BordereauxFreqId { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual TblParticipantMasterDto Broker { get; set; }
        public virtual TblParticipantBranchDto BrokerBranch { get; set; }
        public virtual TblParticipantMasterDto ReInsurer { get; set; }
        public virtual TblParticipantBranchDto ReInsurerBranch { get; set; }
       // public virtual TblTreatyDto Treaty { get; set; }
    }
    public partial class TblParticipantBranchDto
    {
        public TblParticipantBranchDto()
        {
            TblParticipantBrokerBranch = new HashSet<TblParticipantDto>();
            TblParticipantReInsurerBranch = new HashSet<TblParticipantDto>();
        }

        public decimal BranchId { get; set; }
        public string BranchSpocemailId { get; set; }
        public decimal ParticipantMasterId { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TblParticipantDto> TblParticipantBrokerBranch { get; set; }
        public virtual ICollection<TblParticipantDto> TblParticipantReInsurerBranch { get; set; }
    }
    public partial class TblParticipantMasterDto
    {
        public TblParticipantMasterDto()
        {
            //TblParticipantBroker = new HashSet<TblParticipantDto>();
            // TblParticipantReInsurer = new HashSet<TblParticipantDto>();
            TblParticipantBranch = new HashSet<TblParticipantBranchDto>();
        }

        public decimal ParticipantMasterId { get; set; }
        public int? ParticipantTypeId { get; set; }
        public string ParticipantCode { get; set; }
        public string ParticipantName { get; set; }
        public string ContactNo { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? Pincode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string ParticipantType { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
       
        //public string treatyType { get; set; }


        public virtual ICollection<TblParticipantBranchDto> TblParticipantBranch { get; set; }

        //public virtual ICollection<TblParticipantDto> TblParticipantBroker { get; set; }
        // public virtual ICollection<TblParticipantDto> TblParticipantReInsurer { get; set; }
    }
    public partial class ddDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }

    }
    public partial class GroupGroupDto
    {
        public decimal mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
       

    }
    //public partial class RetentionGroupDto
    //{
    //    public decimal mID { get; set; }
    //    public string mValue { get; set; }
    //    public string mType { get; set; }
    //    public string sahir { get; set; }

    //}
    public partial class participantddtos
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }

    }
    public partial class yearDto
    {
        public int mID { get; set; }
        public int? mValue { get; set; }
        public string mType { get; set; }

    }
    public partial class TblRetentionGroupDto
    {
        public TblRetentionGroupDto()
        {
            TblRimappingDetail = new HashSet<TblRimappingDetailDto>();
        }

        public decimal RetentionGroupId { get; set; }
        public string RetentionGroupName { get; set; }
        //year was initially as int? i have changed it as string 
        public int? Year { get; set; }
        //YearId
        public int? YearId { get; set; }
        public int? BusinessTypeId { get; set; }
        public string BusinessType { get; set; }
        public int? RetentionLogicId { get; set; }
        public string RetentionType { get; set; }
        public decimal? Percentage { get; set; }
        public int? Limit { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TblRimappingDetailDto> TblRimappingDetail { get; set; }
    }
    public partial class TblRimappingDto
    {
        public TblRimappingDto()
        {
            TblRimappingDetail = new HashSet<TblRimappingDetailDto>();
        }
        public decimal RimappingId { get; set; }
        public int? Year { get; set; }
        public int? Year1 { get; set; }

        public string Level { get; set; }
        public string LobProductCover { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public int? RetentionGroupId { get; set; }

        public virtual ICollection<TblRimappingDetailDto> TblRimappingDetail { get; set; }
    }
    public partial class TblRimappingDetailDto
    {
        public decimal RimappingDetailId { get; set; }
        public decimal RimappingId { get; set; }
        public decimal? RetentionGroupId { get; set; }
        public decimal? TreatyGroupId { get; set; }
        public int? SequenceNo { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public int? RimappingTypeId { get; set; }

       // public virtual TblRetentionGroupDto RetentionGroup { get; set; }
      //  public virtual TblRimappingDto Rimapping { get; set; }
       // public virtual TblTreatyGroupDto TreatyGroup { get; set; }
    }
    public partial class TblTreatyDto : ResponseStatus
    {
        public TblTreatyDto()
        {
            TblParticipant = new HashSet<TblParticipantDto>();
            TblTreatyGroup = new HashSet<TblTreatyGroupDto>();
        }

        public decimal TreatyId { get; set; }
        public string TreatyCode { get; set; }
        public string TreatyDescription { get; set; }
        public int? TreatyCategoryId { get; set; }
        public int? TreatyTypeId { get; set; }
        public int? TreatyYearId { get; set; }
        public int? TreatyYear { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? TreatyBasisId { get; set; }
        public int? AccountingToId { get; set; }
        public int? CurrencyId { get; set; }
        public int? BorderauxFreqId { get; set; }
        public int? StatusId { get; set; }
        public string Remarks { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string IsApproved { get; set; }
        public Guid? ApprovedBy { get; set; }
        //TreatyYear
      //  public int? TreatyYear { get; set; }

        public virtual ICollection<TblParticipantDto> TblParticipant { get; set; }
        public virtual ICollection<TblTreatyGroupDto> TblTreatyGroup { get; set; }
    }
    public partial class TblTreatyGroupDto
    {
        public TblTreatyGroupDto()
        {
            TblArrangement = new HashSet<TblArrangementDto>();
            TblRimappingDetail = new HashSet<TblRimappingDetailDto>();
        }

        public decimal TreatyGroupId { get; set; }
        public decimal TreatyId { get; set; }
        public string TreatyGroupName { get; set; }
        public int? BusinessTypeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }

       // public virtual TblTreatyDto Treaty { get; set; }
        public virtual ICollection<TblArrangementDto> TblArrangement { get; set; }
        public virtual ICollection<TblRimappingDetailDto> TblRimappingDetail { get; set; }
    }

    //SearchDto
    public partial class SearchDto
    {
        public string participantType { get; set; }
        public string participantCode { get; set; }
        public string participantName { get; set; }
    }

    //masters data dto

    public partial class TblMasCityDto
    {
        public TblMasCityDto()
        {
            TblMasPinCode = new HashSet<TblMasPinCodeDto>();
        }

        public int CityId { get; set; }
        public int? DistrictId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasDistrictDto District { get; set; }
        public virtual ICollection<TblMasPinCodeDto> TblMasPinCode { get; set; }
    }
    public partial class TblMasCountryDto
    {
        public TblMasCountryDto()
        {
            TblMasState = new HashSet<TblMasStateDto>();
        }

        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual ICollection<TblMasStateDto> TblMasState { get; set; }
    }
    public partial class TblMasDistrictDto
    {
        public TblMasDistrictDto()
        {
            TblMasCity = new HashSet<TblMasCityDto>();
        }

        public int DistrictId { get; set; }
        public int? StateId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasStateDto State { get; set; }
        public virtual ICollection<TblMasCityDto> TblMasCity { get; set; }
    }
    public partial class TblMasStateDto
    {
        public TblMasStateDto()
        {
            TblMasDistrict = new HashSet<TblMasDistrictDto>();
        }

        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasCountryDto Country { get; set; }
        public virtual ICollection<TblMasDistrictDto> TblMasDistrict { get; set; }
    }
    public partial class TblMasPinCodeDto
    {
        public int PincodeId { get; set; }
        public int? CityId { get; set; }
        public string Pincode { get; set; }
        public string AreaName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }

        public virtual TblMasCityDto City { get; set; }
    }
    public partial class ProductMasterddDTOs
    {
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
        public int? LevelId { get; set; }
        public int? SubLevelId { get; set; }
        public string productCode { get; set; }
        public int? Lobid { get; set; }
        public int? Cobid { get; set; }
    }


    //Fetch Gridata For RI mapping

    public partial class RIMappingDTO
    {
        public string TreatyCode { get; set; }
        public string TreatyDescription { get; set; }
        public string TreatyGroupName { get; set; }
        public int? TreatyTypeId { get; set; }
        public string treatyType { get; set; }

    }
    public class TransactionMapResponse : ResponseStatus
    {
        public TblTreatyDto CreateTrans { get; set; }
    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }
    public partial class CustomerSettingsDTO
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? EnvId { get; set; }
    }
    public partial class RiallocationDto
    {
        public RiallocationDto()
        {
            RiallocationHistory = new HashSet<RiallocationHistoryDto>();
        }

        public decimal AllocationId { get; set; }
        public string AllocationLevel { get; set; }
        public int? ItemId { get; set; }
        public decimal? AllocationAmount { get; set; }
        public decimal? Premium { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string IsApproved { get; set; }
        public Guid? ApprovedBy { get; set; }
        public int? MappingId { get; set; }
        public string AllocationDetails { get; set; }
        public string PolicyNo { get; set; }

        public virtual ICollection<RiallocationHistoryDto> RiallocationHistory { get; set; }
    }
    public partial class RiallocationHistoryDto
    {
        public decimal AllocationHistoryid { get; set; }
        public decimal? AllocationId { get; set; }
        public int? MaapingId { get; set; }
        public string PolicyNo { get; set; }
        public string AllocationLevel { get; set; }
        public string ItemName { get; set; }
        public decimal? AllocationAmount { get; set; }
        public decimal? Premium { get; set; }
        public string AloocationDetails { get; set; }
        public DateTime? TransectionDate { get; set; }

       // public virtual TblRiallocation Allocation { get; set; }
    }
    public class ReallocatedDTO
    {
        public int MappingId { get; set; }
        public int Year { get; set; }
        public string Level { get; set; }
        public string Name { get; set; }
        
    }
    public class ValidationResponse : ResponseStatus
    {
        public ValidationResponse()
        {
            // ErrorDetails = new HashSet<ShowErrorInfoDetails>();
        }
        //  public virtual ICollection<ShowErrorInfoDetails> ErrorDetails { get; set; }
    }


}
