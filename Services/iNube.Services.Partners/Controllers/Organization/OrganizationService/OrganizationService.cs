using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;

namespace iNube.Services.Partners.Controllers.Organization.OrganizationService
{
    public interface IOrganizationService
    {
        int TestMethod();
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext);
        Task<OrganizationResponse> CreateOrganizationAsync(OrganizationDTO orgDTO, ApiContext apiContext);
        Task<OrganizationDTO> GetOrganization(int orgId, ApiContext apiContext);
        Task<IEnumerable<OrganizationDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext);
        Task<IEnumerable<OrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext);
        Task<IEnumerable<OrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext);
    }

    public class OrganizationService : IOrganizationService
    {
        private MICAPRContext _context;
        private IMapper _mapper;
        private readonly Func<string, IOrganizationProductService> _organizationProductService;
        private IIntegrationService _integrationService;
        public OrganizationService(Func<string, IOrganizationProductService> organizationProductService, IMapper mapper, IIntegrationService integrationService)
        {
            _organizationProductService = organizationProductService;
            _mapper = mapper;
            _integrationService = integrationService;
        }

        //get for master
        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).GetMaster(lMasterlist, apiContext);
        }

        // get Location
        public async Task<IEnumerable<ddDTO>> GetLocation(string locationType, int parentID, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).GetLocation(locationType, parentID, apiContext);
        }

        public async Task<OrganizationResponse> CreateOrganizationAsync(OrganizationDTO orgDTO, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).CreateOrganizationAsync(orgDTO, apiContext);
        }

        public async Task<OrganizationDTO> GetOrganization(int orgId, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).GetOrganization(orgId, apiContext);
        }

        public async Task<IEnumerable<OrganizationDTO>> SearchOrganizationById(int orgId, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).SearchOrganizationById(orgId, apiContext);
        }

        public async Task<IEnumerable<OrganizationDTO>> GetOrgByParentId(int orgid, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).GetOrgByParentId(orgid, apiContext);
        }

        public async Task<IEnumerable<OrganizationDTO>> SearchOrganization(OrgSearchDTO searchorg, ApiContext apiContext)
        {
            return await _organizationProductService(apiContext.ProductType).SearchOrganization(searchorg, apiContext);
        }

        public int TestMethod()
        {
            return 0;
        }

        public async Task<int> CreateUserAsync(OrganizationDTO orgDTO, ApiContext apiContext)
        {
            if (orgDTO.ConfigurationTypeId == 3)
            {
                var user = GetUserData(orgDTO.OrgSpocDetails.FirstOrDefault());
                await _integrationService.CreateUserAsync(user, apiContext);
            }
            return 1;

        }
        private UserDTO GetUserData(OrgSpocDetailsDTO orgSpocDetailsDTO)
        {
            UserDTO userDTO = new UserDTO();

            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            UserAddressDTO userAddressDTO = new UserAddressDTO();
            userDetailsDTO.Email = orgSpocDetailsDTO.SpocemailId;
            userDetailsDTO.FirstName = orgSpocDetailsDTO.SpocfirstName;
            userDetailsDTO.MiddleName = orgSpocDetailsDTO.SpocMiddleName;
            userDetailsDTO.LastName = orgSpocDetailsDTO.SpocLastName;
            userDetailsDTO.MaritalStatusId = orgSpocDetailsDTO.SpocMaritalStatusId;
            userDetailsDTO.GenderId = orgSpocDetailsDTO.SpocGenderId;
            userDetailsDTO.ContactNumber = orgSpocDetailsDTO.Spocmobileno;
            userDetailsDTO.PanNo = orgSpocDetailsDTO.SpocpanNo;
            userDetailsDTO.Dob = orgSpocDetailsDTO.Spocdob;
            userDetailsDTO.Doj = orgSpocDetailsDTO.Spocdoj;
            userDetailsDTO.Email = orgSpocDetailsDTO.SpocemailId;

            userAddressDTO.UserAddressLine1 = orgSpocDetailsDTO.SpocaddressLine1;
            userAddressDTO.UserAddressLine2 = orgSpocDetailsDTO.SpocaddressLine2;
            userAddressDTO.UserAddressLine3 = orgSpocDetailsDTO.SpocaddressLine3;
            userAddressDTO.UserPincodeId = orgSpocDetailsDTO.SpocpincodeId;
            userAddressDTO.UserCountryId = orgSpocDetailsDTO.SpoccountryId;
            userAddressDTO.UserStateId = orgSpocDetailsDTO.SpocstateId;
            userAddressDTO.UserCityId = orgSpocDetailsDTO.SpoccityId;
            userAddressDTO.UserDistrictId = orgSpocDetailsDTO.SpocdistrictId;

            userDetailsDTO.UserTypeId = 1004;
            userDTO.UserDetails.Add(userDetailsDTO);
            userDTO.UserAddress.Add(userAddressDTO);
            return userDTO;
        }
    }
}
