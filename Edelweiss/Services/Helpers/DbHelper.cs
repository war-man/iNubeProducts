//using iNube.Services.Accounting.Controllers.AccountConfig.IntegrationServices;
using iNube.Services.Controllers.EGI.IntegrationServices;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace iNube.Services.MicaExtension_EGI.Helpers
{
    public class DbHelper
    {
        private IIntegrationService _integrationService;
        public string _TimeZone { get; set; }
        public static ConcurrentDictionary<decimal, string> lstDbCon = new ConcurrentDictionary<decimal, string>();
        public DbHelper(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }

        public async Task<string> GetEnvironmentConnectionAsync(string product, decimal EnvId)
        {
            string dbConnectionString = "";
            if (lstDbCon.ContainsKey(EnvId))
            {
                dbConnectionString = lstDbCon[EnvId];
            }
            else
            {
                var constring = await _integrationService.GetEnvironmentConnection(product, EnvId);
                dbConnectionString= constring.Dbconnection;
            }
            return dbConnectionString;
        }

        public DateTime GetDateTimeByZone(string userTimeZone)
        {

            DateTime zonelocalDateTime = System.DateTime.UtcNow.AddMinutes(330);
            ////DateTime zonelocalDateTime = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.Local, TimeZoneInfo.FindSystemTimeZoneById(userTimeZone));
            ////DateTime utcDateTimeDT = dateTime.ToUniversalTime();
            ////TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);
            ////DateTime dateTimeUTC = DateTime.UtcNow;
            ////DateTime zonelocalDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTimeUTC, TimeZone);
            ////Console.WriteLine(zonelocalDateTime);
            //return zonelocalDateTime;

            var IstDate = Convert.ToDateTime(zonelocalDateTime.ToString("s"));
            return IstDate;
        }

    }
}
