using System;
using System.Collections.Generic;

namespace iNube.Services.Dispatcher.Entities
{
    public partial class TblDispatcherTask
    {
        public decimal DispatcherTaskId { get; set; }
        public decimal? DispatcherId { get; set; }
        public string Api { get; set; }
        public string ResponseMsg { get; set; }
        public string InputObject { get; set; }
        public string OutputObject { get; set; }
        public string InputTypeObject { get; set; }
        public string OutputTypeObject { get; set; }

        public virtual TblDispatcher Dispatcher { get; set; }
    }
}
