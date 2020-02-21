using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.Partners.Models;
using iNube.Services.Partners.Controllers.Partner.PartnerService;
using AutoMapper;
using iNube.Services.Partners.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using iNube.Utility.Framework;
using iNube.Utility.Framework.Model;
using System.Net.Http.Headers;
using System.IO;

namespace iNube.Services.Partners.Controllers.Partner
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class PartnerController : BaseApiController
    {
        public IPartnerService _partnerService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public PartnerController(IPartnerService partnerService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _partnerService = partnerService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        // POST: api/Partner/CreatePartner
        [HttpPost]
        public async Task<IActionResult> CreatePartner([FromBody] PartnersDTO partnerDTO)
        {
            try
            {
                //var files = Request.Form.Files;
                //var filename = "";
                var response = await _partnerService.CreatePartnerAsync(partnerDTO, Context);
                switch (response.Status)
                {
                    case BusinessStatus.InputValidationFailed:
                        return Ok(response);
                    case BusinessStatus.Created:
                        return Ok(response);
                    case BusinessStatus.UnAuthorized:
                        return Unauthorized();
                    case BusinessStatus.PreConditionFailed:
                        return Ok(response);
                    default:
                        return Forbid();
                }
                //  return Ok(response);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
            //  return Ok(_partnerDTO);
        }

        // PUT: api/Partner/ModifyPartner
        [HttpPut("{id}")]
        public void ModifyPartner(int id, [FromBody] string value)
        {
        }

        // GET: api/Partner/GetPartnerDetails
        [HttpGet]
        public async Task<IActionResult> GetPartnerDetails(int partnerId)
        {
            PartnersDTO _partnerDTO = await _partnerService.GetPartner(partnerId, Context);
            return Ok(_partnerDTO);
        }

        // DELETE: api/Partner/DeletePartner
        [HttpDelete("{id}")]
        public void DeletePartner(int id)
        {
        }
      [HttpGet]
      public async Task<IActionResult> GetAssignProduct(decimal partnerId)
        {
          var products= await _partnerService.GetAssignProduct(partnerId,Context);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> GetAssignProductbyId(AssignedProducts assignedProducts)
        {
            var result = await _partnerService.GetAssignProductbyId(assignedProducts, Context);

            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> SaveAssignProduct([FromBody]AssignProductDTO assignProductDTO)
        {

            var response = await _partnerService.SaveAssignProduct(assignProductDTO, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                case BusinessStatus.PreConditionFailed:
                    return Ok(response);
                default:
                    return Forbid();
            }

        }

        // GET: api/Partner/SearchPartner
        [HttpPost]
        public async Task<IActionResult> SearchPartner([FromBody] PartnerSearchDTO data)
        {
            var _partnerSearchDTO = await _partnerService.GetSearchPartner(data, Context);
            return Ok(_partnerSearchDTO);
        }
        [HttpGet]
        public async Task<IActionResult> GetMasterDataAsync(string sMasterlist, string partnerId = "")
        {
            var commonTypesDTOs = await _partnerService.GetMasterAsync(Context, sMasterlist, partnerId);
            var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
            return Ok(masterdata);

        }

        [HttpPost]
        public async Task<IActionResult> SearchProductDetails(SearchProductModel productdetails)
        {
            var Assignproduct = await _partnerService.GetSearchProductDetails(productdetails, Context);

            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> DeletePartnerById(decimal partnerId)
        {
            var result = await _partnerService.DeletePartnerById(partnerId, Context);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPartnerbyProductid(int id)
        {
            var response = await _partnerService.GetPartnerbyProductid(id, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetPartnerDetailsData(decimal OrgId)
        {
            var response = await _partnerService.GetPartnerDetails(OrgId,Context);
            return Ok(response);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UploadLogo(decimal PartnerId)
        {
            var Response = new ResponseStatus() { Status = BusinessStatus.Created };
            //var response=new UserDetailsDTO();
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
                    var fileBasepath = Path.GetTempPath();
                    string filePath = fileBasepath + "" + filename;

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                        fs.Close();
                        byte[] bytes = System.IO.File.ReadAllBytes(filePath);

                        LogoDTO logo = new LogoDTO();

                        logo.Document = bytes;
                        logo.DocumentName = filename;
                        logo.PartnerId = PartnerId;

                        Response = await _partnerService.UploadLogo(logo, Context);
                    }
                }
            }
            catch (Exception ex)
            {
                Response.Status = BusinessStatus.Error;
                Response.ResponseMessage = ex.Message;
            }
            return Ok(Response);
        }

        [HttpGet]
        public async Task<IActionResult> PartnerCodevalidation(String partnercode)
        {
            var response = await _partnerService.PartnerCodeValidations(partnercode, Context);
            switch (response.Status)
            {
                case BusinessStatus.InputValidationFailed:
                    return Ok(response);
                case BusinessStatus.Created:
                    return Ok(response);
                case BusinessStatus.UnAuthorized:
                    return Unauthorized();
                case BusinessStatus.Ok:
                    return Ok(response);
                default:
                    return Forbid();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPartnerApiKit(decimal productId)
        {
            var response = await _partnerService.GetPartnerApiKit(productId, Context);
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult DeletePartner(decimal PartnerId)
        {
            _partnerService.DeletePartner(PartnerId, Context);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPartnerNameById(decimal PartnerId)
        {
            var response = await _partnerService.GetPartnerNameById(PartnerId, Context);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> EditAssignProductDate(decimal PolicyId,EditAssignProductDTO policyAgreementDTO)
        {
           policyAgreementDTO.PolicyId = PolicyId;
           var response= await _partnerService.EditAssignProductDate(policyAgreementDTO, Context);
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
