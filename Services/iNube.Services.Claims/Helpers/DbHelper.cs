using iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices;
using System.Linq;

namespace iNube.Services.Claims.Helpers
{
    public class DbHelper
    {
        private IIntegrationService _integrationService;

        public DbHelper(IIntegrationService integrationService)
        {
            _integrationService = integrationService;
        }
         
        public async System.Threading.Tasks.Task<string> GetEnvironmentConnectionAsync(string product,decimal EnvId)
        {
            var constring = await _integrationService.GetEnvironmentConnection(product, EnvId);
            return constring.Dbconnection;
        }

    }
}
