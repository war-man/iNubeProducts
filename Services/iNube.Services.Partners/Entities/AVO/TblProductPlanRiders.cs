using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblProductPlanRiders
    {
        public TblProductPlanRiders()
        {
            TblProductPlanRiderParameters = new HashSet<TblProductPlanRiderParameters>();
        }

        public int ProductPlanRiderId { get; set; }
        public int? ProductId { get; set; }
        public int? RiderId { get; set; }
        public DateTime? EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool? IsActive { get; set; }
        public int? RelationId { get; set; }
        public int? PlanId { get; set; }
        public string RefRiderCode { get; set; }
        public string CalType { get; set; }
        public string DisplayName { get; set; }
        public int? DisplayOrder { get; set; }
        public int? CalOrder { get; set; }
        public string RateType { get; set; }
        public string RateCode { get; set; }
        public bool? Mandatory { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public decimal? MinSumAssured { get; set; }
        public decimal? MaxSumAssured { get; set; }
        public string RefOldRiderCode { get; set; }
        public string ReportDisplayName { get; set; }
        public int? ReportDisplayOrder { get; set; }
        public string ReportDisplaySinhala { get; set; }
        public string ReportDisplayTamil { get; set; }
        public bool? IsInBuilt { get; set; }
        public string IllustrationChart { get; set; }
        public string DisplaySinhala { get; set; }
        public string DisplayTamil { get; set; }
        public int? MaxCeaseAge { get; set; }

        public virtual TblProducts Product { get; set; }
        public virtual TblRiders Rider { get; set; }
        public virtual ICollection<TblProductPlanRiderParameters> TblProductPlanRiderParameters { get; set; }
    }
}
