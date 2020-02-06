using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{
    public interface IOrganizationProductService
    {

        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID , ApiContext apiContext);
        Task<OrganizationResponse> CreateOrganizationAsync(OrganizationDTO orgDTO, ApiContext apiContext);
        Task<OrganizationDTO> GetOrganization(int orgId, ApiContext apiContext);
        Task<IEnumerable<OrganizationDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext);
        Task<IEnumerable<OrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext);
        int TestMethod(ApiContext apiContext);
        Task<IEnumerable<OrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext);
    }
}
