using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblBatchJobLog
    {
        public TblBatchJobLog()
        {
            TblBatchJobDetailsLog = new HashSet<TblBatchJobDetailsLog>();
        }

        public int BatchLogId { get; set; }
        public string BatchName { get; set; }
        public string BatchMode { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public int? SuccessCount { get; set; }
        public int? FailCount { get; set; }
        public int? TotalCount { get; set; }

        public virtual ICollection<TblBatchJobDetailsLog> TblBatchJobDetailsLog { get; set; }
    }
}
