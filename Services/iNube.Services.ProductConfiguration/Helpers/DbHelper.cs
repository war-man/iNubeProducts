using iNube.Services.ProductConfiguration.Controllers.Product.IntegrationServices;
using System.Threading.Tasks;

namespace iNube.Services.ProductConfiguration.Helpers
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
            return await _integrationService.GetEnvironmentConnection(product, EnvId);
            
        }

    }
}
