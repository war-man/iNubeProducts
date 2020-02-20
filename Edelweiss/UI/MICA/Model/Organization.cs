using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MICA.Model
{
    public class PartnerDetails
    {
        public string PartnerName { get; set; }
        public int PartnerId { get; set; }
        public int GSTN { get; set; }
        public string PANNumber { get; set; }
        public string CINNo { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public int PINSearch { get; set; }
        public string Town { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public int LandLineNumber { get; set; }
        public int FaxNumber { get; set; }
        public int MobileNumber { get; set; }
        public string Email { get; set; }
    }
    public class PartnerViewModel

    {
        public PartnerViewModel()
        {
            //lstPartner=new List<PartnerDetails>();
            lstPartType = new List<PartType>();
        }
        public PartnerDetails Partner { get; set; }
        public List<PartType> lstPartType { get; set; }
        // public List<PartnerDetails> lstPartner { get; set; }
    }
    public class PartType
    {
        public string PARTNER { get; set; }
        public int PARTNERID { get; set; }
    }

    public class Organization
    {

    }
    public class Category
    {
        public string ORGANIZATIONCAT { get; set; }
        public int ORGANIZATIONCATId { get; set; }
    }
    public class CorporateAddress
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int PinCode { get; set; }
    }
    

    public class MailAddress
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int PinCode { get; set; }
    }

    public class MailViewModel
    {
        public MailViewModel()
        {
            lstCity = new List<Mails>();
            lstCountry = new List<Mails>();
            lstState = new List<Mails>();
            lstDistrict = new List<Mails>();
            lstArea = new List<Mails>();
        }
        public Mails mail { get; set; }
        public List<Mails> lstCity { get; set; }
        public List<Mails> lstCountry { get; set; }
        public List<Mails> lstState { get; set; }
        public List<Mails> lstDistrict { get; set; }
        public List<Mails> lstArea { get; set; }
    }
    public class OrgType
    {
        public string ORGANIZATIONTYPE { get; set; }
        public int ORGANIZATIONTYPEId { get; set; }
    }
    public class ProfileDetails
    {

        public string OrganizationName { get; set; }
        public int FaxNumber { get; set; }
        public string WebSite { get; set; }
        public int PhoneNumber { get; set; }
        public string OrganizationCategory { get; set; }


    }
    public class ProfitViewModel
    {
        public ProfitViewModel()
        {
            lstCategory = new List<Category>();

            lstTypess = new List<OrgType>();


        }
        public ProfileDetails Profile { get; set; }
        public List<Category> lstCategory { get; set; }
        public List<OrgType> lstTypess { get; set; }


    }
    public class RegisteredAddress
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int PinCode { get; set; }
    }
    public class RegisterViewModel
    {
        public RegisterViewModel()
        {
            lstCity = new List<Register>();
            lstCountry = new List<Register>();
            lstState = new List<Register>();
            lstDistrict = new List<Register>();
            lstArea = new List<Register>();
        }
        public Register register { get; set; }
        public List<Register> lstCity { get; set; }
        public List<Register> lstCountry { get; set; }
        public List<Register> lstState { get; set; }
        public List<Register> lstDistrict { get; set; }
        public List<Register> lstArea { get; set; }
    }

    public class Corporate
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int pincode { get; set; }
        public string City { get; set; }
        public int CityId { get; set; }
        public string Country { get; set; }
        public int CountryId { get; set; }
        public string State { get; set; }
        public int StateId { get; set; }
        public string District { get; set; }
        public int DistrictId { get; set; }
        public string Area { get; set; }
        public int AreaId { get; set; }
    }
    public class CorporateViewModel
    {
        public CorporateViewModel()
        {
            lstCity = new List<Corporate>();
            lstCountry = new List<Corporate>();
            lstState = new List<Corporate>();
            lstDistrict = new List<Corporate>();
            lstArea = new List<Corporate>();
        }

        public Corporate corporate { get; set; }
        public List<Corporate> lstCity { get; set; }
        public List<Corporate> lstCountry { get; set; }
        public List<Corporate> lstState { get; set; }
        public List<Corporate> lstDistrict { get; set; }
        public List<Corporate> lstArea { get; set; }
    }
    public class License
    {
        public string RegistrationNo { get; set; }
        public string RegisterAuthority { get; set; }
        public string ServiveTax { get; set; }
        public int Pan { get; set; }
        public int Tan { get; set; }
    }
    public class LicenseViewModel
    {
        public License license { get; set; }
    }
    public class Mails
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int pincode { get; set; }
        public string City { get; set; }
        public int CityId { get; set; }
        public string Country { get; set; }
        public int CountryId { get; set; }
        public string State { get; set; }
        public int StateId { get; set; }
        public string District { get; set; }
        public int DistrictId { get; set; }
        public string Area { get; set; }
        public int AreaId { get; set; }
    }


    public class Register
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int pincode { get; set; }
        public string City { get; set; }
        public int CityId { get; set; }
        public string Country { get; set; }
        public int CountryId { get; set; }
        public string State { get; set; }
        public int StateId { get; set; }
        public string District { get; set; }
        public int DistrictId { get; set; }
        public string Area { get; set; }
        public int AreaId { get; set; }
    }
    public class Spoc
    {
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int pincode { get; set; }
        public string City { get; set; }
        public int CityId { get; set; }
        public string Country { get; set; }
        public int CountryId { get; set; }
        public string State { get; set; }
        public int StateId { get; set; }
        public string District { get; set; }
        public int DistrictId { get; set; }
        public string Area { get; set; }
        public int AreaId { get; set; }
        public int PhoneNo { get; set; }
        public string Email { get; set; }
        public int MobileNo { get; set; }
    }
    public class SpocViewModel
    {
        public SpocViewModel()
        {
            lstCity = new List<Spoc>();
            lstCountry = new List<Spoc>();
            lstState = new List<Spoc>();
            lstDistrict = new List<Spoc>();
            lstArea = new List<Spoc>();
        }
        public Spoc spoc { get; set; }
        public List<Spoc> lstCity { get; set; }
        public List<Spoc> lstCountry { get; set; }
        public List<Spoc> lstState { get; set; }
        public List<Spoc> lstDistrict { get; set; }
        public List<Spoc> lstArea { get; set; }
    }



}
