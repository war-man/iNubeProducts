using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblAccountType
    {
        public decimal AccountTypeId { get; set; }
        public string AccountType { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string FromRange { get; set; }
        public string ToRange { get; set; }
    }
}
