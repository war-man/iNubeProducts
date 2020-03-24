using System;
using System.Collections.Generic;

namespace iNube.Services.UserManagement.Entities
{
    public partial class TblDynamicPermissions
    {
        public decimal DynamicPermissionId { get; set; }
        public decimal? DynamicId { get; set; }
        public string DynamicName { get; set; }
        public string DynamicType { get; set; }
        public string Userid { get; set; }
        public string Roleid { get; set; }
        public string UserorRole { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrderBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
