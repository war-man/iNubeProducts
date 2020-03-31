using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using System;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers
{
    public class DbHelper
    {
        private IIntegrationService _integrationService;
        public string _TimeZone { get; set; }


      
        public DbHelper(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
            
        }
         
        public async Task<string> GetEnvironmentConnectionAsync(string product,decimal EnvId)
        {
            var constring = await _integrationService.GetEnvironmentConnection(product, EnvId);
            return constring.Dbconnection;
        }

        public DateTime ConvertUTCToZone(string utcDateTime, string userTimeZone)
        {
            //string UserTimeZone = "India Standard Time"; 
            DateTime dateTime = DateTime.Parse(utcDateTime);
            //DateTime utcDateTimeDT = dateTime.ToUniversalTime();
            TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);
            DateTime zoneDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTime, TimeZone);
            Console.WriteLine(zoneDateTime);
            return zoneDateTime;
        }
        public  DateTime ConvertDateToUTC(string userDate)
        {
            if (userDate != "")
            {
                DateTime datNowLocal = Convert.ToDateTime(userDate);
                Console.WriteLine("ConvertTimeToUtc: {0}, Kind {1}", TimeZoneInfo.ConvertTimeToUtc(datNowLocal), TimeZoneInfo.ConvertTimeToUtc(datNowLocal).Kind);
                Console.WriteLine();
                return TimeZoneInfo.ConvertTimeToUtc(datNowLocal);
            }
            else
            {
                DateTime datNowLocal = DateTime.UtcNow;
                Console.WriteLine(datNowLocal);
                Console.WriteLine();
                return datNowLocal;
            }
        }
        public DateTime GetDateTimeByZone(string userTimeZone)
        {

            //DateTime utcDateTimeDT = dateTime.ToUniversalTime();
            TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);
            DateTime dateTimeUTC = DateTime.UtcNow;
            DateTime zonelocalDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTimeUTC, TimeZone);
            Console.WriteLine(zonelocalDateTime);
            return zonelocalDateTime;
        }




    }
}
