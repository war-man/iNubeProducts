using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblBenifitRangeDetails
    {
        public decimal BenefitRangeId { get; set; }
        public decimal BenifitId { get; set; }
        public double BenefitAmount { get; set; }
        public double FromValue { get; set; }
        public double ToValue { get; set; }

        public virtual TblProductBenefits Benifit { get; set; }
    }
}
