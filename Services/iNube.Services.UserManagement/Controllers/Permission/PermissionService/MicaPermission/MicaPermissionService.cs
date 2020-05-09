using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.UserManagement.Controllers.CustomerProvisioning.IntegrationService;
using iNube.Services.UserManagement.Controllers.Permission.PermissionService;
using iNube.Services.UserManagement.Entities;
using iNube.Services.UserManagement.Helpers;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace iNube.Services.UserManagement.Controllers.Controllers.Permission.PermissionService.MicaPermission
{
    public class MicaPermissionService : IPermissionProductService
    {
        private MICAUMContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;

        public MicaPermissionService(IMapper mapper, IIntegrationService integrationService)
        {
            _integrationService = integrationService;
            _mapper = mapper;
        }

        #region Public Methods
        public IEnumerable<MasPermissionDTO> GetMasPermissions(string perType, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            IEnumerable<TblMasPermission> _permissions = _context.TblMasPermission.Where(per => per.ItemType == perType);
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = _mapper.Map<IEnumerable<MasPermissionDTO>>(_permissions);
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetUserPermissions(string perType, string userId, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var _roles = _context.AspNetUserRoles.Where(userrole => userrole.UserId == userId).Select(role => role.RoleId);

            IEnumerable<TblMasPermission> _permissions = from maspermission in _context.TblMasPermission
                                                         join permission in
                                                            (from rolepermission in _context.TblUserPermissions
                                                             where _roles.Contains(rolepermission.RoleId)
                                                             && rolepermission.UserorRole == "Role"
                                                             select rolepermission.PermissionId)
                                                                .Except(
                                                                        from userpermission in _context.TblUserPermissions
                                                                        where userpermission.UserId == userId
                                                                        && userpermission.UserorRole == "User"
                                                                        select userpermission.PermissionId
                                                                        ) on maspermission.PermissionId equals permission.Value
                                                         where maspermission.ItemType == perType
                                                         select maspermission;

            IEnumerable<MasPermissionDTO> _masPermissionDTOs = _mapper.Map<IEnumerable<MasPermissionDTO>>(_permissions);
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetPermissions(string perType, string userId, string roleId, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            IEnumerable<TblMasPermission> _permissions = from maspermission in _context.TblMasPermission
                                                         join permission in
                                                            (from rolepermission in _context.TblUserPermissions
                                                             where rolepermission.RoleId == roleId
                                                             && rolepermission.UserorRole == "Role"
                                                             select rolepermission.PermissionId)
                                                                .Except(
                                                                        from userpermission in _context.TblUserPermissions

                                                                        where userpermission.UserId == userId
                                                                        && userpermission.UserorRole == "User"
                                                                        select userpermission.PermissionId
                                                                        ) on maspermission.PermissionId equals permission.Value
                                                         where maspermission.ItemType == perType
                                                         orderby maspermission.SortOrderBy ascending
                                                         select maspermission;

            IEnumerable<MasPermissionDTO> _masPermissionDTOs = _permissions
                            .Where(c => (c.ParentId == 0))
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
                                Icon = c.Icon,
                                Redirect = c.Redirect,
                                Component = c.Component,
                                Children = GetChildren(_permissions, c.PermissionId)
                            });
            // 
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleReports(string userId, string roleId, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            IEnumerable<TblMasPermission> _permissions = from maspermission in _context.TblMasPermission
                                                         join permission in
                                                            (from rolepermission in _context.TblUserPermissions
                                                             where rolepermission.RoleId == roleId
                                                             && rolepermission.UserorRole == "Role"
                                                             select rolepermission.PermissionId)
                                                                .Except(
                                                                        from userpermission in _context.TblUserPermissions

                                                                        where userpermission.UserId == userId
                                                                        && userpermission.UserorRole == "User"
                                                                        select userpermission.PermissionId
                                                                        ) on maspermission.PermissionId equals permission.Value
                                                         where maspermission.ItemType == "Reports"
                                                         orderby maspermission.SortOrderBy ascending
                                                         select maspermission;

            IEnumerable<MasPermissionDTO> _masPermissionDTOs = _permissions
                            .Where(c => (c.ParentId == 0))
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
                                Icon = c.Icon,
                                Redirect = c.Redirect,
                                mID = c.PermissionId,
                                mValue = c.ItemDescription,
                                mType = c.ItemType,
                                Component = c.Component,
                                Children = GetChildren(_permissions, c.PermissionId)
                            });
            // 
            return _masPermissionDTOs;
        }

        /// <summary>
        /// Assigns the permission.
        /// </summary>
        /// <param name="permissionIds">The permission ids.</param>
        /// <param name="apiContext">The API context.</param>
        /// <returns></returns>
        public UserPermissionResponse AssignPermission(UserPermissionDTO permissionIds, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            UserPermissionsDTO userPermissions = null;
            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DatetimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);

            for (int i = 0; i < permissionIds.PermissionIds.Length; i++)
            {
                userPermissions = new UserPermissionsDTO();
                userPermissions.UserId = permissionIds.UserId;
                userPermissions.PermissionId = Convert.ToInt16(permissionIds.PermissionIds[i]);
                userPermissions.UserorRole = "User";
                // userPermissions.CreatedBy = CreatedBy;
                userPermissions.CreatedBy = apiContext.UserId;
                userPermissions.CreatedDate = DatetimeNow;
                userPermissions.Status = true;
                var _usersPer = _mapper.Map<TblUserPermissions>(userPermissions);
                _context.TblUserPermissions.Add(_usersPer);
            }
            _context.SaveChanges();
            //return userPermissions;
            return new UserPermissionResponse { Status = BusinessStatus.Created, perm = userPermissions, ResponseMessage = $"Assigned {userPermissions.PermissionId} Permissions successfully!!" };

        }

        /// <summary>
        /// Saves the assign permission.
        /// </summary>
        /// <param name="permissionIds">The permission ids.</param>
        /// <param name="apiContext">The API context.</param>
        /// <returns></returns>
        public UserPermissionResponse SaveAssignPermission(UserRolesPermissionDTO permissionIds, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            TblUserPermissions userPermissions = null;
            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DatetimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);

            foreach (var item in permissionIds.RolePermissionIds)
            {
                var newPermission = item.PermissionIds.ToList();
                var existingPerm = _context.TblUserPermissions.Where(t => t.UserId == permissionIds.UserId && t.UserorRole == "User" && t.RoleId == item.RoleId).ToList();
                //Delete which are not in current permissions--
                var delPermission = existingPerm.Where(m => !item.PermissionIds.Contains((int)m.PermissionId)).ToList();
                foreach (var perm in delPermission)
                {
                    _context.Remove(perm);
                    existingPerm.Remove(perm);
                }
                var includedPermission = existingPerm.Where(m => item.PermissionIds.Contains((int)m.PermissionId)).ToList();
                foreach (var incPerm in includedPermission)
                {
                    newPermission.Remove((int)incPerm.PermissionId);
                }
                //Add new record
                foreach (var permissionId in newPermission)
                {
                    userPermissions = new TblUserPermissions();
                    userPermissions.UserId = permissionIds.UserId;
                    userPermissions.PermissionId = permissionId;
                    userPermissions.RoleId = item.RoleId;
                    userPermissions.UserorRole = "User";
                    // userPermissions.CreatedBy = CreatedBy;
                    userPermissions.CreatedDate = DatetimeNow;
                    userPermissions.Status = true;
                    _context.TblUserPermissions.Add(userPermissions);
                }

            }

            _context.SaveChanges();
            return new UserPermissionResponse { Status = BusinessStatus.Created, Id = userPermissions?.UserPermissionsId.ToString(), ResponseMessage = $"Assigned Permissions successfully!!" };

        }

        public IEnumerable<MasPermissionDTO> GetRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            return GetChildRolePermissions(userPermissionDTO, apiContext);
        }

        #endregion

        public IEnumerable<MasPermissionDTO> GetUserRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => userPermissionDTO.RoleId.Contains(r.Id)).ToList();
            var menuPermission = (from permission in _context.TblUserPermissions
                                  join c in _context.TblMasPermission on permission.PermissionId equals c.PermissionId
                                  where userPermissionDTO.RoleId.Contains(permission.RoleId) && c.ItemType != "Dashboard"
                                   && permission.UserorRole == "Role"
                                  select new MasPermissionDTO
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
                                      Status = true,
                                      RoleId = permission.RoleId,
                                      RoleName = ruleNames.First(r => r.Id == permission.RoleId).Name
                                  }).ToList();

            var userPermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.UserId == userPermissionDTO.UserId
                                  && permission.UserorRole == "User"
                                  select permission;

            if (userPermissions.Any())
            {
                foreach (var item in userPermissions)
                {
                    var mPermission = menuPermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = false;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleDashboard(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => userPermissionDTO.RoleId.Contains(r.Id)).ToList();
            var menuPermission = (from permission in _context.TblUserPermissions
                                  join c in _context.TblMasPermission on permission.PermissionId equals c.PermissionId
                                  where userPermissionDTO.RoleId.Contains(permission.RoleId) && c.ItemType == "Dashboard"
                                   && permission.UserorRole == "Role"
                                  select new MasPermissionDTO
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
                                      Status = true,
                                      RoleId = permission.RoleId,
                                      RoleName = ruleNames.First(r => r.Id == permission.RoleId).Name
                                  }).ToList();

            var userPermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.UserId == userPermissionDTO.UserId
                                  && permission.UserorRole == "User"
                                  select permission;

            if (userPermissions.Any())
            {
                foreach (var item in userPermissions)
                {
                    var mPermission = menuPermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = false;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetUserRoleReports(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => userPermissionDTO.RoleId.Contains(r.Id)).ToList();
            var menuPermission = (from permission in _context.TblUserPermissions
                                  join c in _context.TblMasPermission on permission.PermissionId equals c.PermissionId
                                  where userPermissionDTO.RoleId.Contains(permission.RoleId) && c.ItemType == "Reports"
                                   && permission.UserorRole == "Role"
                                  select new MasPermissionDTO
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
                                      Status = true,
                                      RoleId = permission.RoleId,
                                      RoleName = ruleNames.First(r => r.Id == permission.RoleId).Name
                                  }).ToList();

            var userPermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.UserId == userPermissionDTO.UserId
                                  && permission.UserorRole == "User"
                                  select permission;

            if (userPermissions.Any())
            {
                foreach (var item in userPermissions)
                {
                    var mPermission = menuPermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = false;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> Roledashboard(RoleDashDTO roleDashDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => roleDashDTO.RoleId.Contains(r.Id)).ToList();
            var menuPermission = _context.TblMasPermission.Where(r => r.ItemType == "Dashboard")
                .Select(c => new MasPermissionDTO
                {
                    PermissionId = c.PermissionId,
                    mID = c.PermissionId,
                    ItemType = c.ItemType,
                    ParentId = c.ParentId,
                    MenuId = c.MenuId,
                    mValue = c.ItemDescription,
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
                    Status = false,
                    RoleId = roleDashDTO.RoleId,
                    RoleName = ruleNames.First(r => r.Id == roleDashDTO.RoleId).Name
                }
                ).ToList();

            var dashPermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.RoleId == roleDashDTO.RoleId
                                  && permission.UserorRole == "Role"
                                  select permission;

            if (dashPermissions.Any())
            {
                foreach (var item in dashPermissions)
                {
                    var mPermission = menuPermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = true;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetRoleReports(RoleDashDTO roleDashDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => roleDashDTO.RoleId.Contains(r.Id)).ToList();
            var menuPermission = _context.TblMasPermission.Where(r => r.ItemType == "Reports")
                .Select(c => new MasPermissionDTO
                {
                    PermissionId = c.PermissionId,
                    mID = c.PermissionId,
                    ItemType = c.ItemType,
                    ParentId = c.ParentId,
                    MenuId = c.MenuId,
                    mValue = c.ItemDescription,
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
                    Status = false,
                    RoleId = roleDashDTO.RoleId,
                    RoleName = ruleNames.First(r => r.Id == roleDashDTO.RoleId).Name
                }
                ).ToList();

            var dashPermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.RoleId == roleDashDTO.RoleId
                                  && permission.UserorRole == "Role"
                                  select permission;

            if (dashPermissions.Any())
            {
                foreach (var item in dashPermissions)
                {
                    var mPermission = menuPermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = true;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetRolePermbyid(RolepermissionsDTO RolePermissionDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => RolePermissionDTO.RoleId.Contains(r.Id)).ToList();
            var menupermission = _context.TblMasPermission.Where(r => r.ItemType == "Menu")
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
                    Status = false,
                    RoleId = RolePermissionDTO.RoleId,
                    RoleName = ruleNames.FirstOrDefault(r => r.Id == RolePermissionDTO.RoleId).Name
                }).ToList();

            var rolePermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.RoleId == RolePermissionDTO.RoleId
                                  && permission.UserorRole == "Role"
                                  select permission;

            if (rolePermissions.Any())
            {
                foreach (var item in rolePermissions)
                {
                    var mPermission = menupermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = true;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menupermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menupermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetAllPermissions(ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var menupermission = _context.TblMasPermission.Where(r => r.ItemType == "Menu")
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
                    Status = false,
                }).ToList();

            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menupermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menupermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        #region Private Method
        private IEnumerable<MasPermissionDTO> GetChildRolePermissions(UserRoleMapDTO userPermissionDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => userPermissionDTO.RoleId.Contains(r.Id)).ToList();
            var menuPermission = (from permission in _context.TblUserPermissions
                                  join c in _context.TblMasPermission on permission.PermissionId equals c.PermissionId
                                  where userPermissionDTO.RoleId.Contains(permission.RoleId)
                                   && permission.UserorRole == "Role"
                                  select new MasPermissionDTO
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
                                      Status = true,
                                      RoleId = permission.RoleId,
                                      RoleName = ruleNames.First(r => r.Id == permission.RoleId).Name
                                  }).ToList();

            var userPermissions = from c in _context.TblMasPermission
                                  join permission in _context.TblUserPermissions on c.PermissionId equals permission.PermissionId
                                  where permission.UserId == userPermissionDTO.UserId
                                  && permission.UserorRole == "User"
                                  select permission;

            if (userPermissions.Any())
            {
                foreach (var item in userPermissions)
                {
                    var mPermission = menuPermission.FirstOrDefault(m => m.PermissionId == item.PermissionId && m.RoleId == item.RoleId);
                    if (mPermission != null)
                    {
                        mPermission.Status = false;
                    }
                }
            }
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
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

        public NewRolePermissionResponse AssignRolePermission(NewRolesPermissionDTO permissionIds, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            TblUserPermissions newRolePermissions = null;

            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DatetimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);

            var permission = _context.TblUserPermissions.Where(p => p.RoleId == permissionIds.RoleId).Select(p => p);
            if (permission != null)
            {
                var existingPerm = _context.TblUserPermissions.Where(r => r.RoleId == permissionIds.RoleId && r.UserorRole == "Role").ToList();
                //Delete which are not in current permissions--
                var delPermission = existingPerm.Where(m => m.RoleId == permissionIds.RoleId && m.UserorRole == "Role").ToList();
                foreach (var perm in delPermission)
                {
                    _context.TblUserPermissions.Remove(perm);
                }
            }

            foreach (var permissionId in permissionIds.PermissionIds)
            {
                newRolePermissions = new TblUserPermissions();
                newRolePermissions.PermissionId = permissionId;
                newRolePermissions.RoleId = permissionIds.RoleId;
                newRolePermissions.UserorRole = "Role";
                // userPermissions.CreatedBy = CreatedBy;
                newRolePermissions.CreatedDate = DatetimeNow;
                newRolePermissions.Status = true;
                _context.TblUserPermissions.Add(newRolePermissions);
            }
            //foreach (var item in permissionIds.RolePermissionIds)
            //{
            //    var newPermission = item.PermissionIds.ToList();
            //    var existingPerm = _context.TblUserPermissions.Where(t => t.RoleId == permissionIds.RoleId && t.UserorRole == "Role").ToList();
            //    //Delete which are not in current permissions--
            //    var delPermission = existingPerm.Where(m => !item.PermissionIds.Contains((int)m.PermissionId)).ToList();
            //    foreach (var perm in delPermission)
            //    {
            //        _context.Remove(perm);
            //        existingPerm.Remove(perm);
            //    }
            //    var includedPermission = existingPerm.Where(m => item.PermissionIds.Contains((int)m.PermissionId)).ToList();
            //    foreach (var incPerm in includedPermission)
            //    {
            //        newPermission.Remove((int)incPerm.PermissionId);
            //    }
            //Add new record

            //}
            _context.SaveChanges();
            return new NewRolePermissionResponse { Status = BusinessStatus.Created, Id = newRolePermissions?.UserPermissionsId.ToString(), ResponseMessage = $"Assigned Permissions successfully!!" };
        }

        public IEnumerable<MasPermissionDTO> GetReports(ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var menuPermission = _context.TblMasPermission.Where(r => r.ItemType == "Reports")
                .Select(c => new MasPermissionDTO
                {
                    PermissionId = c.PermissionId,
                    mID = c.PermissionId,
                    ItemType = c.ItemType,
                    ParentId = c.ParentId,
                    MenuId = c.MenuId,
                    mValue = c.ItemDescription,
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
                    Status = false,
                    //RoleId = permission.RoleId,
                    //RoleName = ruleNames.First(r => r.Id == permission.RoleId).Name
                }
                ).ToList();
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public IEnumerable<MasPermissionDTO> GetDashboards(ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var menuPermission = _context.TblMasPermission.Where(r => r.ItemType == "Dashboard")
                .Select(c => new MasPermissionDTO
                {
                    PermissionId = c.PermissionId,
                    mID = c.PermissionId,
                    ItemType = c.ItemType,
                    ParentId = c.ParentId,
                    MenuId = c.MenuId,
                    mValue = c.ItemDescription,
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
                    Status = false,
                    //RoleId = permission.RoleId,
                    //RoleName = ruleNames.First(r => r.Id == permission.RoleId).Name
                }
                ).ToList();
            IEnumerable<MasPermissionDTO> _masPermissionDTOs = menuPermission
                           .Where(c => (c.ParentId == 0))
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
                               Icon = c.Icon,
                               Redirect = c.Redirect,
                               Component = c.Component,
                               Status = c.Status,
                               RoleId = c.RoleId,
                               RoleName = c.RoleName,
                               Children = GetMenuChildren(menuPermission, c.PermissionId, c.RoleId)
                           });
            return _masPermissionDTOs;
        }

        public DynamicReportResponse GetReportOnRoles(UserRoleReportDTO reportDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            var ruleNames = _context.AspNetRoles.Where(r => reportDTO.RoleId.Contains(r.Id)).ToList();

            DynamicReportResponse dynamicrpt = new DynamicReportResponse();
            foreach (var item in reportDTO.RoleId)
            {
                var reports = _context.TblDynamicPermissions.Where(a => item.Contains(a.Roleid))
                .Select(b => b).ToList();

                DynamicResponse dynamic = new DynamicResponse();
                List<RPermissionDTO> list = new List<RPermissionDTO>();
                var result = reports.Select(c => new RPermissionDTO
                {
                    mID = Convert.ToInt32(c.DynamicId),
                    mValue = c.DynamicName,
                    Label = c.DynamicName,
                    Collapse = "false",
                    Status = true,
                    Children = list,
                    Roleid = c.Roleid,
                    Userid = c.Userid,
                    UserorRole = c.UserorRole,
                    mType = c.DynamicType,
                    RoleName = ruleNames.FirstOrDefault(r => r.Id == item).Name
                }).ToList();

                var userreports = result.Where(a => item.Contains(a.Roleid) && a.Userid == reportDTO.UserId && a.UserorRole == "User")
                .Select(b => b).ToList();

                if (userreports.Any())
                {
                    foreach (var item1 in userreports)
                    {
                        var rpermission = result.FirstOrDefault(a => a.mID == item1.mID/*&& a.Roleid == item.RoleId*/);
                        if (rpermission != null)
                        {
                            rpermission.Status = false;
                        }
                    }
                }

                if (result.Count != 0)
                {
                    dynamic.name = ruleNames.FirstOrDefault(r => r.Id == item).Name;
                    dynamic.mdata.AddRange(result);
                    dynamicrpt.DynamicResponse.Add(dynamic);
                }
            }
            return dynamicrpt;
        }

        public async Task<DynamicReportResponse> GetReportByRole(RoleReportDTO reportDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            var data = _context.TblDynamicConfig.FirstOrDefault(a => a.ItemType == "Report");
            var rresponse = await _integrationService.GetReportNameForPermissionsDetails(data.Url, apiContext);
            var ruleNames = _context.AspNetRoles.FirstOrDefault(r => r.Id == reportDTO.RoleId);
            DynamicReportResponse dynamicrpt = new DynamicReportResponse();
            DynamicResponse respon = new DynamicResponse();
            List<RPermissionDTO> list = new List<RPermissionDTO>();
            var resddto = rresponse.Select(a => new RPermissionDTO
            {
                mID = a.mID,
                mValue = a.mValue,
                Label = a.mValue,
                Collapse = "false",
                Status = false,
                Children = list,
                mType = data.ItemType,
            }).ToList();

            var response = _context.TblDynamicPermissions.Where(a => a.Roleid == reportDTO.RoleId && a.UserorRole == "Role").Select(b => b).ToList();
            if (response.Any())
            {
                foreach (var item1 in response)
                {
                    var rpermission = resddto.FirstOrDefault(a => a.mID == item1.DynamicId/*&& a.Roleid == item.RoleId*/);
                    if (rpermission != null)
                    {
                        rpermission.Status = true;
                    }
                }
            }
            respon.name = ruleNames.Name;
            respon.mdata.AddRange(resddto);
            dynamicrpt.DynamicResponse.Add(respon);
            //DynamicResponse dynamic = new DynamicResponse();
            //List<RPermissionDTO> list = new List<RPermissionDTO>();
            return dynamicrpt;
        }

        public async Task<UserReportPermissionResponse> SaveAssignReports(UserRoleReportsDTO reportDTO, ApiContext apiContext)
        {
            _context = (MICAUMContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            CustomerSettingsDTO UserDateTime = DbManager.GetCustomerSettings("TimeZone", apiContext);
            DbManager._TimeZone = UserDateTime.KeyValue;
            DateTime DatetimeNow = DbManager.GetDateTimeByZone(DbManager._TimeZone);

            var data = _context.TblDynamicConfig.FirstOrDefault(a => a.ItemType == "Report");
            var rresponse = await _integrationService.GetReportNameForPermissionsDetails(data.Url, apiContext);

            TblDynamicPermissions reportPermissions = null;
            foreach (var item in reportDTO.RolePermissionIds)
            {
                var newPermission = item.PermissionIds.ToList();
                var existingPerm = _context.TblDynamicPermissions.Where(t => t.Userid == reportDTO.UserId && t.UserorRole == "User" && t.Roleid == item.RoleId).ToList();
                //Delete which are not in current permissions--
                var delPermission = existingPerm.Where(m => !item.PermissionIds.Contains((int)m.DynamicId)).ToList();
                foreach (var perm in delPermission)
                {
                    _context.Remove(perm);
                    existingPerm.Remove(perm);
                }
                var includedPermission = existingPerm.Where(m => item.PermissionIds.Contains((int)m.DynamicId)).ToList();
                foreach (var incPerm in includedPermission)
                {
                    newPermission.Remove((int)incPerm.DynamicId);
                }
                //Add new record
                foreach (var permissionId in newPermission)
                {
                    reportPermissions = new TblDynamicPermissions();
                    reportPermissions.Userid = reportDTO.UserId;
                    reportPermissions.DynamicId = permissionId;
                    reportPermissions.IsActive = true;
                    reportPermissions.DynamicType = data.ItemType;
                    reportPermissions.DynamicName = rresponse.FirstOrDefault(a => a.mID == permissionId).mValue;
                    reportPermissions.Roleid = item.RoleId;
                    reportPermissions.UserorRole = "User";
                    reportPermissions.CreatedBy = apiContext.UserId;
                    reportPermissions.CreatedDate = DatetimeNow;

                    _context.TblDynamicPermissions.Add(reportPermissions);
                }
            }
            _context.SaveChanges();
            return new UserReportPermissionResponse { Status = BusinessStatus.Created, ResponseMessage = $"Report permissions assigned successfully!!" };
        }
        #endregion
    }
}
