﻿using MongoDB.Bson.Serialization.Attributes;
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
    }
    public class SMSRequest
    {
        public string APIKey { get; set; }
        public string SenderId { get; set; }
        public string Channel { get; set; }
        public string RecipientNumber { get; set; }
        public string PolicyNumber { get; set; }
        public string SMSMessage { get; set; }
    }
    [BsonIgnoreExtraElements]
    public class FileUploadDTO
    {
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public byte[] FileData { get; set; }
        public string ContentType { get; set; }
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
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
    }
}