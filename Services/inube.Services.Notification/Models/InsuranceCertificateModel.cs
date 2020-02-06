using inube.Services.Notification.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateDemo.Models
{
    public class InsuranceCertificateModel
    {
        public InsuranceCertificateModel()
        {
            cweDetails = new CweDetails();
            cweproductDetails = new List<CweProductDetails>();
            insurableItems = new List<CWEInsurableItems>();
            coverListDetails = new List<CoverListDetails>();
            cWEBenfitDetails = new List<CWEBenfitDetails>();
            insurableItemsdetails = new List<Insurabledetails>();
            PremiumDetail = new PremiumDetail();

        }
        public DateTime? Date { get; set; }
        public InsurerDetails InsurerDetails { get; set; }
        public InsuredDetails insuredDetails { get; set; }
        public InsurerAddress insurerAddress { get; set; }
        public InsuredAddress insuredAddress { get; set; }
        public Policydetails policyDeatils { get; set; }
        public List<Insurabledetails> insurableItemsdetails { get; set; }
        public Premiumdetails premiumdetails { get; set; }
        public OfficeAddress officeAddress { get; set; }


        //cwe
        public List<CWEInsurableItems> insurableItems { get; set; }
        public CweDetails cweDetails { get; set; }
        public List<CweProductDetails> cweproductDetails { get; set; }
        public List<CoverListDetails> coverListDetails { get; set; }
        public List<CWEBenfitDetails> cWEBenfitDetails { get; set; }
        public PremiumDetail PremiumDetail  { get; set; }
        public bool IsAwsS3Save { get; set; }
        public EmailRequest EmailTest { get; set; }
    }
    public class InsurerDetails
    {
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
    }
    public class InsuredDetails
    {
        public string InsuredContactName { get; set; }
        public string InsuredPhoneNumber { get; set; }
        public string InsuredEmailAddress { get; set; }
    }
    public class OfficeAddress
    {
        public string CompanyName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }

    }
    public class InsurerAddress
    {
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }

    }
    public class InsuredAddress
    {
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }

    }
    public class Policydetails
    {
        public string PolicyNumber { get; set; }
        public string ProductName { get; set; }
        public string PolicyStartDate { get; set; }
        public string PolicyEndDate { get; set; }
        public string PartnerName { get; set; }
        public string CoverEvent { get; set; }
    }
    public class Insurabledetails
    {
        public Insurabledetails()
        {
            coverages = new List<Coveragedetails>();
            lstInsurableItemsDetails = new List<InsurableItemsDetails>();
        }
        public string InsurableItem { get; set; }
        public int NumberOfItems { get; set; }
        //public List<string> Name { get; set; }
        public List<Coveragedetails> coverages { get; set; }
        public List<InsurableItemsDetails> lstInsurableItemsDetails { get; set; }
    }
    public class Coveragedetails
    {
        public Coveragedetails()
        {
            BenifitRangeDetails = new List<BenifitRangeDetails>();
        }
        public string CoverName { get; set; }
        public string CoverEventFactor { get; set; }
        public string CoverEventtFactorValue { get; set; }
        public string BenifitCriteria { get; set; }
        public string MaxBenifitCriteriaValue { get; set; }
        public decimal MaxBenifitCriteriaAmount { get; set; }
        public bool IsMaxBenefitAmount { get; set; }
        public string CoverValue { get; set; }
        public bool IsBenefitRange { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<BenifitRangeDetails> BenifitRangeDetails { get; set; }
    }
    public class InsurableItemsDetails
    {
        public string Name { get; set; }
        public string IdentificationNumber { get; set; }
    }
    public class Premiumdetails
    {
        public string BasePremium { get; set; }
        public string GST { get; set; }
        public string TotalPremium { get; set; }
    }

    //CWE
    public class CweDetails
    {
        public CweDetails()
        {
            cweProductDetails = new List<CweProductDetails>();
            cweinsurableItems = new List<CWEInsurableItems>();

        }
        public string cweType { get; set; }
        public List<CweProductDetails> cweProductDetails { get; set; }
        public List<CWEInsurableItems> cweinsurableItems { get; set; }
    }
    public class CWEInsurableItems
    {
        public CWEInsurableItems()
        {
            cweInsurableDetails = new List<CweProductDetails>();
            cwecoverListDetails = new List<CoverListDetails>();
        }
        public string InsurableItemName { get; set; }
        public List<CweProductDetails> cweInsurableDetails { get; set; }
        public List<CoverListDetails> cwecoverListDetails { get; set; }
    }
    public class CweProductDetails
    {
        public string Type { get; set; }
        public string Description { get; set; }
    }
    public class CoverListDetails
    {
        public CoverListDetails()
        {
            cwebenfitDetails = new List<CWEBenfitDetails>();
            cweCoverDetails = new List<CweProductDetails>();
        }

        public string CoverName { get; set; }
        public List<CweProductDetails> cweCoverDetails { get; set; }
        public List<CWEBenfitDetails> cwebenfitDetails { get; set; }

    }
    public class CWEBenfitDetails
    {
        public CWEBenfitDetails()
        {
            cweBenefitDetails = new List<CweProductDetails>();
        }
        public List<CweProductDetails> cweBenefitDetails { get; set; }
    }

    public class PremiumDetail
    {
        public PremiumDetail()
        {
            lstPremiumAmount = new List<PremiumLevelDetail>();
        }
        public string PremiumLevel { get; set; }
        public string Currency { get; set; }
        public List<PremiumLevelDetail> lstPremiumAmount { get; set; }
    }
    public class PremiumLevelDetail
    {
        public PremiumLevelDetail()
        {
            lstPremiumAmount = new List<PremiumAmount>();
        }
        public string ParticularName { get; set; }
        public List<PremiumAmount> lstPremiumAmount { get; set; }
    }
    public class PremiumAmount
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }



}
