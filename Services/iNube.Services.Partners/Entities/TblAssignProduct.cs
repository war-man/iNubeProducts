using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblAssignProduct
    {
        public decimal AssignProductId { get; set; }
        public decimal PatnerId { get; set; }
        public decimal ProductId { get; set; }
        public DateTime AssignDate { get; set; }
        public DateTime EffectiveFrom { get; set; }
        public DateTime EffectiveTo { get; set; }
        public bool IsActive { get; set; }
        public string CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsPaymentReceived { get; set; }
    }
}
