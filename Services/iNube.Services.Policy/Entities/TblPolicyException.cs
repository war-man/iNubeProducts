using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblPolicyException
    {
        public decimal ExceptionId { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public string PolicyNumber { get; set; }
        public int? NoofPcs { get; set; }
        public int? NoofTws { get; set; }
        public int? PrimaryDriverAge { get; set; }
        public int? PrimaryDriverExperience { get; set; }
        public int? NoofAddnlDrivers { get; set; }
        public decimal? SumInsured { get; set; }
        public string Frequency { get; set; }
        public decimal? Fttotal { get; set; }
        public decimal? Adtotal { get; set; }
        public decimal? TotalPremium { get; set; }
        public decimal? PbtotalPremium { get; set; }
        public string TxnId { get; set; }
        public string PaymentReferenceId { get; set; }
        public decimal? PaidAmount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string PaymentStatus { get; set; }
        public string RequestObject { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? Status { get; set; }
    }
}
