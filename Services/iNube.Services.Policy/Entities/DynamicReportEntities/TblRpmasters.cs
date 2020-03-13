using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicReportEntities
{
    public partial class TblRpmasters
    {
        public int MastersId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }
}
