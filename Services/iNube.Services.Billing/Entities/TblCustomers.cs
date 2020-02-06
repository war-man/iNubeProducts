using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblCustomers
    {
        public TblCustomers()
        {
            TblContract = new HashSet<TblContract>();
            TblCustAddress = new HashSet<TblCustAddress>();
            TblCustSpocDetails = new HashSet<TblCustSpocDetails>();
            TblCustomerConfig = new HashSet<TblCustomerConfig>();
        }

        public decimal CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int CategoryId { get; set; }
        public int ConfigurationTypeId { get; set; }
        public int TypeId { get; set; }
        public string CorpAddressSameAs { get; set; }
        public string MailingAddressSameAs { get; set; }
        public byte[] Logo { get; set; }
        public string Website { get; set; }
        public string PhoneNo { get; set; }
        public string FaxNo { get; set; }
        public int? Levels { get; set; }
        public string RegistrationNo { get; set; }
        public string RegisteringAuthority { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string ServiceTaxRegistrationNumber { get; set; }
        public string Panno { get; set; }
        public string Tanno { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Code { get; set; }

        public virtual ICollection<TblContract> TblContract { get; set; }
        public virtual ICollection<TblCustAddress> TblCustAddress { get; set; }
        public virtual ICollection<TblCustSpocDetails> TblCustSpocDetails { get; set; }
        public virtual ICollection<TblCustomerConfig> TblCustomerConfig { get; set; }
    }
}
