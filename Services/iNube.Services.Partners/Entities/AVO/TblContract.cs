using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblContract
    {
        public decimal ContractId { get; set; }
        public string RecruitmentNo { get; set; }
        public string Name { get; set; }
        public string Channel { get; set; }
        public string SubChannel { get; set; }
        public string Designation { get; set; }
        public int LevelId { get; set; }
        public int ContractTerm { get; set; }
        public DateTime ContractInceptionDate { get; set; }
        public DateTime ContractExpirationDate { get; set; }
        public int ProgramApplicableId { get; set; }
        public decimal? AverageIncome { get; set; }
        public int Duration { get; set; }
        public int CodingMonth { get; set; }
        public int NumberOfFreeMonth { get; set; }
        public decimal? Allowance { get; set; }
        public decimal? TotalCost { get; set; }
        public decimal? TotalAnpTarget { get; set; }
        public int ManPower { get; set; }
        public int ActivityAgents { get; set; }
        public bool? IsEmployee { get; set; }
        public bool? IsActive { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? ParentId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
