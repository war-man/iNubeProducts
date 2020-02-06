using System;
using System.Collections.Generic;

namespace iNube.Services.Billing.Entities
{
    public partial class TblCustSpocDetails
    {
        public decimal SpocId { get; set; }
        public decimal? CustomerId { get; set; }
        public string FirstName { get; set; }
        public string Mobileno { get; set; }
        public string EmailId { get; set; }
        public string Designation { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int? PincodeId { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? Doj { get; set; }
        public string PanNo { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }
        public string UserName { get; set; }
        public int? MaritalStatusId { get; set; }
        public int? GenderId { get; set; }
        public string BranchName { get; set; }
        public int? BrachCode { get; set; }

        public virtual TblMasCity City { get; set; }
        public virtual TblMasCountry Country { get; set; }
        public virtual TblCustomers Customer { get; set; }
        public virtual TblMasDistrict District { get; set; }
        public virtual TblMasPinCode Pincode { get; set; }
        public virtual TblMasState State { get; set; }
    }
}
