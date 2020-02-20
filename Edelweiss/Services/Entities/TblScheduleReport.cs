using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblScheduleReport
    {
        public decimal ReportId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? ScheduleStartDate { get; set; }
        public DateTime? ScheduleEndDate { get; set; }
        public decimal? SuccessCount { get; set; }
        public decimal? FailCount { get; set; }
    }
}
