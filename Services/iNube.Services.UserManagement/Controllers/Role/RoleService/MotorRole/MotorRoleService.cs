using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;

namespace iNube.Services.UserManagement.Controllers.Role.RoleService.MotorRole
{
    public class MotorRoleService : IRoleProductService
    {
        public UserRoleResponse AssignRole(UserRoleMapDTO userRoles, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<RolesDTO> GetRoles(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<RolesDTO> GetRolePermissionsById(string roleid, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<RolesDTO> GetUserRole(string userId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<RolesDTO> GetAllUserRoles(string userId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public RoleResponse CreateRole(RolesDTO role, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DynamicResponse>> GetDynamicConfig(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DynamicPermissionsDTO> GetDynamicPermissions(/*string Userid, */string Roleid, string itemType, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public DynamicResponseResponse SaveDynamicPermission(DynamicPermissions configDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
