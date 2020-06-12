using AutoMapper;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Services.UserManagement.Helpers;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.Permission.PermissionService
{
    public interface IPermissionService
    {
        IEnumerable<MasPermissionDTO> GetMasPermissions(string perType, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetUserPermissions(string perType, string userId, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetPermissions(string perType, string userId, string roleId, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetUserRoleReports(string userId, string roleId, ApiContext apiContext);
        UserPermissionResponse AssignPermission(UserPermissionDTO permissionIds, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetUserRoleDashboard(UserRoleMapDTO userPermissionDTO, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetUserRoleGetReports(UserRoleMapDTO userPermissionDTO, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> Roledashboard(RoleDashDTO roleDashDTO, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> RoleReports(RoleDashDTO roleDashDTO, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetRolePermissionsbyid(RolepermissionsDTO RolePermissionDTO, ApiContext apiContext);
        UserPermissionResponse SaveAssignPermission(UserRolesPermissionDTO permissionIds, ApiContext apiContext);
        NewRolePermissionResponse AssignRolePermission(NewRolesPermissionDTO permissionIds, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetAllPermissions(ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetDashboards(ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetReports(ApiContext apiContext);
        DynamicReportResponse GetReportOnRoles(UserRoleReportDTO reportDTO, ApiContext apiContext);
        Task<DynamicReportResponse> GetReportByRole(RoleReportDTO reportDTO, ApiContext apiContext);
        Task<UserReportPermissionResponse> SaveAssignReports(UserRoleReportsDTO reportDTO, ApiContext apiContext);
        DynamicGraphResponse GetGraphOnRoles(UserRoleGraphDTO reportDTO, ApiContext apiContext);
        Task<DynamicGraphResponse> GetGraphByRole(RoleGraphDTO reportDTO, ApiContext apiContext);
        Task<UserGraphPermissionResponse> SaveAssignGraphs(UserRoleGraphsDTO reportDTO, ApiContext apiContext);
    }

    public class PermissionService : IPermissionService
    {
        private MICAUMContext _context;
        private IMapper _mapper;
        private readonly Func<string, IPermissionProductService> _permissionService;

        public PermissionService(IMapper mapper, Func<string, IPermissionProductService> permissionService)
        {
            _mapper = mapper;
            _permissionService = permissionService;
        }

        //fetching permissions based on itemtype ("Menu" or "Dashboard")
        public IEnumerable<MasPermissionDTO> GetMasPermissions(string perType, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetMasPermissions(perType, apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetUserPermissions(string perType, string userId, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetUserPermissions(perType, userId, apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetPermissions(string perType, string userId, string roleId, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetPermissions(perType, userId, roleId, apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleReports(string userId, string roleId, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetUserRoleReports(userId, roleId, apiContext);
        }

        private IEnumerable<MasPermissionDTO> GetChildren(IEnumerable<TblMasPermission> permissions, int parentId)
        {
            IEnumerable<MasPermissionDTO> masPermissionDTOs = permissions
                    .Where(c => c.ParentId == parentId)
                    .Select(c => new MasPermissionDTO
                    {
                        PermissionId = c.PermissionId,
                        ItemType = c.ItemType,
                        ParentId = c.ParentId,
                        MenuId = c.MenuId,
                        ItemDescription = c.ItemDescription,
                        Label = c.ItemDescription,
                        Url = c.Url,
                        PathTo = c.PathTo,
                        Collapse = c.Collapse,
                        State = c.State,
                        Mini = c.Mini,
                        Icon = c.Icon,
                        Redirect = c.Redirect,
                        Component = c.Component,
                        Children = GetChildren(permissions, c.PermissionId)
                    });
            return masPermissionDTOs;
        }

        public UserPermissionResponse AssignPermission(UserPermissionDTO permissionIds, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).AssignPermission(permissionIds, apiContext);
        }

        public UserPermissionResponse SaveAssignPermission(UserRolesPermissionDTO permissionIds, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).SaveAssignPermission(permissionIds, apiContext);
        }

        public NewRolePermissionResponse AssignRolePermission(NewRolesPermissionDTO permissionIds, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).AssignRolePermission(permissionIds, apiContext);
        }

        private IEnumerable<MasPermissionDTO> GetMenuChildren(IEnumerable<MasPermissionDTO> permissions, int parentId, string roleId)
        {
            IEnumerable<MasPermissionDTO> masPermissionDTOs = permissions
                    .Where(c => c.ParentId == parentId && c.RoleId == roleId)
                    .Select(c => new MasPermissionDTO
                    {
                        PermissionId = c.PermissionId,
                        ItemType = c.ItemType,
                        ParentId = c.ParentId,
                        MenuId = c.MenuId,
                        ItemDescription = c.ItemDescription,
                        Label = c.ItemDescription,
                        Url = c.Url,
                        PathTo = c.PathTo,
                        Collapse = c.Collapse,
                        State = c.State,
                        Mini = c.Mini,
                        Icon = c.Icon,
                        Redirect = c.Redirect,
                        Component = c.Component,
                        RoleId = c.RoleId,
                        RoleName = c.RoleName,
                        Status = c.Status,
                        Children = GetMenuChildren(permissions, c.PermissionId, c.RoleId)
                    });
            return masPermissionDTOs;
        }

        //fetching role and permissions based on number of roles
        public IEnumerable<MasPermissionDTO> GetRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            return GetUserRolePermissions(userPermissionDTO, apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetUserRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetUserRolePermissions(userPermissionDTO, apiContext);
        }

        //user role based fetching dashboards
        public IEnumerable<MasPermissionDTO> GetUserRoleDashboard(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetUserRoleDashboard(userPermissionDTO, apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleGetReports(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetUserRoleReports(userPermissionDTO, apiContext);
        }

        //dashboards based on Roles
        public IEnumerable<MasPermissionDTO> Roledashboard(RoleDashDTO roleDashDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).Roledashboard(roleDashDTO, apiContext);
        }

        //Reports based on Roles
        public IEnumerable<MasPermissionDTO> RoleReports(RoleDashDTO roleDashDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetRoleReports(roleDashDTO, apiContext);
        }

        //fetching permissions based on role(roleid)
        public IEnumerable<MasPermissionDTO> GetRolePermissionsbyid(RolepermissionsDTO RolePermissionDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetRolePermbyid(RolePermissionDTO, apiContext);
        }

        //fetching all roles
        public IEnumerable<MasPermissionDTO> GetAllPermissions(ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetAllPermissions(apiContext);
        }

        //fetching all dashboards
        public IEnumerable<MasPermissionDTO> GetDashboards(ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetDashboards(apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetReports(ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetReports(apiContext);
        }

        public DynamicReportResponse GetReportOnRoles(UserRoleReportDTO reportDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetReportOnRoles(reportDTO, apiContext);
        }

        public async Task<UserReportPermissionResponse> SaveAssignReports(UserRoleReportsDTO reportDTO, ApiContext apiContext)
        {
            return await _permissionService(apiContext.ProductType).SaveAssignReports(reportDTO, apiContext);
        }

        public async Task<DynamicReportResponse> GetReportByRole(RoleReportDTO reportDTO, ApiContext apiContext)
        {
            return await _permissionService(apiContext.ProductType).GetReportByRole(reportDTO, apiContext);
        }

        public DynamicGraphResponse GetGraphOnRoles(UserRoleGraphDTO reportDTO, ApiContext apiContext)
        {
            return _permissionService(apiContext.ProductType).GetGraphOnRoles(reportDTO, apiContext);
        }

        public async Task<UserGraphPermissionResponse> SaveAssignGraphs(UserRoleGraphsDTO reportDTO, ApiContext apiContext)
        {
            return await _permissionService(apiContext.ProductType).SaveAssignGraphs(reportDTO, apiContext);
        }

        public async Task<DynamicGraphResponse> GetGraphByRole(RoleGraphDTO reportDTO, ApiContext apiContext)
        {
            return await _permissionService(apiContext.ProductType).GetGraphByRole(reportDTO, apiContext);
        }
    }
}
