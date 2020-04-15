using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblProductPolicyTerm
    {
        public int PolicyTermId { get; set; }
        public int? PlanId { get; set; }
        public int Term { get; set; }

        public virtual TblProductPlan Plan { get; set; }
    }
}
