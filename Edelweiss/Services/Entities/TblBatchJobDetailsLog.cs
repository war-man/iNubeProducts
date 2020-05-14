using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblBatchJobDetailsLog
    {
        public decimal BatchDetailLogId { get; set; }
        public decimal? BatchLogId { get; set; }
        public string TxnKey { get; set; }
        public string TxnDescription { get; set; }
        public string TxnErrorDescription { get; set; }
        public bool? TxnStatus { get; set; }
        public DateTime? TxnStartDateTime { get; set; }
        public DateTime? TxnEndDateTime { get; set; }

        public virtual TblBatchJobLog BatchLog { get; set; }
    }
}
