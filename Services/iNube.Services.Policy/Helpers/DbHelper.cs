using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers
{
    public class DbHelper
    {
        private IIntegrationService _integrationService;

        public DbHelper(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }
         
        public async Task<string> GetEnvironmentConnectionAsync(string product,decimal EnvId)
        {
            var constring = await _integrationService.GetEnvironmentConnection(product, EnvId);
            return constring.Dbconnection;
        }

    }
}
