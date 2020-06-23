using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Helpers;
using iNube.Services.ProductConfiguration.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.ProductConfiguration.Controllers.Product.ProductServices
{
    public interface IProductConfigService
    {
        Task<ProductResponse> Create(ProductDTO objProduct, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetMaster(string sMasterList, ApiContext apiContext);
        Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> GetProducts(string lProductlist, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> SearchProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext);
        Task<TblProductChannels> ChannelDetails(decimal ChannelId, ApiContext apiContext);
        Task<TblProductClausesWarrentiesExclusions> ClaimsDetails(decimal Cweid, ApiContext apiContext);
        Task<TblProductRcbdetails> RiskDetails(decimal RcbdetailsId, ApiContext apiContext);
        Task<IEnumerable<ProductRcbdetailsDTO>> RCBDetails(decimal ProductId, string type, string FieldType, ApiContext apiContext);
        void Delete(int ProductID, ApiContext apiContext);
        Task<ProductResponse> ProductCodevalidation(string code, ApiContext apiContext);
        Task<ProductDTO> ModifyProducts(ProductDTO objProduct, ApiContext apiContext);
        Task<List<ProductClausesWarrentiesExclusionsDTO>> CWEDetails(int LOBId, int CWETypeID, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetProductMaster(string masterType, int parentID, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetAllProductMaster(string masterType, int parentID, ApiContext apiContext);
        Task<ProductResponse> GetProductGWP(ProductDTO productDTO, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> SearchAssignProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext);
        Task<MasterDataResponse> AddMasterData(MasterDataDTO masterDataDTO, ApiContext apiContext);
        Task<MasterEntityDTO> AddEntityData(MasterEntityDTO entityDTO, ApiContext apiContext);
        Task<IEnumerable<Models.BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<IEnumerable<ProductDTO>> GetProductByLob(int id, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetRiskClaimMaster(string masterType, int typeId, int parentID, ApiContext apiContext);
        Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest pDTO, ApiContext apiContext);
        Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal ProductId, string type, ApiContext apiContext);
        Task<ProductDTO> GetProductByCode(string ProductCode, ApiContext apiContext);
        Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<DocumentResponse> Docupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<DocumentResponse> PromoDocupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<List<LeadInfoDTO>> BulkSMS(ApiContext apiContext);
        Task<LeadInfoDTO> GetLeadInfo(int LeadID, ApiContext apiContext);
        Task<ProductResponse> ProductNamevalidation(string name, ApiContext apiContext);
        Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext);
        Task<ProductResponse> PromoApply(PromoDTO promo, ApiContext apiContext);
        Task<dynamic> GetProductRateConfig(int productid, ApiContext apiContext);
        Task<List<ProductRatingMapping>> GetProductRateMapping(int productid, ApiContext apiContext);
        //Task<LGIDTO> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetRiskParam(string lMasterlist, ApiContext apiContext);
        Task<List<MappingDto>> CreateMapping(MappingListDto MapDto, ApiContext apiContext);
        Task<IEnumerable<MasDTO>> GetPSDMasterData(string masterlist, ApiContext apiContext);
        Task<EntityDetailsDTO> SaveEntities(EntityDetailsDTO entityDetails, ApiContext apiContext);
        Task<IEnumerable<EntityDetailsDTO>> SearchEntities(string type, ApiContext apiContext);
        Task<IEnumerable<EntityDetailsDTO>> SearchEntitiesByType(string type, ApiContext apiContext);
        Task<List<DynamicProduct>> GetDynamicProduct(string type, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetParentid(ApiContext apiContext)
    }
}
