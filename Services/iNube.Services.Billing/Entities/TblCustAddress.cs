using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblCustAddress
    {
        public decimal AddressId { get; set; }
        public decimal? CustomerId { get; set; }
        public string AddressType { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int? PincodeId { get; set; }

        public virtual TblMasCity City { get; set; }
        public virtual TblMasCountry Country { get; set; }
        public virtual TblCustomers Customer { get; set; }
        public virtual TblMasDistrict District { get; set; }
        public virtual TblMasPinCode Pincode { get; set; }
        public virtual TblMasState State { get; set; }
    }
}
