using System;
using System.Collections.Generic;

namespace iNube.Services.UserManagement.Entities
{
    public partial class TblDynamicConfig
    {
        public decimal ConfigId { get; set; }
        public string ItemType { get; set; }
        public string Name { get; set; }
        public string ItemDescription { get; set; }
        public string Url { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrderBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
