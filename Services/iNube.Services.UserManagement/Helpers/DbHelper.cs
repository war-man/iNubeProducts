using iNube.Services.UserManagement.Entities.MICACP;
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
    }
}
