using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.Role.RoleService
{
    public interface IRoleProductService
    {
        IEnumerable<RolesDTO> GetRoles(ApiContext apiContext);
        IEnumerable<RolesDTO> GetRolePermissionsById(string roleid, ApiContext apiContext);
        UserRoleResponse AssignRole(UserRoleMapDTO userRoles, ApiContext apiContext);
        EmpRoleResponse UpdateEmpRole(EmpRoleMapDTO empRoles, ApiContext apiContext);
        IEnumerable<RolesDTO> GetUserRole(string userId, ApiContext apiContext);
        IEnumerable<RolesDTO> GetAllUserRoles(string userId, ApiContext apiContext);
        RoleResponse CreateRole(RolesDTO role, ApiContext apiContext);
        Task<IEnumerable<DynamicResponse>> GetDynamicConfig(ApiContext apiContext);
        IEnumerable<DynamicPermissionsDTO> GetDynamicPermissions(string Userid, string Roleid, string itemType, ApiContext apiContext);
        DynamicResponseResponse SaveDynamicPermission(DynamicPermissions configDTO, ApiContext apiContext);
        Task<IEnumerable<DynamicResponse>> GetDynamicGraphConfig(ApiContext apiContext);
        IEnumerable<DynamicPermissionsDTO> GetDynamicGraphPermissions(string Userid, string Roleid, string itemType, ApiContext apiContext);
        DynamicResponseResponse SaveDynamicGraphPermission(DynamicPermissions configDTO, ApiContext apiContext);

    }
}
