using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblSiexception
    {
        public decimal ExceptionId { get; set; }
        public int? ReportId { get; set; }
        public string RequestObject { get; set; }
        public decimal? RequestAmount { get; set; }
        public decimal? DifferenceAmount { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Source { get; set; }
        public int? PaymentReferenceId { get; set; }
        public decimal? PaidAmount { get; set; }
        public DateTime? PaymentDate { get; set; }

        public virtual TblPolicyMonthlySi Report { get; set; }
    }
}
