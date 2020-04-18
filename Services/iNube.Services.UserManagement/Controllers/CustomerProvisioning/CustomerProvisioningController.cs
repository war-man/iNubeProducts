using AutoMapper;
using iNube.Services.UserManagement.Controllers.CustomerProvisioning.CPServices;
using iNube.Services.UserManagement.Helpers;
using iNube.Services.UserManagement.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.UserManagement.Controllers.CustomerProvisioning
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class CustomerProvisioningController : BaseApiController
    {
        public ICustomerProvisioningService _customerProvisioningService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public CustomerProvisioningController(ICustomerProvisioningService customerProvisioningService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _customerProvisioningService = customerProvisioningService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult GetMaster(string lMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = _customerProvisioningService.GetMaster(lMasterlist);

            if (isFilter)
            {
                var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);
        }
        [HttpPost]
        public async Task<IActionResult> CreateCustomerProvision(CustomerProvisioningDTO customerProvisioningDTO)
        {
            var response = await _customerProvisioningService.createProvision(customerProvisioningDTO, Context);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetCustomerSettings(int customerid, string type, int envid)
        {
            var response = _customerProvisioningService.GetCustomerSettings(customerid, type, envid, Context);
            return Ok(response);
        }
        [HttpGet]
        public IActionResult GetCustomerTypeSettings(int customerid, string type, int envid)
        {
            var response = _customerProvisioningService.GetCustomerTypeSettings(customerid, type, envid, Context);
            return Ok(response);
        }

    }
}
