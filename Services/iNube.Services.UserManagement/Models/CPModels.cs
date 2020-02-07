using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Models
{
    public class CustomerEnvironmentDTO
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string EnvName { get; set; }
        public string Name { get; set; }
        public string Dbconnection { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Product { get; set; }
    }

    public class CustomerUsersDTO
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public string LoginProvider { get; set; }
        public int? IsFirstTimeLogin { get; set; }
        public string UserId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }

    public class CustomerResponse : ResponseStatus
    {
        public CustomerSettingsDTO customerSettingsDTO { get; set; }
    }


    public partial class CustomerSettingsDTO
    {
        //public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
    public partial class ddDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string Label { get; set; }
        public string name { get; set; }
        public string value { get; set; }
        public string mType { get; set; }
    }
    public class CustomerProvisioningDTO
    {
        public CustomerProvisioningDTO()
        {
            customerSettings = new List<CustomerSettingsDTO>();
            customerEnvironmentDTOs = new List<CustomerEnvironmentDTO>();
        }
        public decimal CustomerId { get; set; }
        public List<CustomerSettingsDTO> customerSettings { get; set; }
        public List<CustomerEnvironmentDTO> customerEnvironmentDTOs { get; set; }
    }


    public partial class CustomersDTO
    {
        public CustomersDTO()
        {
            CustAddress = new HashSet<CustAddressDTO>();
            CustSpocDetails = new HashSet<CustSpocDetailsDTO>();
        }

        public decimal CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int CategoryId { get; set; }
        public int ConfigurationTypeId { get; set; }
        public int TypeId { get; set; }
        public string CorpAddressSameAs { get; set; }
        public string MailingAddressSameAs { get; set; }
        public byte[] Logo { get; set; }
        public string Website { get; set; }
        public string PhoneNo { get; set; }
        public string FaxNo { get; set; }
        public int? Levels { get; set; }
        public string RegistrationNo { get; set; }
        public string RegisteringAuthority { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string ServiceTaxRegistrationNumber { get; set; }
        public string Panno { get; set; }
        public string Tanno { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Code { get; set; }

       
        public virtual ICollection<CustAddressDTO> CustAddress { get; set; }
        public virtual ICollection<CustSpocDetailsDTO> CustSpocDetails { get; set; }
    }

    public partial class CustAddressDTO
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

        //public virtual MasCityDTO City { get; set; }
        //public virtual MasCountryDTO Country { get; set; }
        ////public virtual TblCustomers Customer { get; set; }
        //public virtual MasDistrictDTO District { get; set; }
        //public virtual MasPinCodeDTO Pincode { get; set; }
        //public virtual MasPinCodeDTO State { get; set; }
    }

    public partial class CustSpocDetailsDTO
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

    }

}
