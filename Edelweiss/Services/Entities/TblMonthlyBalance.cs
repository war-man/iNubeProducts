using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblMonthlyBalance
    {
        public decimal AutoId { get; set; }
        public string PolicyNumber { get; set; }
        public decimal? Balance { get; set; }
        public string Month { get; set; }
        public string Type { get; set; }
        public DateTime? BalanceDate { get; set; }
    }
}
