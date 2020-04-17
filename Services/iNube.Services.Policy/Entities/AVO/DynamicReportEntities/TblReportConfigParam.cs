using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AVO.DynamicReportEntities
{
    public partial class TblReportConfigParam
    {
        public int ReportConfigParamId { get; set; }
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ReportConfigId { get; set; }

        public virtual TblReportConfig ReportConfig { get; set; }
    }
}
