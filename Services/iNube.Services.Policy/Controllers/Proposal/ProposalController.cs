using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Policy.Controllers.Proposal.ProposalService;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace iNube.Services.Policy.Controllers.Proposal
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProposalController : BaseApiController
    {

        public IProposalService _proposalService;


        public ProposalController(IProposalService proposalService)
        {
            _proposalService = proposalService;
          
        }

                     
        [HttpGet]
        public async Task<IActionResult> LifeQqData()
        {
            var response = await _proposalService.LoadLifeQqData();

            return Ok(response);
        }
        [HttpGet]
        public  IActionResult GetmasQuestions()
        {
            var response =  _proposalService.GetMasQuestions();
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> TblContactsData()
        {
            var response = await _proposalService.FetchTblContactsdata();

            return Ok(response);
        }
        [HttpGet("GetProposalIncompleteData")]
        public async Task<IActionResult> ProposalPoll()
        {

            var response = await _proposalService.ProposalPollAsync(Context);


            return Ok(response);

        }



        

        [HttpGet("GetMasterData")]

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

        [HttpPost("PartialFormData")]
        public IActionResult CreateAccounts([FromBody]Models.ProposalModel.PolicyDto policyDto)
        {
            var response = _proposalService.PartialFormDataSave(policyDto,Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProposalByPositionId(int posid)
        {
            var suspects =await _proposalService.GetProposalByPositionId(posid, Context);
            return Ok(suspects);
        }
        [HttpGet]
        public async Task<IActionResult> GetPolicyByProposalNO(string proposalNo)
        {
            var suspects = await _proposalService.GetPolicyByQuotNO(proposalNo, Context);
            return Ok(suspects);
        }

        // GET: api/Proposal
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Proposal/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Proposal
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Proposal/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet]
        public async Task<IActionResult> FetchProposalSubmittedDetails()
        {
            var response =await  _proposalService.FetchProposalSubmittedDetailsAsync(Context);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> FetchPendingRequirements()
        {
            var response = await _proposalService.FetchPendingRequirementsAsync(Context);

            //PLContext Context = new PLContext();
            //// ProposalInboxDTO obj = new ProposalInboxDTO();
            return Ok(response);

            //givinig null because message data its not getting
        }
    }
}
