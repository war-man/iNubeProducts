using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblInvoicePenalty
    {
        public decimal InvoicePenaltyId { get; set; }
        public decimal InvoiceId { get; set; }
        public decimal? PenaltyRate { get; set; }
        public decimal? PenaltyAmount { get; set; }
        public decimal? RevisedInvAmount { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? CreatedUserId { get; set; }
    }
}
