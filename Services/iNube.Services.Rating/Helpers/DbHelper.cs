﻿
using iNube.Services.Rating.Controllers.RatingConfig.RatingConfigService.IntegrationServices;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace iNube.Services.Rating.Helpers
{
    public class DbHelper 
    {
        private IIntegrationService _integrationService;
        public string _TimeZone { get; set; }
        public static ConcurrentDictionary<decimal, string> lstDbCon = new ConcurrentDictionary<decimal, string>();
        public DbHelper(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
            lstDbCon.TryAdd(7, "Data Source=edelweissdb1.coow0ess1gft.ap-south-1.rds.amazonaws.com,1433;Initial Catalog=EdelweissTest;User Id=admin;Password=micaadmin");
        }
         
        public async Task<string> GetEnvironmentConnectionAsync(string product,decimal EnvId)
        {
            string dbConnectionString = "";
            if (lstDbCon.ContainsKey(EnvId))
            {
                dbConnectionString = lstDbCon[EnvId];
            }
            else
            {
                var constring = await _integrationService.GetEnvironmentConnection(product, EnvId);
                dbConnectionString = constring.Dbconnection;
                lstDbCon.TryAdd(EnvId, dbConnectionString);
            }
            return dbConnectionString;
        }
        public DateTime ConvertUTCToZone(string utcDateTime, string userTimeZone)
        {
            DateTime dateTime = DateTime.Parse(utcDateTime);
            TimeZoneInfo TimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZone);
            DateTime zoneDateTime = TimeZoneInfo.ConvertTimeFromUtc(dateTime, TimeZone);
            Console.WriteLine(zoneDateTime);
            return zoneDateTime;
        }
        public DateTime ConvertDateToUTC(string userDate)
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

            DateTime zonelocalDateTime = System.DateTime.UtcNow.AddMinutes(330);

            return zonelocalDateTime;
        }
    }
}
