﻿using AutoMapper;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.Permission.PermissionService
{
    public interface IPermissionProductService
    {
        IEnumerable<MasPermissionDTO> GetMasPermissions(string perType, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetUserPermissions(string perType, string userId, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetPermissions(string perType, string userId, string roleId, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetUserRoleReports(string userId, string roleId, ApiContext apiContext);
        UserPermissionResponse AssignPermission(UserPermissionDTO permissionIds, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext);
        UserPermissionResponse SaveAssignPermission(UserRolesPermissionDTO permissionIds, ApiContext apiContext);
        NewRolePermissionResponse AssignRolePermission(NewRolesPermissionDTO permissionIds, ApiContext apiContext);
        DynamicReportResponse GetReportOnRoles(UserRoleReportDTO reportDTO, ApiContext apiContext);
        Task<UserReportPermissionResponse> SaveAssignReports(UserRoleReportsDTO reportDTO, ApiContext apiContext);
        Task<DynamicReportResponse> GetReportByRole(RoleReportDTO reportDTO, ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetDashboards(ApiContext apiContext);
        IEnumerable<MasPermissionDTO> GetReports(ApiContext apiContext);
    }
}
