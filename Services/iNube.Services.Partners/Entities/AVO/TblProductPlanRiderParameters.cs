using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblProductPlanRiderParameters
    {
        public int PlanRiderParameterId { get; set; }
        public int? ProductPlanRiderId { get; set; }
        public int? ParameterId { get; set; }
        public decimal? NumericValueFrom { get; set; }
        public decimal? NumericValueTo { get; set; }
        public string StringValueFrom { get; set; }
        public string ListValue { get; set; }
        public int? RelationId { get; set; }
        public string ApplyOn { get; set; }
        public string MinRateType { get; set; }
        public string MaxRateType { get; set; }
        public string MinVal { get; set; }
        public string MaxVal { get; set; }
        public string StringValueTo { get; set; }
        public string ApplyOnTo { get; set; }

        public virtual TblMasParameters Parameter { get; set; }
        public virtual TblProductPlanRiders ProductPlanRider { get; set; }
    }
}
