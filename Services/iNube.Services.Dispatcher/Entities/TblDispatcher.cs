using System;
using System.Collections.Generic;

namespace iNube.Services.Dispatcher.Entities
{
    public partial class TblDispatcher
    {
        public TblDispatcher()
        {
            TblDispatcherTask = new HashSet<TblDispatcherTask>();
        }

        public decimal DispatcherId { get; set; }
        public string DispatcherTaskName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string InputObject { get; set; }
        public string OutputObject { get; set; }

        public virtual ICollection<TblDispatcherTask> TblDispatcherTask { get; set; }
    }
}
