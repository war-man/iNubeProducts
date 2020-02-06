using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblmasBicommonTypes
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }
}
