using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblPolicyDetails
    {
        public decimal PolicyDetailsId { get; set; }
        public decimal? PolicyId { get; set; }
        public string PolicyRequest { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
