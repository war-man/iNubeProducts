using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblPremiumDetails
    {
        public decimal PremiumDetailsId { get; set; }
        public string RefrenceId { get; set; }
        public string Type { get; set; }
        public int? Value { get; set; }
    }
}
