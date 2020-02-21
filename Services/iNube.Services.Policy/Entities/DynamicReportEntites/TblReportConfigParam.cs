using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicReportEntites
{
    public partial class TblReportConfigParam
    {
        public TblReportConfigParam()
        {
            TblReportConfigParamDetails = new HashSet<TblReportConfigParamDetails>();
        }

        public int ReportConfigParamId { get; set; }
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<TblReportConfigParamDetails> TblReportConfigParamDetails { get; set; }
    }
}
