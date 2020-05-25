using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Controllers.Contracts.ContractService;
using iNube.Services.Partners.Helpers;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace iNube.Services.Partners.Controllers.Contracts
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]


    public class ContractController : BaseApiController
    {
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        public IContractService _conService;

        public ContractController(IMapper mapper, IOptions<AppSettings> appSettings, IContractService conService)
        {
            _conService = conService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public async Task<IActionResult> GetmasterData()
        {
            var response = await _conService.GetmasterData(Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> ContractUpload(CancellationToken cancellationToken)
        {
            var response = await _conService.ContractUpload(Request, cancellationToken, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> RecruitmentByCode(string RecNo)
        {
            var response = await _conService.RecruitmentByCode(RecNo, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> IncentiveCalculation(CancellationToken cancellationToken)
        {
            var response = await _conService.IncentiveCalculation(Request, cancellationToken, Context);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> SearchTarget(TargetDto tblParticipantMasterDto) 
        {
            var search = await _conService.SearchTarget(tblParticipantMasterDto, Context);
            return Ok(search);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUpdateContract([FromBody] ContractDTO contractDTO)
        {
             var response = await _conService.CreateUpdateContractAsync(contractDTO, Context);
            return ServiceResponse(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetContractDetailsById(int contractId)
        {
            var response = await _conService.GetContractDetailsById(contractId, Context);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetContractByRecruitmentNo(string recruitmentNo)
        {
            var response = await _conService.GetContractByRecruitmentNo(recruitmentNo, Context);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> SearchContract([FromBody] ContractSearchDTO data)
        {
            var _partnerSearchDTO = await _conService.SearchContract(data, Context);
            return Ok(_partnerSearchDTO);
        }
       


    }
}