using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblCoaaccounts
    {
        public decimal AccountId { get; set; }
        public decimal AccountTypeId { get; set; }
        public int AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string IsActive { get; set; }
    }
}
