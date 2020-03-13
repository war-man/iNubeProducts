using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicReportEntities
{
    public partial class TblReportConfig
    {
        public TblReportConfig()
        {
            TblReportConfigParam = new HashSet<TblReportConfigParam>();
        }

        public int ReportConfigId { get; set; }
        public string ReportConfigName { get; set; }
        public string Dbschema { get; set; }
        public string Query { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }



        public virtual ICollection<TblReportConfigParam> TblReportConfigParam { get; set; }
    }
}
