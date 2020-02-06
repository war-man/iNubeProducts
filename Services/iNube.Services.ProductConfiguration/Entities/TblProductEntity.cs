using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblProductEntity
    {
        public int MasterId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
        public int? ParentId { get; set; }
        public int? Level { get; set; }
        public string Parameter { get; set; }
        public bool IsDisable { get; set; }
        public bool IsActive { get; set; }
        public int? SortOrder { get; set; }
        public string UserInputType { get; set; }
    }
}
