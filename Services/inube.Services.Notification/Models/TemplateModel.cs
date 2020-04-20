using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inube.Services.Notification.Models
{
    public class TemplateModel
    {
        public string ActionType { get; set; }
        public string ViewUrl { get; set; }
        public string FileName { get; set; }
        FileUploadDTO fileUploadDTO { get; set; }
        public bool SendSms { get; set; }
        public bool SendEmail { get; set; }
        public bool AttachPDF { get; set; }
        public bool IsAwsS3Save { get; set; }
        public bool IsAzureBlobSave { get; set; }
        public string StorageName { get; set; }
    }
    public class NotificationRequest
    {
        public string TemplateKey { get; set; }
        public string NotificationPayload { get; set; }
        public bool SendSms { get; set; }
        public bool SendEmail { get; set; }
        public bool IsEmailBody { get; set; }
        public bool AttachPDF { get; set; }
        public bool IsAwsS3Save { get; set; }
        public bool IsAzureBlobSave { get; set; }
        public string StorageName { get; set; }
        public SMSRequest smsRequest { get; set; }
        public EmailRequest emailRequest { get; set; }
    }
    //URL- ApiKey, UserName Password To Message Short 
    //SenderId Channel, DCS FlashSMS ,CountryCode
    public class SMSRequest
    {
        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string URL { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string PolicyNumber { get; set; }
        public string SMSMessage { get; set; }
        public string DCS { get; set; }
        public string FlashSMS { get; set; }
        public string CountryCode { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Short { get; set; }
    }
    [BsonIgnoreExtraElements]

    public class ImageDTO
    {
        public ImageDTO()
        {
            fileUploadDTOs = new List<FileUploadDTO>();
        }


        public List<FileUploadDTO> fileUploadDTOs { get; set; }
    }


    public class FileUploadDTO
    {

        public FileUploadDTO()
        {
            tagdto = new List<TagDto>();
        }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public byte[] FileData { get; set; }
        public string ContentType { get; set; }
        public List<TagDto> tagdto { get; set; }

    }
    public class TagDto
    {
        public string Tagname { get; set; }
        public string TagValue { get; set; }
    }

    public class PartnerEmail
    {
        public string PartnerName { get; set; }
        public string PartnerId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string Website { get; set; }
        public string Designation { get; set; }
        public string AccountNo { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string PartnerCode { get; set; }
        public string PolicyNo { get; set; }


    }
    public class EmailRequest
    {
        public EmailRequest()
        {
            Attachments = new List<EmailAttachment>();
            mailTo = new List<string>();
            mailCc = new List<string>();
            mailBcc = new List<string>();
        }
        public string To { get; set; }

        public List<string> mailTo { get; set; }
        public List<string> mailCc { get; set; }
        public List<string> mailBcc { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
        public List<EmailAttachment> Attachments { get; set; }
    }
    public class EmailAttachment
    {
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public byte[] FileData { get; set; }
        public string ContentType { get; set; }
    }

    public class SMTPModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string APIKey { get; set; }
        public string Server { get; set; }
        public string Port { get; set; }
        public string HOST { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
        public string Domain { get; set; }
    }
    public partial class CustomerSettingsDTO
    {
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string Type { get; set; }
        public string Key { get; set; }
        public string KeyValue { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public decimal? EnvId { get; set; }
    }
}
