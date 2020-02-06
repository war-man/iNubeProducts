using System;
using System.Collections.Generic;

namespace iNube.Services.UserManagement.Entities.MICACP
{
    public partial class TblCustomerUsers
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public string LoginProvider { get; set; }
        public int? IsFirstTimeLogin { get; set; }
        public string UserId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
    }
}
