using System;
using System.Collections.Generic;

namespace iNube.Services.ReInsurance.Entities
{
    public partial class TblMasRicommonTypes
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }
}
