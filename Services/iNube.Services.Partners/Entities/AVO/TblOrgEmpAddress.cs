using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities.AVO
{
    public partial class TblOrgEmpAddress
    {
        public decimal EmpAddressId { get; set; }
        public decimal? OrgEmpId { get; set; }
        public string EmpAddressType { get; set; }
        public int? EmpCountryId { get; set; }
        public int? EmpStateId { get; set; }
        public int? EmpDistrictId { get; set; }
        public int? EmpCityId { get; set; }
        public string EmpAddressLine1 { get; set; }
        public string EmpAddressLine2 { get; set; }
        public string EmpAddressLine3 { get; set; }
        public int? EmpPincodeId { get; set; }

        public virtual TblMasCity EmpCity { get; set; }
        public virtual TblMasCountry EmpCountry { get; set; }
        public virtual TblMasDistrict EmpDistrict { get; set; }
        public virtual TblMasPinCode EmpPincode { get; set; }
        public virtual TblMasState EmpState { get; set; }
        public virtual TblOrgEmployee OrgEmp { get; set; }
    }
}
