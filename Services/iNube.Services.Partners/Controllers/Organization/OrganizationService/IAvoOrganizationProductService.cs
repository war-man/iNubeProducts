using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{
    public interface IAvoOrganizationProductService
    {

        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID , ApiContext apiContext);
        Task<AVOOrganizationResponse> CreateOrganizationAsync(AVOOrganizationDTO orgDTO, ApiContext apiContext);
        Task<AVOOrganizationDTO> GetOrganization(int orgId, ApiContext apiContext);
        Task<IEnumerable<AVOOrganizationDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext);
        Task<IEnumerable<AVOOrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext);
        int TestMethod(ApiContext apiContext);
        Task<IEnumerable<AVOOrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetOrgDropdown(ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetOffbyOrgid(int orgid,ApiContext apiContext);
        Task<IEnumerable<AvoOrgEmployeeSearch>> GetEmployeeDetails(ApiContext apiContext);
        Task<CreateOfficeResponse> CreateOffice(AVOOrgOffice aVOOrgOffice, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetNewBranchDropdown(int posid, ApiContext apiContext);
        Task<List<MasterDto>> GetDesignation(int orgid, ApiContext apiContext);
        Task<List<MasterDto>> GetEmployee(int orgid, int offid, int desgiId, ApiContext apiContext);
        Task<int> GetCount(int empid, ApiContext Context);
        Task<AVOOrgEmployee> GetEmployeeDetailsById(int empid, ApiContext apiContext);
    }
}
