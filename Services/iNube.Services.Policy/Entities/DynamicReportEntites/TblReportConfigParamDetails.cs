using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicReportEntites
{
    public partial class TblReportConfigParamDetails
    {
        public int ParamDetailsId { get; set; }
        public int? ReportConfigId { get; set; }
        public int? ReportConfigParamId { get; set; }

        public virtual TblReportConfig ReportConfig { get; set; }
        public virtual TblReportConfigParam ReportConfigParam { get; set; }
    }
}
