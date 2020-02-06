using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblPolicyInsurableDetails
    {
        public decimal InsurableId { get; set; }
        public string InsurableItem { get; set; }
        public string Name { get; set; }
        public string IdentificationNo { get; set; }
        public string CoverName { get; set; }
        public string CoverValue { get; set; }
        public decimal PolicyId { get; set; }
        public decimal? BenefitAmount { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
