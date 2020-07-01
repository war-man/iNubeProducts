using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Policy.Controllers.Policy.PolicyServices;
using iNube.Services.Policy.Helpers;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace iNube.Services.Policy.Controllers.Policy
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]

    public class PolicyController : BaseApiController
    {
        public IPolicyService _policyService;
        private IMapper _mapper;
        private PolicyDTO objProduct;
        private readonly AppSettings _appSettings;

        public PolicyController(
          IPolicyService policyService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _policyService = policyService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
        // POST: api/Product/CreatePolicy
      
        [HttpPost]
        public async Task<IActionResult> CreatePolicy([FromBody]dynamic policyDTO)
        {
            var response=await _policyService.GeneratePolicy(policyDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }
        // POST: api/Product/CreatePolicy
       // [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> ModifyPolicy(string PolicyNumber,[FromBody]PolicyDTO policyDTO)
        {
            await _policyService.ModifyPolicy(PolicyNumber,policyDTO, Context);
            return Ok();
        }
        // GET: api/Product/GetMasterData
        [HttpGet]
        public async Task<IActionResult> GetMasterData(string sMasterlist)
        {
            var commonTypesDTOs = await _policyService.GetMaster(sMasterlist, Context);
            var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            return Ok(masterdata);

        }

        [HttpGet]
        public async Task<IActionResult> GetPolicyById(decimal policyId)
        {
            var response = await _policyService.GetPolicyById(policyId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpGet]
        public async Task<IActionResult> GetPolicyByNumber(string policyNumber)
        {
            var response = await _policyService.GetPolicyByNumber(policyNumber, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        } [HttpGet]
        public async Task<IActionResult> GetPolicyDetailsByNumber(string policyNumber)
        {
           
            var response = await _policyService.GetPolicyDetailsByNumber(policyNumber, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost]
        public async Task<IActionResult> PolicyCancellation(PolicycancelDTO policycancel)
        {
            var response = await _policyService.PolicyCancellation(policycancel, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        
        [HttpPost]
        public async Task<IActionResult> PolicySearch(PolicysearchDTO policysearch)
        {
            var response = await _policyService.PolicySearch(policysearch, Context);
            
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        [HttpPost]
        public async Task<IActionResult> CancelPolicy(PolicycancelDTO policycancelDTO)
        {
            await _policyService.CancelPolicy(policycancelDTO, Context);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> PostFileRequest(FileRequest fileRequest)
        {
            // MemoryStream ms = new MemoryStream((int)requestData.Content.Length);
            //// await Request.Body.CopyToAsync(ms);

            // byte[] b = ms.ToArray(); ms.Close();
            //File.WriteAllBytesAsync("Data.bin", b);
            var response = await _policyService.GetPolicyById(1,Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        public class FileRequest
        {
            public int Id { get; set; }
            public string FileName { get; set; }
            public byte[] Content { get; set; }
        }



        [HttpGet]
        public async Task<IActionResult> PolicyDashboardMaster()
        {
            var response = await _policyService.PolicyDashboardMaster(Context);
            return Ok(response);
        }



        [HttpGet]
        public async Task<List<object>> GetPolicyGrossWrittenPremium(int productId, string productname,int Year)
        {
            var response = await _policyService.GetGrossWrittenPremium(productId, productname,Year,Context);
            return response;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetPolicyDetails()
        {
            var _searchResult = await _policyService.GetPolicyDetails(Context);
            return Ok(_searchResult);
        }


        [HttpGet]
        public async Task<IActionResult> SearchPolicyDetails(decimal PolicyId)
        {
            var searchPolicyDetails = await _policyService.PolicyDetails(PolicyId, Context);
            return Ok(searchPolicyDetails);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby)
        {
            var searchPolicyDetails = await _policyService.GetPolicyByDetails(policySearchby, Context);
            return Ok(searchPolicyDetails);
        }

        [HttpGet]
        public Task<List<object>> DownloadPolicyDetails(int ProductId, int PartnerId)
        {
            Task<List<object>> DownloadPolicyDetails = _policyService.DownloadPolicy(ProductId, PartnerId, Context);
            return DownloadPolicyDetails;
        }


        [HttpGet]
        public IActionResult WriteToExcel(string path)
        {
            _policyService.WriteToExcel(path);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> GetPolicyForClaimsInvoice(Models.BillingEventRequest EventRequet)
        {
            var _searchResult = await _policyService.GetPolicyForClaimsInvoice(EventRequet, Context);
            return Ok(_searchResult);
        }
        [HttpPost]
        public async Task<IActionResult> BillingEventResponse(Models.BillingEventRequest EventRequet)
        {
            var _searchResult = await _policyService.BillingEventResponse(EventRequet, Context);
            return Ok(_searchResult);
        }

        [HttpPost]
        public async Task<IActionResult> BillingEventData(Models.BillingEventRequest EventRequet)
        {
            var _searchResult = await _policyService.BillingEventData(EventRequet, Context);
            return Ok(_searchResult);
        }


        //For multicover Policy

        [HttpPost]
        public async Task<IActionResult> CreateMultiCoverPolicy([FromBody]dynamic policyDTO)
        {
            var response = await _policyService.CreateMultiCoverPolicy(policyDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }
          //For multicover Policy By Payment

        [HttpPost]
        public async Task<IActionResult> CreatePolicyWithPayment([FromBody]dynamic policyDTO)
        {
            var response = await _policyService.CreatePolicyWithPayment(policyDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }

        [HttpGet]
        public async Task<IActionResult> PolicyInsurableDetails(string PolicyNumber)
        {
            var searchPolicyDetails = await _policyService.PolicyInsurableDetails(PolicyNumber, Context);
            return Ok(searchPolicyDetails);
        }
        [HttpGet]
        public async Task<IActionResult> CustomerPolicy(int CustomerId)
        {
            var searchPolicyDetails = await _policyService.CustomerPolicy(CustomerId, Context);
            return Ok(searchPolicyDetails);
        }
		
		   [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult HCTest()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> PolicySearchDashboard([FromBody]PolicySearchDashboardDTO policysearch)
        {
            var searchPolicyDetails = await  _policyService.PolicySearchDashboard(policysearch, Context);
            return Ok(searchPolicyDetails);
        }

        [HttpPost]
        public async Task<IActionResult> AddInsurableItem([FromBody]dynamic insurableItemRequest)
        {
            var response = await _policyService.AddInsurableItem(insurableItemRequest, Context);
            return ServiceResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> RemoveInsurableItem([FromBody]dynamic insurableItemRequest)
        {
            var searchPolicyDetails = await _policyService.RemoveInsurableItem(insurableItemRequest, Context);
            return ServiceResponse(searchPolicyDetails);
        }

        [HttpPost]
        public async Task<IActionResult> SwitchOnOff([FromBody]dynamic switchOnOffRequest)
        {
            var searchPolicyDetails = await _policyService.SwitchOnOff(switchOnOffRequest, Context);
            return ServiceResponse(searchPolicyDetails);
        }

        //GetCDBalanceBYPolicyNO
        //[AllowAnonymous]
        //[HttpGet]
        //public async Task<IActionResult> GetCdBalanceBYPolicyAsync(string policyNo)
        //{
        //    var response = await _policyService.GetCdBalanceBYPolicyAsync(policyNo, Context);
        //    if (response != null)
        //    {
        //        return Ok(response);
        //    }
        //    return NotFound();
        //}

        //GetPolicyDataByPolicyNO
        //[AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCdBalancePolicyNo(string PolicyNO)
        {
            var response = await _policyService.GetPolicyDetailsByPolicyNo(PolicyNO, Context);
           // var txnId = response.BundleTxnId;
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        //GetActiveMasterpolicy
        [HttpGet]
        public async Task<IActionResult> GetAllPolicy(string ProductCode)
        {
          
            var response = await _policyService.GetAllPolicy(ProductCode, Context);
            // var txnId = response.BundleTxnId;
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        //Update Insurable Items

        [HttpPut]
        public async Task<IActionResult> ModifyInsurabableItem(object modifydata)
        {
          
            await _policyService.ModifyInsurabableItem(modifydata,Context);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProposal(object modifydata)
        {
          
            var response=await _policyService.UpdateProposal(modifydata,Context);
            switch (response.Status)
            {
                case BusinessStatus.Updated:
                    return Ok(response);
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }

        //Get InsurableItem Details
        [HttpGet]
        public async Task<IActionResult> GetInsurableItemDetails(string policyNo,string insurableItemName)
        {
            var response = await _policyService.GetInsurableItemDetails(policyNo, insurableItemName,Context);
            // var txnId = response.BundleTxnId;
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        //Premium Calculation

        [HttpPost]
        public async Task<IActionResult> CalCulatePremium([FromBody]DynamicData premiumParameter)
        {
            var premiumValue = await _policyService.CalCulatePremium(premiumParameter, Context);
            return Ok(premiumValue);
        }

        //update sumInsured 

        [HttpGet]
        public async Task<IActionResult> UpdateSumInsured(string PolicyNumber, decimal amount)
        {
            var SumInsured = await _policyService.UpdateSumInsured(PolicyNumber, amount, Context);
            return Ok(SumInsured);
        }
        //Create Proposal
        [HttpPost]
        public async Task<IActionResult> CreateProposal([FromBody]dynamic policyDTO)
        {
            var response = await _policyService.CreateProposal(policyDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetRiskItemByPolicyNo(string PolicyNO)
        {
            var response = await _policyService.GetRiskItemByPolicyNo(PolicyNO,  Context);
            // var txnId = response.BundleTxnId;
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }


        [HttpGet]
        public async Task<IActionResult> GetProposalPolicyDetail(string proposalNo,string Mobileno, string policyno)
        {
            var response = await _policyService.GetProposalDetails(proposalNo, Mobileno, policyno, Context);
            // var txnId = response.BundleTxnId;
            return ServiceResponse(response);
        }

        //IssuePolicy
        [HttpPut]
        public async Task<IActionResult> IssuePolicy(dynamic IssuepolicyDTO)
        {
           var response= await _policyService.IssuePolicy( IssuepolicyDTO, Context);
            return Ok(response);
        }

        //Get Proposal by Mobile No

        [HttpGet]
        public async Task<IActionResult> GetProposalByMobileNumber(string MobileNumber)
        {
            var response = await _policyService.GetProposalByMobileNo(MobileNumber, Context);
            // var txnId = response.BundleTxnId;
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }


        //EndorsementAPI

        [HttpPut]
        public async Task<IActionResult> PolicyEndoresemenet(dynamic endoresementDto)
        {
            var response = await _policyService.PolicyEndoresemenet(endoresementDto, Context);


            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Ok:
                    return Ok(response);
                case BusinessStatus.Deleted:
                    return Ok(response);
                case BusinessStatus.Updated:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.None:
                    return BadRequest(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
            // return ServiceResponse(response);
        }

        [HttpPost]
        public async Task<IActionResult> DynamicMapper(dynamic inputModel, string mappingname)
        {
            var response = await _policyService.DynamicMapper(inputModel,mappingname, Context);
            return Ok(response);
        }



        [HttpPut]
        public async Task<IActionResult> UpdateBalanceSumInsured(string PolicyNumber, decimal amount)
        {
            var response = await _policyService.UpdateBalanceSumInsured(PolicyNumber, amount, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Updated:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }



        [HttpGet]
        public async Task<IActionResult> InternalGetPolicyDetailsByNumber(string policyNumber)
        {
            var response = await _policyService.InternalGetPolicyDetailsByNumber(policyNumber, Context);
            return Ok(response);
        }

          [HttpGet]
        public async Task<IActionResult> InternalGetProposalDetailsByNumber(string proposalNumber)
        {
            var response = await _policyService.InternalGetProposalDetailsByNumber(proposalNumber, Context);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetDailyAccountDetails(string policyNumber, int month, int year, string TxnEventType)
        {
            var response = await _policyService.GetDailyAccountDetails(policyNumber, month, year, TxnEventType, Context);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetPolicyDocumentsByNumber(string PolicyNumber)
        {
            var SumInsured = await _policyService.GetPolicyDocumentsByNumber(PolicyNumber, Context);
            return Ok(SumInsured);
        }

        [HttpGet]
        public async Task<IActionResult> SearchPolicyDetailsByNumber(string PolicyNumber)
        {
            var searchPolicyDetails = await _policyService.SearchPolicyDetailsByNumber(PolicyNumber, Context);
            return Ok(searchPolicyDetails);
        }
        
        [HttpGet]
        public async Task<IActionResult> SearchProposalDetailsByNumber(string ProposalNumber)
        {
            var searchProposalDetails = await _policyService.SearchProposalDetailsByNumber(ProposalNumber, Context);
            return Ok(searchProposalDetails);
        }

        [HttpPost]
        public async Task<IActionResult> RefundUpload(CancellationToken cancellationToken)
        {
            var response = await _policyService.RefundUpload(Request, cancellationToken, Context);
            return Ok(response);
        }
       
        [HttpPost]
        public async Task<IActionResult> RefundReportUpload(CancellationToken cancellationToken)
        {
            var response = await _policyService.RefundReportUpload(Request, cancellationToken, Context);
            return Ok(response);
        }
       

        [HttpPost]
        public async Task<IActionResult> GetCDMapperDetails(EndorsementSearch endorsementSearch)
        {
            var response = await _policyService.GetEndoresementDetails(endorsementSearch, Context);
            return Ok(response);
        }


        [HttpPut]
        public async Task<IActionResult> ProposalCancellation(dynamic CancellationRequest)
        {
            var response = await _policyService.ProposalCancellation(CancellationRequest, Context);


            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Deleted:
                    return Ok(response);
                case BusinessStatus.Updated:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.None:
                    return BadRequest(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ProposalCancellationScheduler()
        {
            var response = await _policyService.ProposalCancellationScheduler(Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> SmsScheduler()
        {
            var response = await _policyService.SmsScheduler(Context);
            return Ok(response);
        }
        //old Policy Creation
        [HttpPost]
        public async Task<IActionResult> GeneratePolicy([FromBody]dynamic policyDTO)
        {
            var response = await _policyService.CreateMultiCoverPolicy(policyDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized(response);
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);

                default:
                    return NotFound(response);
            }
        }

        [HttpGet]
        public async Task<IActionResult> PolicyActivate()
        {
            var response = await _policyService.PolicyActivate(Context);
            switch (response.Status)
            {
                case BusinessStatus.Ok:
                    return Ok(response);
                case BusinessStatus.NotFound:
                    return Ok(response);
                default:
                    return NotFound(response);
            }
        }
       
        [HttpPut]
        public async Task<IActionResult> UpdateCardDetails([FromBody]UpdateCardDetails updateCardDetails)
        {
            var response = await _policyService.UpdateCardDetails(updateCardDetails, Context);
            switch (response.Status)
            {
                case BusinessStatus.Ok:
                    return Ok(response);
                case BusinessStatus.NotFound:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                default:
                    return NotFound(response);
            }
        }

        [HttpPost]
        public async Task<IActionResult> LeadPolicy([FromBody]LeadInfoDTO policyDTO)
        {
            var response = await _policyService.LeadPolicy(policyDTO, Context);
            return ServiceResponse(response);
        }
    }
}