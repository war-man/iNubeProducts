using inube.Services.Notification.Models;
using iNube.Services.Notification.Controllers.IntegrationServices;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;

namespace inube.Services.Notification.Helpers
{
    public class SMSHelper
    {
        public void TestSMS()
        {
            Models.SMSRequest request = new Models.SMSRequest();
            request.SMSMessage = "what sma msg";
            request.RecipientNumber = "9742745384";

        }
    }
    public interface ISMSService
    {
        Task<ResponseStatus> SendSMS(Models.SMSRequest request, ApiContext context);
    }
    public class SMSService : ISMSService
    {
        private ILoggerManager _logger;
        private readonly IConfiguration _configuration;
        public IIntegrationService _integrationService;
        public SMSService(IConfiguration configuration, ILoggerManager logger, IIntegrationService integrationService)
        {
            _configuration = configuration;
            _logger = logger;
            _integrationService = integrationService;
        }
        public async Task<ResponseStatus> SendSMS(Models.SMSRequest request, ApiContext context)
        {
            ResponseStatus responseStatus = new ResponseStatus() { Status = BusinessStatus.Ok };
            try
            {
                var customerSettings = await _integrationService.GetCustomerSettings("SMS", context);
                var smsSettings = GetSMSModel(customerSettings);
                var SMSAPI = "";
                if (smsSettings.SenderId=="SMSTST")
                {
                    if (string.IsNullOrEmpty(request.CountryCode))
                    {
                        SMSAPI = $"{smsSettings.URL}?APIKey= {smsSettings.APIKey}&senderid={smsSettings.SenderId}&channel={smsSettings.Channel}&DCS=0&flashsms=0&number={smsSettings.CountryCode}{request.RecipientNumber}&text={request.SMSMessage}";
                    }
                    else
                    {
                        SMSAPI = $"{smsSettings.URL}?APIKey= {smsSettings.APIKey}&senderid={smsSettings.SenderId}&channel={smsSettings.Channel}&DCS=0&flashsms=0&number={request.CountryCode}{request.RecipientNumber}&text={request.SMSMessage}";
                    }
                }
                if (smsSettings.SenderId == "368195")
                {
                    if (string.IsNullOrEmpty(request.CountryCode))
                    {
                        SMSAPI = $"{smsSettings.URL}?feedid= {smsSettings.SenderId}&username={smsSettings.UserName}&password={smsSettings.Password}&To={smsSettings.CountryCode}{request.RecipientNumber}&text={request.SMSMessage}&short={smsSettings.Short}";
                    }
                    else
                    {
                        SMSAPI = $"{smsSettings.URL}?feedid= {smsSettings.SenderId}&username={smsSettings.UserName}&password={smsSettings.Password}&To={request.CountryCode}{request.RecipientNumber}&text={request.SMSMessage}&short={smsSettings.Short}";
                    }
                }
                var client = new WebClient();
                var content = client.DownloadString(SMSAPI);               
            }
            catch (Exception ex)
            {
                responseStatus.Status = BusinessStatus.Error;
                _logger.LogError(ex,"SMSHelper","SendSMS", "Notifiaction SendSMS Fail-" + request.RecipientNumber, null,context);
            }
            return responseStatus;
        }
        private Models.SMSRequest GetSMSModel(IEnumerable<CustomerSettingsDTO> customerSettings)
        {
            Models.SMSRequest smsmodel = new Models.SMSRequest();
            foreach (var item in customerSettings)
            {
                PropertyInfo propertyInfo = smsmodel.GetType().GetProperty(item.Key);
                if (propertyInfo != null)
                {
                    propertyInfo.SetValue(smsmodel, item.KeyValue, null);
                    // propertyInfo.SetValue(smsmodel, Convert.ChangeType(item.KeyValue, propertyInfo.PropertyType), null);
                }
            }
            return smsmodel;
        }
    }
}
       
