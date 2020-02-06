using inube.Services.Notification.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateDemo.Models
{

    public class PolicyModel
    {
        public Organization organization { get; set; }
        public Customer customer { get; set; }
        public PolicyDetails policyDetails { get; set; }
        public ProductsModel productsModel { get; set; }
        public DateTime? Date { get; set; }
        public EmailRequest EmailTest { get; set; }
        public string PolicyNumber { get; set; }
    }
    public class Organization
    {
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
    }
    public class Customer
    {
        public string ContactName { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
    }
    public class PolicyDetails
    {
        public string PolicyNumber { get; set; }
        public string PolicyStartDate { get; set; }
        public string PartnerName { get; set; }
        public string PolicyEndDate { get; set; }
        public string ProductName { get; set; }
    }
    public class ProductsModel
    {
        public ProductsModel()
        {
            coverages = new List<CoverageDetails>();
            benifits = new List<Benifits>();
            premium = new List<PremiumDetails>();
            CWEdetails = new List<string>();
        }
        public List<CoverageDetails> coverages { get; set; }
        public List<Benifits> benifits { get; set; }
        public List<PremiumDetails> premium { get; set; }
        public List<string> CWEdetails { get; set; }
    }
    public class CoverageDetails
    {
        public string CoverName { get; set; }
        public string CoverEvent { get; set; }
        public string PartnerName { get; set; }
        public string CoverEventFactorValue { get; set; }
        public string CoverEventFactor { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        //public string Amount { get; set; }
    }
    public partial class BenifitRangeDetails
    {
        public decimal BenefitRangeId { get; set; }
        public decimal BenifitId { get; set; }
        public double FromValue { get; set; }
        public double ToValue { get; set; }
        public double BenefitAmount { get; set; }
    }
    public class Benifits
    {
        public Benifits()
        {
            BenifitRangeDetails = new List<BenifitRangeDetails>();
        }
        public string BenifitCriteria { get; set; }
        public string BenifitCriteriaValue { get; set; }
        //public string BenifitAmount { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Amount { get; set; }
        public List<BenifitRangeDetails> BenifitRangeDetails { get; set; }
    }
    public class PremiumDetails
    {
        //public string PremiumSummary { get; set; }
        public string BasePremium { get; set; }
        public string GST { get; set; }
        public string TotalPremium { get; set; }
    }
    public class CWEDetails
    {
        public string[] CWEdetails { get; set; }
    }

}
