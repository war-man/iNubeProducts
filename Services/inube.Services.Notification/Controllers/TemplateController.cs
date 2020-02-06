using inube.Services.Notification.Controllers;
using inube.Services.Notification.Helpers;
using inube.Services.Notification.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Rotativa.AspNetCore;
using Rotativa.AspNetCore.Options;
using System;
using System.IO;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using TemplateDemo.Models;

namespace inube.Services.Notification.Template
{
    public class TemplateController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private ICompositeViewEngine _viewEngine;
        private string number;

        public TemplateController(IHostingEnvironment host, IEmailService emailService, IConfiguration configuration, ICompositeViewEngine viewEngine)
        {
            _viewEngine = viewEngine;
            _host = host;
            _emailService = emailService;
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> EmailPatner(PartnerEmail partnerEmail)
        {
            //PolicyModel model = GetPolicyModel();
            //var response = RenderPartialViewToString("PolicyTemplate", model);
            //// the base URL to resolve relative images and css
            ////String thisPageUrl = this.ControllerContext.HttpContext.Request.Url.AbsoluteUri;
            ////String baseUrl = thisPageUrl.Substring(0, thisPageUrl.Length -"Home/ConvertThisPageToPdf".Length);
            //byte[] bytes1 = Encoding.UTF8.GetBytes(response.Result);
            //byte[] bytes = ToByteArray(response.Result);

            //TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
            //await templateHelper.ProcessNotificationAsync(bytes1, model);
            return View(partnerEmail);
        }
        public static byte[] ToByteArray(string value)
        {
            char[] charArr = value.ToCharArray();
            byte[] bytes = new byte[charArr.Length];
            for (int i = 0; i < charArr.Length; i++)
            {
                byte current = Convert.ToByte(charArr[i]);
                bytes[i] = current;
            }

            return bytes;
        }
        private byte[] EncodeToBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }
        public async System.Threading.Tasks.Task<IActionResult> PartnerPDFDownload()
        {
            PartnerEmail model = new PartnerEmail() { PartnerName = "XYZ", PartnerId = "12345", MobileNo = "987675634", Designation = "SE", Website = "www.abc.com" };
            var root = _host.ContentRootPath;
            var wwwroot = _host.WebRootPath;

            var pdfname = String.Format("{0}.pdf", Guid.NewGuid().ToString());
            var path = Path.Combine(wwwroot, "PdfFiles", pdfname);
            path = Path.GetFullPath(path);
            var content = new ViewAsPdf("~/views/Template/EmailPatner.cshtml", model)
            {
                FileName = "Partner" + model.PartnerId + ".pdf",
                PageSize = Size.A4,
                PageOrientation = Orientation.Landscape,
                PageMargins = { Left = 1, Right = 1 },
                //CustomSwitches = string.Format("--footer-html {0} --footer-spacing -10 ", " http://localhost:portnumber/Template/ActionName?number=" + number),
                //SaveOnServerPath = path,
                //PageWidth = 297
                //CustomSwitches="--page-offset 0 --footer-center [page] --footer-font-size 8"

            };
            var binary = await content.BuildFile(ControllerContext);
            TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
            //await templateHelper.ProcessNotificationAsync(binary);
            // File.WriteAllBytes(@"C:\testpdf.pdf", binary);
            return content;
        }


        public IActionResult PartnerPDFView()
        {
            PartnerEmail model = new PartnerEmail() { PartnerName = "XYZ", PartnerId = "123", MobileNo = "987675634", Designation = "SE", Website = "www.abc.com" };
            return new ViewAsPdf("~/views/Template/EmailPatner.cshtml", model);
        }

        public IActionResult CreateUser(PartnerEmail model)
        {
            return View(model);
        }
        public IActionResult Partner(PartnerEmail model)
        {
            return View(model);
        }
        public IActionResult PolicyIssue(PartnerEmail model)
        {
            return View(model);
        }
        public IActionResult TestEmail()
        {
            PartnerEmail model = new PartnerEmail() { PolicyNo = "11000011", ProductCode = "P123", ProductName = "MICA", PartnerCode = "ABC123", PartnerName = "QWERTY" };
            return View(model);
        }

        public IActionResult ProductApi()
        {
            ProductApiModel model = GetProductApi();
                  return View(model);
        }
        //public IActionResult AptiQuestions()
        //{
        //    //AptiQuestionsModel model = GetAptiQuestions();
        //    QuestionsDetails model = GetQuestions();

        //    return View(model);
        //}
        //public IActionResult AptiQuestions()
        //{
        //    AptiQuestionsModel model = new AptiQuestionsModel();
        //    //AptiQuestionsModel model = GetAptiQuestions();
        //    return View(model);
        //}
        public IActionResult AptiQuestions()

        {

            //AptiQuestionsModel model = GetAptiQuestions();

            var model = GetQuestions(1, 1);



            return View(model);

            //var content = new ViewAsPdf("~/views/Template/AptiQuestions.cshtml", model)

            //{

            //    FileName = "QuestionSet" + model.AllQuestions[0].QBText + ".pdf",

            //    PageSize = Size.A4,

            //    PageOrientation = Orientation.Portrait,

            //    PageMargins = { Left = 1, Right = 1 },

            //    //SaveOnServerPath = path,

            //    //PageWidth = 297

            //};

            //return content;

        }

        public IActionResult PolicyTemplate()
        {
            PolicyModel model = GetPolicyModel();
            //var content = new ViewAsPdf("~/views/Template/PolicyTemplate.cshtml", model)
            //{
            //    FileName = "Partner" + model.policyDetails.PartnerName + ".pdf",
            //    PageOrientation = Orientation.Portrait,
            //    PageMargins = { Left = 1, Right = 1 },
            //    //SaveOnServerPath = path,
            //    //PageWidth = 297
            //};
            return View(model);
            //return content;
        }
        
        public IActionResult QuotationPdf(string proposerName)
        {
            QuotationModel model = GetQuotation();
           
            //var content = new ViewAsPdf("~/views/Template/QuotationPdf.cshtml", model)
            //{
            //    FileName = "Partner.pdf",
            //    PageSize = Size.A4,
            //    PageOrientation = Orientation.Portrait,
            //    PageMargins = { Left = 1, Right = 1 },
            
            //};

            //return View(model);
            return View(model);
        }
        public async System.Threading.Tasks.Task<IActionResult> PolicyIssueTemplate(PolicyModel model)
        {
            //policy model
            if (model.customer == null)
            {
                model = GetPolicyModel();
            }
            var content = new ViewAsPdf("~/views/Template/PolicyIssueTemplate.cshtml", model)
            {
                FileName = "Partner" + model.policyDetails.PartnerName + ".pdf",
                PageSize = Size.A4,
                PageOrientation = Orientation.Portrait,
                PageMargins = { Left = 1, Right = 1 },
                //SaveOnServerPath = path,
                //PageWidth = 297
            };
            if (ControllerContext.ActionDescriptor != null)
            {
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                await templateHelper.ProcessNotificationAsync(model.PolicyNumber, binary, model.EmailTest);
            }
            else
            {
                //ControllerContext controllerContext = new ControllerContext(
                //new ActionContext(ControllerContext.HttpContext, new RouteData(), new ControllerActionDescriptor()) );
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                await templateHelper.ProcessNotificationAsync(model.PolicyNumber, binary, model.EmailTest);
            }
            // File.WriteAllBytes(@"C:\testpdf.pdf", binary);
            return content;
        }


        public async System.Threading.Tasks.Task<IActionResult> AptiQuestionsTemplate(QuestionsDetails model)
        {

            if (model.AllQuestions.Count <= 0)
            {
                model = GetQuestions(model.PaperSetFrom, model.PaperSetTo);
            }
            var content = new ViewAsPdf("~/views/Template/AptiQuestions.cshtml", model)
            {
                FileName = "QuestionSet" + model.AllQuestions[0].QBText + ".pdf",
                PageSize = Size.A4,
                PageOrientation = Orientation.Portrait,
                PageMargins = { Left = 1, Right = 1 },
                //SaveOnServerPath = path,
                //PageWidth = 297
            };
            if (ControllerContext.ActionDescriptor != null)
            {
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                if (model.IsAwsS3Save)
                {
                    FileUploadDTO fileUploadDTO = new FileUploadDTO() { FileData = binary, FileExtension = "PDF", FileName = content.FileName, ContentType = MediaTypeNames.Application.Pdf };
                    await AwsHelper.UploadObject(fileUploadDTO);
                }
                await templateHelper.ProcessQuestionsNotificationAsync(model.AllQuestions[0].QBText, binary, model.EmailTest);
            }
            else
            {
                //ControllerContext controllerContext = new ControllerContext(
                //new ActionContext(ControllerContext.HttpContext, new RouteData(), new ControllerActionDescriptor()) );
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                if (model.IsAwsS3Save)
                {
                    FileUploadDTO fileUploadDTO = new FileUploadDTO() { FileData = binary, FileExtension = "PDF", FileName = content.FileName, ContentType = MediaTypeNames.Application.Pdf };
                    await AwsHelper.UploadObject(fileUploadDTO);
                }
                await templateHelper.ProcessQuestionsNotificationAsync(model.AllQuestions[0].QBText, binary, model.EmailTest);
            }
            // File.WriteAllBytes(@"C:\testpdf.pdf", binary);
            return content;
            //return null; 
        }

        //Quotation
        public async System.Threading.Tasks.Task<IActionResult> QuotationTemplate(QuotationModel model)
        {
            model = GetQuotation();
            var content = new ViewAsPdf("~/views/Template/QuotationPdf.cshtml", model)
            {
                FileName = "Quotation.pdf",
                PageSize = Size.A4,
                PageOrientation = Orientation.Portrait,
                PageMargins = { Left = 1, Right = 1 },
                //SaveOnServerPath = path,
                //PageWidth = 297
            };
            if (ControllerContext.ActionDescriptor != null)
            {
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                if (model.IsAwsS3Save)
                {
                    FileUploadDTO fileUploadDTO = new FileUploadDTO() { FileData = binary, FileExtension = "PDF", FileName = content.FileName, ContentType = MediaTypeNames.Application.Pdf };
                    await AwsHelper.UploadObject(fileUploadDTO);
                }
                await templateHelper.ProcessQuotationNotificationAsync(binary, model.EmailTest);
            }
            else
            {
                //ControllerContext controllerContext = new ControllerContext(
                //new ActionContext(ControllerContext.HttpContext, new RouteData(), new ControllerActionDescriptor()) );
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                if (model.IsAwsS3Save)
                {
                    FileUploadDTO fileUploadDTO = new FileUploadDTO() { FileData = binary, FileExtension = "PDF", FileName = content.FileName, ContentType = MediaTypeNames.Application.Pdf };
                    await AwsHelper.UploadObject(fileUploadDTO);
                }
                await templateHelper.ProcessQuotationNotificationAsync(binary, model.EmailTest);
            }
            // File.WriteAllBytes(@"C:\testpdf.pdf", binary);
            return content;
            //return null; 
        }


        //ProductApikit
        public async System.Threading.Tasks.Task<IActionResult> ProductApiKit(ProductApiModel model)
        {

            model = GetProductApi();
            var content = new ViewAsPdf("~/views/Template/ProductApi.cshtml", model)
            {
                FileName = "ProductApiKit.pdf",
                PageSize = Size.A4,
                PageOrientation = Orientation.Portrait,
                PageMargins = { Left = 1, Right = 1 },
                //SaveOnServerPath = path,
                //PageWidth = 297
            };
            if (ControllerContext.ActionDescriptor != null)
            {
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                await templateHelper.ProcessProductApiKitNotificationAsync(binary, model.EmailTest);
            }
            else
            {
                //ControllerContext controllerContext = new ControllerContext(
                //new ActionContext(ControllerContext.HttpContext, new RouteData(), new ControllerActionDescriptor()) );
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                await templateHelper.ProcessProductApiKitNotificationAsync(binary, model.EmailTest);
            }
            // File.WriteAllBytes(@"C:\testpdf.pdf", binary);
            return content;
        }


        public async System.Threading.Tasks.Task<IActionResult> InsCertificateMultiCover(InsuranceCertificateModel model)
        {

            model = GetInsuranceCertificateModel();
            var content = new ViewAsPdf("~/views/Template/InsuranceCertificate.cshtml", model)
            {
                FileName = "Insurancertificate.pdf",
                PageSize = Size.A4,
                PageOrientation = Orientation.Portrait,
                PageMargins = { Left = 1, Right = 1 },
                //SaveOnServerPath = path,
                //PageWidth = 297
            };
            if (ControllerContext.ActionDescriptor != null)
            {
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                await templateHelper.ProcessMultiCoverNotificationAsync(binary, model.EmailTest);
            }
            else
            {
                //ControllerContext controllerContext = new ControllerContext(
                //new ActionContext(ControllerContext.HttpContext, new RouteData(), new ControllerActionDescriptor()) );
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                await templateHelper.ProcessMultiCoverNotificationAsync(binary, model.EmailTest);
            }
            // File.WriteAllBytes(@"C:\testpdf.pdf", binary);
            return content;
        }

        public IActionResult TaxInvoice()
        {
            InvoiceModel model = InvoiceData.GetInvoiceModel();
            return View(model);
        }

        public IActionResult InsuranceCertificate()
        {
            InsuranceCertificateModel model = GetInsuranceCertificateModel();
            return View(model);
        }

        public async System.Threading.Tasks.Task<ResponseStatus> NotificationTemplate(dynamic model, TemplateModel templateModel)
        {
            var content = new ViewAsPdf(templateModel.ViewUrl, model)
            {
                FileName = templateModel.FileName,
                PageSize = Size.A4,
                PageOrientation = Orientation.Portrait,
                PageMargins = { Left = 1, Right = 1 },
            };
            if (ControllerContext.ActionDescriptor != null)
            {
                var binary = await content.BuildFile(ControllerContext);
                TemplateHelper templateHelper = new TemplateHelper(_emailService, _configuration);
                if (templateModel.IsAwsS3Save)
                {
                    FileUploadDTO fileUploadDTO = new FileUploadDTO() { FileData = binary, FileExtension = "PDF", FileName = content.FileName, ContentType = MediaTypeNames.Application.Pdf };
                    await AwsHelper.UploadObject(fileUploadDTO);
                }
                if (templateModel.ActionType == "AptiQuestions")
                {
                    await templateHelper.ProcessQuestionsNotificationAsync(model.AllQuestions[0].QBText, binary, model.EmailTest);

                }
                if (templateModel.ActionType == "PolicyIssue")
                {
                    await templateHelper.ProcessNotificationAsync(model.PolicyNumber, binary, model.EmailTest);
                }
                if (templateModel.ActionType == "Invoice")
                {
                    await templateHelper.ProcessQuestionsNotificationAsync(templateModel.FileName, binary, model.EmailTest);
                }
                if (templateModel.ActionType == "QuotationPdf")
                {
                    await templateHelper.ProcessQuotationNotificationAsync(binary, model.EmailTest);
                }
                if (templateModel.ActionType == "ProductApi")
                {
                    await templateHelper.ProcessNotificationEmailAsync(templateModel.FileName, binary, model.EmailTest);
                }
                if (templateModel.ActionType == "InsuranceCertificate")
                {
                    await templateHelper.ProcessNotificationEmailAsync(templateModel.FileName, binary, model.EmailTest);
                }
                return new ResponseStatus() { Status = BusinessStatus.Created, MessageKey = content.FileName };
            }
            return new ResponseStatus() { Status = BusinessStatus.Error };
        }
        private PolicyModel GetPolicyModel()
        {
            PolicyModel model = new PolicyModel();
            model.Date = DateTime.Now;


            //organization
            model.organization = new Organization();
            model.organization.ContactName = "ABC";
            model.organization.PhoneNumber = "9972809894";
            model.organization.EmailAddress = "Abc@gmail.com";
            model.organization.Address = "JP NAGAR";

            //customer
            model.customer = new Customer();
            model.customer.ContactName = "XYZ";
            model.customer.PhoneNumber = "8872809894";
            model.customer.EmailAddress = "Xyz@gmail.com";
            model.customer.Address = "JP NAGAR";

            //policydetails
            model.policyDetails = new PolicyDetails();
            model.policyDetails.PolicyNumber = "000001234";
            model.policyDetails.PolicyStartDate = "09/06/2019";
            model.policyDetails.PolicyEndDate = "08/06/2020";
            model.policyDetails.ProductName = "TAXI RIDE";
            model.policyDetails.PartnerName = "UBER";


            //Product Model
            model.productsModel = new ProductsModel();

            //CoverageDetails 
            CoverageDetails coverageDetails = new CoverageDetails();

            coverageDetails.CoverName = "ACCIDENTAL DEATH";
            coverageDetails.CoverEvent = "RIDE BOOKING";
            coverageDetails.CoverEventFactor = "DISTANCE-KM'S";
            coverageDetails.CoverEventFactorValue = "PER 5 KM'S";
            coverageDetails.From = "1";
            coverageDetails.To = "10";
            model.productsModel.coverages.Add(coverageDetails);

            //benifits
            Benifits benifits = new Benifits();
            benifits.BenifitCriteria = "PER KM";
            benifits.BenifitCriteriaValue = "PER 5 KMS";
            benifits.From = "1";
            benifits.To = "10.4";
            //benifits.Amount = "20,000";
            benifits.Amount = "30,000";
            BenifitRangeDetails benifitRangeDetails = new BenifitRangeDetails();
            benifitRangeDetails.FromValue = 1;
            benifitRangeDetails.ToValue = 100;
            benifitRangeDetails.BenefitAmount = 500;
            benifits.BenifitRangeDetails.Add(benifitRangeDetails);
            benifitRangeDetails = new BenifitRangeDetails();
            benifitRangeDetails.FromValue = 101;
            benifitRangeDetails.ToValue = 500;
            benifitRangeDetails.BenefitAmount = 1000;
            benifits.BenifitRangeDetails.Add(benifitRangeDetails);
            model.productsModel.benifits.Add(benifits);
            benifits.BenifitCriteria = "PER KM";
            benifits.BenifitCriteriaValue = "PER 5 KMS";
            benifits.From = "1";
            benifits.To = "10.4";
            //benifits.Amount = "20,000";
            benifits.Amount = "30,000";


            //Premium 
            model.productsModel.premium.Add(new PremiumDetails { BasePremium = 100.ToString(), GST = 0.ToString(), TotalPremium = 100.ToString() });
            model.productsModel.CWEdetails.Add(@"Repatriation of Mortal Remains:The Insurer shall , in the event of death of the Insured person, pay or reimburse, the costs of transporting the mortal remains<br />
                of the deceased Insured person back to the Republic of India or, upto an equivalent amount , for a local burial or cremation in the country where the death < br />
               occurred, subject to the maximum limit as specified in the Schedule to this Policy as a result of illness / disease or injury, manifesting itself first during the insured journey.");
            model.productsModel.CWEdetails.Add(@"Discover test:The Insurer shall , in the event of death of the Insured person, pay or reimburse, the costs of transporting the mortal remains<br />
                of the deceased Insured person back to the Republic of India or, upto an equivalent amount , for a local burial or cremation in the country where the death < br />
               occurred, subject to the maximum limit as specified in the Schedule to this Policy as a result of illness / disease or injury, manifesting itself first during the insured journey.");


            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Policy created with policy number 0204/0345/0319/00/000", Subject = $"Insured coverage of Cover for Cover event under Policy No.0204/0345/0319/00/000", To = "vithal@inubesolutions.com" };
            model.EmailTest = emailTest;
            return model;
        }

        private AptiQuestionsModel GetAptiQuestions()
        {
            AptiQuestionsModel model = new AptiQuestionsModel();
            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Questions", Subject = $"AptiQuestions", To = "vithal@inubesolutions.com" };
            model.EmailTest = emailTest;
            return model;
        }
        private QuestionsDetails GetQuestions(decimal PaperSetFrom, decimal PaperSetTo)
        {
            QuestionHelper questionHelper = new QuestionHelper();
            //Controllers.QuestionsDetails questionsDetails;
            var model = questionHelper.GetQuestionList(1, 1);
            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"AptitudeQuestionsWithAnswers", Subject = $"AptitudeQuestionsPDF", To = "Ajay.V@inubesolutions.com" };
            model.EmailTest = emailTest;
            return model;


            //return questionsDetails;
        }

        //Quotation
        private QuotationModel GetQuotation()
        {
            QuotationModel model = new QuotationModel();

            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Policy created with policy number 0204/0345/0319/00/000", Subject = $"Insured coverage of Cover for Cover event under Policy No.0204/0345/0319/00/000", To = "vithal@inubesolutions.com" };
            model.EmailTest = emailTest;
            return model;
        }

        public async Task<string> RenderPartialViewToString(string viewName, object model)
        {
            if (string.IsNullOrEmpty(viewName))
                viewName = ControllerContext.ActionDescriptor.ActionName;

            ViewData.Model = model;

            using (var writer = new StringWriter())
            {
                //ViewEngineResult viewResult =
                //    _viewEngine.FindView(ControllerContext, viewName, false);
                ViewEngineResult viewResult = null;

                if (viewName.EndsWith(".cshtml"))
                    viewResult = _viewEngine.GetView(viewName, viewName, false);
                else
                    viewResult = _viewEngine.FindView(ControllerContext, viewName, false);

                ViewContext viewContext = new ViewContext(
                    ControllerContext,
                    viewResult.View,
                    ViewData,
                    TempData,
                    writer,
                    new HtmlHelperOptions()
                );

                await viewResult.View.RenderAsync(viewContext);

                return writer.GetStringBuilder().ToString();
            }
        }

        private InvoiceModel GetInvoiceModel()
        {
            InvoiceModel model = new InvoiceModel();
            model.Invoices = new System.Collections.Generic.List<InvoiceItemsDetails>();
            model.BankDetails = new BankDetails();
            model.BankDetails.Remarks = "Motor Addon for Commercial and Two Wheeler,( Milestone- 1 20% of INR 10,27,500),TW Released to UAT on 31st March 2019";

            model.BankDetails.BankName = " Axis Bank - OD A/c 919030017289373 ";
            model.BankDetails.AccNo = " 919030017289373 ";
            model.BankDetails.Branch = "  JP Nagar  ";
            model.BankDetails.IFSC = "   UTIB0000333  ";
            model.BankDetails.CompanysPAN = "AACCI3916L ";


            model.InvoiceItemsModel = new InvoiceItemsModel();
            model.InvoiceItemsModel.InvoiceNo = "18 - 19 / 1000";
            model.InvoiceItemsModel.InvoiceDate = "31-Mar-2019";
            model.InvoiceItemsModel.SuppliesrsRef = "FGI/CR";
            model.InvoiceItemsModel.PODate = "31-Mar-2019";
            //model.InvoiceItemsModel.OthersRef = "Narendra";
            model.InvoiceItemsModel.TermsofDelivery = "As Per SOW";
            model.InvoiceItemsModel.AmountInWords = "Indian Rupees Two Lakh Forty Two Thousand Four Hundred Ninety Only";
            model.InvoiceItemsModel.TotalTaxAmount = 36990;
            model.InvoiceItemsModel.TaxAmount = 205500.00;
            model.InvoiceItemsModel.GST = "18%";


            model.Address = new Address();
            model.Address.OfficeName = "INUBE SOFTWARE SOLUTIONS PVT LTD ";
            model.Address.AddressLine1 = " #31,2nd Floor, Kothanur Main Road,";
            model.Address.AddressLine2 = "RBI Layout, JP Nagar 7th Phase";
            model.Address.City = "Bangalore 560078";
            model.Address.State = " Karnataka state ";
            model.Address.Code = "29 ";

            model.BuyersAddress = new BuyersAddress();
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
            invoiceItems.ItemDescription1 = "Revenue-Apps    ";
            invoiceItems.ItemDescription2 = "Motor Addon for Commercial and Two Wheeler";
            invoiceItems.ItemDescription3 = "(Milestone- 1 20% of INR 10,27,500)";
            invoiceItems.ItemDescription4 = "TW Released to UAT on 31st March 2019";

            invoiceItems.GST = "18%";
            invoiceItems.Amount = "2,05,500.00";
            model.Invoices.Add(invoiceItems);



            return model;

        }
        private ProductApiModel GetProductApi()
        {
            ProductApiModel model = new ProductApiModel();
            model.PName = "MICA";

            ApiMethods apiMethod = new ApiMethods();
            apiMethod.SLNo = "1";
            apiMethod.methodName = "CreatePolicy";
            model.numberOfApi.Add(apiMethod);

            MethodsCall methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
           
            SampleCallModel sampleCallModel = new SampleCallModel();
            sampleCallModel.PolicyDate = DateTime.Now;
            sampleCallModel.ProductID = 317;
            sampleCallModel.ProposerName = " one";
            methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(sampleCallModel, Formatting.Indented);


            URLLinkModel model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CreatePolicy";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CreatePolicy";
            methodsCall.uRLLinkModels.Add(model1);
            //model.methodsCalls.Add(methodsCall);
            
            MethodTypeModel methodTypeModel = new MethodTypeModel();
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);
            
            UrlParams urlParams = new UrlParams();
            urlParams.ParamsType = "abc";
            methodsCall.urlParams.Add(urlParams);
                        
            DataParams dataParams = new DataParams();
            dataParams.DataType="Int";
            dataParams.Field="partnerId";
            dataParams.IsRequired = "true";
            dataParams.Description = "this is partnerId";
           
            methodsCall.dataParams.Add(dataParams);

           dataParams = new DataParams();
            dataParams.DataType="Int";
            dataParams.Field="productId";
            dataParams.IsRequired = "false";
            dataParams.Description = "this is productId";
            methodsCall.dataParams.Add(dataParams);

            Response response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            //Response resp = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);

          
            apiMethod = new ApiMethods();
            apiMethod.SLNo = "2";
            apiMethod.methodName = "IntimateClaim";
            model.numberOfApi.Add(apiMethod);

            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            sampleCallModel = new SampleCallModel();
          
            sampleCallModel.PolicyDate = DateTime.Now;
            sampleCallModel.ProductID = 318;
            sampleCallModel.ProposerName =" two";
            methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(sampleCallModel,Formatting.Indented);
            model1 = new URLLinkModel();
            model1.TestLink = "Test :https://inubeservicesclaims.azurewebsites.net/api/Claims/CreateClaim";
            model1.ProductionLink = "https://inubeservicesclaims.azurewebsites.net/api/Claims/CreateClaim";
            methodsCall.uRLLinkModels.Add(model1);
            model.methodsCalls.Add(methodsCall);


            methodTypeModel = new MethodTypeModel();
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            //model.methodsCalls.Add(methodsCall);

            urlParams = new UrlParams();
            urlParams.ParamsType = "def";
            methodsCall.urlParams.Add(urlParams);
            //model.methodsCalls.Add(methodsCall);

            dataParams = new DataParams();
            dataParams.DataType = "Int";
            dataParams.Field = "partnerId";
            dataParams.IsRequired = "true";
            dataParams.Description = "this is partnerId";

            methodsCall.dataParams.Add(dataParams);

            dataParams = new DataParams();
            dataParams.DataType = "Int";
            dataParams.Field = "productId";
            dataParams.IsRequired = "false";
            dataParams.Description = "this is productId";
            methodsCall.dataParams.Add(dataParams);

            response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            response = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);


            apiMethod = new ApiMethods();
            apiMethod.SLNo = "3";
            apiMethod.methodName = "Update Policy for Endorsement";
            model.numberOfApi.Add(apiMethod);

            
            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            sampleCallModel = new SampleCallModel();
           
            sampleCallModel.PolicyDate = DateTime.Now;
            sampleCallModel.ProductID = 319;
            sampleCallModel.ProposerName = " three";
            methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(sampleCallModel, Formatting.Indented);

            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CreatePolicy";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CreatePolicy";
            methodsCall.uRLLinkModels.Add(model1);

            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            //model.methodsCalls.Add(methodsCall);


            urlParams = new UrlParams();
            urlParams.ParamsType = "xyz";
            methodsCall.urlParams.Add(urlParams);
            //model.methodsCalls.Add(methodsCall);



            dataParams = new DataParams();
            dataParams.DataType = "Int";
            dataParams.Field = "partnerId";
            dataParams.IsRequired = "true";
            dataParams.Description = "this is partnerId";

            methodsCall.dataParams.Add(dataParams);

            dataParams = new DataParams();
            dataParams.DataType = "Int";
            dataParams.Field = "productId";
            dataParams.IsRequired = "false";
            dataParams.Description = "this is productId";
            methodsCall.dataParams.Add(dataParams);

            response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            response = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);

            model.methodsCalls.Add(methodsCall);


            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"ProductApiKit for Inube's Mica Services", Subject = $"ApiKit for Product", To = "brajesh.kumar@inubesolutions.com" };
            model.EmailTest = emailTest;



            return model;
        }
        private InsuranceCertificateModel GetInsuranceCertificateModel()
        {
            InsuranceCertificateModel model = new InsuranceCertificateModel();
            //model.cweDetails = new System.Collections.Generic.List<CweDetails>();
            model.cweproductDetails = new System.Collections.Generic.List<CweProductDetails>();
            model.Date = DateTime.Now;
            //INSURER DETAILS
            model.InsurerDetails = new InsurerDetails();
            model.InsurerDetails.ContactName = "abcxyz";
            model.InsurerDetails.EmailAddress = "vithal@inubesolutions.com";
            model.InsurerDetails.PhoneNumber = "8867593841";

            //OFFICE ADDRESS
            model.officeAddress = new OfficeAddress();
            model.officeAddress.CompanyName = "iNube Software Solutions Pvt Ltd.";
            model.officeAddress.AddressLine1 = "JP NAGAR";
            model.officeAddress.AddressLine2 = "ABOVE AXIS BANK";
            model.officeAddress.City = "BANGLORE";
            model.officeAddress.State = "KARNATAKA";
            model.officeAddress.PinCode = "560002";

            //INSURER ADDRESS
            model.insurerAddress = new InsurerAddress() { AddressLine1 = "JP NAGAR 7TH PHASE ", AddressLine2 = "NEAR RBI LAYOUT BIGBAZAR", City = "BANGLORE", State = "KARNATAKA", PinCode = "560012" };

            //INSURED DETAILS
            model.insuredDetails = new InsuredDetails();
            model.insuredDetails.InsuredContactName = "ASDF";
            model.insuredDetails.InsuredEmailAddress = "ASHISH@GMAIL.COM";
            model.insuredDetails.InsuredPhoneNumber = "9876876507";


            //INSURED ADDRESS
            model.insuredAddress = new InsuredAddress();
            model.insuredAddress.AddressLine1 = "KR PURAM";
            model.insuredAddress.AddressLine2 = "NEAR TIN FACTORY";
            model.insuredAddress.City = "BANGLORE";
            model.insuredAddress.State = "KARNATAKA";
            model.insuredAddress.PinCode = "560002";


            //policy details
            model.policyDeatils = new Policydetails();
            model.policyDeatils.PartnerName = "OLA";
            model.policyDeatils.PolicyStartDate = DateTime.Now.ToShortDateString();
            model.policyDeatils.PolicyEndDate = DateTime.Now.AddDays(1).ToShortDateString();
            model.policyDeatils.ProductName = "MICA";
            model.policyDeatils.PolicyNumber = "0001/010/19/00001/00";
            model.policyDeatils.CoverEvent = "OLA TaxiRide";

            //INSURABLE ITEMS DETAILS
            var insurableItemsdetails = new Insurabledetails();
           insurableItemsdetails.NumberOfItems = 3;
           insurableItemsdetails.InsurableItem = "Person";
            //InsurableItemsDetails
            InsurableItemsDetails insurableItemsDetails = new InsurableItemsDetails();
            insurableItemsDetails.Name = "Ashish"; insurableItemsDetails.IdentificationNumber = "111850";
            insurableItemsdetails.lstInsurableItemsDetails.Add(insurableItemsDetails);
            insurableItemsDetails = new InsurableItemsDetails();
            insurableItemsDetails.Name = "Bhavuk"; insurableItemsDetails.IdentificationNumber = "111851";
            insurableItemsdetails.lstInsurableItemsDetails.Add(insurableItemsDetails);
            insurableItemsDetails = new InsurableItemsDetails();
            insurableItemsDetails.Name = "Prashant"; insurableItemsDetails.IdentificationNumber = "111852";
            insurableItemsdetails.lstInsurableItemsDetails.Add(insurableItemsDetails);
            //CoverageDetails 
            Coveragedetails coveragedetails = new Coveragedetails();
            coveragedetails.CoverName = "ACCIDENTAL DEATH";
            coveragedetails.CoverEventFactor = "DISTANCE-KM'S";
            coveragedetails.From = "1";
            coveragedetails.To = "10";
            coveragedetails.BenifitCriteria = "PER-KM";
            coveragedetails.MaxBenifitCriteriaAmount = 1000;
            insurableItemsdetails.coverages.Add(coveragedetails);
            //CoverageDetails
            coveragedetails = new Coveragedetails();
            coveragedetails.CoverName = "HOSPI CASH";
            coveragedetails.CoverEventFactor = "MONTHLY";
            coveragedetails.From = "";
            coveragedetails.To = "";
            coveragedetails.MaxBenifitCriteriaAmount = 2345;
            coveragedetails.MaxBenifitCriteriaValue = "5432";
            coveragedetails.BenifitCriteria = "00";
            insurableItemsdetails.coverages.Add(coveragedetails);
            model.insurableItemsdetails.Add(insurableItemsdetails);
           
            //PREMIUM DETAILS
            model.premiumdetails = new Premiumdetails();
            model.premiumdetails.BasePremium = "1000";
            model.premiumdetails.GST = "10%";
            model.premiumdetails.TotalPremium = "1100";

            //CWE


            CweDetails cweDetails = new CweDetails();
            cweDetails.cweProductDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Discover test:The Insurer shall , in the event of death of the Insured person, pay or reimburse, the costs of transporting the mortal remains<br />
                of the deceased Insured person back to the Republic of India or,
                upto an equivalent amount, for a local burial or cremation in the country where the death < br />
occurred, subject to the maximum limit as specified in the Schedule to this Policy as a result of illness / disease or injury, manifesting itself first during the insured journey." });
            cweDetails.cweProductDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Due care clause: Where this Policy requires Insured to do or not to do something, then the complete satisfaction of that requirement by the Insured or someone claiming on Insured’s behalf is a condition precedent to any obligation under this Policy. If the Insured or someone claiming on Insured’s behalf fails to completely satisfy that requirement, then Insurer may refuse to consider Insured’s claim. Insured will cooperate with Insurer at all times." });
            cweDetails.cweProductDetails.Add(new CweProductDetails { Type = "Warranty", Description = @"First year exclusions: Without derogation from above exclusion 1, during the first year of operation of the insurance cover any Medical Expenses incurred on below treatment of illness. However this exclusion would not be applicable in case of continuous renewal within grace period, up to Sum Insured and/or limit under previous policy." });
            model.cweDetails = cweDetails;

           // cweDetails = new CweDetails();
            CWEInsurableItems cWEInsurableItems = new CWEInsurableItems();
            cWEInsurableItems.InsurableItemName = "Person";
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Treatment taken outside India" });
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Epidemic disease recognized by WHO or Indian government" });
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Exclusion", Description = @"Injury or disease directly or indirectly caused by or contributed to by nuclear weapons/materials." });
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Warranty", Description = @"Treatment for de-addiction from drug or alcohol or other substance" });
            cweDetails.cweinsurableItems.Add(cWEInsurableItems);

            CoverListDetails coverListDetails = new CoverListDetails();
            coverListDetails.CoverName = "Death";
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Outpatient department treatment" });
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Disease / illness or injury whilst performing duties as a serving member of a military or police force." });
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Exclusion", Description = @"Any kind of, surcharges, admission fees / registration charges etc levied by the hospital." });
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Warranty", Description = @"Any travel against the advice of a physician." });
            cWEInsurableItems.cwecoverListDetails.Add(coverListDetails);

            cWEInsurableItems = new CWEInsurableItems();
            cWEInsurableItems.InsurableItemName = "Baggage";
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Venereal disease or any sexually transmitted disease or sickness." });
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Vaccination or inoculation except as part of post-bite treatment for animal bite." });
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Exclusion", Description = @"Any fertility, sub fertility or assisted conception operation or sterilization procedure and related treatment." });
            cWEInsurableItems.cweInsurableDetails.Add(new CweProductDetails { Type = "Warranty", Description = @"Vitamins, tonics, nutritional supplements unless forming part of the treatment for injury or disease as certified by the attending medical practitioner." });
            cweDetails.cweinsurableItems.Add(cWEInsurableItems);

            coverListDetails = new CoverListDetails();
            coverListDetails.CoverName = "Baggage Loss";
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Outpatient department treatment" });
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Disease / illness or injury whilst performing duties as a serving member of a military or police force." });
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Exclusion", Description = @"Any kind of, surcharges, admission fees / registration charges etc levied by the hospital." });
            coverListDetails.cweCoverDetails.Add(new CweProductDetails { Type = "Warranty", Description = @"Any travel against the advice of a physician." });
            cWEInsurableItems.cwecoverListDetails.Add(coverListDetails);

            CWEBenfitDetails cWEBenfitDetails = new CWEBenfitDetails();
            //cWEBenfitDetails.BenifitAmount = 1000;
            cWEBenfitDetails.cweBenefitDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Any form of plastic surgery (unless necessary for the treatment of Illness or accidental bodily injury)." });
            cWEBenfitDetails.cweBenefitDetails.Add(new CweProductDetails { Type = "Clause", Description = @"Treatment by any other system other than modern medicine (also known as Allopathy)." });
            cWEBenfitDetails.cweBenefitDetails.Add(new CweProductDetails { Type = "Exclusion", Description = @"Expenses incurred in connection with rest or recuperation at a spa or health resort, sanatorium, convalescent home or similar institution." });
            cWEBenfitDetails.cweBenefitDetails.Add(new CweProductDetails { Type = "Warranty", Description = @"Disease / illness or injury whilst performing duties as a serving member of a military or police force." });
            coverListDetails.cwebenfitDetails.Add(cWEBenfitDetails);

            PremiumDetail premiumDetail = new PremiumDetail();
            premiumDetail.PremiumLevel = "Benefit";
            premiumDetail.Currency = "USD";
            PremiumLevelDetail premiumLevelDetail = new PremiumLevelDetail();
            premiumLevelDetail.ParticularName = "Insurable Item1";
            PremiumAmount premiumAmount = new PremiumAmount();

            premiumAmount.Amount = 100;
            premiumAmount.Name = "Cover 1 Benefit of Rs 5000";
            premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            premiumAmount = new PremiumAmount();

            premiumAmount.Amount = 50;
            premiumAmount.Name = "Cover 2 Benefit of Rs 4000";
            premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            premiumDetail.lstPremiumAmount.Add(premiumLevelDetail);

            premiumLevelDetail = new PremiumLevelDetail();
            premiumLevelDetail.ParticularName = "Insurable Item2";
            premiumAmount = new PremiumAmount();

            premiumAmount.Amount = 100;
            premiumAmount.Name = "Cover 1 Benefit of Rs 5000";
            premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            premiumAmount = new PremiumAmount();

            premiumAmount.Amount = 50;
            premiumAmount.Name = "Cover 2 Benefit of Rs 4000";
            premiumLevelDetail.lstPremiumAmount.Add(premiumAmount);
            premiumDetail.lstPremiumAmount.Add(premiumLevelDetail);
            model.PremiumDetail = premiumDetail;




            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Insurance Certificate for Mica has been geerated Successfully", Subject = $"Insurance Certificate", To = "vithal@inubesolutions.com" };
            model.EmailTest = emailTest;

            return model;
        }
    }
}