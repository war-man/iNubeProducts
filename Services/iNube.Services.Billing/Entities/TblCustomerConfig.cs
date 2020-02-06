using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblCustomerConfig
    {
        public decimal CustConfigId { get; set; }
        public decimal? CustomerId { get; set; }
        public int? TaxSetupId { get; set; }
        public int? CurrencyId { get; set; }
        public byte[] Image { get; set; }
        public string PdfTemplateName { get; set; }
        public int? ThemeId { get; set; }
        public int? EnvironmentSetupid { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblCustomers Customer { get; set; }
    }
}
