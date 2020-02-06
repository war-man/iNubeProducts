using inube.Services.Notification.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateDemo.Models
{
    public class InvoiceModel
    {
        public InvoiceModel()
        {
            InvoiceItemsModel = new InvoiceItemsModel();
            Address = new Address();
            BankDetails = new BankDetails();
            TaxDetails = new TaxDetails();
            Invoices = new List<InvoiceItemsDetails>();
            BuyersAddress = new BuyersAddress();
            EmailTest = new EmailRequest();
            OneTimeLicenseCost = new OneTimeLicenseCost();
            ProductCreation = new List<ProductCreation>();
            PolicyCreation = new List<PolicyCreation>();
            ClaimIntimation = new List<ClaimIntimation>();
            InvoiceSecondPageDetails = new InvoiceSecondPageDetails();
        }
        public InvoiceItemsModel InvoiceItemsModel { get; set; }
        public Address Address { get; set; }
        //public InvoiceItemsDetailsModel invoiceItemsDetailsModel { get; set; }
        public BankDetails BankDetails { get; set; }
        public TaxDetails TaxDetails { get; set; }
        public List<InvoiceItemsDetails> Invoices { get; set; }
        public BuyersAddress BuyersAddress { get; set; }
        public EmailRequest EmailTest { get; set; }
        public OneTimeLicenseCost OneTimeLicenseCost { get; set; }
        public List<ProductCreation> ProductCreation { get; set; }
        public List<PolicyCreation> PolicyCreation { get; set; }
        public List<ClaimIntimation> ClaimIntimation { get; set; }
        public InvoiceSecondPageDetails InvoiceSecondPageDetails { get; set; }
    }
    public class InvoiceItemsModel
    {

        public string InvoiceNo { get; set; }
        public string InvoiceDate { get; set; }
        public string PODate { get; set; }
        public string SuppliesrsRef { get; set; }
       // public string OthersRef { get; set; }
        public string Days { get; set; }
        public string OrderNo { get; set; }
        public double TotalAmount { get; set; }
        public decimal? TotalTaxAmount { get; set; }
        public string AmountInWords { get; set; }
        public string TaxAmountInWords { get; set; }
        public string TermsofDelivery { get; set; }
        public double TaxAmount { get; set; }
        public string GST { get; set; }
    }
    public class Address
    {
        public decimal AddressId { get; set; }
        public string Code { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string OfficeName { get; set; }
        public string OfficeNo { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string Statecode { get; set; }
        public string UIN { get; set; }
        public string CIN { get; set; }
        public string PAN { get; set; }
    }
    public class BuyersAddress
    {
        public string Buyer { get; set; }
        public string OthersRef { get; set; }//spoc name
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string UIN { get; set; }
        public string State { get; set; }
        public string Code { get; set; }
        public string CIN { get; set; }
        public string PAN { get; set; }
    }
    //public class InvoiceItemsDetailsModel
    //{
    //    public InvoiceItemsDetailsModel()
    //    {
    //        Invoices = new List<InvoiceItemsDetails>();
    //    }
    //    public List<InvoiceItemsDetails> Invoices { get; set; }

    //}
    public class InvoiceItemsDetails
    {

        public int SlNo { get; set; }
        public int? EventCount { get; set; }
        public string ItemDescription1 { get; set; }
        public string ItemDescription2 { get; set; }
        public string ItemDescription3 { get; set; }
        public string ItemDescription4 { get; set; }
        //public string HSN { get; set; }
        public string GST { get; set; }
        public string Amount { get; set; }

    }
    public class BankDetails
    {
        public string TaxAmtInWords { get; set; }
        public string BankName { get; set; }
        public string AccNo { get; set; }
        public string Branch { get; set; }
        public string IFSC { get; set; }
        public string Remarks { get; set; }
        public string Remarks1 { get; set; }
        public string Remarks2 { get; set; }
        public string CompanysPAN { get; set; }
    }
    public class TaxDetails
    {
        public string TaxableValue { get; set; }
        public string Rate { get; set; }
        public string Amount { get; set; }
        public string TotalTaxAmount { get; set; }

    }

    public class OneTimeLicenseCost
    {
        public int SlNo { get; set; }
        public string ApplicationName { get; set; }
        public string Date { get; set; }
        public decimal Amount { get; set; }
        public decimal SubTotal { get; set; }
    }

    public class ProductCreation
    {
        public int SlNo { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal Amount { get; set; }
        public decimal SubTotal { get; set; }
    }

    public class PolicyCreation
    {
        public int SlNo { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Amount { get; set; }
        public decimal SubTotal { get; set; }
    }

    public class ClaimIntimation
    {
        public int SlNo { get; set; }
        public string ClaimNo { get; set; }
        public string PolicyNo { get; set; }
        public string ProductName { get; set; }
        public DateTime? LossDate { get; set; }
        public string InsuredName { get; set; }
        public string InsuredRefNo { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal Amount { get; set; }
        public decimal SubTotal { get; set; }

    }

    public class InvoiceSecondPageDetails
    {
        public string Buyer { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime Date { get; set; }
        public decimal Total { get; set; }
        public string Currency { get; set; }
    }
    public static class InvoiceData
    {
        public static InvoiceModel GetInvoiceModel()
        {
            InvoiceModel model = new InvoiceModel();
            model.Invoices = new System.Collections.Generic.List<InvoiceItemsDetails>();
            model.ProductCreation = new System.Collections.Generic.List<ProductCreation>();
            model.PolicyCreation = new System.Collections.Generic.List<PolicyCreation>();
            model.ClaimIntimation = new System.Collections.Generic.List<ClaimIntimation>();

            model.BankDetails = new BankDetails();
            model.BankDetails.Remarks = "Mica servies fees for the period from " +DateTime.Now+"to" + DateTime.Now;
            model.BankDetails.BankName = " Axis Bank - OD A/c 919030017289373 ";
            model.BankDetails.AccNo = " 919030017289373 ";
            model.BankDetails.Branch = "  JP Nagar  ";
            model.BankDetails.IFSC = "   UTIB0000333  ";
            model.BankDetails.CompanysPAN = "AACCI3916L ";

            model.InvoiceItemsModel = new InvoiceItemsModel();
            model.InvoiceItemsModel.InvoiceNo = "18 - 19 / 1000";
            model.InvoiceItemsModel.PODate = "31-Mar-2019";
            model.InvoiceItemsModel.InvoiceDate = "21-Mar-2019";
            model.InvoiceItemsModel.SuppliesrsRef = "FGI/CR";
           // model.InvoiceItemsModel.OthersRef = "Narendra";
            model.InvoiceItemsModel.TermsofDelivery = "As Per SOW";
            model.InvoiceItemsModel.AmountInWords = "Indian Rupees Two Lakh Forty Two Thousand Four Hundred Ninety Only";
            model.InvoiceItemsModel.TotalTaxAmount = 35400;
            model.InvoiceItemsModel.TaxAmount = 5400.00;
            model.InvoiceItemsModel.TotalAmount = 30000.00;
            model.InvoiceItemsModel.GST = "18%";

            model.Address = new Address();
            model.Address.OfficeName = "INUBE SOFTWARE SOLUTIONS PVT LTD ";
            model.Address.AddressLine1 = " #31,2nd Floor, Kothanur Main Road,";
            model.Address.AddressLine2 = "RBI Layout, JP Nagar 7th Phase";
            model.Address.City = "Bangalore 560078";
            model.Address.State = " Karnataka state ";
            model.Address.Code = "29 ";
            model.Address.UIN = " 29AACCI3916L1ZA ";
            model.Address.CIN = " U72200KA2010PTC054801";

            model.BuyersAddress = new BuyersAddress();
            model.BuyersAddress.OthersRef = "spoc name";
            model.BuyersAddress.Buyer = " Future Generali India Insurance Co Ltd";
            model.BuyersAddress.AddressLine1 = "Office No- 4A-2B, 4th Floor,Lake City Centre,";
            model.BuyersAddress.AddressLine2 = " Kapurbawdi Junction Majiwade, Thane West-400607";
            model.BuyersAddress.UIN = "27AABCF0191R2Z8 ";
            model.BuyersAddress.CIN = "U72200KA2010PTC054801";
            model.BuyersAddress.PAN = " AABCF0191R ";
            model.BuyersAddress.State = " Karnataka state ";
            model.BuyersAddress.Code = " 27 ";

            var invoiceItems = new InvoiceItemsDetails();
            invoiceItems.SlNo = 1;
            invoiceItems.ItemDescription1 = "Products    ";
            invoiceItems.ItemDescription2 = "Creation";
            invoiceItems.ItemDescription3 = "(5)";
            invoiceItems.ItemDescription4 = "";

            invoiceItems.GST = "";
            invoiceItems.Amount = "20000.00";
            model.Invoices.Add(invoiceItems);
            invoiceItems = new InvoiceItemsDetails();

            invoiceItems.SlNo = 2;
            invoiceItems.ItemDescription1 = "Policy    ";
            invoiceItems.ItemDescription2 = "Count";
            invoiceItems.ItemDescription3 = "(20)";
            invoiceItems.ItemDescription4 = "";

            invoiceItems.GST = "";
            invoiceItems.Amount = "10000.00";
            model.Invoices.Add(invoiceItems);

            invoiceItems = new InvoiceItemsDetails();

            invoiceItems.SlNo = 3;
            invoiceItems.ItemDescription1 = "GST 18%";
            invoiceItems.ItemDescription2 = "";
            invoiceItems.ItemDescription3 = "";
            invoiceItems.ItemDescription4 = "";

            invoiceItems.GST = "18%";
            invoiceItems.Amount = "5400.00";
            model.Invoices.Add(invoiceItems);

            model.OneTimeLicenseCost = new OneTimeLicenseCost();
            model.OneTimeLicenseCost.SlNo = 1;
            model.OneTimeLicenseCost.ApplicationName = "Mica Services";
            model.OneTimeLicenseCost.Date = "12-11-2019";
            model.OneTimeLicenseCost.Amount = 100000;
            model.OneTimeLicenseCost.SubTotal = 10000;

            var productCreation = new ProductCreation();
            productCreation.SlNo = 1;
            productCreation.ProductCode ="12344";
            productCreation.ProductName ="abcd";
            productCreation.CreatedDate = DateTime.Now;
            productCreation.Amount = 1200;
            model.ProductCreation.Add(productCreation);
            productCreation.SubTotal = 1200;


            var policyCreation = new PolicyCreation();
            policyCreation.SlNo = 1;
            policyCreation.PolicyNo = "123456";
            policyCreation.ProductName = "abcd";
            policyCreation.InsuredName="xyz";
            policyCreation.InsuredRefNo = "xyz123";
            policyCreation.CreatedDate = DateTime.Now;
            policyCreation.Amount = 20000;
            model.PolicyCreation.Add(policyCreation);
            policyCreation.SubTotal = 20000;

            policyCreation = new PolicyCreation();
            policyCreation.SlNo = 2;
            policyCreation.PolicyNo = "4567";
            model.PolicyCreation.Add(policyCreation);

            var claimIntimation = new ClaimIntimation();
            claimIntimation.SlNo = 1;
            claimIntimation.ClaimNo = "123acvb";
            claimIntimation.PolicyNo = "123456";
            claimIntimation.ProductName = "abcd";
            claimIntimation.LossDate = DateTime.Now;
            claimIntimation.InsuredName = "xyz";
            claimIntimation.InsuredRefNo = "xyz123";
            claimIntimation.CreatedDate = DateTime.Now;
            claimIntimation.Amount = 25000;
            claimIntimation.SubTotal = 25000;
            model.ClaimIntimation.Add(claimIntimation);

            model.InvoiceSecondPageDetails = new InvoiceSecondPageDetails();
            model.InvoiceSecondPageDetails.Buyer = "Bill Gates";
            model.InvoiceSecondPageDetails.InvoiceNo = "MICA19-20/107868";
            model.InvoiceSecondPageDetails.FromDate = "12-12-2019";
            model.InvoiceSecondPageDetails.ToDate = "31-01-2020";
            model.InvoiceSecondPageDetails.Currency = "USD";


            return model;

        }
    }
}
