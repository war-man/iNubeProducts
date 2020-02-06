using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblPartnerAddress
    {
        public decimal PartnerAddressId { get; set; }
        public decimal? PartnerId { get; set; }
        public string PartnerAddressType { get; set; }
        public int? PartnerCountryId { get; set; }
        public int? PartnerStateId { get; set; }
        public int? PartnerDistrictId { get; set; }
        public int? PartnerCityId { get; set; }
        public string PartnerAddressLine1 { get; set; }
        public string PartnerAddressLine2 { get; set; }
        public string PartnerAddressLine3 { get; set; }
        public int? PartnerPincodeId { get; set; }

        public virtual TblPartners Partner { get; set; }
        public virtual TblMasCity PartnerCity { get; set; }
        public virtual TblMasCountry PartnerCountry { get; set; }
        public virtual TblMasDistrict PartnerDistrict { get; set; }
        public virtual TblMasPinCode PartnerPincode { get; set; }
        public virtual TblMasState PartnerState { get; set; }
    }
}
