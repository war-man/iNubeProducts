using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicGraphEntities
{
    public partial class TblDashboardConfig
    {
        public TblDashboardConfig()
        {
            TblDashboardConfigParam = new HashSet<TblDashboardConfigParam>();
        }

        public int DashboardConfigId { get; set; }
        public string DashboardConfigName { get; set; }
        public string Dbschema { get; set; }
        public string Query { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string AxisDetails { get; set; }

        public virtual ICollection<TblDashboardConfigParam> TblDashboardConfigParam { get; set; }
    }
}
