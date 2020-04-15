using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOfficeSpocDetails
    {
        public decimal OfficeSpocid { get; set; }
        public decimal? OfficeId { get; set; }
        public string Spocname { get; set; }
        public string Spocmobileno { get; set; }
        public string SpocemailId { get; set; }
        public string Spocdesignation { get; set; }
        public int? SpoccountryId { get; set; }
        public int? SpocstateId { get; set; }
        public int? SpocdistrictId { get; set; }
        public int? SpoccityId { get; set; }
        public string SpocaddressLine1 { get; set; }
        public string SpocaddressLine2 { get; set; }
        public string SpocaddressLine3 { get; set; }
        public int? SpocpincodeId { get; set; }

        public virtual TblOrgOffice Office { get; set; }
        public virtual TblMasCity Spoccity { get; set; }
        public virtual TblMasCountry Spoccountry { get; set; }
        public virtual TblMasDistrict Spocdistrict { get; set; }
        public virtual TblMasPinCode Spocpincode { get; set; }
        public virtual TblMasState Spocstate { get; set; }
    }
}
