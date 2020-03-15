using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Claims.Controllers.ClaimManagement.ClaimService;
using iNube.Services.Claims.Models;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iNube.Services.Claims.Controllers.ClaimManagement
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]

    public class ClaimManagementController : BaseApiController
    {
        public IClaimManagementService _claimService;
        private IMapper _mapper;
        public ClaimManagementController(IMapper mapper, IClaimManagementService claimService)
        {
            _mapper = mapper;
            _claimService = claimService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateClaim([FromBody]dynamic claimDTO)
        {
            var response = await _claimService.CreateClaimAsync(claimDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return BadRequest(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.Error:
                    return BadRequest(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                default:
                    return Forbid();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetClaimById(decimal claimId)
        {
            var response = await _claimService.GetClaimById(claimId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetClaimByNumber(string claimNumber)
        {
            var response = await _claimService.GetClaimByNumber(claimNumber, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetClaimGWP(ClaimDTOGWP claimgwp)
        {
            var response = await _claimService.GetClaimGWP(claimgwp, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> SeachClaims([FromBody]ClaimSearchDTO claim)
        {
            var response = await _claimService.GetSearchClaims(claim, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpPost]
        
        public async Task<IActionResult> GetFinanceBankData(SearchFinanceRequest financeRequest)
        {
            var response = await _claimService.GetFinanceBankDataAsync(financeRequest, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentId(string filename)
        {
            var response = await _claimService.GetDocumentId(filename, Context);
            var docId = response.BankDocId;
            return Ok(docId);
        }

        [HttpPost]
        public async Task<IActionResult> GetSettledFinanceData(SearchFinanceRequest financeRequest)
        {
            var response = await _claimService.GetSettledFinanceDataAsync(financeRequest, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> GetPaymentFinanceData(SearchFinanceRequest financeRequest)
        {
            var response = await _claimService.GetPaymentFinanceDataAsync(financeRequest, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetMasterData(string sMasterlist)
        {
            var commonTypesDTOs = await _claimService.GetMaster(sMasterlist, Context);
            var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            return Ok(masterdata);
        }

        [HttpPost]
        public async Task<IActionResult> UploadFiles(int claimId)
        {
            var Response = new ResponseStatus() { Status = BusinessStatus.Created };
            try
            {
                long size = 0;
                var files = Request.Form.Files;
                var filename = "";

                foreach (var file in files)
                {
                    filename = ContentDispositionHeaderValue
                                    .Parse(file.ContentDisposition)
                                    .FileName
                                    .Trim('"');
                    size += file.Length;
                    // var fileBasepath = System.IO.Directory.GetCurrentDirectory();
                    var fileBasepath = Path.GetTempPath();
                    string filePath = fileBasepath + "" + filename;

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                        ClaimdocDTO claimdoc = new ClaimdocDTO();

                        claimdoc.DocumentName = filename;
                        claimdoc.Document = bytes;

                        string name = filename;
                        var Filename = filename.Split('.');
                        claimdoc.DocumentType = Filename[1];
                        claimdoc.ClaimId = claimId;

                        var fileResult = _claimService.UploadFiles(claimdoc, Context);
                    }
                }
            }

            catch (Exception ex)
            {
                Response.Status = BusinessStatus.Error;
                Response.ResponseMessage = ex.Message;
            }
            return ServiceResponse(Response);
        }

        // POST api/epplus/import
        [HttpPost("[action]")]
        public async Task<IActionResult> Import(CancellationToken cancellationToken)
        {
            var response = await _claimService.Documentupload(Request, cancellationToken, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> ClaimProcess(ClaimProcessDTO claimsDTO)
        {
            var response = await _claimService.ClaimProcess(claimsDTO, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> BillingEventResponse(Models.BillingEventRequest cDTO)
        {
            var _searchResult = await _claimService.BillingEventResponse(cDTO, Context);
            return Ok(_searchResult);
        }

        [HttpPost]
        public async Task<IActionResult> BillingEventData([FromBody]Models.BillingEventRequest productdto)
        {
            var response = await _claimService.BillingEventData(productdto, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> ClaimIntimate(ClaimDataDTO claims)
        {
            var response = await _claimService.ClaimIntimate(claims, Context);
            return ServiceResponse(response);
        }

       
        [HttpGet]
        public async Task<IActionResult> Download(int ClaimId)
        {
            var imagebytes =await _claimService.ImageData(ClaimId, Context);

            var result = new HttpResponseMessage(HttpStatusCode.OK);

            var filememstream = new MemoryStream(imagebytes);

            result.Content = new StreamContent(filememstream);

            var headers = result.Content.Headers;

            headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            headers.ContentDisposition.FileName = "ClaimDoc.jpg";

            // string zipName = String.Format("file.zip");
            headers.ContentType = new MediaTypeHeaderValue("application/jpg");
            headers.ContentLength = filememstream.Length;

            return File(filememstream, "application/octet-stream", "download.jpg");
            // return File(filememstream, "application,filename=" + zipName);
        }

        [HttpPost]
        public async Task<IActionResult> SearchClaim([FromBody]SearchClaimDTO searchclaim)
        {
            var response = await _claimService.SearchClaim(searchclaim, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> SearchClaimByUserid([FromBody]SearchClaimDTO searchclaim)
        {
            var response = await _claimService.SearchClaimByUserid(searchclaim, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> SearchClaimDetails(decimal ClaimId)
        {
            var searchClaimDetails = await _claimService.ClaimDetails(ClaimId, Context);
            return Ok(searchClaimDetails);
        }

        [HttpGet]
        public async Task<IActionResult> SearchClaimEnquiry(decimal ClaimId)
        {
            var SearchClaimEnquiry = await _claimService.ClaimEnquiry(ClaimId, Context);
            return Ok(SearchClaimEnquiry);
        }

        [HttpGet]
        public async Task<IActionResult> SearchPaymentDetails(decimal ClaimId)
        {
            var searchPaymentDetails = await _claimService.PaymentDetails(ClaimId, Context);
            return Ok(searchPaymentDetails);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ModifyActive(ClaimsActive claims)
        {
            var response = await _claimService.ModifyActive(claims, Context);
            return Ok(response);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<List<object>> GetClaimsByProductPartner([FromBody]PolicySearchbyPidDTO claimDash)
        {
            var response = await _claimService.GetClaimsByProductPartner(claimDash, Context);
            return response;
        }

        [HttpPost]
        public async Task<IActionResult> ClaimsReport([FromBody]ClaimsRequest claimsRequest)
        {
            var response = await _claimService.ClaimsReport(claimsRequest, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        
        [HttpGet]
        public async Task<IActionResult> DocumentView(decimal ClaimId, bool isDoc)
        {
            var document = await _claimService.DocumentView(ClaimId, isDoc, Context);
            return Ok(document);
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult CreateClaimPost(CreatePostRequestModel post)
        {
            var Response = new ResponseStatus() { Status = BusinessStatus.Created };
            try
            {
                long size = 0;
                var files = Request.Form.Files;
                var filename = "";
                //var namep = Request.Form["Name"].ToString();
                //var claimSearch = Request.Form["claimSearch"].ToString();
                //var fileList = Request.Form["fileList"].ToString();

                foreach (var file in files)
                {
                    filename = ContentDispositionHeaderValue
                                    .Parse(file.ContentDisposition)
                                    .FileName
                                    .Trim('"');
                    size += file.Length;
                    // var fileBasepath = System.IO.Directory.GetCurrentDirectory();
                    var fileBasepath = Path.GetTempPath();
                    string filePath = fileBasepath + "" + filename;

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                        ClaimdocDTO claimdoc = new ClaimdocDTO();

                        claimdoc.DocumentName = filename;
                        claimdoc.Document = bytes;

                        string name = filename;
                        var Filename = filename.Split('.');
                        claimdoc.DocumentType = Filename[1];
                        //claimdoc.ClaimId = claimId;

                        var fileResult = _claimService.UploadFiles(claimdoc, Context);
                    }
                }
            }

            catch (Exception ex)
            {
                Response.Status = BusinessStatus.Error;
                Response.ResponseMessage = ex.Message;
            }
            return ServiceResponse(Response);
        }
		 [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetBalanceSumInsured(string policyNo) {

        var res= await _claimService.GetBalanceSumInsured(policyNo, Context);
            return Ok(res);
        }

        [HttpGet]
        public async Task<IActionResult> GetClaimCount()
        {
            var response = await _claimService.GetClaimCount(Context);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetMasterForVehicleLocation(string sMasterlist)
        {
            var commonTypesDTOs = await _claimService.GetMasterForVehicleLocation(sMasterlist, Context);
            return Ok(commonTypesDTOs);
        }


    }
}
