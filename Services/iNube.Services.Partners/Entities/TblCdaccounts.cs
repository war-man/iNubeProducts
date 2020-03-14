using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblCdaccounts
    {
        public TblCdaccounts()
        {
            TblCdaccountDetails = new HashSet<TblCdaccountDetails>();
            TblCdtransaction = new HashSet<TblCdtransaction>();
            TblCdtransactions = new HashSet<TblCdtransactions>();
            TblDailyCdtransaction = new HashSet<TblDailyCdtransaction>();
        }

        public decimal Cdid { get; set; }
        public decimal? PartnerId { get; set; }
        public string AccountNo { get; set; }
        public decimal? InitialAmount { get; set; }
        public decimal? AvailableBalance { get; set; }
        public decimal? LedgerBalance { get; set; }
        public decimal? ThresholdValue { get; set; }
        public decimal? DropLimit { get; set; }
        public bool IsLocked { get; set; }
        public string PaymentType { get; set; }
        public string Remark { get; set; }
        public bool? Active { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? OrganizationId { get; set; }

        public virtual ICollection<TblCdaccountDetails> TblCdaccountDetails { get; set; }
        public virtual ICollection<TblCdtransaction> TblCdtransaction { get; set; }
        public virtual ICollection<TblCdtransactions> TblCdtransactions { get; set; }
        public virtual ICollection<TblDailyCdtransaction> TblDailyCdtransaction { get; set; }
    }
}
