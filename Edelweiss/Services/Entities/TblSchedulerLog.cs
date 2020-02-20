using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblSchedulerLog
    {
        public int LogId { get; set; }
        public decimal? ScheduleId { get; set; }
        public DateTime? SchedulerDateTime { get; set; }
        public string SchedulerStatus { get; set; }
        public bool? SucessStat { get; set; }
        public DateTime? SchedulerEndDateTime { get; set; }

        public virtual TblSchedule Schedule { get; set; }
    }
}
