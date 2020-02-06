using inube.Services.Notification.Models;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace inube.Services.Notification.Controllers
{
    public class TemplateHelper
    {
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public TemplateHelper(IEmailService emailService,IConfiguration configuration)
        {
            _configuration = configuration;
            _emailService = emailService;
        }
        public async Task<bool> ProcessNotificationAsync()
        {
            await SendNotificationAsync("6EEE5D39-D9DB-41EF-A4F1-12E00F1E6020", "ashish.sinha@inubesolutions.com", "omi.ashish@gmail.com", "9742745384");
            return true;
        }
        public async Task<bool> ProcessNotificationAsync(string policyNumber, byte[] fileArray, EmailRequest emailTest)
        {
            await SendNotificationAttachmentAsync(policyNumber,emailTest, fileArray);
            return true;
        }

       

        private async Task SendNotificationAsync(string policyNumber, string partnerEmail, string customerEmail, string customerNumber)
        {
            //partner email
            EmailRequest emailTest = new EmailRequest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = partnerEmail };
            await SendEmailAsync(emailTest);
            //UserEmail
            if (!string.IsNullOrEmpty(customerEmail))
            {
                emailTest = new EmailRequest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = customerEmail };
                await SendEmailAsync(emailTest);
            }
        }


       


        private async Task SendNotificationAttachmentAsync(string policyNumber, EmailRequest emailTest, byte[] fileArray)
        {
            //partner email
           // EmailTest emailTest = new EmailTest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = partnerEmail };
            await SendEmail(policyNumber,emailTest, fileArray);
            //UserEmail
            if (!string.IsNullOrEmpty(emailTest.PartnerEmail))
            {
                await SendEmail(policyNumber,emailTest, fileArray,true);
            }
        }

     


        public async Task<bool> SendEmailAsync(EmailRequest emailTest)
        {
            try
            {
                await _emailService.SendEmail(emailTest.To, emailTest.Subject, emailTest.Message);
            }
            catch (Exception ex)
            {

                throw;
            }
            return true;
        }

        public async Task SendEmail(string policyNumber, EmailRequest emailTest, byte[] fileArray,bool IsPartner=false)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],
                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    if (fileArray.Length > 0 && emailTest.IsAttachment)
                    {
                        var memStream = new MemoryStream(fileArray);
                        memStream.Position = 0;
                        var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                        var reportAttachment = new Attachment(memStream, contentType);
                        reportAttachment.ContentDisposition.FileName = $"{policyNumber}.pdf";
                        emailMessage.Attachments.Add(reportAttachment);
                    }
                    if (IsPartner)
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.PartnerEmail));
                    }
                    else
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.To));
                    }
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = emailTest.Subject;
                    emailMessage.Body = emailTest.Message;
                    if (emailTest.Message.EndsWith("</html>"))
                    {
                        emailMessage.IsBodyHtml = true;
                    }
                    try
                    {
                        client.Send(emailMessage);
                    }
                    catch (Exception  ex)
                    {

                        var error = ex.ToString();
                    }
                    
                }
            }
            await Task.CompletedTask;
        }


        public async Task<bool> ProcessQuestionsNotificationAsync(string QBText, byte[] fileArray, EmailRequest emailTest)
        {
            await SendQuestionsNotificationAttachmentAsync(QBText, emailTest, fileArray);
            return true;
        }

        public async Task<bool> ProcessNotificationEmailAsync(string fileName, byte[] fileArray, EmailRequest emailTest)
        {
            await SendProcessEmail(fileName, emailTest, fileArray);
            return true;
        }
        public async Task<bool> ProcessQuotationNotificationAsync(byte[] fileArray, EmailRequest emailTest)
        {
            await SendQuotationNotificationAttachmentAsync(emailTest, fileArray);
            return true;
        }
        private async Task SendQuotationNotificationAttachmentAsync(string customerEmail, string customerNumber)
        {
            //partner email
            EmailRequest emailTest = new EmailRequest() { Message = $"AptitudeQuestions", Subject = $"AptitudeQuestionsPdf", To = customerEmail };
            await SendEmailAsync(emailTest);
            //UserEmail
            //if (!string.IsNullOrEmpty(customerEmail))
            //{
            //    emailTest = new EmailRequest() { Message = $"Policy created with policy number", Subject = $"Insured coverage of Cover for Cover event under Policy No.", To = customerEmail };
            //    await SendEmailAsync(emailTest);
            //}
        }

        private async Task SendQuotationNotificationAttachmentAsync(EmailRequest emailTest, byte[] fileArray)
        {
            //partner email
            // EmailTest emailTest = new EmailTest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = partnerEmail };
            await SendQuotationEmail(emailTest, fileArray);
            //UserEmail
            //if (!string.IsNullOrEmpty(emailTest.PartnerEmail))
            //{
            //    await SendQEmail(QBText, emailTest, fileArray, true);
            //}
        }

        private async Task SendQuestionsNotificationAttachmentAsync(string QBText, EmailRequest emailTest, byte[] fileArray)
        {
            //partner email
            // EmailTest emailTest = new EmailTest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = partnerEmail };
            await SendQEmail(QBText, emailTest, fileArray);
            //UserEmail
            //if (!string.IsNullOrEmpty(emailTest.PartnerEmail))
            //{
            //    await SendQEmail(QBText, emailTest, fileArray, true);
            //}
        }
        public async Task SendQEmail(string QBText, EmailRequest emailTest, byte[] fileArray, bool IsPartner = false)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],
                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    if (fileArray.Length > 0 && emailTest.IsAttachment)
                    {
                        var memStream = new MemoryStream(fileArray);
                        memStream.Position = 0;
                        var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                        var reportAttachment = new Attachment(memStream, contentType);
                        reportAttachment.ContentDisposition.FileName = $"{QBText}.pdf";
                        emailMessage.Attachments.Add(reportAttachment);
                    }
                    if (IsPartner)
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.PartnerEmail));
                    }
                    else
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.To));
                    }
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = emailTest.Subject;
                    emailMessage.Body = emailTest.Message;
                    if (emailTest.Message.EndsWith("</html>"))
                    {
                        emailMessage.IsBodyHtml = true;
                    }
                    try
                    {
                        client.Send(emailMessage);
                    }
                    catch (Exception ex)
                    {

                        var error = ex.ToString();
                    }

                }
            }
            await Task.CompletedTask;
        }
        public async Task SendProcessEmail(string fileName, EmailRequest emailTest, byte[] fileArray, bool IsPartner = false)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],
                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    if (fileArray.Length > 0 && emailTest.IsAttachment)
                    {
                        var memStream = new MemoryStream(fileArray);
                        memStream.Position = 0;
                        var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                        var reportAttachment = new Attachment(memStream, contentType);
                        reportAttachment.ContentDisposition.FileName = $"{fileName}";
                        emailMessage.Attachments.Add(reportAttachment);
                    }
                    if (IsPartner)
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.PartnerEmail));
                    }
                    else
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.To));
                    }
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = emailTest.Subject;
                    emailMessage.Body = emailTest.Message;
                    if (emailTest.Message.EndsWith("</html>"))
                    {
                        emailMessage.IsBodyHtml = true;
                    }
                    try
                    {
                        client.Send(emailMessage);
                    }
                    catch (Exception ex)
                    {

                        var error = ex.ToString();
                    }

                }
            }
            await Task.CompletedTask;
        }

        public async Task SendQuotationEmail(EmailRequest emailTest, byte[] fileArray, bool IsPartner = false)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],
                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    if (fileArray.Length > 0 && emailTest.IsAttachment)
                    {
                        var memStream = new MemoryStream(fileArray);
                        memStream.Position = 0;
                        var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                        var reportAttachment = new Attachment(memStream, contentType);
                        reportAttachment.ContentDisposition.FileName = $"Quotation.pdf";
                        emailMessage.Attachments.Add(reportAttachment);
                    }
                    if (IsPartner)
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.PartnerEmail));
                    }
                    else
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.To));
                    }
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = emailTest.Subject;
                    emailMessage.Body = emailTest.Message;
                    if (emailTest.Message.EndsWith("</html>"))
                    {
                        emailMessage.IsBodyHtml = true;
                    }
                    try
                    {
                        client.Send(emailMessage);
                    }
                    catch (Exception ex)
                    {

                        var error = ex.ToString();
                    }

                }
            }
            await Task.CompletedTask;
        }



        //MultiCover
        public async Task<bool> ProcessProductApiKitNotificationAsync(byte[] fileArray, EmailRequest emailTest)
        {
            await SendProductApiKitNotificationAttachmentAsync(emailTest, fileArray);
            return true;
        }

        private async Task SendProductApiKitNotificationAttachmentAsync(EmailRequest emailTest, byte[] fileArray)
        {
            //partner email
            // EmailTest emailTest = new EmailTest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = partnerEmail };
            await SendProductApiKitEmail(emailTest, fileArray);
            //UserEmail
            //if (!string.IsNullOrEmpty(emailTest.PartnerEmail))
            //{
            //    await SendQEmail(QBText, emailTest, fileArray, true);
            //}
        }

        public async Task SendProductApiKitEmail(EmailRequest emailTest, byte[] fileArray, bool IsPartner = false)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],

                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    if (fileArray.Length > 0 && emailTest.IsAttachment)
                    {
                        var memStream = new MemoryStream(fileArray);
                        memStream.Position = 0;
                        var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                        var reportAttachment = new Attachment(memStream, contentType);
                        reportAttachment.ContentDisposition.FileName = $"ProductApiKit.pdf";
                        emailMessage.Attachments.Add(reportAttachment);
                    }
                    if (IsPartner)
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.PartnerEmail));
                    }
                    else
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.To));
                    }
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = emailTest.Subject;
                    emailMessage.Body = emailTest.Message;
                    if (emailTest.Message.EndsWith("</html>"))
                    {
                        emailMessage.IsBodyHtml = true;
                    }
                    try
                    {
                        client.Send(emailMessage);
                    }
                    catch (Exception ex)
                    {

                        var error = ex.ToString();
                    }

                }
            }
            await Task.CompletedTask;
        }


        //ProductApiKitKit
        public async Task<bool> ProcessMultiCoverNotificationAsync(byte[] fileArray, EmailRequest emailTest)
        {
            await SendMultiCoverNotificationAttachmentAsync(emailTest, fileArray);
            return true;
        }

        private async Task SendMultiCoverNotificationAttachmentAsync(EmailRequest emailTest, byte[] fileArray)
        {
            //partner email
            // EmailTest emailTest = new EmailTest() { Message = $"Policy created with policy number {policyNumber}", Subject = $"Insured coverage of Cover for Cover event under Policy No.{policyNumber}", To = partnerEmail };
            await SendMultiCoverEmail(emailTest, fileArray);
            //UserEmail
            //if (!string.IsNullOrEmpty(emailTest.PartnerEmail))
            //{
            //    await SendQEmail(QBText, emailTest, fileArray, true);
            //}
        }

        public async Task SendMultiCoverEmail(EmailRequest emailTest, byte[] fileArray, bool IsPartner = false)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _configuration["Email:Email"],
                    Password = _configuration["Email:Password"]
                };

                client.Credentials = credential;
                client.Host = _configuration["Email:Host"];
                client.Port = int.Parse(_configuration["Email:Port"]);
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    if (fileArray.Length > 0 && emailTest.IsAttachment)
                    {
                        var memStream = new MemoryStream(fileArray);
                        memStream.Position = 0;
                        var contentType = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Pdf);
                        var reportAttachment = new Attachment(memStream, contentType);
                        reportAttachment.ContentDisposition.FileName = $"InsuranceCertificate.pdf";
                        emailMessage.Attachments.Add(reportAttachment);
                    }
                    if (IsPartner)
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.PartnerEmail));
                    }
                    else
                    {
                        emailMessage.To.Add(new MailAddress(emailTest.To));
                    }
                    emailMessage.From = new MailAddress(_configuration["Email:Email"]);
                    emailMessage.Subject = emailTest.Subject;
                    emailMessage.Body = emailTest.Message;
                    if (emailTest.Message.EndsWith("</html>"))
                    {
                        emailMessage.IsBodyHtml = true;
                    }
                    try
                    {
                        client.Send(emailMessage);
                    }
                    catch (Exception ex)
                    {

                        var error = ex.ToString();
                    }

                }
            }
            await Task.CompletedTask;
        }
    }
}
