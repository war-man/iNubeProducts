using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using inube.Services.Notification.Controllers.DMS.DMSService;
using inube.Services.Notification.Helpers;
using inube.Services.Notification.Models;
using inube.Services.Notification.Template;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using TemplateDemo.Models;

namespace inube.Services.Notification.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class NotificationsController : BaseApiController
    {
        private readonly IHostingEnvironment _host;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private ICompositeViewEngine _viewEngine;
        private readonly IDMSService _iDMSService;
        private readonly INEmailService _emailNService;
        private readonly ISMSService _smsService;
        public NotificationsController(IDMSService iDMSService, IHostingEnvironment host, IEmailService emailService, IConfiguration configuration, ICompositeViewEngine viewEngine, INEmailService emailNService, ISMSService smsService)
        {
            _host = host;
            _emailService = emailService;
            _configuration = configuration;
            _viewEngine = viewEngine;
            _iDMSService = iDMSService;
            _emailNService = emailNService;
            _smsService = smsService;
        }
		
		 [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }
		
		
        [HttpPost]
        public async Task<IActionResult> SendNotificationAsync([FromBody]Models.NotificationRequest request)
        {
            TemplateController templateController = new TemplateController(_iDMSService, _host, _emailService, _configuration, _viewEngine);
            templateController.ControllerContext = new ControllerContext(ControllerContext);
            if (request.TemplateKey == "PolicyIssue")
            {
                PolicyModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<PolicyModel>(request.NotificationPayload);
                else
                    templateData = GetPolicyModel();
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Policy No {templateData.PolicyNumber} is generated for - {templateData.policyDetails.ProductName} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage of Cover {templateData.productsModel.coverages[0].CoverName} for Cover event {templateData.productsModel.coverages[0].CoverEvent} under Policy No.{templateData.PolicyNumber}", To = templateData.EmailTest.PartnerEmail, IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }
                //Now to get the view data
                PartnerEmail model = new PartnerEmail();
                model.PolicyNo = templateData.PolicyNumber; model.ProductName = templateData.policyDetails.ProductName;
                var viewmsg = await templateController.RenderPartialViewToString("~/views/Template/PolicyIssue.cshtml", model);
                templateData.EmailTest.Message = viewmsg;

                //Sending PDF and mail
                var result = await templateController.PolicyIssueTemplate(templateData);
                if (request.SendSms)
                {
                    SendSMS(request.smsRequest);
                }
            }
            var response = new ResponseStatus() { Status = BusinessStatus.Created };
            return ServiceResponse(response);
        }


   

        [HttpPost]
        public async Task<IActionResult> SendQuestionsNotificationAsync([FromBody]Models.NotificationRequest request)
        {
            TemplateController templateController = new TemplateController(_iDMSService,_host, _emailService, _configuration, _viewEngine);
            templateController.ControllerContext = new ControllerContext(ControllerContext);
            ResponseStatus response = null;
            if (request.TemplateKey == "AptiQuestions")
            {
                QuestionsDetails templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<QuestionsDetails>(request.NotificationPayload);
                else
                    templateData = GetQuestions(1,1);
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Set No {templateData.PaperSetFrom} is generated for - {templateData.PaperSetTo} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage  Policy No.{templateData.PaperSetTo}", To = "ashish.sinha@inubesolutions.com", IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }
               
                //Sending PDF and mail
                templateData.IsAwsS3Save = true;
                TemplateModel templateModel = new TemplateModel();
                templateModel.ViewUrl = "~/views/Template/AptiQuestions.cshtml";
                templateModel.FileName = "QuestionSet" + templateData.AllQuestions[0].QBText + ".pdf";

                // var result = await templateController.AptiQuestionsTemplate(templateData);
                response = await templateController.NotificationTemplate(templateData, templateModel);
            }
            return ServiceResponse(response);
        }


        //Quotation
        [HttpPost]
        public async Task<IActionResult> SendQuotationNotificationAsync([FromBody]Models.NotificationRequest request)
        {
            TemplateController templateController = new TemplateController(_iDMSService,_host, _emailService, _configuration, _viewEngine);
            templateController.ControllerContext = new ControllerContext(ControllerContext);
            ResponseStatus response = null;
            if (request.TemplateKey == "QuotationPdf")
            {
                QuestionsDetails templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<QuestionsDetails>(request.NotificationPayload);
                else
                    templateData = GetQuestions(1, 1);
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n Your Set No {templateData.PaperSetFrom} is generated for - {templateData.PaperSetTo} , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insured coverage  Policy No.{templateData.PaperSetTo}", To = "Ajay.v@inubesolutions.com", IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }

                //Sending PDF and mail
                templateData.IsAwsS3Save = true;
                TemplateModel templateModel = new TemplateModel();
                templateModel.ViewUrl = "~/views/Template/QuotationPdf.cshtml";
                templateModel.FileName = "Quotation.pdf";

                // var result = await templateController.AptiQuestionsTemplate(templateData);
                response = await templateController.NotificationTemplate(templateData, templateModel);
            }
            return ServiceResponse(response);
        }



        //ProductApi
        [HttpPost]
        public async Task<IActionResult> SendProductApiKitNotificationAsync([FromBody]Models.NotificationRequest request)
        {
            TemplateController templateController = new TemplateController(_iDMSService,_host, _emailService, _configuration, _viewEngine);
            templateController.ControllerContext = new ControllerContext(ControllerContext);
            ResponseStatus response = null;
            if (request.TemplateKey == "ProductApi")
            {
                ProductApiModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<ProductApiModel>(request.NotificationPayload);
                else
                    templateData = GetProductApi();
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n ApiKit for Product  has been sent successfully\n\n , find the document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"ProductApiKit", To = "vithal.@inubesolutions.com", IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }

                //Sending PDF and mail
                templateData.IsAwsS3Save = true;
                TemplateModel templateModel = new TemplateModel();
                templateModel.ViewUrl = "~/views/Template/ProductApi.cshtml";
                templateModel.FileName = templateData.PName +"_ProductApiKit.pdf";
                templateModel.ActionType = request.TemplateKey;
                // var result = await templateController.AptiQuestionsTemplate(templateData);
                response = await templateController.NotificationTemplate(templateData, templateModel);
                if (request.SendSms)
                {
                    SendSMS(request.smsRequest);
                }
            }
            return ServiceResponse(response);
        }

        //MultiCover
        [HttpPost]
        public async Task<IActionResult> SendMultiCoverNotificationAsync([FromBody]Models.NotificationRequest request)
        {
            TemplateController templateController = new TemplateController(_iDMSService,_host, _emailService, _configuration, _viewEngine);
            templateController.ControllerContext = new ControllerContext(ControllerContext);
            ResponseStatus response = null;
            if (request.TemplateKey == "InsuranceCertificate")
            {
                InsuranceCertificateModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    try {
                        templateData = JsonConvert.DeserializeObject<InsuranceCertificateModel>(request.NotificationPayload);

                       // var des = (InsuranceCertificateModel)Newtonsoft.Json.JsonConvert.DeserializeObject(request.NotificationPayload, typeof(InsuranceCertificateModel));
                    }
                    catch (Exception)
                    {

                    }
                else
                    templateData = GetInsuranceCertificateModel();
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Insurance Certificate  has been sent successfully\n\n , find the document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insurance Certificate", To = "ashish.sinha@inubesolutions.com", IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }

                //Sending PDF and mail
                templateData.IsAwsS3Save = true;
                TemplateModel templateModel = new TemplateModel();
                templateModel.ViewUrl = "~/views/Template/InsuranceCertificate.cshtml";
                templateModel.FileName = "InsuranceCertificate.pdf";
                templateModel.ActionType = request.TemplateKey;
                // var result = await templateController.AptiQuestionsTemplate(templateData);
                try
                {
                    response = await templateController.NotificationTemplate(templateData, templateModel);
                    if (request.SendSms)
                    {
                        SendSMS(request.smsRequest);
                    }
                }
                catch (Exception)
                {
                }
            }
            return ServiceResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> SendSMSAsync([FromBody]Models.SMSRequest request)
        {
            var response = await _smsService.SendSMS(request,Context);
            return ServiceResponse(response);
        }
        [HttpPost]
        public async Task<IActionResult> SendEmailAsync([FromBody]Models.EmailRequest request)
        {
            var response = await _emailNService.SendEmail(request, Context);
            return ServiceResponse(response);
        }


        [HttpPost]
        public async Task<IActionResult> SendTemplateNotificationAsync([FromBody]Models.NotificationRequest request)
        {
            TemplateController templateController = new TemplateController(_iDMSService,_host, _emailService, _configuration, _viewEngine);
            templateController.ControllerContext = new ControllerContext(ControllerContext);

            dynamic templateData = await GetNotificationModelAsync(request, templateController);
            //Sending PDF and mail
            TemplateModel templateModel = GetTemplateModel(request, templateData);

            // var result = await templateController.AptiQuestionsTemplate(templateData);
            ResponseStatus response = await templateController.NotificationTemplate(templateData, templateModel);
            if (request.SendSms)
            {
                SendSMS(request.smsRequest);
            }
            return ServiceResponse(response);
        }

        private void SendSMS(Models.SMSRequest SMSDTO)
        {

            SMSDTO.APIKey = "6nnnnyhH4ECKDFC5n59Keg";
            SMSDTO.SenderId = "SMSTST";
            SMSDTO.Channel = "2";
            //SMSDTO.PolicyNumber = templateData.PolicyNumber;
            //SMSDTO.RecipientNumber = "7019834299";

            // SMSDTO.SMSMessage = "Dear Customer, Your Insurance Policy transaction has been successful. Your Policy No " + SMSDTO.PolicyNumber + "is generated and Policy Link http://bit.ly/2Y9eAZV and Claims http://bit.ly/33EQvLz ";

            var SMSAPI = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=6nnnnyhH4ECKDFC5n59Keg&senderid=SMSTST&channel=2&DCS=0&flashsms=0&number=91" + SMSDTO.RecipientNumber + "&text=" + SMSDTO.SMSMessage;



            var client = new WebClient();
            var content = client.DownloadString(SMSAPI);
        }
        private async Task<dynamic> GetNotificationModelAsync(Models.NotificationRequest request, TemplateController templateController)
        {
            if (request.TemplateKey == "AptiQuestions")
            {
                QuestionsDetails templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<QuestionsDetails>(request.NotificationPayload);
                else
                    templateData = GetQuestions(1, 1);
                if (templateData.EmailTest == null)
                {
                    templateData.EmailTest = GetDefaultEmailRequest();
                }
                return templateData;
            }
            if (request.TemplateKey == "PolicyIssue")
            {
                PolicyModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<PolicyModel>(request.NotificationPayload);
                else
                    templateData = GetPolicyModel();
                if (templateData.EmailTest == null)
                {
                    templateData.EmailTest = GetDefaultEmailRequest();
                    //Now to get the view data
                    PartnerEmail model = new PartnerEmail();
                    model.PolicyNo = templateData.PolicyNumber; model.ProductName = templateData.policyDetails.ProductName;
                    var viewmsg = await templateController.RenderPartialViewToString("~/views/Template/PolicyIssue.cshtml", model);
                    templateData.EmailTest.Message = viewmsg;
                }
                return templateData;
            }

            if (request.TemplateKey == "QuotationPdf")
            {
                QuotationModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<QuotationModel>(request.NotificationPayload);
                else
                    templateData = GetQuotation();
                if (templateData.EmailTest == null)
                {
                    templateData.EmailTest = GetDefaultEmailRequest();
                    //QuotationModel model = new QuotationModel();
                    //EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Policy created with policy number 0204/0345/0319/00/000", Subject = $"Insured coverage of Cover for Cover event under Policy No.0204/0345/0319/00/000", To = "vithal@inubesolutions.com" };
                    //model.EmailTest = emailTest;
                    //return templateData;
                }
                return templateData;
            }
            if (request.TemplateKey == "Invoice")
            {
                InvoiceModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<InvoiceModel>(request.NotificationPayload);
                else
                    templateData = InvoiceData.GetInvoiceModel(); ;
                if (templateData.EmailTest == null)
                {
                    templateData.EmailTest = GetDefaultEmailRequest();
                }
                return templateData;
            }
            if (request.TemplateKey == "InsuranceCertificate")
            {
                InsuranceCertificateModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<InsuranceCertificateModel>(request.NotificationPayload);
                else
                    templateData = GetInsuranceCertificateModel();
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Insurance Certificate  has been sent successfully\n\n , find the document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Insurance Certificate", To = "ashish.sinha@inubesolutions.com", IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }
                return templateData;
            }
            if (request.TemplateKey == "ProductApi")
            {
                ProductApiModel templateData = null;
                if (!string.IsNullOrEmpty(request.NotificationPayload))
                    templateData = JsonConvert.DeserializeObject<ProductApiModel>(request.NotificationPayload);
                else
                    templateData = GetProductApi();
                if (templateData.EmailTest == null)
                {
                    EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n ApiKit for Product  has been sent successfully\n\n , find the document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"ProductApiKit", To = "ashish.sinha@inubesolutions.com", IsAttachment = true };
                    templateData.EmailTest = emailTest;
                }
                return templateData;
            }
                return null;
        }

        private dynamic GetTemplateModel(Models.NotificationRequest request,dynamic model)
        {
            TemplateModel templateModel = new TemplateModel();
            if (request.TemplateKey == "AptiQuestions")
            {
                templateModel.ViewUrl = "~/views/Template/AptiQuestions.cshtml";
                templateModel.FileName = "QuestionSet_" + model.AllQuestions[0].QBText + ".pdf";
            }
            if (request.TemplateKey == "Invoice")
            {
                templateModel.ViewUrl = "~/views/Template/TaxInvoice.cshtml";
                templateModel.FileName = "Invoice_" + model.InvoiceItemsModel.InvoiceNo + ".pdf";
            }
            if (request.TemplateKey == "PolicyIssue")
            {
                templateModel.ViewUrl = "~/views/Template/PolicyIssueTemplate.cshtml";
                templateModel.FileName = "Policy_" + model.policyDetails.PolicyNumber + ".pdf";
            }
            if (request.TemplateKey == "QuotationPdf")
            {
                templateModel.ViewUrl = "~/views/Template/QuotationPdf.cshtml";
                templateModel.FileName = "Quotation.pdf";
            }
            if (request.TemplateKey == "InsuranceCertificate")
            {
                templateModel.ViewUrl = "~/views/Template/InsuranceCertificate.cshtml";
                templateModel.FileName = "InsuranceCertificate_" + model.policyDeatils.PolicyNumber + ".pdf";
            }
            if (request.TemplateKey == "ProductApi")
            {
                templateModel.ViewUrl = "~/views/Template/ProductApi.cshtml";
                templateModel.FileName = model.PName + "_ProductApiKit.pdf";
            }
            templateModel.AttachPDF = request.AttachPDF;
            templateModel.SendEmail = request.SendEmail;
            templateModel.SendSms = request.SendSms;
            templateModel.StorageName = request.StorageName;
            templateModel.IsAwsS3Save = request.IsAwsS3Save;
            templateModel.IsAzureBlobSave = request.IsAzureBlobSave;
            templateModel.ActionType = request.TemplateKey;

            return templateModel;
        }
        private PolicyModel GetPolicyModel1()
        {
            PolicyModel model = new PolicyModel();
            model.Date = DateTime.Now;


            //organization
            model.organization = new Organization();
            model.organization.ContactName = "Ashish";
            model.organization.PhoneNumber = "9972809894";
            model.organization.EmailAddress = "Ashish@gmail.com";
            model.organization.Address = "JP NAGAR";

            //customer
            model.customer = new Customer();
            model.customer.ContactName = "XYZ";
            model.customer.PhoneNumber = "8872809894";
            model.customer.EmailAddress = "Xyz@gmail.com";
            model.customer.Address = "RR NAGAR";

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
            model.productsModel.benifits.Add(benifits);

            model.EmailTest = new EmailRequest();
            model.EmailTest.IsAttachment = true;
            model.EmailTest.Message = "Policy Created";
            model.EmailTest.PartnerEmail = "ashish.sinha@inubesolutions.com";
            model.EmailTest.Subject = "Policy Created";
            model.EmailTest.To = "ashish.sinha@inubesolutions.com";
            model.PolicyNumber = "0204/0332/1046355873/00/111";
            return model;
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

            //Premium 
            model.productsModel.premium.Add(new PremiumDetails { BasePremium = 100.ToString(), GST = 0.ToString(), TotalPremium = 100.ToString() });

            model.productsModel.CWEdetails.Add(@"Repatriation of Mortal Remains:The Insurer shall , in the event of death of the Insured person, pay or reimburse, the costs of transporting the mortal remains<br />
                of the deceased Insured person back to the Republic of India or, upto an equivalent amount , for a local burial or cremation in the country where the death < br />
               occurred, subject to the maximum limit as specified in the Schedule to this Policy as a result of illness / disease or injury, manifesting itself first during the insured journey.");
            model.productsModel.CWEdetails.Add(@"Discover test:The Insurer shall , in the event of death of the Insured person, pay or reimburse, the costs of transporting the mortal remains<br />
                of the deceased Insured person back to the Republic of India or, upto an equivalent amount , for a local burial or cremation in the country where the death < br />
               occurred, subject to the maximum limit as specified in the Schedule to this Policy as a result of illness / disease or injury, manifesting itself first during the insured journey.");

            model.EmailTest = new EmailRequest();
            model.EmailTest.IsAttachment = true;
            model.EmailTest.Message = "Policy Created";
            model.EmailTest.PartnerEmail = "ashish.sinha@inubesolutions.com";
            model.EmailTest.Subject = "Policy Created";
            model.EmailTest.To = "ravi@inubesolutions.com";
            model.PolicyNumber = "0204/0332/1046355873/00/111";
            return model;
        }
        [HttpGet]
        public IActionResult GetQuestionList()
        {
            QuestionHelper questionHelper = new QuestionHelper();
            var response = questionHelper.GetQuestionList(1, 1);
            return ServiceResponse(response);
        }

        [HttpGet]
        private QuestionsDetails GetQuestions(decimal PaperSetFrom, decimal PaperSetTo)
        {
            QuestionHelper questionHelper = new QuestionHelper();
            //Controllers.QuestionsDetails questionsDetails;
            var model = questionHelper.GetQuestionList(1, 1);
            return model;


            //return questionsDetails;
        }

        private QuotationModel GetQuotation()
        {
            QuotationModel model = new QuotationModel();


            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Policy created with policy number 0204/0345/0319/00/000", Subject = $"Insured coverage of Cover for Cover event under Policy No.0204/0345/0319/00/000", To = "vithal@inubesolutions.com" };
            model.EmailTest = emailTest;
            return model;
        }

        //ProductApiKit
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
            dataParams.DataType = "int";
            dataParams.Field = "PartnerId"; ;
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
            sampleCallModel.ProposerName = " two";
            methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(sampleCallModel, Formatting.Indented);
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
            dataParams.DataType = "int";
            dataParams.Field = "ProductId";
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
            dataParams.DataType = "varchar";
            dataParams.Field = "PartnerId";
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


            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"ProductApiKit for Mica Services", Subject = $"ApiKit for Product", To = "ashish.sinha@inubesolutions.com" };
            model.EmailTest = emailTest;
            // return model;



            return model;
        }

        //MuliCover
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

            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"Insurance Certificate for Mica has been geerated Successfully", Subject = $"Insurance Certificate", To = "ashish.sinha@inubesolutions.com" };
            model.EmailTest = emailTest;

            return model;
        }
        private EmailRequest GetDefaultEmailRequest()
        {
            EmailRequest emailTest = new EmailRequest() { Message = $"Dear Customer,\n\n Your Insurance Policy transaction has been successful.\n\n , find the Policy \n schedule document attached.\n Assuring you the best of services always.\n\n Regards,\n Team MICA ", Subject = $"Test Email from MICA", To = "ashish.sinha@inubesolutions.com", IsAttachment = true };
            return emailTest;
        }


    }
}