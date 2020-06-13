using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicGraphEntities
{
    public partial class TblDashboardConfigParam
    {
        public int DashboardConfigParamId { get; set; }
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? DashboardConfigId { get; set; }

        public virtual TblDashboardConfig DashboardConfig { get; set; }
    }
}
