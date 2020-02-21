using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;

namespace iNube.Services.UserManagement.Controllers.Role.RoleService
{
    public interface IRoleProductService
    {
        IEnumerable<RolesDTO> GetRoles(ApiContext apiContext);
        IEnumerable<RolesDTO> GetRolePermissionsById(string roleid,ApiContext apiContext);
        UserRoleResponse AssignRole(UserRoleMapDTO userRoles, ApiContext apiContext);
        IEnumerable<RolesDTO> GetUserRole(string userId, ApiContext apiContext);
        IEnumerable<RolesDTO> GetAllUserRoles(string userId, ApiContext apiContext);
        RoleResponse CreateRole(RolesDTO role, ApiContext apiContext);
    }
}
