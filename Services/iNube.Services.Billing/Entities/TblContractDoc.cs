using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblContractDoc
    {
        public decimal ContractDocId { get; set; }
        public decimal ContractId { get; set; }
        public DateTime? UploadDate { get; set; }
        public string DocumentName { get; set; }
        public byte[] DocumentStr { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual TblContract Contract { get; set; }
    }
}
