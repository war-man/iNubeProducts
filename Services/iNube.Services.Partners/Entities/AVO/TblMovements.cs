using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblMovements
    {
        public decimal MovementId { get; set; }
        public int? MovementTypeId { get; set; }
        public decimal? OrgEmpId { get; set; }
        public decimal? MovementStatusId { get; set; }
        public decimal? RecommendedByid { get; set; }
        public decimal? CurrentPositionId { get; set; }
        public decimal? NewPositionId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? NewBranchId { get; set; }
        public string Reason { get; set; }
    }
}
