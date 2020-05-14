using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{
    public interface IAvoOrganizationProductService
    {

        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext);
        Task<AVOOrganizationResponse> CreateOrganizationAsync(AVOOrganizationDTO orgDTO, ApiContext apiContext);

        Task<AVOOrganizationNewDTO> GetOrganization(int orgId, ApiContext apiContext);
        Task<IEnumerable<AVOOrganizationNewDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext);
        Task<IEnumerable<AVOOrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext);
        int TestMethod(ApiContext apiContext);
        Task<IEnumerable<AVOOrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetOrgDropdown(ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetOffbyOrgid(int orgid, ApiContext apiContext);
        Task<IEnumerable<AvoOrgEmployeeSearch>> GetEmployeeDetails(AvoOrgEmployeeSearch emp, ApiContext apiContext);
        Task<CreateOfficeResponse> CreateOffice(AVOOrgOffice aVOOrgOffice, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetNewBranchDropdown(int posid, ApiContext apiContext);
        Task<List<MasterDto>> GetDesignation(int orgid, ApiContext apiContext);
        Task<List<vacantPositiondto>> GetVecPositions(decimal orgid, ApiContext apiContext);
        Task<List<MasterDto>> GetEmployee(int orgid, int offid, int desgiId, ApiContext apiContext);
        Task<int> GetCount(int empid, ApiContext Context);
        Task<string> GetSupervisorname(string designame, ApiContext apiContext);
        Task<AVOOrgEmployee> GetEmployeeDetailsById(int empid, ApiContext apiContext);
        Task<Createposition> CreatePosition(NewPositionDTO Officedto, ApiContext apiContext);
        Task<IEnumerable<AVOOrgEmployee>> SearchPeople(SearchPeople searchPeople, ApiContext apiContext);
        Task<CreatePeopleResponse> SaveEmplMappingDetails(updatepositionDto avOOrgEmployee, ApiContext apiContext);

        Task<List<ddDTO>> GetEmpDetails(decimal orgId, decimal offid, ApiContext apiContext);

        Task<AVOOrgEmployee> searchpeoplebycode(string empcode, ApiContext apiContext);
        Task<AVOOrgEmployee> ModifyPeople(AVOOrgEmployee tblRetentionGroupDto, ApiContext apiContext);
        Task<MovementCounts> GetMovementCount(ApiContext apiContext);
        Task<AVOOrgEmployee> UpdateEmployee(AVOOrgEmployee Empdata, ApiContext apiContext);
        Task<AVOMovements> SaveDecision(AVOMovements data, ApiContext apiContext);
        Task<EmployeeRoles> GetEmployeeRoles(string empCode, ApiContext apiContext);
        Task<RoleDesigResponse> AssignDesigRole(RoleDesigMapDTO desigRoles, ApiContext apiContext);
        Task<IEnumerable<AvoOrgEmployeeSearch>> SearchEmployeeDetailsByMovStatus(MovementDTO movementDTO, ApiContext apiContext);
        Task<AVOMovements> UpdateEmployeePosition(PositionStatusDTO movements, ApiContext apiContext);
        Task<ResponseStatus> CreateNewPosition(decimal OrgEmpId, ApiContext apiContext);
        Task<AVOReporteeGrid> GetReporteeGrid(int Empcode, int position, ApiContext apiContext);
        Task<List<MovementDetails>> GetMovementDetails(MovementDetails movement, ApiContext apiContext);
        Task<List<FetchData>> GetHierarchy(int OrgId, string type, string keyValue, ApiContext apiContext);
        Task<ViewDetails> ViewDetailsByEmpCode(string empcode, ApiContext apiContext);
        Task<EmpMappingData> GetEmpMappingData(string empcode, ApiContext apiContext);
        Task<List<Supervisor>> GetNewSupervisorByMovementId(Supervisor supervisor, ApiContext apiContext);
        Task<AVOReporteeGrid> ViewReporteeGrid(int Empcode, int MovementId, int MovementStatusId, ApiContext apiContext);
        Task<EmployeeRoles> DesignationRoles(string designationid, ApiContext apiContext);
        Task<DataTable> GetEmpHierarchy(string empcode, ApiContext context);
    }
}
