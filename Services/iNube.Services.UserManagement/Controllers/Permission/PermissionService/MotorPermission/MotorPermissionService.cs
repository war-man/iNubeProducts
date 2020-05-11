using iNube.Services.UserManagement.Controllers.Permission.PermissionService;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.Controllers.Permission.PermissionService.MotorPermission
{
    public class MotorPermissionService : IPermissionProductService
    {
        public UserPermissionResponse AssignPermission(UserPermissionDTO permissionIds, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetMasPermissions(string perType, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetPermissions(string perType, string userId, string roleId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleReports(string userId, string roleId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetUserPermissions(string perType, string userId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetUserRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleDashboard(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleReports(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> Roledashboard(RoleDashDTO roleDashDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetRoleReports(RoleDashDTO roleDashDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetRolePermbyid(RolepermissionsDTO RolePermissionDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetAllPermissions(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public UserPermissionResponse SaveAssignPermission(UserRolesPermissionDTO permissionIds, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public NewRolePermissionResponse AssignRolePermission(NewRolesPermissionDTO permissionIds, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetDashboards(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MasPermissionDTO> GetReports(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public DynamicReportResponse GetReportOnRoles(UserRoleReportDTO reportDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<DynamicReportResponse> GetReportByRole(RoleReportDTO reportDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<UserReportPermissionResponse> SaveAssignReports(UserRoleReportsDTO reportDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
