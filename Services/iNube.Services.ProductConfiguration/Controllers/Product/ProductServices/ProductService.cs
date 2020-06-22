using AutoMapper;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Helpers;
using iNube.Services.ProductConfiguration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.Model;
using iNube.Services.ProductConfiguration.Controllers.Product.AvoProductServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Threading;

namespace iNube.Services.ProductConfiguration.Controllers.Product.ProductServices
{
    public interface IProductService
    {
        Task<ProductResponse> Create(ProductDTO objProduct, ApiContext apiContext);
        Task<MasterDataResponse> AddMasterData(MasterDataDTO masterDataDTO, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> GetProducts(string lProductlist, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> SearchProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext);
        Task<TblProductChannels> ChannelDetails(decimal ChannelId, ApiContext apiContext);
        Task<TblProductClausesWarrentiesExclusions> ClaimsDetails(decimal Cweid, ApiContext apiContext);
        Task<TblProductRcbdetails> RiskDetails(decimal RcbdetailsId, ApiContext apiContext);
        Task<IEnumerable<ProductRcbdetailsDTO>> RCBDetails(decimal ProductId, string type, string FieldType, ApiContext apiContext);
        void Delete(int ProductID, ApiContext apiContext);
        Task<ProductResponse> ProductCodevalidation(string code, ApiContext apiContext);
        Task<ProductResponse> ProductNamevalidation(string name, ApiContext apiContext);
        Task<ProductDTO> ModifyProducts(ProductDTO objProduct, ApiContext apiContext);
        Task<List<ProductClausesWarrentiesExclusionsDTO>> CWEDetails(int LOBId, int CWETypeID, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetProductMaster(string masterType, int parentID, ApiContext apiContext);
        Task<ProductResponse> GetProductGWP(ProductDTO productDTO, ApiContext apiContext);
        Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> SearchAssignProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<MasterEntityDTO> AddEntityData(MasterEntityDTO entityDTO, ApiContext apiContext);
        Task<IEnumerable<Models.BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<List<ddDTOs>> ProductMasterAvo(string masterType, int parentID, ApiContext apiContext);
        Task<List<MasterListItemDTO>> ListProducts(ApiContext Context);
        Task<IEnumerable<ProductDTO>> GetProductByLob(int id, ApiContext apiContext);
        Task<MapQuoteDTO> CalculateQuotePremium(MapQuoteDTO objLifeQuote, ApiContext apiContext, bool AnnualMode = false);
        Task<MapQuoteDTO> GetRiderSumAssured(MapQuoteDTO objLifeQuote);
        Task<List<object>> GetRiders(int ProductId, int PlanId, ApiContext apiContext);
        Task<bool> CheckSpouse(int ProductID, int PlanID, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetRiskClaimMaster(string masterType, int typeId, int parentID, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetAllProductMaster(string masterType, int parentID, ApiContext apiContext);
        Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal ProductId, string type, ApiContext apiContext);
        Task<ProductDTO> GetProductByCode(string ProductCode, ApiContext apiContext);
        Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<DocumentResponse> Docupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<DocumentResponse> PromoDocupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<List<LeadInfoDTO>> BulkSMS(ApiContext apiContext);
        Task<LeadInfoDTO> GetLeadInfo(int LeadID, ApiContext apiContext);
        Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext);
        Task<ProductResponse> PromoApply(PromoDTO promo, ApiContext apiContext);
        Task<dynamic> GetProductRateConfig(int productid, ApiContext apiContext);
        Task<List<ProductRatingMapping>> GetProductRateMapping(int productid, ApiContext apiContext);
        // Task<LGIDTO> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetRiskParam(string lMasterlist, ApiContext apiContext);
        Task<List<MappingDto>> CreateMapping(MappingListDto MapDto, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetPSDMasterData(string masterlist, ApiContext apiContext);
        Task<DynamicEntityDTO> SaveEntities(DynamicEntityDTO dynamicEntity, ApiContext apiContext);
        Task<IEnumerable<DynamicEntityDTO>> SearchEntities(string type, ApiContext apiContext);
        Task<IEnumerable<DynamicEntityDTO>> SearchEntitiesByType(string type, ApiContext apiContext);
        Task<List<DynamicProduct>> GetDynamicProduct(string type, ApiContext apiContext);
    }

    public class ProductService : IProductService
    {
        // private readonly MICAPCContext _context;
        private IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private ILoggerManager _logger;
        private readonly IEmailService _emailService;
        private readonly Func<string, IProductConfigService> _productConfigService;
        private readonly IAvoProductConfigService _AvoproductConfigService;

        public ProductService(IAvoProductConfigService AvoproductConfigService, Func<string, IProductConfigService> productConfigService, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService)
        {
            _productConfigService = productConfigService;
            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            _AvoproductConfigService = AvoproductConfigService;

        }

        public async Task<bool> CheckSpouse(int ProductID, int PlanID, ApiContext apiContext)
        {
            return await _AvoproductConfigService.CheckSpouse(ProductID, PlanID, apiContext);
        }

        public async Task<List<object>> GetRiders(int ProductId, int PlanId, ApiContext apiContext)
        {
            return await _AvoproductConfigService.GetRiders(ProductId, PlanId, apiContext);
        }

        public async Task<MapQuoteDTO> GetRiderSumAssured(MapQuoteDTO objLifeQuote)
        {
            return await _AvoproductConfigService.GetRiderSumAssured(objLifeQuote);
        }

        public async Task<List<ddDTOs>> ProductMasterAvo(string masterType, int parentID, ApiContext apiContext)
        {
            return await _AvoproductConfigService.GetProductMasterAvo(masterType, parentID, apiContext);
        }

        public async Task<MapQuoteDTO> CalculateQuotePremium(MapQuoteDTO objLifeQuote, ApiContext apiContext, bool AnnualMode = false)
        {
            return await _AvoproductConfigService.CalculateQuotePremium(objLifeQuote, apiContext, AnnualMode);
        }

        public async Task<List<MasterListItemDTO>> ListProducts(ApiContext Context)
        {
            return await _AvoproductConfigService.ListProducts(Context);
        }

        public async Task<ProductResponse> Create(ProductDTO productDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).Create(productDTO, apiContext);
        }

        public async Task<MasterDataResponse> AddMasterData(MasterDataDTO masterDataDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).AddMasterData(masterDataDTO, apiContext);
        }

        public async Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetEntityMaster(apiContext);
        }

        public async Task<MasterEntityDTO> AddEntityData(MasterEntityDTO entityDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).AddEntityData(entityDTO, apiContext);
        }

        //Delete Product Id
        public void Delete(int ProductID, ApiContext apiContext)
        {
            _productConfigService(apiContext.ProductType).Delete(ProductID, apiContext);
        }

        //update for products
        public async Task<ProductDTO> ModifyProducts(ProductDTO objProduct, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).ModifyProducts(objProduct, apiContext);
        }

        //get for master
        public async Task<IEnumerable<ddDTOs>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetMaster(lMasterlist, apiContext);
        }

        //get for products
        public async Task<IEnumerable<ProductDTO>> GetProducts(string lProductlist, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProducts(lProductlist, apiContext);
        }

        public async Task<IEnumerable<ProductDTO>> GetProductByLob(int id, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProductByLob(id, apiContext);
        }

        //search for products
        public async Task<IEnumerable<ProductDTO>> SearchProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).SearchProduct(productSearchDTO, apiContext);
        }

        public async Task<IEnumerable<ProductDTO>> SearchAssignProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).SearchAssignProduct(productSearchDTO, apiContext);
        }

        //Get product by Id
        public async Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProductById(ProductId, apiContext);
        }

        //Get product by Code
        public async Task<ProductDTO> GetProductByCode(string ProductCode, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProductByCode(ProductCode, apiContext);
        }

        //SearchChannelDetails
        public async Task<TblProductChannels> ChannelDetails(decimal ChannelId, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).ChannelDetails(ChannelId, apiContext);
        }

        //SearchClaimDetails
        public async Task<TblProductClausesWarrentiesExclusions> ClaimsDetails(decimal Cweid, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).ClaimsDetails(Cweid, apiContext);
        }

        //SearchRiskDetails
        public async Task<IEnumerable<ProductRcbdetailsDTO>> RCBDetails(decimal ProductId, string type, string FieldType, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).RCBDetails(ProductId, type, FieldType, apiContext);
        }

        public async Task<List<ProductClausesWarrentiesExclusionsDTO>> CWEDetails(int LOBId, int CWETypeID, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).CWEDetails(LOBId, CWETypeID, apiContext);
        }

        public async Task<IEnumerable<ddDTOs>> GetProductMaster(string masterType, int parentID, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProductMaster(masterType, parentID, apiContext);
        }

        public ProductDTO UpdateProductModel(ProductDTO objProduct)
        {
            ProductRcbdetailsDTO rcbDetail = null;
            objProduct.CreatedDate = DateTime.Now;
            foreach (var item in objProduct.RiskDetails)
            {
                rcbDetail = new ProductRcbdetailsDTO();
                rcbDetail.InputType = item.mType;
                rcbDetail.IsReqired = item.mIsRequired;
                rcbDetail.InputId = item.mID;
                objProduct.ProductRcbdetails.Add(rcbDetail);
            }
            foreach (var item in objProduct.ClaimDetails)
            {
                rcbDetail = new ProductRcbdetailsDTO();
                rcbDetail.InputType = item.mType;
                rcbDetail.IsReqired = item.mIsRequired;
                rcbDetail.InputId = item.mID;
                objProduct.ProductRcbdetails.Add(rcbDetail);
            }
            //   objProduct.TblProductClausesWarrentiesExclusions.Select(t => { t.Cweid =0; return t; }).ToList();
            foreach (var item in objProduct.ProductClausesWarrentiesExclusions)
            {
                item.Cweid = 0;
            }

            return objProduct;
        }

        public async Task<TblProductRcbdetails> RiskDetails(decimal RcbdetailsId, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).RiskDetails(RcbdetailsId, apiContext);
        }

        public async Task<ProductResponse> ProductCodevalidation(string code, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).ProductCodevalidation(code, apiContext);
        }
        public async Task<ProductResponse> ProductNamevalidation(string name, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).ProductNamevalidation(name, apiContext);
        }

        public async Task<ProductResponse> GetProductGWP(ProductDTO productDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).Create(productDTO, apiContext);
        }

        public async Task<IEnumerable<Models.BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest productDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).BillingEventData(productDTO, apiContext);
        }

        public async Task<IEnumerable<ddDTOs>> GetRiskClaimMaster(string masterType, int typeId, int parentID, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetRiskClaimMaster(masterType, typeId, parentID, apiContext);
        }

        //InsurableRiskDetails
        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal ProductId, string type, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetInsurableRiskDetails(ProductId, type, apiContext);
        }

        public async Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).BillingEventResponse(pDTO, apiContext);
        }

        public async Task<IEnumerable<ddDTOs>> GetAllProductMaster(string masterType, int parentID, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetAllProductMaster(masterType, parentID, apiContext);
        }


        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).Documentupload(httpRequest, cancellationToken, apiContext);
        }

        public async Task<DocumentResponse> Docupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).Docupload(productcode, productId, httpRequest, cancellationToken, apiContext);
        }

        public async Task<DocumentResponse> PromoDocupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).PromoDocupload(productcode, productId, httpRequest, cancellationToken, apiContext);
        }

        public async Task<List<LeadInfoDTO>> BulkSMS(ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).BulkSMS(apiContext);
        }


        public async Task<LeadInfoDTO> GetLeadInfo(int LeadID, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetLeadInfo(LeadID, apiContext);
        }

        public async Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).BenefitValueLGIAsync(product, apiContext);
        }

        public async Task<ProductResponse> PromoApply(PromoDTO promo, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).PromoApply(promo, apiContext);
        }

        public async Task<dynamic> GetProductRateConfig(int productid, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProductRateConfig(productid, apiContext);
        }

        public async Task<List<ProductRatingMapping>> GetProductRateMapping(int productid, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetProductRateMapping(productid, apiContext);
        }
        public async Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetHandleEventsMaster(lMasterlist, apiContext);
        }

        public async Task<IEnumerable<MasDTO>> GetRiskParam(string lMasterlist, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetRiskParam(lMasterlist, apiContext);
        }

        public async Task<List<MappingDto>> CreateMapping(MappingListDto MapDto, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).CreateMapping(MapDto, apiContext);
        }

        public async Task<IEnumerable<MasDTO>> GetPSDMasterData(string masterlist, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetPSDMasterData(masterlist, apiContext);
        }

        public async Task<DynamicEntityDTO> SaveEntities(DynamicEntityDTO dynamicEntity, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).SaveEntities(dynamicEntity, apiContext);
        }

        public async Task<IEnumerable<DynamicEntityDTO>> SearchEntities(string type, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).SearchEntities(type, apiContext);
        }

        public async Task<IEnumerable<DynamicEntityDTO>> SearchEntitiesByType(string type, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).SearchEntitiesByType(type, apiContext);
        }

        public async Task<List<DynamicProduct>> GetDynamicProduct(string type, ApiContext apiContext)
        {
            return await _productConfigService(apiContext.ProductType).GetDynamicProduct(type, apiContext);
        }
    }
}
