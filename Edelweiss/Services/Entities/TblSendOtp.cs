using System;
using System.Collections.Generic;

namespace MicaExtension_EGI.Entities
{
    public partial class TblSendOtp
    {
        public decimal Id { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Otp { get; set; }
    }
}
