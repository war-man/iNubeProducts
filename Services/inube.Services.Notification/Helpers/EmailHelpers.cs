using inube.Services.Notification.Models;
using iNube.Services.Notification.Controllers.IntegrationServices;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Threading.Tasks;

namespace inube.Services.Notification.Helpers
{
    public class EmailHelpers
    {
        public void TestEmail()
        {
            EmailRequest request = new EmailRequest();
            request.Message = "what Sms Body msg";
            request.Subject = "SubjectLine";
            request.mailTo.Add("ashish.sinha@inubesolutions.com");

        }
    }
    public interface INEmailService
    {
        Task<ResponseStatus> SendEmail(EmailRequest request,ApiContext context);
    }
    public class EmailNService : INEmailService
    {
        private ILoggerManager _logger;
        private readonly IConfiguration _configuration;
        public IIntegrationService _integrationService;
        public EmailNService(IConfiguration configuration, ILoggerManager logger, IIntegrationService integrationService)
        {
            _configuration = configuration;
            _logger = logger;
            _integrationService = integrationService;
        }
        public async Task<ResponseStatus> SendEmail(EmailRequest request, ApiContext context)
        {
            ResponseStatus responseStatus = new ResponseStatus() { Status = BusinessStatus.Ok };
            try
            {
                
                // Call for SMTP Details 
                SMTPModel smtp = new SMTPModel();
                var customerSettings = await  _integrationService.GetCustomerSettings("SMTP", context);
                smtp = GetSMTPModel(customerSettings);
                using (var client = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = smtp.UserName,
                        Password = smtp.Password
                        //Domain= _configuration["Email:EmailDomain"]                      
                    };

                    client.Credentials = credential;
                    client.Host = smtp.HOST;
                    client.Port = Convert.ToInt16(smtp.Port);
                   
                    client.EnableSsl = true;
                    // client.UseDefaultCredentials = false;
                    using (var emailMessage = new MailMessage())
                    {
                        emailMessage.From = new MailAddress(smtp.SenderEmail);
                        foreach (var email in request.mailTo)
                        {
                            emailMessage.To.Add(email);
                        }
                        foreach (var cc in request.mailCc)
                        {
                            emailMessage.CC.Add(cc);
                        }
                        foreach (var bcc in request.mailBcc)
                        {
                            emailMessage.Bcc.Add(bcc);
                        }
                        if (request.Message.EndsWith("</html>"))
                        {
                            emailMessage.IsBodyHtml = true;
                        }
                        emailMessage.Subject = request.Subject;
                        emailMessage.Body = request.Message;
                        if (request.Attachments.Count > 0 && request.IsAttachment)
                        {
                            foreach (var emailAttachment in request.Attachments)
                            {
                                var memStream = new MemoryStream(emailAttachment.FileData);
                                memStream.Position = 0;
                                var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                                var reportAttachment = new Attachment(memStream, contentType);
                                reportAttachment.ContentDisposition.FileName = emailAttachment.FileName;
                                emailMessage.Attachments.Add(reportAttachment);
                            }

                        }
                        client.Send(emailMessage);
                    }
                }
            }
            catch (Exception ex)
            {
                responseStatus.Status = BusinessStatus.Error;
                _logger.LogError(ex,"Notification", "Notifiaction SendEmail Fail-"+request.mailTo[0],null,null, context);
            }
            return responseStatus;
        }

        public delegate void SetMailStatus(decimal communicationID, bool status, string errorMessage);
        public void SendEmail(Email mailDetail, SetMailStatus callBack, int moduleId = 0)
        {
            new System.Threading.Tasks.Task(
                () => {
                    MailResponse resp = SendEmailAsync(mailDetail, moduleId, false);
                    if (callBack != null)
                    {
                        callBack(mailDetail.CommunicationID, resp.status, resp.errorMessage);
                    }
                }
                ).Start();
        }

        private MailResponse SendEmailAsync(Email mailDetail, int moduleId, bool deleteAttachmentsAfterSend = false)
        {
            MailResponse resp = new MailResponse();
            try
            {
                string domainName = _configuration["Email:EmailDomain"];
                string fromEmailID = string.Empty;

                switch (moduleId)
                {

                    //case CrossCutting_Constants.UM_Module:
                    //fromEmailID = ConfigurationManager.AppSettings["FromEmailForUser"].ToString();
                    //    break;
                    //case CrossCutting_Constants.ServiceProviderManagement_Module:
                    //fromEmailID = ConfigurationManager.AppSettings["FromEmailForProvider"].ToString();
                    //    break;
                    //case CrossCutting_Constants.Cashless_Module:
                    //fromEmailID = ConfigurationManager.AppSettings["FromEmailForCashless"].ToString();
                    //    break;
                    //case CrossCutting_Constants.Reimbursement_Module:
                    //fromEmailID = ConfigurationManager.AppSettings["FromEmailForReimbursement"].ToString();
                    //    break;
                    //case CrossCutting_Constants.FI_Module:
                    //fromEmailID = ConfigurationManager.AppSettings["FromEmailForFI"].ToString();
                    //    break;
                    default:
                        fromEmailID = _configuration["Email:Email"];
                        break;
                }

                if (mailDetail.mailTo.Count == 0)
                {
                    _logger.LogError("EMAIL##MailFrom##" + fromEmailID + "##Subject##" + mailDetail.mailSubject + "##MailTo Cannot be empty##" + "##TransctionId - Reference ##" + mailDetail.transctionId);
                    resp.status = false;
                    resp.errorMessage = "Mail to cannot be empty.";
                    return resp;
                }

                using (SmtpClient mailServer = new SmtpClient(domainName))
                {
                    _logger.LogInfo("EMAIL##MailFrom##" + fromEmailID + "##Subject##" + mailDetail.mailSubject + "##MailTo##" + String.Join(";", mailDetail.mailTo) + "##TransctionId - Reference ##" + mailDetail.transctionId);
                    MailMessage msg = new MailMessage(fromEmailID, mailDetail.mailTo[0], mailDetail.mailSubject, mailDetail.mailBody);
                    for (int i = 1; i < mailDetail.mailTo.Count; i++)
                    {
                        msg.To.Add(mailDetail.mailTo[i]);
                    }
                    msg.IsBodyHtml = true;

                    foreach (var cc in mailDetail.mailCc)
                    {
                        msg.CC.Add(cc);
                    }

                    // Adding CC Email if value configured in configuration
                    //string _cc = ConfigurationManager.AppSettings["CCEmailID"];
                    //if (!string.IsNullOrEmpty(_cc))
                    //{
                    //    msg.CC.Add(_cc);
                    //}

                    foreach (var bcc in mailDetail.mailBcc)
                    {
                        msg.Bcc.Add(bcc);
                    }

                    // Adding BCC Email if value configured in configuration
                    //string _bcc = ConfigurationManager.AppSettings["BCCEmailID"];
                    //if (!string.IsNullOrEmpty(_bcc))
                    //{
                    //    msg.Bcc.Add(_bcc);
                    //}

                    //Adding attachments
                    FileStream[] inp = null;
                    int fileCount = 0;
                    if (mailDetail.Attachments != null)
                    {
                        inp = new FileStream[mailDetail.Attachments.Count];

                        foreach (var attachment in mailDetail.Attachments)
                        {
                            inp[fileCount] = new FileStream(attachment.attachmentFile, FileMode.Open, FileAccess.Read, FileShare.Read);

                            Attachment attach = new Attachment(inp[fileCount], attachment.attachmentName + "." + attachment.attachmentType);
                            msg.Attachments.Add(attach);
                            fileCount++;

                        }

                    }

                    mailServer.Send(msg);
                    if (mailDetail.Attachments != null)
                    {
                        fileCount--;
                        while (fileCount >= 0)
                        {
                            if (inp[fileCount] != null)
                            {
                                inp[fileCount].Close();
                            }
                            fileCount--;
                        }
                    }
                }
                resp.status = true;
                return resp;
            }
            catch (Exception ex)
            {
                _logger.LogError("EMAIL##Failure##" + ex.Message);
                _logger.LogError("EMAIL##Failure##" + ex.StackTrace);
                resp.status = false;
                resp.errorMessage = ex.Message;
                return resp;
            }
        }

        private SMTPModel GetSMTPModel(IEnumerable<CustomerSettingsDTO> customerSettings)
        {
            SMTPModel smtp = new SMTPModel();
            foreach (var item in customerSettings)
            {
                PropertyInfo propertyInfo = smtp.GetType().GetProperty(item.Key);
                if (propertyInfo != null)
                {
                    propertyInfo.SetValue(smtp, item.KeyValue, null);
                    // propertyInfo.SetValue(smsmodel, Convert.ChangeType(item.KeyValue, propertyInfo.PropertyType), null);
                }
            }
            return smtp;
        }
    }
}
