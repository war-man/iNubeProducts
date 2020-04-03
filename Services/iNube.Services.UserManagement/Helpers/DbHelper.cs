using iNube.Services.UserManagement.Entities.MICACP;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Linq;

namespace iNube.Services.UserManagement.Helpers
{
    public class DbHelper
    {
        private MICACPContext _cpcontext;
        

        public string GetEnvironmentConnection(string product,decimal EnvId)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(product);
            return _cpcontext.TblCustomerEnvironment.FirstOrDefault(ce => ce.Id == EnvId).Dbconnection;
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
        public CustomerSettingsDTO GetCustomerSettings(decimal customerid, string type, string product, int envid, ApiContext apiContext)
        {
            _cpcontext = (MICACPContext)DbManager.GetCPContext(product);
            var data = _cpcontext.TblCustomerSettings.FirstOrDefault(a => a.CustomerId == customerid && a.Type == type);

            if (envid != 0)
            {
                data = _cpcontext.TblCustomerSettings.FirstOrDefault(a => a.CustomerId == customerid && a.Type == type && a.EnvId == envid);
            }

            CustomerSettingsDTO customer = new CustomerSettingsDTO();

            customer.Id = data.Id;
            customer.Key = data.Key;
            customer.KeyValue = data.KeyValue;
            customer.Type = data.Type;
            customer.CustomerId = data.CustomerId;
            customer.IsActive = data.IsActive;
            customer.ModifiedDate = data.ModifiedDate;
            customer.EnvId = data.EnvId;

            return customer;
        }

    }
}
