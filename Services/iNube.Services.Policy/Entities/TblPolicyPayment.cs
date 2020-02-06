using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities
{
    public partial class TblPolicyPayment
    {
        public decimal PaymentId { get; set; }
        public decimal? PolicyId { get; set; }
        public decimal? PaidAmount { get; set; }
        public string TxnType { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual TblPolicy Policy { get; set; }
    }
}
