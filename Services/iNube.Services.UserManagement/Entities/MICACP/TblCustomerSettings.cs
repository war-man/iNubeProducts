using System;
using System.Collections.Generic;

namespace iNube.Services.UserManagement.Entities.MICACP
{
    public partial class TblCustomerSettings
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
