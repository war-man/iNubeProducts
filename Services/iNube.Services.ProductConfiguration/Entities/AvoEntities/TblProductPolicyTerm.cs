using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities.AvoEntities
{
    public partial class TblProductPolicyTerm
    {
        public int PolicyTermId { get; set; }
        public int? PlanId { get; set; }
        public int Term { get; set; }

        public virtual TblProductPlan Plan { get; set; }
    }
}
