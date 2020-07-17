using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductPlan
    {
        public TblProductPlan()
        {
            TblProductPolicyTerm = new HashSet<TblProductPolicyTerm>();
        }

        public int PlanId { get; set; }
        public string PlanCode { get; set; }
        public string PlanDescriprion { get; set; }
        public int? ProductId { get; set; }
        public string RefPlanCode { get; set; }
        public int? PremiumTerm { get; set; }
        public int CeasingAge { get; set; }
        public bool Active { get; set; }

        public virtual TblAvoproducts Product { get; set; }
        public virtual ICollection<TblProductPolicyTerm> TblProductPolicyTerm { get; set; }
    }
}
