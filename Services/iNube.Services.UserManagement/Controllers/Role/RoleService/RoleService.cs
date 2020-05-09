using AutoMapper;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.Role.RoleService
{
    public interface IRoleService
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
    }
    public class RoleService : IRoleService
    {
        private MICAUMContext _context;
        private IMapper _mapper;
        private IEnumerable Permissions;
        private readonly Func<string, IRoleProductService> _roleService;

        public RoleService(Func<string, IRoleProductService> roleService, IMapper mapper)
        {
            _mapper = mapper;
            _roleService = roleService;
        }

        public IEnumerable<RolesDTO> GetRoles(ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).GetRoles(apiContext);
        }

        public IEnumerable<RolesDTO> GetRolePermissionsById(string roleid, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).GetRolePermissionsById(roleid, apiContext);
        }

        public UserRoleResponse AssignRole(UserRoleMapDTO userRoles, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).AssignRole(userRoles, apiContext);
        }

        public EmpRoleResponse UpdateEmpRole(EmpRoleMapDTO empRoles, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).UpdateEmpRole(empRoles, apiContext);
        }

        public IEnumerable<MasPermissionDTO> GetMasPermissions(string perType)
        {
            IEnumerable<TblMasPermission> _permissions = _context.TblMasPermission.Where(per => per.ItemType == perType);

            var _masPermissionDTOs = GetMenuMasPermissions(_permissions, perType);
            //IEnumerable<MasPermissionDTO> _masPermissionDTOs = _permissions
            //                .Where(c => (c.ParentId == 0 && c.ItemType == perType))
            //                .Select(c => new MasPermissionDTO()
            //                {
            //                    PermissionId = c.PermissionId,
            //                    ItemType = c.ItemType,
            //                    ParentId = c.ParentId,
            //                    MenuId = c.MenuId,
            //                    ItemDescription = c.ItemDescription,
            //                    Url = c.Url,
            //                    PathTo = c.PathTo,
            //                    Collapse = c.Collapse,
            //                    State = c.State,
            //                    Mini = c.Mini,
            //                    Component = c.Component,
            //                    ChildrenDTO = GetChildren(_permissions, c.PermissionId)
            //                });
            //IEnumerable<MasPermissionDTO> _masPermissionDTOs = _mapper.Map<IEnumerable<MasPermissionDTO>>(_permissions);
            return _masPermissionDTOs;
        }
        private IEnumerable<MasPermissionDTO> GetMenuMasPermissions(IEnumerable<TblMasPermission> _permissions, string perType)
        {

            IEnumerable<MasPermissionDTO> _masPermissionDTOs = _permissions
                            .Where(c => (c.ParentId == 0 && c.ItemType == perType))
                            .Select(c => new MasPermissionDTO()
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
                                Component = c.Component,
                                Children = GetChildren(_permissions, c.PermissionId)
                            });
            // IEnumerable<MasPermissionDTO> _masPermissionDTOs = _mapper.Map<IEnumerable<MasPermissionDTO>>(_permissions);
            return _masPermissionDTOs;
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
                        Component = c.Component,
                        Children = GetChildren(permissions, c.PermissionId)
                    });
            return masPermissionDTOs;
        }

        public IEnumerable<RolesDTO> GetUserRole(string userId, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).GetUserRole(userId, apiContext);
        }

        public IEnumerable<RolesDTO> GetAllUserRoles(string userId, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).GetAllUserRoles(userId, apiContext);
        }

        public RoleResponse CreateRole(RolesDTO role, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).CreateRole(role, apiContext);
        }

        public async Task<IEnumerable<DynamicResponse>> GetDynamicConfig(ApiContext apiContext)
        {
            return await _roleService(apiContext.ProductType).GetDynamicConfig(apiContext);
        }

        public IEnumerable<DynamicPermissionsDTO> GetDynamicPermissions(string Userid, string Roleid, string itemType, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).GetDynamicPermissions(Userid, Roleid, itemType, apiContext);
        }

        public DynamicResponseResponse SaveDynamicPermission(DynamicPermissions configDTO, ApiContext apiContext)
        {
            return _roleService(apiContext.ProductType).SaveDynamicPermission(configDTO, apiContext);
        }
    }
}
