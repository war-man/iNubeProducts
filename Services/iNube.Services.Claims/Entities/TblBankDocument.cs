using System;
using System.Collections.Generic;

namespace iNube.Services.Claims.Entities
{
    public partial class TblBankDocument
    {
        public decimal BankDocId { get; set; }
        public DateTime? DateTimeOfProcessing { get; set; }
        public int? TotalRecords { get; set; }
        public int? NoOfRecordsProcessed { get; set; }
        public int? NoOfRecordsFailed { get; set; }
        public string DocFileName { get; set; }
    }
}
