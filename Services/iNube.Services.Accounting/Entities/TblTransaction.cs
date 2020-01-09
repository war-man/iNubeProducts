using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblTransaction
    {
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public decimal? Amount { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public int? AccountCode { get; set; }
        public string Currency { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? ContractId { get; set; }
        public decimal? TransactionHeaderId { get; set; }

        public virtual TblTransactionHeader TransactionHeader { get; set; }
    }
}
