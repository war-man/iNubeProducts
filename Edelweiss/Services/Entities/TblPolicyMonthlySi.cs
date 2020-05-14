using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblPolicyMonthlySi
    {
        public TblPolicyMonthlySi()
        {
            TblSiexception = new HashSet<TblSiexception>();
        }

        public int ReportId { get; set; }
        public DateTime? DueDate { get; set; }
        public string PolicyNo { get; set; }
        public string PolicyStatus { get; set; }
        public string InsuredName { get; set; }
        public int? NumberOfDaysChargeable { get; set; }
        public decimal? PerDayPremium { get; set; }
        public decimal? PremiumChargeable { get; set; }
        public decimal? GstOnPremiumChargeable { get; set; }
        public decimal? TotalAmountChargeable { get; set; }
        public string AuthPayUid { get; set; }
        public decimal? Amount { get; set; }
        public string Txnid { get; set; }
        public string UserCredentials { get; set; }
        public string CardToken { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PayUid { get; set; }
        public string PayAmount { get; set; }
        public string PayStatus { get; set; }
        public DateTime? ReportCreatedDate { get; set; }
        public string PremiumDetails { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string Source { get; set; }

        public virtual ICollection<TblSiexception> TblSiexception { get; set; }
    }
}
