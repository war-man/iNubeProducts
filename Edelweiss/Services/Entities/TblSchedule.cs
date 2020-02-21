using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblSchedule
    {
        public TblSchedule()
        {
            TblSchedulerLog = new HashSet<TblSchedulerLog>();
        }

        public decimal ScheduleId { get; set; }
        public string PolicyNo { get; set; }
        public string VehicleRegistrationNo { get; set; }
        public string VehicleType { get; set; }
        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? ModifyCount { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<TblSchedulerLog> TblSchedulerLog { get; set; }
    }
}
