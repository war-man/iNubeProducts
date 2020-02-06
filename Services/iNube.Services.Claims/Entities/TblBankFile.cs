using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblBankFile
    {
        public int BankFileId { get; set; }
        public string PolicyNo { get; set; }
        public string ClaimNo { get; set; }
        public string ClaimStatus { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public string BankAccountHolderName { get; set; }
        public string BankName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankBranchAddress { get; set; }
        public string BankIfsccode { get; set; }
        public decimal Amount { get; set; }
        public string Utrno { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentDate { get; set; }
        public int? Active { get; set; }
        public string CreatedBy { get; set; }
        public decimal? BankDocId { get; set; }
        public string FailedReason { get; set; }
    }
}
