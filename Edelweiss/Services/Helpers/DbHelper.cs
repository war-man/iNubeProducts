//using iNube.Services.Accounting.Controllers.AccountConfig.IntegrationServices;
using iNube.Services.Controllers.EGI.IntegrationServices;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace iNube.Services.MicaExtension_EGI.Helpers
{
    public class DbHelper
    {
        private IIntegrationService _integrationService;
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

    }
}
