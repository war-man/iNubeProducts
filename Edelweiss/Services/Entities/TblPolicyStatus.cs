using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblPolicyStatus
    {
        public int Id { get; set; }
        public string PolicyNumber { get; set; }
        public int? PolicyStatus { get; set; }
        public DateTime? TxnDateTime { get; set; }
    }
}
