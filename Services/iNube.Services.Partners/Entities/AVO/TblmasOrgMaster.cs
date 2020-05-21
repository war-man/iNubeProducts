using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblmasOrgMaster
    {
        public int OrgMasterId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
        public int? ParentId { get; set; }
        public bool IsDisable { get; set; }
        public bool IsActive { get; set; }
        public int? SortOrder { get; set; }
        public string UserInputType { get; set; }
    }
}
