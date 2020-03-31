using System;
using System.Collections.Generic;

namespace iNube.Services.UserManagement.Entities.MICACP
{
    public partial class TblCustomerEnvironment
    {
        public TblCustomerEnvironment()
        {
            TblCustomerSettings = new HashSet<TblCustomerSettings>();
        }

        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string EnvName { get; set; }
        public string Name { get; set; }
        public string Dbconnection { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Product { get; set; }
        public int? SortOrderBy { get; set; }

        public virtual ICollection<TblCustomerSettings> TblCustomerSettings { get; set; }
    }
}
