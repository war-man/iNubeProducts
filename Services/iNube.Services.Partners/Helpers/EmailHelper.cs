using iNube.Services.Partners.Models;
using Inube.Framework.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Helpers
{
    public  class EmailHelper
    {
        private readonly IEmailService _emailService;
        public EmailHelper(IEmailService emailService)
        {
            _emailService = emailService;
        }
        public async Task<bool> SendEmailAsync(EmailTest emailTest)
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
    }
}
