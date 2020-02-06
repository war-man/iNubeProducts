using inube.Services.Notification.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplateDemo.Models
{
    public class QuotationModel
    {
        public QuotationModel()
        {

        }
        public string ProposerName { get; set; }
        public string Type { get; set; }
        public string QuotationNo { get; set; }
        public string Date { get; set; }
        public EmailRequest EmailTest { get; set; }
        public decimal PaperSetFrom { get; set; }
        public decimal PaperSetTo { get; set; }
        public bool IsAwsS3Save { get; set; }
        public bool IsAzureBlobSave { get; set; }
    }
  

}
