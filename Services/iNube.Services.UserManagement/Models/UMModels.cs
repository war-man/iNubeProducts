using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Models
{

    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }

    }

    public partial class EnvDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public string Url { get; set; }
    }

    public partial class LocationDTO
    {
        public string locationType { get; set; }
    }

    public partial class CountryDTO : LocationDTO
    {
        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class StateDTO : LocationDTO
    {
        public int StateId { get; set; }
        public int? CountryId { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class DistrictDTO : LocationDTO
    {
        public int DistrictId { get; set; }
        public int? StateId { get; set; }
        public string DistrictCode { get; set; }
        public string DistrictName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class CityDTO : LocationDTO
    {
        public int CityId { get; set; }
        public int? DistrictId { get; set; }
        public string CityCode { get; set; }
        public string Pincode { get; set; }
        public string CityName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class PinCodeDTO : LocationDTO
    {
        public int PincodeId { get; set; }
        public int? CityId { get; set; }
        public string Pincode { get; set; }
        public string AreaName { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public string ExternalRefCode { get; set; }
    }

    public partial class UMcommonTypesDTO
    {
        public int CommonTypeId { get; set; }
        public string MasterType { get; set; }
        public string TypeCode { get; set; }
        public string Value { get; set; }
    }

    public class LoginDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ProductType { get; set; }
        public string ServerType { get; set; }
        public decimal EnvId { get; set; }
    }

    public class LoginResponse : ResponseStatus
    {
        public string Token { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public bool IsMale { get; set; }
        public int? FirstTimeLogin { get; set; }
        public byte[] ProfileImage { get; set; }
        public bool PasswordExpire { get; set; }
    }

    public class SendOtpResponse : ResponseStatus
    {
        public SendOtp sendOtp { get; set; }
    }

    public class VerifyOTPResponse : ResponseStatus
    {
        public VerifyOTP verifyotp { get; set; }
    }

    public partial class VerifyOTP
    {
        public string Otp { get; set; }
        public string UserId { get; set; }
        public decimal EnvId { get; set; }
        public string ProductType { get; set; }
    }

    public partial class SendOtp
    {
        public decimal Id { get; set; }
        public string UserId { get; set; }
        public string Otp { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public decimal EnvId { get; set; }
        public string ProductType { get; set; }
    }

    public class PasswordResponse : ResponseStatus
    {
        public Password passwd { get; set; }
    }

    public partial class Password
    {
        public string Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
        public bool IsChangePassword { get; set; }
        public string ProductType { get; set; }
        public decimal EnvId { get; set; }
    }

    public class UserDTO
    {
        public UserDTO()
        {
            UserDetails = new List<UserDetailsDTO>();
            UserAddress = new List<UserAddressDTO>();
        }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public byte[] PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public int? FirstTimeLogin { get; set; }
        public decimal CustomerID { get; set; }
        public decimal EnvId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? LastPasswordChanged { get; set; }

        public virtual ICollection<UserDetailsDTO> UserDetails { get; set; }
        public virtual ICollection<UserAddressDTO> UserAddress { get; set; }
    }

    public class UserLoginResponse : ResponseStatus
    {
        public UserLoginType userLogin { get; set; }
    }

    public partial class UserLoginType
    {
        public UserLoginType()
        {
            EnvironmentDTOs = new List<EnvDTO>();
        }

        public string UserType { get; set; }
        public string LoginProvider { get; set; }
        public int? IsFirstTimeLogin { get; set; }
        public decimal Id { get; set; }
        public decimal? CustomerId { get; set; }
        public string EnvName { get; set; }
        public string Name { get; set; }
        public string Dbconnection { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public string Product { get; set; }
        public bool? IsActive { get; set; }
        public byte[] CompanyLogo { get; set; }
        public string Url { get; set; }

        public List<EnvDTO> EnvironmentDTOs { get; set; }
    }

    public class UserResponse : ResponseStatus
    {
        public UserDTO users { get; set; }
    }

    public class RoleResponse : ResponseStatus
    {
        public RolesDTO roles { get; set; }
    }
    public partial class RolesDTO
    {
        public string Id { get; set; }
        public string mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string NormalizedName { get; set; }
        public string ConcurrencyStamp { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public string Value { get; set; }
    }

    public partial class UserLoginsDTO
    {
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public string ProviderDisplayName { get; set; }
        public string UserId { get; set; }
    }

    public partial class UserTokensDTO
    {
        public string UserId { get; set; }
        public string LoginProvider { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public partial class UserSearchDTO
    {
        // public string UserId { get; set; }
        public string FirstName { get; set; }
        public string EmployeeNumber { get; set; }
        public string ContactNumber { get; set; }
        public string PanNo { get; set; }
        public string EmailId { get; set; }
        public int? PartnerId { get; set; }
        public int? Status { get; set; }
    }

    public partial class UserDetailsDTO
    {
        public decimal NodeId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public decimal? UserParentId { get; set; }
        public bool? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Locked { get; set; }
        public string LockedReason { get; set; }
        public DateTime? LockStartDate { get; set; }
        public DateTime? LockEndDate { get; set; }
        public bool? LockMechanism { get; set; }
        public decimal? OfficeId { get; set; }
        public string RoleId { get; set; }
        public int? SalutationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string EmployeeNumber { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? Doj { get; set; }
        public int? GenderId { get; set; }
        public string Email { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicenceNumber { get; set; }
        public string ContactNumber { get; set; }
        public int? UserTypeId { get; set; }
        public string PanNo { get; set; }
        public DateTime? LastLoginDateTime { get; set; }
        public bool? IsIos { get; set; }
        public bool? IsAndroid { get; set; }
        public bool? IsWindows { get; set; }
        public bool? IsPasswordChanged { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? PartnerId { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string Designation { get; set; }
        public int? MaritalStatusId { get; set; }
        public byte[] ProfileImage { get; set; }
        public string PartnerName { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool Userlocked { get; set; }
    }

    public partial class ImageDTO
    {
        public string UserId { get; set; }
        public byte[] Document { get; set; }
        public string DocumentName { get; set; }
        public string DocumentType { get; set; }
    }

    public partial class UserAddressDTO
    {
        public decimal UserAddressId { get; set; }
        public string Id { get; set; }
        public string UserAddressType { get; set; }
        public int? UserCountryId { get; set; }
        public int? UserStateId { get; set; }
        public int? UserDistrictId { get; set; }
        public int? UserCityId { get; set; }
        public string UserAddressLine1 { get; set; }
        public string UserAddressLine2 { get; set; }
        public string UserAddressLine3 { get; set; }
        public int? UserPincodeId { get; set; }
    }

    public partial class UserPermissionDTO
    {
        public string UserId { get; set; }
        public string[] PermissionIds { get; set; }
    }
    public partial class UserRolesPermissionDTO
    {
        public UserRolesPermissionDTO()
        {
            RolePermissionIds = new List<RolesPermissionDTO>();
        }
        public string UserId { get; set; }
        public List<RolesPermissionDTO> RolePermissionIds { get; set; }
    }

    public class NewRolePermissionResponse : ResponseStatus
    {
        public NewRolesPermissionDTO perm { get; set; }
    }

    public partial class NewRolesPermissionDTO
    {
        public string RoleId { get; set; }
        public int[] PermissionIds { get; set; }
    }

    public partial class RolesPermissionDTO
    {
        public string RoleId { get; set; }
        public int[] PermissionIds { get; set; }
    }
    public partial class UserRolePermissionDTO
    {
        public string UserId { get; set; }
        public string[] RoleIds { get; set; }
        public string PerType { get; set; }
    }
    public partial class MasPermissionDTO
    {
        public int PermissionId { get; set; }
        public Guid? AppId { get; set; }
        public string ItemType { get; set; }
        public int? ParentId { get; set; }
        public int? MenuId { get; set; }
        public string ItemDescription { get; set; }
        public String Label { get; set; }
        public string Url { get; set; }
        public string PathTo { get; set; }
        public string Collapse { get; set; }
        public string Redirect { get; set; }
        public string State { get; set; }
        public string Mini { get; set; }
        public string Component { get; set; }
        public bool? Status { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? ItemId { get; set; }
        public bool? IsDeleted { get; set; }
        public string ControllerDesc { get; set; }
        public string ActionDesc { get; set; }
        public string Icon { get; set; }
        public int? Level { get; set; }
        public string Parameter { get; set; }
        public bool? HasFunctional { get; set; }
        public bool? HasFinancial { get; set; }
        public string RoleName { get; set; }
        public string RoleId { get; set; }
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }

        public virtual IEnumerable<MasPermissionDTO> Children { get; set; }
    }

    public partial class DashboardsMasPermissionDTO
    {
        public int PermissionId { get; set; }
        public Guid? AppId { get; set; }
        public string ItemType { get; set; }
        public int? ParentId { get; set; }
        public int? MenuId { get; set; }
        public string ItemDescription { get; set; }
        public String Label { get; set; }
        public string Url { get; set; }
        public string PathTo { get; set; }
        public string Collapse { get; set; }
        public string Redirect { get; set; }
        public string State { get; set; }
        public string Mini { get; set; }
        public string Component { get; set; }
        public bool? Status { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public decimal? ItemId { get; set; }
        public bool? IsDeleted { get; set; }
        public string ControllerDesc { get; set; }
        public string ActionDesc { get; set; }
        public string Icon { get; set; }
        public int? Level { get; set; }
        public string Parameter { get; set; }
        public bool? HasFunctional { get; set; }
        public bool? HasFinancial { get; set; }
        public string RoleName { get; set; }
        public string RoleId { get; set; }
        public int mID { get; set; }
        public string mValue { get; set; }


        public virtual IEnumerable<MasPermissionDTO> Children { get; set; }
    }

    public partial class UserPermissionsDTO
    {
        public decimal UserPermissionsId { get; set; }
        public int? PermissionId { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public string UserorRole { get; set; }
        public int? SerialNo { get; set; }
        public bool? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    public class UserPermissionResponse : ResponseStatus
    {
        public UserPermissionsDTO perm { get; set; }
    }

    public partial class UserRolesDTO
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }

    }

    public partial class DistinctRoleDTO
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }

    }

    public partial class UserRoleMapDTO
    {
        public string UserId { get; set; }
        public string[] RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public class EmpRoleResponse : ResponseStatus
    {
        public EmpRoleMapDTO role { get; set; }
    }

    public partial class EmpRoleMapDTO
    {
        public string Empcode { get; set; }
        public string[] RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public partial class RoleDashDTO
    {
        public string RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public partial class RolepermissionsDTO
    {
        public string RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public class UserRoleResponse : ResponseStatus
    {
        public UserRoleMapDTO role { get; set; }
    }

    public partial class EmployeeDTO
    {
        public int Empid { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public decimal? UserParentId { get; set; }
        public bool? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Locked { get; set; }
        public string LockedReason { get; set; }
        public DateTime? LockStartDate { get; set; }
        public DateTime? LockEndDate { get; set; }
        public bool? LockMechanism { get; set; }
        public decimal? OfficeId { get; set; }
        public string RoleId { get; set; }
        public int? SalutationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int? PincodeId { get; set; }
        public string EmployeeNumber { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? Doj { get; set; }
        public int? GenderId { get; set; }
        public string Email { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicenceNumber { get; set; }
        public string ContactNumber { get; set; }
        public int? UserTypeId { get; set; }
        public string PanNo { get; set; }
        public DateTime? LastLoginDateTime { get; set; }
        public bool? IsIos { get; set; }
        public bool? IsAndroid { get; set; }
        public bool? IsWindows { get; set; }
        public bool? IsPasswordChanged { get; set; }
        public string LandLineOffice { get; set; }
        public string LandLineResidence { get; set; }
        public decimal? PartnerId { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string Designation { get; set; }
        public int? MaritalStatusId { get; set; }

    }
    public class EmailTest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public class UserEmailResponse : ResponseStatus
    {
        public EmailTest emailvalidation { get; set; }
    }

    //AspNetUser
    public partial class AspNetUsersDTO
    {
        public AspNetUsersDTO()
        {
            AspNetUserClaims = new HashSet<AspNetUserClaimsDTO>();
            AspNetUserLogins = new HashSet<AspNetUserLoginsDTO>();
            AspNetUserRoles = new HashSet<AspNetUserRolesDTO>();
            AspNetUserTokens = new HashSet<AspNetUserTokensDTO>();
            UserAddress = new HashSet<UserAddressDTO>();
            UserDetails = new HashSet<UserDetailsDTO>();
            UserPermissions = new HashSet<UserPermissionsDTO>();
        }

        public string Id { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public byte[] PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public int? FirstTimeLogin { get; set; }
        public DateTime? LastPasswordChanged { get; set; }

        public virtual ICollection<AspNetUserClaimsDTO> AspNetUserClaims { get; set; }
        public virtual ICollection<AspNetUserLoginsDTO> AspNetUserLogins { get; set; }
        public virtual ICollection<AspNetUserRolesDTO> AspNetUserRoles { get; set; }
        public virtual ICollection<AspNetUserTokensDTO> AspNetUserTokens { get; set; }
        public virtual ICollection<UserAddressDTO> UserAddress { get; set; }
        public virtual ICollection<UserDetailsDTO> UserDetails { get; set; }
        public virtual ICollection<UserPermissionsDTO> UserPermissions { get; set; }
    }
    public partial class AspNetUserLoginsDTO
    {
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public string ProviderDisplayName { get; set; }
        public string UserId { get; set; }

        public virtual AspNetUsersDTO User { get; set; }
    }
    public partial class AspNetUserClaimsDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public virtual AspNetUsersDTO User { get; set; }
    }
    public partial class AspNetUserRolesDTO
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }

        public virtual AspNetRolesDTO Role { get; set; }
        public virtual AspNetUsersDTO User { get; set; }
    }
    public partial class AspNetUserTokensDTO
    {
        public string UserId { get; set; }
        public string LoginProvider { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public virtual AspNetUsersDTO User { get; set; }
    }
    public partial class AspNetRolesDTO
    {
        public AspNetRolesDTO()
        {
            AspNetRoleClaims = new HashSet<AspNetRoleClaimsDTO>();
            AspNetUserRoles = new HashSet<AspNetUserRolesDTO>();
            UserDetails = new HashSet<UserDetailsDTO>();
            UserPermissions = new HashSet<UserPermissionsDTO>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string ConcurrencyStamp { get; set; }

        public virtual ICollection<AspNetRoleClaimsDTO> AspNetRoleClaims { get; set; }
        public virtual ICollection<AspNetUserRolesDTO> AspNetUserRoles { get; set; }
        public virtual ICollection<UserDetailsDTO> UserDetails { get; set; }
        public virtual ICollection<UserPermissionsDTO> UserPermissions { get; set; }
    }
    public partial class AspNetRoleClaimsDTO
    {
        public int Id { get; set; }
        public string RoleId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public virtual AspNetRolesDTO Role { get; set; }
    }

    public class UserUploadImageResponse : ResponseStatus
    {
        public UserDetailsDTO details { get; set; }
    }


    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }
    public class RequestToken
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ProductType { get; set; }
        public string ServerType { get; set; }
        public decimal EnvId { get; set; }
        public bool IsRefreshToken { get; set; }
        public string SessionId { get; set; }
        public string RoleId { get; set; }
        public string ClaimType { get; set; }
    }

    public class UserNameById
    {
        //public string UserId { get; set; }
        public string UserName { get; set; }
    }

    public partial class DynamicConfigDTO
    {
        public decimal ConfigId { get; set; }
        public string ItemType { get; set; }
        public string Name { get; set; }
        public string ItemDescription { get; set; }
        public string Url { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrderBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    public partial class DynamicPermissions
    {
        public DynamicPermissions()
        {
            PermissionIds = new List<RPermissionDTO>();
        }
        public string RoleId { get; set; }
        public List<RPermissionDTO> PermissionIds { get; set; }
    }

    public class DynamicResponseResponse : ResponseStatus
    {
        public DynamicPermissionsDTO dynamicPermissions { get; set; }
    }

    public partial class DynamicPermissionsDTO
    {
        public decimal DynamicPermissionId { get; set; }
        public decimal? DynamicId { get; set; }
        public string DynamicName { get; set; }
        public string DynamicType { get; set; }
        public string Userid { get; set; }
        public string Roleid { get; set; }
        public string UserorRole { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrderBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public partial class RPermissionDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
        public bool? Status { get; set; }
        public string Collapse { get; set; }
        public String Label { get; set; }
        public string Userid { get; set; }
        public string Roleid { get; set; }
        public string UserorRole { get; set; }
        public string RoleName { get; set; }

        public virtual IEnumerable<RPermissionDTO> Children { get; set; }
    }

    public partial class DynamicResponse
    {
        public DynamicResponse()
        {
            mdata = new List<RPermissionDTO>();
        }
        public string name { get; set; }
        public List<RPermissionDTO> mdata { get; set; }
    }

    public partial class DynamicReportResponse
    {
        public DynamicReportResponse()
        {
            DynamicResponse = new List<DynamicResponse>();
        }

        public List<DynamicResponse> DynamicResponse { get; set; }
    }

    public partial class DynamicGraphResponse
    {
        public DynamicGraphResponse()
        {
            DynamicResponse = new List<DynamicResponse>();
        }

        public List<DynamicResponse> DynamicResponse { get; set; }
    }

    public partial class UserRoleReportDTO
    {
        public string UserId { get; set; }
        public string[] RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public partial class UserRoleGraphDTO
    {
        public string UserId { get; set; }
        public string[] RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public partial class UserRoleReportsDTO
    {
        public UserRoleReportsDTO()
        {
            RolePermissionIds = new List<RolesReportDTO>();
        }
        public string UserId { get; set; }
        public List<RolesReportDTO> RolePermissionIds { get; set; }
    }

    public partial class UserRoleGraphsDTO
    {
        public UserRoleGraphsDTO()
        {
            RolePermissionIds = new List<RolesGraphDTO>();
        }
        public string UserId { get; set; }
        public List<RolesGraphDTO> RolePermissionIds { get; set; }
    }

    public partial class RolesReportDTO
    {
        public string RoleId { get; set; }
        public int[] PermissionIds { get; set; }
    }

    public partial class RolesGraphDTO
    {
        public string RoleId { get; set; }
        public int[] PermissionIds { get; set; }
    }

    public partial class RoleReportDTO
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public partial class RoleGraphDTO
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public decimal EnvId { get; set; }
    }

    public class UserReportPermissionResponse : ResponseStatus
    {
        public DynamicPermissionsDTO reportperm { get; set; }
    }

    public class UserGraphPermissionResponse : ResponseStatus
    {
        public DynamicPermissionsDTO reportperm { get; set; }
    }
    //Integration
    public class EmployeeRoles
    {
        public string[] Roles { get; set; }
    }

    public class Unlockeduser
    {
        public string userid { get; set; }
    }

    public class UnlockResponse : ResponseStatus
    {
        public Unlockeduser unlock { get; set; }
    }


    public class EmailRequest
    {
        public EmailRequest()
        {
            Attachments = new List<EmailAttachment>();
            mailTo = new List<string>();
            mailCc = new List<string>();
            mailBcc = new List<string>();
        }
        public string To { get; set; }
        public List<string> mailTo { get; set; }
        public List<string> mailCc { get; set; }
        public List<string> mailBcc { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PartnerEmail { get; set; }
        public bool IsAttachment { get; set; }
        public List<EmailAttachment> Attachments { get; set; }
    }

    public class EmailAttachment
    {
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
    }

    public class DefaultPasswordReset : ResponseStatus
    {
        public Userpasswordreset passwordreset { get; set; }
    }

    public class Userpasswordreset
    {
        public string Username { get; set; }
        public decimal EnvId { get; set; }
    }
}
