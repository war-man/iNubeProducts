using System;
using System.Collections.Generic;

namespace iNube.Services.Accounting.Entities
{
    public partial class TblCoaaccountMapping
    {
        public decimal AccountMappingId { get; set; }
        public int? AccountId { get; set; }
        public int? RefAccountCode { get; set; }
        public string Name { get; set; }
        public int? CustomerId { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string AccountType { get; set; }
        public string MicaAccountCode { get; set; }
    }
}
