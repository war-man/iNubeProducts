using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicReportEntites
{
    public partial class TblReportConfig
    {
        public TblReportConfig()
        {
            TblReportConfigParamDetails = new HashSet<TblReportConfigParamDetails>();
        }

        public int ReportConfigId { get; set; }
        public string ReportConfigName { get; set; }
        public string Dbschema { get; set; }
        public string Query { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TblReportConfigParamDetails> TblReportConfigParamDetails { get; set; }
    }
}
