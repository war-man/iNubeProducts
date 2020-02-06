using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TempChannelDetails
    {
        public int Id { get; set; }
        public string ChannelType { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int? MobileNumber { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public int? Pincode { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
    }
}
