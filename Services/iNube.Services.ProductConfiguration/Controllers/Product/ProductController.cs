using System;
using System.Linq;
using iNube.Services.ProductConfiguration.Models;
using Microsoft.AspNetCore.Mvc;
using iNube.Services.ProductConfiguration.Controllers.Product.ProductServices;
using AutoMapper;
using iNube.Services.ProductConfiguration.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework;
using iNube.Services.ProductConfiguration.Controllers.Product.AvoProductServices;
using log4net.Repository.Hierarchy;
using System.Threading.Tasks;
using System.Threading;

namespace iNube.Services.ProductConfiguration.Controllers.Product
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProductController : BaseApiController
    {
        public IProductService _productService;
        private IMapper _mapper;

        private readonly AppSettings _appSettings;
        public IAvoProductConfigService _AvoProductService;

        public ProductController(
            IProductService productService,
            IAvoProductConfigService avoProductService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _productService = productService;
            _AvoProductService = avoProductService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public async Task<IActionResult> CheckSpouse(int ProductID, int PlanID)
        {
            var response = await _AvoProductService.CheckSpouse(ProductID, PlanID, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetLeadInfo(int LeadID)
        {
            var response = await _productService.GetLeadInfo(LeadID, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetRiders(int ProductId, int PlanId)
        {
            var response = await _productService.GetRiders(ProductId, PlanId, Context);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> GetRiderSumAssured(MapQuoteDTO mapQuoteDTO)
        {
            var response = await _AvoProductService.GetRiderSumAssured(mapQuoteDTO);
            return Ok(response);
        }
        [AllowAnonymous]
        [HttpPost]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IActionResult> GetAssignProduct(AssignProductList AssignProductList)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            //            var response =await _AvoProductService.GetRiderSumAssured(mapQuoteDTO);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetRiskClaimMaster(string masterType, int typeId, int parentID)
        {
            var _searchResult = await _productService.GetRiskClaimMaster(masterType, typeId, parentID, Context);
            return Ok(_searchResult);
        }

        [HttpPost]
        public async Task<IActionResult> CalculateQuotePremium([FromBody]MapQuoteDTO objLifeQuote, bool AnnualMode = false)
        {
            try
            {

                var PremiumData = await _AvoProductService.CalculateQuotePremium(objLifeQuote, Context, AnnualMode);

                // var objLifeQuote = _AvoProductService.GetIllustration(objLifeQuote, Context);

                //var premium = new ControllerLogic.PremiumCalculation.Premium();
                //objLifeQuote = premium.ValidateLifeRiderDetails(objLifeQuote);
                //if (string.IsNullOrEmpty(objLifeQuote.Error.ErrorMessage))
                //{
                //if (objLifeQuote.IsForCounterOffer == false)
                //    {

                //objLifeQuote = premium.ValidateProductDetails(objLifeQuote);
                //if (string.IsNullOrEmpty(objLifeQuote.Error.ErrorMessage))
                //    objLifeQuote = premium.ValidateFHEC(objLifeQuote);
                //if (string.IsNullOrEmpty(objLifeQuote.Error.ErrorMessage))
                //{
                // var objLifeQuote = _AvoProductService.CalculateQuotePremium(objLifeQuote,Context);
                // ControllerLogic.PremiumCalculation.Illustration illustration = new ControllerLogic.PremiumCalculation.Illustration();
                // var objLifeQuote = _AvoProductService.GetIllustration(objLifeQuote,Context);
                // objLifeQuote = premium.ValidatePremiumDetails(objLifeQuote);
                // }
                //}
                //     else
                //     {
                //     //    objLifeQuote = premium.CalculateQuotePremium(objLifeQuote);
                //     //    ControllerLogic.PremiumCalculation.Illustration illustration = new ControllerLogic.PremiumCalculation.Illustration();
                //     //    objLifeQuote = illustration.GetIllustration(objLifeQuote);
                //     }
                //// }

                return Ok(PremiumData);

                // return objLifeQuote;
            }
            catch (Exception ex)
            {
                //log4net.GlobalContext.Properties["ErrorCode"] = objLifeQuote.Error.ErrorCode = Codes.GetErrorCode();
                //Logger.Error(ex);
                //objLifeQuote.Error.ErrorMessage = "Please inform the IT HelpDesk on this application issue. Error Code is " + objLifeQuote.Error.ErrorCode + ". Sorry for the inconvenience caused";
                //return objLifeQuote;
                return Ok(ex);
            }
        }

        //GET:api/GetProductMaster
        [HttpGet]
        public async Task<IActionResult> GetProductMasterAvo(string masterType, int parentID)
        {
            var response = await _AvoProductService.GetProductMasterAvo(masterType, parentID, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> SMSBlast()
        {

            var response = await _productService.BulkSMS(Context);

            return Ok(response);


        }

        //GET:api/ListProducts
        [HttpGet]
        public async Task<IActionResult> ListProducts()
        {
            var response = await _AvoProductService.ListProducts(Context);
            return Ok(response);
        }

        // POST: api/Product/CreateProduct

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody]ProductDTO productDTO)
        {

            var validresponse = await _productService.ProductCodevalidation(productDTO.ProductCode, Context);
            if (validresponse.Status != BusinessStatus.InputValidationFailed)
            {
                var response = await _productService.Create(productDTO, Context);
                //TODO: Need to return ResponseStatus instead of ErrorResponse
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
            else
            {
                return Ok(validresponse);
            }
        }

        // PUT: api/Product/ModifyProduct
        [HttpPut]
        public async Task<IActionResult> ModifyProduct(int ProductId, ProductDTO productDTO)
        {
            productDTO.ProductId = ProductId;
            await _productService.ModifyProducts(productDTO, Context);
            return Ok();

        }

        // GET: api/Product/GetProductDetails
        [HttpGet]
        public async Task<IActionResult> GetProductDetails(string sProductlist, bool isFilter = true)
        {
            var ProductDTOs = await _productService.GetProducts(sProductlist, Context);
            if (isFilter)
            {
                var Productdata = ProductDTOs.GroupBy(c => new { c.ProductCode }).Select(x => new { x.Key.ProductCode, x, });
                return Ok(Productdata);
            }
            return Ok(ProductDTOs);
        }
        // DELETE: api/Product/DeleteProduct

        [HttpDelete]
        public IActionResult DeleteProduct(int ProductID)
        {
            _productService.Delete(ProductID, Context);
            return Ok();
        }
        // GET: api/Product/GetMasterData
        [HttpGet]
        public async Task<IActionResult> GetMasterData(string sMasterlist, bool isFilter = true)
        {
            var commonTypesDTOs = await _productService.GetMaster(sMasterlist, Context);
            if (isFilter)
            {
                var masterdata = commonTypesDTOs.GroupBy(c => new { c.mType }).Select(mdata => new { mdata.Key.mType, mdata, });
                return Ok(masterdata);
            }
            return Ok(commonTypesDTOs);
        }

        // GET: api/Product/SearchChannelDetails
        [HttpGet]
        public async Task<IActionResult> SearchChannelDetails(decimal ChannelId)
        {
            TblProductChannels searchchannel = await _productService.ChannelDetails(ChannelId, Context);
            return Ok(searchchannel);
        }

        // GET: api/Product/SearchClaimsDetails
        [HttpGet]
        public async Task<IActionResult> SearchClaimsDetails(decimal Cweid)
        {
            var searchclaimdetails = await _productService.ClaimsDetails(Cweid, Context);
            return Ok(searchclaimdetails);
        }

        // GET: api/Product/SearchRiskDetails
        [HttpGet]
        public async Task<IActionResult> SearchRiskDetails(decimal RcbdetailsId)
        {
            TblProductRcbdetails searchRiskdetails = await _productService.RiskDetails(RcbdetailsId, Context);
            return Ok(searchRiskdetails);
        }

        //GET: api/Product/SearchProdcut
        [HttpPost]
        public async Task<IActionResult> SearchProduct([FromBody]ProductSearchDTO productSearchDTO)
        {
            var _searchResult = await _productService.SearchProduct(productSearchDTO, Context);
            return Ok(_searchResult);
        }

        //GET: api/Product/SearchProdcut
        //[HttpPost]
        //public async Task<IActionResult> SearchAssignProduct([FromBody]ProductSearchDTO productSearchDTO)
        //{
        //    var _searchResult = _productService.SearchAssignProduct(productSearchDTO);
        //    return Ok(_searchResult);
        //}

        //GET: api/Product/GetProductById

        [HttpGet]
        public async Task<IActionResult> GetProductById(int productId)
        {
            var response = await _productService.GetProductById(productId, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }
        //GET: api/Product/GetProductByCode

        [HttpGet]
        public async Task<IActionResult> GetProductByCode(string productCode)
        {
            var response = await _productService.GetProductByCode(productCode, Context);
            if (response != null)
            {
                return Ok(response);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> CWEDetails(int LOBId, int CWETypeID)
        {
            var _searchResult = await _productService.CWEDetails(LOBId, CWETypeID, Context);
            return Ok(_searchResult);
        }

        [HttpGet]
        public async Task<IActionResult> ProductCodevalidation(String productcode)
        {
            var response = await _productService.ProductCodevalidation(productcode, Context);

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
        public async Task<IActionResult> ProductNamevalidation(String productname)
        {
            var response = await _productService.ProductNamevalidation(productname, Context);

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
        public async Task<IActionResult> GetProductMaster(string masterType, int parentID)
        {
            var _searchResult = await _productService.GetProductMaster(masterType, parentID, Context);
            return Ok(_searchResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProductMaster(string masterType, int parentID)
        {
            var _searchResult = await _productService.GetAllProductMaster(masterType, parentID, Context);
            return Ok(_searchResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetEntityMaster()
        {
            var _searchResult = await _productService.GetEntityMaster(Context);
            return Ok(_searchResult);
        }

        // GET: api/Product/SearchRiskDetails
        [HttpGet]
        public async Task<IActionResult> GetProductRiskDetails(decimal ProductId, string FieldType = "")
        {
            var searchRiskdetails = await _productService.RCBDetails(ProductId, "Risk", FieldType, Context);
            return Ok(searchRiskdetails);
        }
        // GET: api/Product/SearchRiskDetails
        [HttpGet]
        public async Task<IActionResult> GetProductClaimsDetails(decimal ProductId, string FieldType = "")
        {
            var searchClaimDetails = await _productService.RCBDetails(ProductId, "Claim", FieldType, Context);
            return Ok(searchClaimDetails);
        }

        //GET: api/Product/GetGWP
        //[HttpGet]
        //public async Task<IActionResult> GetProductGWP(ProductDTO ProductDTO)
        //{
        //    var searchClaimDetails = _productService.GetProductGWP(ProductDTO);
        //    return Ok(searchClaimDetails);
        //}
        //GET: api/Product/AddMasterData

        [HttpPost]
        public async Task<IActionResult> AddMasterData([FromBody]MasterDataDTO masterDataDTO)
        {
            var _searchResult = await _productService.AddMasterData(masterDataDTO, Context);
            return Ok(_searchResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddEntityData([FromBody]MasterEntityDTO entityDTO)
        {
            var _searchResult = await _productService.AddEntityData(entityDTO, Context);
            return Ok(_searchResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetProductByLob(int id)
        {
            var response = await _productService.GetProductByLob(id, Context);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> BillingEventResponse(Models.BillingEventRequest EventRequet)
        {
            var _searchResult = await _productService.BillingEventResponse(EventRequet, Context);
            return Ok(_searchResult);
        }

        [HttpPost]
        public async Task<IActionResult> BillingEventData(Models.BillingEventRequest EventRequet)
        {
            var _searchResult = await _productService.BillingEventData(EventRequet, Context);
            return Ok(_searchResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetInsurableRiskDetails(decimal ProductId)
        {
            var searchRiskdetails = await _productService.GetInsurableRiskDetails(ProductId, "Risk", Context);
            return Ok(searchRiskdetails);
        }
        // POST api/epplus/import
        [HttpPost("[action]")]
        public async Task<IActionResult> Import(CancellationToken cancellationToken)
        {
            var response = await _productService.Documentupload(Request, cancellationToken, Context);
            return Ok(response);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DocUpload(string productcode, string productId, CancellationToken cancellationToken)
        {
            var response = await _productService.Docupload(productcode, productId, Request, cancellationToken, Context);
            return Ok(response);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> PromoDocupload(string productcode, string productId, CancellationToken cancellationToken)
        {
            var response = await _productService.PromoDocupload(productcode, productId, Request, cancellationToken, Context);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> BenefitValueLGIAsync([FromBody]LGIDTO product)
        {
            var response = await _productService.BenefitValueLGIAsync(product, Context);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> PromoApply([FromBody]PromoDTO promoDTO)
        {
            var response = await _productService.PromoApply(promoDTO, Context);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetProductRateConfig(int productId)
        {
            var response = await _productService.GetProductRateConfig(productId, Context);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetProductRateMapping(int productId)
        {
            var response = await _productService.GetProductRateMapping(productId, Context);
            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetHandleEventsMaster(string lMasterlist)
        {
            var response = await _productService.GetHandleEventsMaster(lMasterlist, Context);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetRiskParam(string lMasterlist)
        {
            var objectval = await _productService.GetRiskParam(lMasterlist, Context);
            return Ok(objectval);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMapping([FromBody]MappingListDto MapDto)
        {
            var MappingData = await _productService.CreateMapping(MapDto, Context);
            return Ok(MappingData);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult HC()
        {
            var response = new ResponseStatus() { Status = BusinessStatus.Ok };
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetDynamicProduct(string type)
        {
            var response = await _productService.GetDynamicProduct(type, Context);
            return Ok(response);
        }
    }
}
