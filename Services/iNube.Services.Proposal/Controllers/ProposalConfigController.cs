using AutoMapper;
using iNube.Components.RuleEngine.Helpers;
using iNube.Services.Proposal.Controllers.ProposalConfig.ProposalConfigService;
using iNube.Services.Proposal.Models;
using iNube.Services.Proposal.PLEntities;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace iNube.Services.Proposal.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProposalConfigController : ControllerBase
    {
        private IProposalService _proposalService;
        private IMapper _mapper;
        private readonly AppSettings _appSetting;

        public ProposalConfigController(IProposalService proposalService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _proposalService = proposalService;
            _mapper = mapper;
            _appSetting = appSettings.Value;
        }

        //[AllowAnonymous]
        //[HttpPost]
        //public ProposalInboxDTO FetchProposalIncompleteDetails(ProposalInboxDTO objProposalData)
        //{
        //    var response = _proposalService.FetchProposalIncompleteDetails(objProposalData);
        //    return response;
        //}
        [AllowAnonymous]
        [HttpGet]
        public IActionResult ProposalPoll()
        {

            var response = _proposalService.ProposalPoll();

            //PLContext Context = new PLContext();
            //// ProposalInboxDTO obj = new ProposalInboxDTO();
            return Ok(response);

        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult FetchProposalSubmittedDetails()
        {
            var response = _proposalService.FetchProposalSubmittedDetails();
            return Ok(response);
        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult FetchPendingRequirements()
        {
            var response = _proposalService.FetchPendingRequirements();

            //PLContext Context = new PLContext();
            //// ProposalInboxDTO obj = new ProposalInboxDTO();
            return Ok(response);

            //givinig null because message data its not getting
        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult FetchProposal()
        {
            var response = _proposalService.FetchProposal();

          
            return Ok(response);            
        }
        //[AllowAnonymous]
        //[HttpPost("SubmitModifyProposalData")]
        //public IActionResult SubmitModifyProposal([FromBody] PolicyDto policyDto)
        //{


        //    try
        //    {
        //        // save 
        //        _proposalService.SubmitModifyProposal(policyDto);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        [AllowAnonymous]
        [HttpGet]
        public IActionResult PartialFormData()
        {
            var response = _proposalService.PartialFormData();


            return Ok(response);
        }
        [AllowAnonymous]
        [HttpGet]
        public IActionResult PolicyOwnerDetails()
        {
            var response = _proposalService.PolicyOwnerDetails();
            return Ok(response);
        }


        //GET:api/GetProductMaster

        [AllowAnonymous]

        [HttpGet]

        public IActionResult MastertypeData()

        {
            var isFilter = true;
            var response = _proposalService.MastertypeData();
            if (isFilter)
            {
                var masterdata = response.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }

            return Ok(response);
        }
		
		  [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

    }
}