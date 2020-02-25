using AutoMapper;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Helpers;
using iNube.Services.ProductConfiguration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation.Results;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using iNube.Utility.Framework.LogPrivider.LogService;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Threading;

namespace iNube.Services.ProductConfiguration.Controllers.Product.ProductServices.MotorProduct
{
    public class MotorProductService : IProductConfigService
    {
        private MICAPCContext _context;
        private IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private ILoggerManager _logger;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public MotorProductService(MICAPCContext context, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService, IConfiguration configuration)
        {

            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            _configuration = configuration;
        }

        public async Task<ProductResponse> Create(ProductDTO productDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            try
            {
                productDTO =await UpdateProductModel(productDTO);
                var product = _mapper.Map<TblProducts>(productDTO);
                _context.TblProducts.Add(product);
                _context.SaveChanges();
                productDTO = _mapper.Map<ProductDTO>(product);
                return new ProductResponse { Status = BusinessStatus.Created, product = productDTO, ResponseMessage = $"Product successfully created! \n Product Name: {productDTO.ProductName} & Product ID: {productDTO.ProductId}" };
            }
            catch (Exception ex)
            {
                // _logger.LogError("Creatre Product Exception get called");
                return new ProductResponse { Status = BusinessStatus.Error };
            }

        }

        public async Task<MasterDataResponse> AddMasterData(MasterDataDTO masterDataDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //Delete Product Id
        public void Delete(int ProductID, ApiContext apiContext)
        {
            //_context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //var delete_prod = _context.TblProducts.Find(ProductID);
            //if (delete_prod != null)
            //{
            //    _context.TblProducts.Remove(delete_prod);
            //    _context.SaveChanges();
            //}
        }

        //update for products
        public async Task<ProductDTO> ModifyProducts(ProductDTO objProduct, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var tbl_product = _mapper.Map<TblProducts>(objProduct);
            var tbl_Products = _context.TblProducts.Find(tbl_product.ProductId);

            if (tbl_Products == null)
                throw new AppException("Product not found");

            if (objProduct.ProductCode != objProduct.ProductCode)
            {
                // productcode has changed so check if the new product code is already taken
                if (_context.TblProducts.Any(x => x.ProductCode == objProduct.ProductCode))
                    throw new AppException("Product ID " + objProduct.ProductCode + " is already taken");
            }

            // update user properties
            tbl_Products.Lobid = objProduct.Lobid;
            tbl_Products.ProductName = objProduct.ProductName;
            tbl_Products.ProductCode = objProduct.ProductCode;
            tbl_Products.ActiveFrom = objProduct.ActiveFrom;
            tbl_Products.ActiveTo = objProduct.ActiveTo;
            tbl_Products.PremiumAmount = objProduct.PremiumAmount;
            tbl_Products.ModifyBy = objProduct.ModifyBy;
            tbl_Products.ModifyDate = objProduct.ModifyDate;


            _context.TblProducts.Update(tbl_Products);
            _context.SaveChanges();
            var productDTO = _mapper.Map<ProductDTO>(tbl_product);
            return productDTO;
        }

        public async Task<MasterEntityDTO> AddEntityData(MasterEntityDTO entityDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //get for master
        public async Task<IEnumerable<ddDTOs>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            IEnumerable<ddDTOs> ddDTOs;

            if (lMasterlist == "Product")
            {
                ddDTOs = from pr in _context.TblProducts.OrderByDescending(p => p.CreatedDate)
                         join p1 in _context.TblmasProductMaster on pr.Cobid equals p1.ProductMasterId
                         join p2 in _context.TblmasProductMaster on pr.Lobid equals p2.ProductMasterId
                         select new ddDTOs
                         {
                             mID = pr.ProductId,
                             mValue = pr.ProductName,
                             mType = lMasterlist,
                             lob = p2.Value,
                             cob = p1.Value
                         };
            }
            else if (lMasterlist == "Currency")
            {

                ddDTOs = _context.TblmasPccommonTypes.Where(p => p.MasterType == lMasterlist)
                 .Select(c => new ddDTOs
                 {
                     mID = c.CommonTypeId,
                     mValue = c.Value,
                     mType = c.MasterType
                 });
            }
            else
            {
                ddDTOs = _context.TblmasPccommonTypes
                 .Select(c => new ddDTOs
                 {
                     mID = c.CommonTypeId,
                     mValue = c.Value,
                     mType = c.MasterType
                 });
            }
            return ddDTOs;
        }
        
        //get for products
        public async Task<IEnumerable<ProductDTO>> GetProducts(string lProductlist, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var products_list = _context.TblProducts.Select(x => x);
            var productDTOs = _mapper.Map<IList<ProductDTO>>(products_list);
            return productDTOs;
        }

        //search for products
        public async Task<IEnumerable<ProductDTO>> SearchProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            string[] lobCob = new string[] { "LOB", "COB" };
            var masterList = _context.TblmasPccommonTypes.Where(p => lobCob.Contains(p.MasterType))
                              .ToDictionary(m => m.CommonTypeId, n => n.Value);
            var _products = from pr in _context.TblProducts.OrderByDescending(p => p.CreatedDate)
                            select pr;

            if (!string.IsNullOrEmpty(productSearchDTO.ProductCode))
            {
                _products = _products.Where(pr => pr.ProductCode.Contains(productSearchDTO.ProductCode));
                // _products = $"pr.ProductCode.Contains({productSearchDTO.ProductCode})";
            }
            if (!string.IsNullOrEmpty(productSearchDTO.ProductName))
            {
                _products = _products.Where(pr => pr.ProductName.Contains(productSearchDTO.ProductName));
            }
            if (productSearchDTO.Lobid > 0)
            {
                _products = _products.Where(pr => pr.Lobid == productSearchDTO.Lobid);
            }
            if (productSearchDTO.Cobid > 0)
            {
                _products = _products.Where(pr => pr.Cobid == productSearchDTO.Cobid);
            }
            var _productSearchDTOs = _mapper.Map<IEnumerable<ProductDTO>>(_products);
            foreach (var item in _productSearchDTOs)
            {
                item.Label = item.ProductName;
                item.Value = item.ProductId.ToString();
                item.LOB1 = masterList.FirstOrDefault(p => p.Key == item.Lobid).Value;
                item.COB1 = masterList.FirstOrDefault(p => p.Key == item.Cobid).Value;
            }
            return _productSearchDTOs;
        }

        public async Task<IEnumerable<ProductDTO>> SearchAssignProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            string[] lobCob = new string[] { "LOB", "COB" };
            var masterList = _context.TblmasPccommonTypes.Where(p => lobCob.Contains(p.MasterType))
                              .ToDictionary(m => m.CommonTypeId, n => n.Value);
            var _products = from pr in _context.TblProducts.OrderByDescending(p => p.CreatedDate)
                            select pr;

            if (!string.IsNullOrEmpty(productSearchDTO.ProductCode))
            {
                _products = _products.Where(pr => pr.ProductCode.Contains(productSearchDTO.ProductCode));
                // _products = $"pr.ProductCode.Contains({productSearchDTO.ProductCode})";
            }
            if (!string.IsNullOrEmpty(productSearchDTO.ProductName))
            {
                _products = _products.Where(pr => pr.ProductName.Contains(productSearchDTO.ProductName));
            }
            if (productSearchDTO.Lobid > 0)
            {
                _products = _products.Where(pr => pr.Lobid == productSearchDTO.Lobid);
            }
            if (productSearchDTO.Cobid > 0)
            {
                _products = _products.Where(pr => pr.Cobid == productSearchDTO.Cobid);
            }
            var _productSearchDTOs = _mapper.Map<IEnumerable<ProductDTO>>(_products);
            foreach (var item in _productSearchDTOs)
            {
                item.Label = item.ProductName;
                item.Value = item.ProductId.ToString();
                item.LOB1 = masterList.FirstOrDefault(p => p.Key == item.Lobid).Value;
                item.COB1 = masterList.FirstOrDefault(p => p.Key == item.Cobid).Value;
            }
            return _productSearchDTOs;
        }

        //Get product by Id
        public async Task<ProductDTO> GetProductById(int ProductId, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var tblProduct = _context.TblProducts.Where(item => item.ProductId == ProductId)
                        //.Include(add => add.TblProductBenefits)
                        .Include("TblProductBenefits.TblBenifitRangeDetails")
                        .Include(ad => ad.TblProductChannels)
                        .Include(ads => ads.TblProductClausesWarrentiesExclusions)
                        //.Include(add => add.TblProductCovers)
                        .Include(add => add.TblProductRcbdetails)
                         .Include(add => add.TblProductInsurableItems)
                         //.Include(addl => addl.TblProductPremium)
                        .FirstOrDefault();
            if (tblProduct != null)
            {
                string[] masterFilter = new string[] { "LOB", "COB", "CWEType", "Channels" };
                var masterList = _context.TblmasPccommonTypes.Where(p => masterFilter.Contains(p.MasterType))
                                  .ToDictionary(m => m.CommonTypeId, n => n.Value);

                string[] riskClaimFilter = new string[] { "Risk", "Claim" };
                var masterRiskClaimList = _context.TblmasProductMaster.Where(p => riskClaimFilter.Contains(p.MasterType))
                                  .ToDictionary(m => m.ProductMasterId, n => n.Value);
                var productDTO = _mapper.Map<ProductDTO>(tblProduct);
                productDTO.LOB1 = masterList.FirstOrDefault(p => p.Key == productDTO.Lobid).Value;
                productDTO.COB1 = masterList.FirstOrDefault(p => p.Key == productDTO.Cobid).Value;

                //cover 
                //foreach (var item in productDTO.ProductCovers)
                //{
                //    item.Cover = _context.TblmasProductMaster.First(c => c.ProductMasterId == item.CoverTypeId).Value;
                //    item.CoverEvent = _context.TblmasProductMaster.First(c => c.ProductMasterId == item.CoverEventId).Value;

                //}
                //cwe
                foreach (var item in productDTO.ProductClausesWarrentiesExclusions)
                {
                    item.Label = item.TypeName;
                    item.Cwetypes = masterList.FirstOrDefault(p => p.Key == item.CwetypeId).Value;
                }
                foreach (var item in productDTO.ProductChannels)
                {
                    item.ChannelName = masterList.FirstOrDefault(p => p.Key == item.ChannelTypeId).Value;
                }
                //benifit
                //R & C

                foreach (var item in productDTO.ProductRcbdetails)
                {
                    item.disable = item.IsReqired;
                    item.mIsRequired = item.IsReqired;
                    item.mValue = masterRiskClaimList.FirstOrDefault(p => p.Key == item.InputId).Value;

                }
                return productDTO;
            }
            return null;
        }
        
        //SearchChannelDetails
        public async Task<TblProductChannels> ChannelDetails(decimal ChannelId, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            return _context.TblProductChannels.Find(ChannelId);
        }
        
        //SearchClaimDetails
        public async Task<TblProductClausesWarrentiesExclusions> ClaimsDetails(decimal Cweid, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            return _context.TblProductClausesWarrentiesExclusions.Find(Cweid);
        }
        
        //SearchRiskDetails
        public async Task<IEnumerable<ProductRcbdetailsDTO>> RCBDetails(decimal ProductId, string type,string FieldType, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var rcbDetails = (from rc in _context.TblProductRcbdetails
                              join p in _context.TblmasProductMaster on rc.InputId equals p.ProductMasterId
                              where rc.ProductId == ProductId && rc.InputType == type && (bool)rc.IsReqired
                              orderby p.SortOrder //&& rc.IsReqired
                              select new ProductRcbdetailsDTO
                              {
                                  InputType = p.Value,
                                  InputId = p.ProductMasterId,
                                  RcbdetailsId = rc.RcbdetailsId,
                                  UserInputType = p.UserInputType
                              }).ToList();
            return rcbDetails;
        }

        public void CreateProduct(object objProduct)
        {
            //throw new NotImplementedException();
        }

        public async Task<List<ProductClausesWarrentiesExclusionsDTO>> CWEDetails(int LOBId, int CWETypeID, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var cweType = _context.TblmasPccommonTypes.FirstOrDefault(t => t.CommonTypeId == CWETypeID).Value;
            var Type = cweType.Substring(0, 1);
            var tblCCWEList = _context.TblmasClausesWarrentiesExclusions.Where(t => t.Lobid == LOBId && t.CwetypeId == CWETypeID).ToList();
            var cweList = _mapper.Map<List<ProductClausesWarrentiesExclusionsDTO>>(tblCCWEList);
            foreach (var item in cweList)
            {
                item.Label = item.TypeName;
                item.Cwetypes = Type;
                item.Checked = false;
            }
            return cweList;
        }

        public async Task<IEnumerable<ddDTOs>> GetProductMaster(string masterType, int parentID, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            List<int> lstParentId = new List<int> { 0, parentID };
            var productMasters_list = _context.TblmasProductMaster.Where(x => x.MasterType == masterType && x.IsActive && lstParentId.Contains((int)x.ParentId))
                .OrderByDescending(p => p.IsDisable).ThenBy(p => p.SortOrder);
            IEnumerable<ddDTOs> ddDTOs;
            ddDTOs = productMasters_list
             .Select(c => new ddDTOs
             {
                 mID = c.ProductMasterId,
                 mValue = c.Value,
                 mType = c.MasterType,
                 mIsRequired = c.IsDisable,
                 disable = c.IsDisable
             });


            return ddDTOs;
        }

        public async Task<ProductDTO> UpdateProductModel(ProductDTO objProduct)
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
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            return _context.TblProductRcbdetails.Find(RcbdetailsId);
        }

        public async Task<ProductResponse> ProductCodevalidation(string code, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var data = _context.TblProducts.Any(e => e.ProductCode == code);
            if (data == true)
            {
                return new ProductResponse() { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Product ID {code} already taken" };
            }
            else
            {
                return new ProductResponse() { Status = BusinessStatus.Ok, ResponseMessage = $"ok " };
            }
        }

        public async Task<ProductResponse> GetProductGWP(ProductDTO productDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));
            var TotalGWP = from P in _context.TblProducts.Where(e => e.ProductId == productDTO.ProductId)
                           group P by P.ProductId into g
                           select new { productCount = g.Count(), productSum = g.Sum(o => o.PremiumAmount), issuedate = g.Select(s => s.CreatedDate).ToList() };
            return null;
        }

        public async Task<ProductResponse> GetProductBillingData(string productCode, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ProductDTO>> GetProductByLob(int id, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTOs>> GetRiskClaimMaster(string masterType, int typeId, int parentID, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal ProductId, string type, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ProductDTO> GetProductByCode(string ProductCode, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest pDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTOs>> GetAllProductMaster(string masterType, int parentID, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DocumentResponse> Docupload(string productcode,string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public Task<DocumentResponse> PromoDocupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<LeadInfoDTO>> BulkSMS(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<LeadInfoDTO> GetLeadInfo(int LeadID, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public Task<ProductResponse> ProductNamevalidation(string name, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //public Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}

        public Task<ProductResponse> PromoApply(PromoDTO promo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> GetProductRateConfig(int productid, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductRatingMapping>> GetProductRateMapping(int productid, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist,ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<MasDTO>> GetRiskParam(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        
            public async Task<List<MappingDto>> CreateMapping(MappingListDto MapDto, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
