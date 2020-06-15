using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.DynamicGraphEntities
{
    public partial class TblDbmasters
    {
        public int MastersId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }
}
