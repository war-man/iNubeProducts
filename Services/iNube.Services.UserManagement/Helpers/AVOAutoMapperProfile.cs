﻿using AutoMapper;
using iNube.Services.UserManagement.Entities.AVO;
using iNube.Services.UserManagement.Entities.MICACP;
using iNube.Services.UserManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Helpers
{
    public class AVOAutoMapperProfile : Profile
    {
        public AVOAutoMapperProfile()
        {
            CreateMap<LoginDTO, AspNetUsers>();
            CreateMap<AspNetUsers, LoginDTO>();

            CreateMap<UserDTO, AspNetUsers>()
            .ForMember(dest => dest.TblUserDetails, opt => opt.MapFrom(src => src.UserDetails))
            .ForMember(dest => dest.TblUserAddress, opt => opt.MapFrom(src => src.UserAddress)).ReverseMap();


            CreateMap<RolesDTO, AspNetRoles>();
            CreateMap<AspNetRoles, RolesDTO>();
            CreateMap<MasPermissionDTO, TblMasPermission>();
            CreateMap<TblMasPermission, MasPermissionDTO>();
            CreateMap<AspNetUserRoles, UserRolesDTO>();
            CreateMap<UserRolesDTO, AspNetUserRoles>();
            CreateMap<AspNetUserRoles, DistinctRoleDTO>();
            CreateMap<DistinctRoleDTO, AspNetUserRoles>();
            CreateMap<TblUserPermissions, UserPermissionsDTO>();
            CreateMap<UserPermissionsDTO, TblUserPermissions>();
            CreateMap<TblEmployees, EmployeeDTO>();
            CreateMap<EmployeeDTO, TblEmployees>();
            CreateMap<UserDetailsDTO, TblUserDetails>();
            CreateMap<TblUserDetails, UserDetailsDTO>();
            CreateMap<UserAddressDTO, TblUserAddress>();
            CreateMap<TblUserAddress, UserAddressDTO>();
            CreateMap<TblSendOtp, SendOtp>();
            CreateMap<SendOtp, TblSendOtp>();

            CreateMap<AspNetUsers, AspNetUsersDTO>();
            CreateMap<AspNetUsersDTO, AspNetUsers>();

            CreateMap<AspNetUsersDTO, AspNetUsers>()
            .ForMember(dest => dest.TblUserAddress, opt => opt.MapFrom(src => src.UserAddress))
            .ForMember(dest => dest.TblUserDetails, opt => opt.MapFrom(src => src.UserDetails))
            .ForMember(dest => dest.TblUserPermissions, opt => opt.MapFrom(src => src.UserPermissions)).ReverseMap();


            CreateMap<AspNetUserClaims, AspNetUserClaimsDTO>();
            CreateMap<AspNetUserClaimsDTO, AspNetUserClaims>();

            CreateMap<AspNetUserLogins, AspNetUserLoginsDTO>();
            CreateMap<AspNetUserLoginsDTO, AspNetUserLogins>();
            CreateMap<AspNetUserRoles, AspNetUserRolesDTO>();
            CreateMap<AspNetUserRolesDTO, AspNetUserRoles>();
            CreateMap<AspNetUserTokens, AspNetUserTokensDTO>();
            CreateMap<AspNetUserTokensDTO, AspNetUserTokens>();

            CreateMap<TblCustomerSettings, CustomerSettingsDTO>();
            CreateMap<CustomerSettingsDTO, TblCustomerSettings>();
            CreateMap<TblCustomerEnvironment, CustomerEnvironmentDTO>().ReverseMap();
        }

    }
}
