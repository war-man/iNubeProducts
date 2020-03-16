using AutoMapper;
using iNube.Services.ProductConfiguration.Entities;
using iNube.Services.ProductConfiguration.Helpers;
using iNube.Services.ProductConfiguration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.LogPrivider.LogService;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Data;
using System.IO;
using OfficeOpenXml;
using iNube.Services.ProductConfiguration.Controllers.Product.IntegrationServices;
using System.Data.SqlClient;
using System.Net;
using System.Dynamic;
using Microsoft.Extensions.Configuration;

namespace iNube.Services.ProductConfiguration.Controllers.Product.ProductServices.MicaProduct
{
    public class MicaProductService : IProductConfigService
    {
        private MICAPCContext _context;
        public IIntegrationService _integrationService;
        private IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private ILoggerManager _logger;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public MicaProductService(MICAPCContext context, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService, IIntegrationService integrationService, IConfiguration configuration)
        {

            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            _integrationService = integrationService;
            _configuration = configuration;
        }

        public async Task<ProductResponse> Create(ProductDTO productDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {
                productDTO = await UpdateProductModel(productDTO, apiContext);
                var product = _mapper.Map<TblProducts>(productDTO);
                product.PartnerId = apiContext.PartnerId;
                _context.TblProducts.Add(product);
                _context.SaveChanges();
                // productDTO = _mapper.Map<ProductDTO>(product);
                var products = await ReUpdateProductModel(product, apiContext);
                productDTO = _mapper.Map<ProductDTO>(products);
                return new ProductResponse { Status = BusinessStatus.Created, product = productDTO, ResponseMessage = $"Product successfully created! \n Product Name: {productDTO.ProductName} & Product Code: {productDTO.ProductCode}" };
            }

            catch (Exception ex)
            {
                // _logger.LogError("Creatre Product Exception get called");
                return new ProductResponse { Status = BusinessStatus.Error };
            }

        }
        public async Task<TblProducts> ReUpdateProductModel(TblProducts objProductmodel, ApiContext apiContext)
        {

            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            foreach (var item in objProductmodel.TblProductClausesWarrentiesExclusions)
            {

                if (item.LevelId == 51)
                {
                    item.RefId = objProductmodel.ProductId;

                }
                else if (item.LevelId == 52)
                {
                    item.RefId = Convert.ToInt32(objProductmodel.TblProductInsurableItems.FirstOrDefault(s => s.InsurableItemTypeId == item.SubLevelId).InsurableItemId);
                }
                else if (item.LevelId == 53)
                {
                    item.RefId = Convert.ToInt32(objProductmodel.TblProductInsurableItems.SelectMany(p => p.TblProductCovers).FirstOrDefault(s => s.CoverTypeId == item.SubLevelId).CoverId);

                }
                else if (item.LevelId == 62)
                {
                    item.RefId = Convert.ToInt32(objProductmodel.TblProductInsurableItems.SelectMany(p => p.TblProductCovers).FirstOrDefault(s => s.CoverTypeId == item.SubLevelId).CoverId);
                }
            }
            //var res = _mapper.Map<TblProductClausesWarrentiesExclusions>(objProductmodel.TblProductClausesWarrentiesExclusions);
            _context.TblProductClausesWarrentiesExclusions.UpdateRange(objProductmodel.TblProductClausesWarrentiesExclusions);
            //  _context.SaveChanges();
            //var id = 0;
            foreach (var item in objProductmodel.TblProductPremium)
            {
                if (item.LevelId == 51)
                {
                    item.RefId = objProductmodel.ProductId;

                }
                else if (item.LevelId == 52)
                {
                    item.RefId = Convert.ToInt32(objProductmodel.TblProductInsurableItems.FirstOrDefault(s => s.InsurableItemTypeId == item.SubLevelId).InsurableItemId);
                }
                else if (item.LevelId == 53)
                {
                    item.RefId = Convert.ToInt32(objProductmodel.TblProductInsurableItems.SelectMany(p => p.TblProductCovers).FirstOrDefault(s => s.CoverTypeId == item.SubLevelId).CoverId);

                }
                else if (item.LevelId == 62)
                {
                    //id = Convert.ToInt32(objProductmodel.TblProductInsurableItems.SelectMany(p => p.TblProductCovers).FirstOrDefault(s => s.CoverTypeId == item.SubLevelId).CoverId);
                    item.RefId = 0;
                    //Convert.ToInt32(_context.TblProductBenefits.SingleOrDefault(s => s.CoverId == id).BenefitId);

                }
            }
            _context.TblProductPremium.UpdateRange(objProductmodel.TblProductPremium);
            //  _context.SaveChanges();

            foreach (var item in objProductmodel.TblProductRatingMapping)
            {
                item.ProductId = objProductmodel.ProductId;

            }
            _context.TblProductRatingMapping.UpdateRange(objProductmodel.TblProductRatingMapping);
            _context.SaveChanges();
            return objProductmodel;

        }


        //For invoice generation-- displaying line item details in email pdf
        public async Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest pDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, pDTO.EvtId.ToString(), _configuration));
            BillingEventResponseDTO BillingData = new BillingEventResponseDTO();
            if (pDTO.FromDate != null && pDTO.ToDate != null)
            {
                var Billingresult = (from tblProducts in _context.TblProducts.Where(tblProducts => tblProducts.OrganizationId == pDTO.CustomerId && tblProducts.CreatedDate.Value.Date >= pDTO.FromDate.Date && tblProducts.CreatedDate.Value.Date <= pDTO.ToDate.Date)
                                     select new ProductEventDTO
                                     {
                                         ProductCode = tblProducts.ProductCode,
                                         ProductName = tblProducts.ProductName,
                                         CreatedDate = tblProducts.CreatedDate
                                     });
                List<BillingEventDataDTO> BillingResult = new List<BillingEventDataDTO>();
                BillingData.productEventDTOs.AddRange(Billingresult);
            }


            BillingData.billingEventDataDTOs = (await BillingEventData(pDTO, apiContext)).ToList();
            return BillingData;
        }

        //For invoice generation-- getting product count
        public async Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, pDTO.EvtId.ToString(), _configuration));
            //var BilingData = (from P in _context.TblProducts.OrderBy(p => p.CreatedDate)
            //                  select new ProductBilingDataDTO
            //                  {
            //                      ProductName = P.ProductName,
            //                      ProductCode = P.ProductCode,
            //                      ProductCount = P.ProductCode.Count()
            //                  });
            List<BillingEventDataDTO> BilingData = new List<BillingEventDataDTO>();
            BillingEventDataDTO Bilingresult = new BillingEventDataDTO();

            if (pDTO.FromDate != null && pDTO.ToDate != null)
            {

                Bilingresult.Count = _context.TblProducts.Where(ac => ac.OrganizationId == pDTO.CustomerId && ac.CreatedDate.Value.Date >= pDTO.FromDate.Date && ac.CreatedDate.Value.Date <= pDTO.ToDate.Date).Count();
                BilingData.Add(Bilingresult);
            }
            return BilingData;
        }

        public async Task<MasterDataResponse> AddMasterData(MasterDataDTO masterDataDTO, ApiContext apiContext)
        {
            //throw new NotImplementedException();
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var masdata = _mapper.Map<TblmasProductMaster>(masterDataDTO);
            _context.TblmasProductMaster.Add(masdata);
            _context.SaveChanges();
            var _masterDTOs = _mapper.Map<MasterDataDTO>(masdata);
            return new MasterDataResponse { Status = BusinessStatus.Created, master = _masterDTOs, Id = _masterDTOs.MasterType, ResponseMessage = $"MasterData added successfully!" };

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
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var tbl_product = _mapper.Map<TblProducts>(objProduct);
            var tbl_Products = _context.TblProducts.Find(tbl_product.ProductId);

            if (tbl_Products == null)
                throw new AppException("Product not found");

            if (objProduct.ProductCode != objProduct.ProductCode)
            {
                // productcode has changed so check if the new product code is already taken
                if (_context.TblProducts.Any(x => x.ProductCode == objProduct.ProductCode))
                    throw new AppException("Product ID " + objProduct.ProductCode + " is already exist");
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

        //get for master
        public async Task<IEnumerable<ddDTOs>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
                             cob = p1.Value,
                             Label = pr.ProductName,
                             Value = pr.ProductId.ToString(),
                             productCode = pr.ProductCode,
                             Lobid = pr.Lobid,
                             Cobid = pr.Cobid
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

            else if (lMasterlist == "CoverEvent")
            {

                ddDTOs = _context.TblmasPccommonTypes.Where(p => p.MasterType == lMasterlist)
                 .Select(c => new ddDTOs
                 {
                     mID = c.CommonTypeId,
                     mValue = c.Value,
                     mType = c.MasterType
                 });
            }
            else if (lMasterlist == "LOB")
            {
                ddDTOs = _context.TblmasProductMaster
                 .Select(c => new ddDTOs
                 {
                     mID = c.ProductMasterId,
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
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var products_list = _context.TblProducts.Select(x => x);
            var productDTOs = _mapper.Map<IList<ProductDTO>>(products_list);
            return productDTOs;
        }
        //Excel upload
        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            //int result = GetActiveResult();
            //if (result == 1)
            //{
            var files = httpRequest.Form.Files;
            //var docId = GetActiveResult(file.Name); HttpRequest
            DataTable dt = new DataTable();
            foreach (var file in files)
            {
                var filename = file.Name;
                //var tblbankdoc = await GetDocumentId(file.Name, apiContext);

                if (file == null || file.Length <= 0)
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                }
                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx file" };
                }
                
                bool sms = true;
                bool email = true;

                //dt.Columns.Add("BankFileId", typeof(int));
                // dt.Columns.Add("Id", typeof(string));
                dt.Columns.Add("FirstName", typeof(string));
                dt.Columns.Add("MobileNumber", typeof(string));
                dt.Columns.Add("EmailID", typeof(string));
                dt.Columns.Add("ProductId", typeof(string));
                dt.Columns.Add("PartnerId", typeof(string));
                dt.Columns.Add("SMSstatus", typeof(string));
                dt.Columns.Add("Emailstatus", typeof(string));
                dt.Columns.Add("IsPayment", typeof(bool));

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream, cancellationToken);
                    try
                    {
                        using (var package = new ExcelPackage(stream))
                        {
                            ExcelWorksheet worksheet = package.Workbook.Worksheets["User Details"];
                            if (worksheet != null)
                            {
                                var rowCount = worksheet.Dimension.Rows;

                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dr = dt.NewRow();
                                    //dr["BankFileId"] = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                                    //dr["Id"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    dr["FirstName"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    dr["MobileNumber"] = worksheet.Cells[row, 3].Value.ToString().Trim();
                                    dr["EmailID"] = worksheet.Cells[row, 4].Value.ToString().Trim();
                                    dr["ProductId"] = worksheet.Cells[row, 5].Value.ToString().Trim();
                                    dr["PartnerId"] = worksheet.Cells[row, 6].Value.ToString().Trim();
                                    dr["SMSstatus"] = sms;
                                    dr["Emailstatus"] = email;
                                    dr["IsPayment"] = worksheet.Cells[row, 7].Value;
                                    dt.Rows.Add(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.ToString();
                        return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                    }
                }
            }
            try
            {
                // add list to db ..
                // here just read and return
                var connectionString = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
                //string connetionString = "Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123";
                using (var bulkCopy = new SqlBulkCopy(connectionString, SqlBulkCopyOptions.KeepIdentity))
                {
                    // my DataTable column names match my SQL Column names, so I simply made this loop. However if your column names don't match, just pass in which datatable name matches the SQL column name in Column Mappings
                    foreach (DataColumn col in dt.Columns)
                    {
                        bulkCopy.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                    }
                    bulkCopy.BulkCopyTimeout = 600;
                    bulkCopy.DestinationTableName = "[PC].[TblLeadInfo]";
                    bulkCopy.WriteToServer(dt);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                //return DemoResponse<List<BankFileDTO>>.GetResult(-1, error);
            }
            return new DocumentResponse { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded succefully!" };
            //return DemoResponse<List<BankFileDTO>>.GetResult(0, "OK", list);
            //}
            //return DemoResponse<List<BankFileDTO>>.GetResult(2, "Data still processing");
        }

        public async Task<DocumentResponse> Docupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            //int result = GetActiveResult();
            //if (result == 1)
            //{
            var files = httpRequest.Form.Files;
            //var docId = GetActiveResult(file.Name); HttpRequest
            DataTable dt = new DataTable();
            foreach (var file in files)
            {
                var filename = file.Name;
                //var tblbankdoc = await GetDocumentId(file.Name, apiContext);
                if (file == null || file.Length <= 0)
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                }
                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx file" };
                }
                bool sms = true;
                bool email = true;
                //dt.Columns.Add("BankFileId", typeof(int));
                // dt.Columns.Add("Id", typeof(string));
                dt.Columns.Add("FirstName", typeof(string));
                dt.Columns.Add("MobileNumber", typeof(string));
                dt.Columns.Add("EmailID", typeof(string));
                dt.Columns.Add("ProductCode", typeof(string));
                dt.Columns.Add("ProductId", typeof(string));
                dt.Columns.Add("PartnerId", typeof(string));
                dt.Columns.Add("SMSstatus", typeof(string));
                dt.Columns.Add("Emailstatus", typeof(string));
                dt.Columns.Add("IsPayment", typeof(bool));
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream, cancellationToken);
                    try
                    {
                        using (var package = new ExcelPackage(stream))
                        {
                            ExcelWorksheet worksheet = package.Workbook.Worksheets["User Details"];
                            if (worksheet != null)
                            {
                                var rowCount = worksheet.Dimension.Rows;
                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dr = dt.NewRow();
                                    //dr["BankFileId"] = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                                    //dr["Id"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    if (worksheet.Cells[row, 2].Value != null)
                                    {
                                        dr["FirstName"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    }
                                    if (worksheet.Cells[row, 3].Value != null)
                                    {
                                        dr["MobileNumber"] = worksheet.Cells[row, 3].Value.ToString().Trim();
                                    }
                                    if (worksheet.Cells[row, 4].Value != null)
                                    {
                                        dr["EmailID"] = worksheet.Cells[row, 4].Value.ToString().Trim();
                                    }

                                    dr["ProductCode"] = productcode;
                                    dr["ProductId"] = productId;
                                    dr["PartnerId"] = apiContext.PartnerId;
                                    dr["SMSstatus"] = sms;
                                    dr["Emailstatus"] = email;
                                    if (worksheet.Cells[row, 5].Value != null)
                                    {
                                        dr["IsPayment"] = (bool)worksheet.Cells[row, 5].Value;
                                    }
                                    dt.Rows.Add(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.ToString();
                        return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                    }
                }
            }
            try
            {
                // add list to db ..
                // here just read and return
                var connectionString = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
                //string connetionString = "Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123";
                using (var bulkCopy = new SqlBulkCopy(connectionString, SqlBulkCopyOptions.KeepIdentity))
                {
                    // my DataTable column names match my SQL Column names, so I simply made this loop. However if your column names don't match, just pass in which datatable name matches the SQL column name in Column Mappings
                    foreach (DataColumn col in dt.Columns)
                    {
                        bulkCopy.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                    }
                    bulkCopy.BulkCopyTimeout = 600;
                    bulkCopy.DestinationTableName = "[PC].[TblLeadInfo]";
                    bulkCopy.WriteToServer(dt);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                //return DemoResponse<List<BankFileDTO>>.GetResult(-1, error);
            }
            return new DocumentResponse { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded succefully!" };
            //return DemoResponse<List<BankFileDTO>>.GetResult(0, "OK", list);
            //}
            //return DemoResponse<List<BankFileDTO>>.GetResult(2, "Data still processing");
        }
        //

        //search for products
        public async Task<IEnumerable<ProductDTO>> SearchProduct(ProductSearchDTO productSearchDTO, ApiContext apiContext)
        {
            if (productSearchDTO.EnvId > 0)
            {
                _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, productSearchDTO.EnvId.ToString(), _configuration));
            }
            else
            {
                _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            }


            // _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            string[] lobCob = new string[] { "LOB", "COB" };
            var masterList = _context.TblmasProductMaster.Where(p => lobCob.Contains(p.MasterType))
                              .ToDictionary(m => m.ProductMasterId, n => n.Value);
            var _products = from pr in _context.TblProducts.OrderByDescending(p => p.CreatedDate)
                            select pr;
            var _products1 = _context.TblProducts
                       .Include(add => add.TblInsurableRcbdetails);



            if (apiContext.PartnerId > 0 && apiContext.OrgId > 0)
            {
                var productList = await _integrationService.GetAssignProductByPartnerId(apiContext.PartnerId.ToString(), apiContext);
                var mdataList = productList.ToList();
                if (mdataList.Count > 0)
                {
                    var DataList = mdataList[0].mData;
                    var mIDList = DataList.Select(s => s.mID).ToList();
                    _products = _products.Where(pr => (pr.PartnerId == apiContext.PartnerId && pr.OrganizationId == apiContext.OrgId) || mIDList.Contains(pr.ProductId));
                    _products.Distinct();

                }
                else
                {
                    _products = _products.Where(pr => (pr.PartnerId == apiContext.PartnerId && pr.OrganizationId == apiContext.OrgId));

                }



            }
            else if (apiContext.OrgId > 0)
            {
                _products = _products.Where(pr => pr.OrganizationId == apiContext.OrgId);
            }
            else
            {
                _products = _products.Select(pr => pr);
            }
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
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            string[] lobCob = new string[] { "LOB", "COB" };
            var masterList = _context.TblmasProductMaster.Where(p => lobCob.Contains(p.MasterType))
                              .ToDictionary(m => m.ProductMasterId, n => n.Value);
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
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tblProduct = _context.TblProducts.Where(item => item.ProductId == ProductId)
                   .Include(add => add.TblProductInsurableItems)
                   .Include("TblProductInsurableItems.TblProductCovers")
                       .Include("TblProductInsurableItems.TblProductCovers.TblProductBenefits")
                        .Include("TblProductInsurableItems.TblProductCovers.TblProductBenefits.TblBenifitRangeDetails")
                        .Include(ad => ad.TblProductChannels)
                        .Include(ads => ads.TblProductClausesWarrentiesExclusions)
                        .Include(add => add.TblProductPremium)
                        .Include(add => add.TblProductRcbdetails)
                        .Include(add => add.TblProductSwitchOnDetails)
                         .Include(add => add.TblProductRatingMapping)
                        .Include(add => add.TblInsurableRcbdetails)
                        .Include("TblInsurableRcbdetails.TblInsurableChildRcbdetails")
                       .Include("TblInsurableRcbdetails.TblCoverRcbdetails")
                       .Include(add=>add.TblProductBasicConfiguration)
                    .Include("TblInsurableRcbdetails.TblCoverRcbdetails.TblCoverChildRcbdetails")

                        .FirstOrDefault();

            if (tblProduct != null)
            {
                if (tblProduct != null)
                {
                    return GetProductMasterUpdate(tblProduct);
                }
            }

            return null;
        }

        //Get product by Id
        public async Task<ProductDTO> GetProductByCode(string ProductCode, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var tblProduct = _context.TblProducts.Where(item => item.ProductCode == ProductCode)
                   .Include(add => add.TblProductInsurableItems)
                   .Include("TblProductInsurableItems.TblProductCovers")
                       .Include("TblProductInsurableItems.TblProductCovers.TblProductBenefits")
                        .Include("TblProductInsurableItems.TblProductCovers.TblProductBenefits.TblBenifitRangeDetails")
                        .Include(ad => ad.TblProductChannels)
                        .Include(ads => ads.TblProductClausesWarrentiesExclusions)
                        .Include(add => add.TblProductPremium)
                        .Include(add => add.TblProductRcbdetails)
                        .Include(add => add.TblInsurableRcbdetails)
                        .Include(add => add.TblProductSwitchOnDetails)
                        .Include(add => add.TblProductRatingMapping)
                        .Include("TblInsurableRcbdetails.TblInsurableChildRcbdetails")
                        .Include("TblInsurableRcbdetails.TblCoverRcbdetails")
                           .Include(add => add.TblProductBasicConfiguration)
                        .Include("TblInsurableRcbdetails.TblCoverRcbdetails.TblCoverChildRcbdetails")
                         .FirstOrDefault();

            if (tblProduct != null)
            {
                return GetProductMasterUpdate(tblProduct);
            }
            return null;
        }

        private ProductDTO GetProductMasterUpdate(TblProducts tblProduct)
        {
            var productDTO = _mapper.Map<ProductDTO>(tblProduct);
            string[] masterFilter = new string[] { "CWEType", "Channels", "Type", "Currency" };
            var masterList = _context.TblmasPccommonTypes.Where(p => masterFilter.Contains(p.MasterType))
                              .ToDictionary(m => m.CommonTypeId, n => n.Value);

            string[] masProductMasterFilter = new string[] { "Risk", "Claim", "InsurableCategory", "BenefitCriteria", "InsuranceType", "Cover", "CoverEvent", "CoverEventFactor", "CoverEventFactorValue", "LOB", "COB", "Switchon", "Payment", "ProductType", "AllowPayment", "CDCreation", "PremiumBreakup", "ClaimSI" };
            var masProductMaster = _context.TblmasProductMaster.Where(p => masProductMasterFilter.Contains(p.MasterType))
                              .ToDictionary(m => m.ProductMasterId, n => n.Value);

            productDTO.LOB1 = masProductMaster.FirstOrDefault(p => p.Key == productDTO.Lobid).Value;
            productDTO.COB1 = masProductMaster.FirstOrDefault(p => p.Key == productDTO.Cobid).Value;
            //string[] insCoverFilter = new string[] { "InsurableCategory", "InsuranceType" , "Cover", "CoverEvent" };
            //var masterInsCoverList = _context.TblmasProductMaster.Where(p => insCoverFilter.Contains(p.MasterType))
            //                 .ToDictionary(m => m.ProductMasterId, n => n.Value);
            //InsurableItem & cover 
            foreach (var item in productDTO.ProductInsurableItems)
            {
                item.InsurableItem = masProductMaster.FirstOrDefault(p => p.Key == item.InsurableItemTypeId).Value;
                item.InsurableCategory = masProductMaster.FirstOrDefault(p => p.Key == item.InsurableCategoryId).Value;
                foreach (var itemCover in item.ProductCovers)
                {
                    itemCover.Cover = masProductMaster.FirstOrDefault(p => p.Key == itemCover.CoverTypeId).Value;
                    itemCover.CoverEvent = masProductMaster.FirstOrDefault(p => p.Key == itemCover.CoverEventId).Value;
                    itemCover.CoverEventFactor = masProductMaster.FirstOrDefault(p => p.Key == itemCover.CoverEventFactorId).Value;
                    itemCover.CoverEventFactorUnit = masProductMaster.FirstOrDefault(p => p.Key == itemCover.CoverEventFactorValueUnitId).Value;
                    if (itemCover.ProductBenefits != null)
                    {
                        foreach (var benefitItem in itemCover.ProductBenefits)
                        {
                            benefitItem.BenefitCriterias = masProductMaster.FirstOrDefault(p => p.Key == benefitItem.BenefitCriteria).Value;
                        }
                    }
                }
            }
            //cwe
            foreach (var item in productDTO.ProductClausesWarrentiesExclusions)
            {
                item.Label = item.TypeName;
                item.Cwetypes = masterList.FirstOrDefault(p => p.Key == item.CwetypeId).Value;
                if (item.LevelId != null)
                {
                    item.LevelName = masterList.FirstOrDefault(p => p.Key == item.LevelId).Value;
                }
                if (item.SubLevelId != null)
                {
                    item.SubLevelName = masProductMaster.FirstOrDefault(p => p.Key == item.SubLevelId).Value;
                }
            }
            foreach (var item in productDTO.ProductChannels)
            {
                item.ChannelName = masterList.FirstOrDefault(p => p.Key == item.ChannelTypeId).Value;
            }
            //benifit
            //R & C

            foreach (var item in productDTO.ProductRcbdetails)
            {
                item.mID = item.InputId;
                item.disable = item.IsReqired;
                item.mIsRequired = item.IsReqired;
                item.mValue = masProductMaster.FirstOrDefault(p => p.Key == item.InputId).Value;

            }
            foreach (var item in productDTO.ProductSwitchOnDetails)
            {
                item.mID = item.InputId;
                item.disable = item.IsReqired;
                item.mIsRequired = item.IsReqired;
                item.mValue = masProductMaster.FirstOrDefault(p => p.Key == item.InputId).Value;

            }
            foreach (var item in productDTO.ProductBasicConfiguration)
            {
                item.mID = item.InputId;
                item.disable = item.IsReqired;
                item.mIsRequired = item.IsReqired;
                item.selectedValue = (item.IsReqired==true) ? item.InputId.ToString() : "0";
                item.mValue = masProductMaster.FirstOrDefault(p => p.Key == item.InputId).Value;

            }

            foreach (var item in productDTO.InsurableRcbdetails)
            {
                // item.disable = item.IsReqired;
                // item.mIsRequired = item.IsReqired;
                //item.mValue = masProductMaster.FirstOrDefault(p => p.Key == item.InputId).Value;

                foreach (var s in item.InsurableChildRcbdetail) 
                {
                    s.mID = s.InputId;
                    s.disable = s.IsReqired;
                    s.mIsRequired = s.IsReqired;
                    s.mValue = masProductMaster.FirstOrDefault(p => p.Key == s.InputId).Value;

                }
                foreach (var j in item.CoverRcbdetails)
                {
                    foreach (var clist in j.CoverChildRcbdetail)
                    {
                        clist.mID = clist.InputId;
                        clist.disable = clist.IsReqired;
                        clist.mIsRequired = clist.IsReqired;
                        clist.mValue = masProductMaster.FirstOrDefault(p => p.Key == clist.InputId).Value;

                    }
                }
            }



            var len = productDTO.InsurableRcbdetails.Count();
            if (len > 0)
            {

                productDTO.IsSingleCover = true;

            }

            else
            {
                productDTO.IsSingleCover = false;
            }
            foreach (var item in productDTO.ProductPremium)
            {
                if (item.LevelId != null)
                {
                    item.LevelName = masterList.FirstOrDefault(p => p.Key == item.LevelId).Value;
                }
                if (item.SubLevelId != null)
                {
                    item.SubLevelName = masProductMaster.FirstOrDefault(p => p.Key == item.SubLevelId).Value;
                }
                if (item.CurrencyId != null)
                {
                    item.CurrencyName = masterList.FirstOrDefault(p => p.Key == item.CurrencyId).Value;
                }

                if (item.LevelId != null)
                {
                    //if (item.LevelId == 52)
                    //{
                    //    var InsurableTypeId = Convert.ToInt32(productDTO.ProductInsurableItems.FirstOrDefault(s => s.InsurableItemId == item.RefId).InsurableItemTypeId);
                    //    item.Description = masProductMaster.FirstOrDefault(p => p.Key == InsurableTypeId).Value;
                    //}
                    if (item.LevelId == 53)
                    {
                        var InsurableId = Convert.ToInt32(productDTO.ProductInsurableItems.SelectMany(p => p.ProductCovers).FirstOrDefault(s => s.CoverTypeId == item.SubLevelId).InsurableItemId);
                        var InsurableTypeId = _context.TblProductInsurableItems.FirstOrDefault(s => s.InsurableItemId == InsurableId).InsurableItemTypeId;
                        item.Description = masProductMaster.FirstOrDefault(p => p.Key == InsurableTypeId).Value;
                    }

                }
            }


            //Calculate Premium

            if (tblProduct.TblProductRatingMapping.Count() > 0)
            {
                productDTO.RateingId = tblProduct.TblProductRatingMapping.FirstOrDefault(s => s.ProductId == productDTO.ProductId).MappingId;


            }


            return productDTO;
        }

        //SearchChannelDetails
        public async Task<TblProductChannels> ChannelDetails(decimal ChannelId, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            return _context.TblProductChannels.Find(ChannelId);
        }

        //SearchClaimDetails
        public async Task<TblProductClausesWarrentiesExclusions> ClaimsDetails(decimal Cweid, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            return _context.TblProductClausesWarrentiesExclusions.Find(Cweid);
        }

        //SearchRiskDetails
        public async Task<IEnumerable<ProductRcbdetailsDTO>> RCBDetails(decimal ProductId, string type, string FieldType, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            if (FieldType != "")
            {
                var Id=_context.TblmasPccommonTypes.SingleOrDefault(s=>s.Value==FieldType).CommonTypeId;
                var rcbDetails = (from rc in _context.TblProductRcbdetails
                                  join p in _context.TblmasProductMaster on rc.InputId equals p.ProductMasterId
                                  where rc.ProductId == ProductId && rc.InputType == type && (bool)rc.IsReqired && p.TypeCode == Id.ToString()
                                  orderby p.SortOrder //&& rc.IsReqired
                                  select new ProductRcbdetailsDTO
                                  {
                                      mValue = p.Value,
                                      mID = p.ProductMasterId,
                                      InputType = p.Value,
                                      InputId = p.ProductMasterId,
                                      RcbdetailsId = rc.RcbdetailsId,
                                      ProductId = rc.ProductId,
                                      LevelId = rc.LevelId,
                                      SubLevelId = rc.SubLevelId,
                                      mIsRequired = rc.IsReqired,
                                      UserInputType = p.UserInputType
                                  }).ToList();
                return rcbDetails;
            }
            else
            {

                var rcbDetails = (from rc in _context.TblProductRcbdetails
                                  join p in _context.TblmasProductMaster on rc.InputId equals p.ProductMasterId
                                  where rc.ProductId == ProductId && rc.InputType == type && (bool)rc.IsReqired
                                  orderby p.SortOrder //&& rc.IsReqired
                                  select new ProductRcbdetailsDTO
                                  {
                                      mValue = p.Value,
                                      mID = p.ProductMasterId,
                                      InputType = p.Value,
                                      InputId = p.ProductMasterId,
                                      RcbdetailsId = rc.RcbdetailsId,
                                      ProductId = rc.ProductId,
                                      LevelId = rc.LevelId,
                                      SubLevelId = rc.SubLevelId,
                                      mIsRequired = rc.IsReqired,
                                      UserInputType = p.UserInputType
                                  }).ToList();
                return rcbDetails;
            }

        }


        public async Task<List<ProductClausesWarrentiesExclusionsDTO>> CWEDetails(int LOBId, int CWETypeID, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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

        public async Task<IEnumerable<ddDTOs>> GetAllProductMaster(string masterType, int parentID, ApiContext apiContext)
        {
            //string temp = "LOB,COB";
            List<string> mList = masterType.Split(",").ToList();

            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            List<int> lstParentId = new List<int> { 0, parentID };
            var productMasters_list = _context.TblmasProductMaster.Where(x => mList.Contains(x.MasterType) && x.IsActive)
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

        public async Task<IEnumerable<EntityDTOs>> GetEntityMaster(ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //List<int> lstParentId = new List<int> { 0, parentID };
            var productMasters_list = _context.TblProductEntity.ToList();
            IEnumerable<EntityDTOs> entityDTOs;
            entityDTOs = productMasters_list
             .Select(c => new EntityDTOs
             {
                 mID = c.MasterId,
                 mValue = c.Value,
                 name = c.MasterType,
                 mType = c.MasterType,
                 mIsRequired = c.IsDisable,
                 parameter = c.Parameter,
                 level = c.Level,
                 disable = c.IsDisable,
                 parentId = c.ParentId
             });

            return entityDTOs;
        }

        public async Task<MasterEntityDTO> AddEntityData(MasterEntityDTO entityDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var records = _context.TblProductEntity.Where(p => p.MasterId != 0).Max(x => x.Level);
            var _entity = _mapper.Map<TblProductEntity>(entityDTO);

            _entity.MasterType = entityDTO.MasterType;
            _entity.TypeCode = entityDTO.TypeCode;
            _entity.Parameter = entityDTO.Parameter;
            _entity.IsDisable = entityDTO.IsDisable;
            _entity.IsActive = entityDTO.IsActive;
            _entity.Value = entityDTO.Value;
            _entity.ParentId = entityDTO.ParentId;
            _entity.Level = records + 1;

            _context.TblProductEntity.Add(_entity);
            _context.SaveChanges();
            var _entities = _mapper.Map<MasterEntityDTO>(_entity);
            return _entities;
        }

        public async Task<ProductDTO> UpdateProductModel(ProductDTO objProduct, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            ProductRcbdetailsDTO rcbDetail = null;
            InsurableChildRcbdetailsDTO InsChildrcbDetail = null;
            CoverChildRcbdetailsDTO CoverChildrcbDetail = null;
            ProductSwitchOnDetailsDTO switchdetails = null;
            objProduct.CreatedDate = DateTime.Now;
            objProduct.OrganizationId = apiContext.OrgId;
            objProduct.PartnerId = apiContext.PartnerId;


            foreach (var item in objProduct.RiskDetails)
            {
                rcbDetail = new ProductRcbdetailsDTO();
                rcbDetail.InputType = item.mType;
                rcbDetail.IsReqired = item.mIsRequired;
                rcbDetail.InputId = item.mID;
                rcbDetail.LevelId = item.LevelId;

                objProduct.ProductRcbdetails.Add(rcbDetail);
            }
            foreach (var item in objProduct.ClaimDetails)
            {
                rcbDetail = new ProductRcbdetailsDTO();
                rcbDetail.InputType = item.mType;
                rcbDetail.IsReqired = item.mIsRequired;
                rcbDetail.InputId = item.mID;
                rcbDetail.LevelId = item.LevelId;
                objProduct.ProductRcbdetails.Add(rcbDetail);
            }

            foreach (var item in objProduct.ProductSwitchOnProperty)
            {
                switchdetails = new ProductSwitchOnDetailsDTO();
                switchdetails.InputType = item.mType;
                switchdetails.IsReqired = item.mIsRequired;
                switchdetails.InputId = item.mID;


                objProduct.ProductSwitchOnDetails.Add(switchdetails);
            }


            //   objProduct.TblProductClausesWarrentiesExclusions.Select(t => { t.Cweid =0; return t; }).ToList();
            foreach (var item in objProduct.ProductClausesWarrentiesExclusions)
            {
                item.Cweid = 0;
            }
            var temp = objProduct.InsurableRcbdetails;

            // insurableRcbdetails update
            foreach (var item in objProduct.InsurableRcbdetails)
            {


                foreach (var i in item.InsurableChildRcbdetails)
                {
                    InsChildrcbDetail = new InsurableChildRcbdetailsDTO();
                    InsChildrcbDetail.InputType = i.mType;
                    InsChildrcbDetail.IsReqired = i.mIsRequired;
                    InsChildrcbDetail.InputId = i.mID;
                    InsChildrcbDetail.LevelId = i.LevelId;
                    InsChildrcbDetail.SubLevelId = i.SubLevelId;
                    InsChildrcbDetail.UniqueCode = i.UniqueCode;
                    item.InsurableChildRcbdetail.Add(InsChildrcbDetail);
                }
                foreach (var m in item.CoverRcbdetails)
                {
                    foreach (var list in m.CoverChildRcbdetails)
                    {
                        CoverChildrcbDetail = new CoverChildRcbdetailsDTO();
                        CoverChildrcbDetail.InputType = list.mType;
                        CoverChildrcbDetail.IsReqired = list.mIsRequired;
                        CoverChildrcbDetail.InputId = list.mID;
                        m.CoverChildRcbdetail.Add(CoverChildrcbDetail);
                    }
                }

            }

            //for (var index = 0; index < objProduct.InsurableRcbdetails.Count(); index++)
            //{

            //   // objProduct.InsurableRcbdetails[index].InsurableChildRcbdetails.Remove();
            //    var item=objProduct.InsurableRcbdetails[index].InsurableChildRcbdetails;
            //    if (item != null)
            //    {
            //        objProduct.InsurableRcbdetails[index].InsurableChildRcbdetails.Remove(item);
            //    }
            //}

            objProduct.PremiumAmount = objProduct.ProductPremium.Sum(s => s.PremiumAmount);
            // objProduct.InsurableRcbdetails = temp;
            if (objProduct.ProductBasicConfigurationDetails != null)
            {
                ProductBasicConfigurationDTO ProductBasicConfiguration = new ProductBasicConfigurationDTO();
                foreach (var item in objProduct.ProductBasicConfigurationDetails)
                {
                    ProductBasicConfiguration = new ProductBasicConfigurationDTO();
                    ProductBasicConfiguration.InputType = item.mType;
                    ProductBasicConfiguration.IsReqired = item.mIsRequired;
                    ProductBasicConfiguration.InputId = item.mID;
                    objProduct.ProductBasicConfiguration.Add(ProductBasicConfiguration);
                }
            }


            return objProduct;
        }

        public async Task<TblProductRcbdetails> RiskDetails(decimal RcbdetailsId, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            return _context.TblProductRcbdetails.Find(RcbdetailsId);
        }

        public async Task<ProductResponse> ProductCodevalidation(string code, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblProducts.Any(e => e.ProductCode == code);
            if (data == true)
            {
                return new ProductResponse() { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Product Code {code} already exist" };
            }
            else
            {
                return new ProductResponse() { Status = BusinessStatus.Ok, ResponseMessage = $"ok " };
            }
        }

        public async Task<ProductResponse> ProductNamevalidation(string name, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblProducts.Any(e => e.ProductName == name);
            if (data == true)
            {
                return new ProductResponse() { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"Product Name {name} already exist, do u want to proceed " };
            }
            else
            {
                return new ProductResponse() { Status = BusinessStatus.Ok, ResponseMessage = $"ok " };
            }
        }


        public async Task<ProductResponse> GetProductGWP(ProductDTO productDTO, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var TotalGWP = from P in _context.TblProducts.Where(e => e.ProductId == productDTO.ProductId)
                           group P by P.ProductId into g
                           select new { productCount = g.Count(), productSum = g.Sum(o => o.PremiumAmount), issuedate = g.Select(s => s.CreatedDate).ToList() };
            return null;
        }

        public async Task<IEnumerable<ProductDTO>> GetProductByLob(int id, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblProducts.Where(e => e.Lobid == id).ToList();
            //ProductDTO product = new ProductDTO();
            var _result = _mapper.Map<List<ProductDTO>>(data);
            foreach (var item in _result)
            {
                item.mID = item.ProductId;
                item.mValue = item.ProductName;
            }
            return _result;
        }

        public async Task<IEnumerable<ddDTOs>> GetRiskClaimMaster(string masterType, int typeId, int parentID, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            List<int> lstParentId = new List<int> { parentID };
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
                 disable = c.IsDisable,
                 LevelId = typeId == 0 ? Convert.ToInt16(c.TypeCode) : typeId,
                 SubLevelId = parentID
             });


            return ddDTOs;
        }



        public async Task<ProductRiskDetailsDTO> GetInsurableRiskDetails(decimal ProductId, string type, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            ProductRiskDetailsDTO DTO = new ProductRiskDetailsDTO();


            var masterList = _context.TblmasProductMaster.Where(a => a.MasterType == "Risk" || a.MasterType == "InsuranceType" || a.MasterType == "Cover").ToList();

            var rcbDetails = (from rc in _context.TblProductRcbdetails
                              join p in _context.TblmasProductMaster on rc.InputId equals p.ProductMasterId
                              where rc.ProductId == ProductId && rc.InputType == type && (bool)rc.IsReqired

                              orderby p.SortOrder //&& rc.IsReqired
                              select new ProductRcbdetailsDTO
                              {

                                  RcbdetailsId = rc.RcbdetailsId,
                                  ProductId = rc.ProductId,
                                  InputId = p.ProductMasterId,
                                  InputType = p.Value,
                                  IsReqired = rc.IsReqired,
                                  UserInputType = p.UserInputType,


                              }).ToList();
            var ProductRcbInsurableDetails = new List<InsurableRcbdetailsDTO>();

            //var insurabledetails = (
            //             from rc in _context.TblInsurableRcbdetails
            //             join p in _context.TblmasProductMaster on rc.InputId equals p.ProductMasterId
            //             where rc.ProductId == ProductId && rc.InputType == type && (bool)rc.IsReqired
            //             orderby p.SortOrder
            //             select new productrcbdetailsdto
            //             {

            //                   // insurableitemid=rcdet.insurablercbdetailsid,
            //                   inputtype = rcdet.inputtype,
            //                 isreqired = rcdet.isreqired,
            //                 inputid = rcdet.inputid,
            //                 productid = rcdet.productid
            //             }

            //             ).tolist();


            //productriskdetailsdto productriskdetails = new productriskdetailsdto();


            ////  var riskdata = _mapper.map<productrcbdetailsdto>(rcbdetails);

            //productriskdetails.productrcbdetails.addrange(rcbdetails);
            //productriskdetails.productrcbdetails.addrange(insurabledetails);

            //dto.add(productriskdetails);


            var tblProduct = _context.TblInsurableRcbdetails.Where(item => item.ProductId == ProductId)
              .Include(add => add.TblInsurableChildRcbdetails)
              .Include(s => s.TblCoverRcbdetails)
              .Include("TblCoverRcbdetails.TblCoverChildRcbdetails")
              .ToList();

            InsurableRcbdetailsDTO insurableRcbdetailsDTO = null;
            InsurableChildRcbdetailsDTO insurableChildRcbdetailsDTO = null;
            CoverRcbdetailsDTO coverRcbdetailsDTO = null;
            CoverChildRcbdetailsDTO coverChildRcbdetailsDTO = null;
            foreach (var item in tblProduct)
            {
                try
                {
                    insurableRcbdetailsDTO = new InsurableRcbdetailsDTO();
                    insurableRcbdetailsDTO.InputType = masterList.FirstOrDefault(p => p.ProductMasterId == item.InputId).Value;
                    insurableRcbdetailsDTO.UserInputType = masterList.FirstOrDefault(p => p.ProductMasterId == item.InputId).UserInputType;
                    insurableRcbdetailsDTO.InputId = masterList.FirstOrDefault(p => p.ProductMasterId == item.InputId).ProductMasterId;
                    //item mapping 



                    foreach (var insChild in item.TblInsurableChildRcbdetails)
                    {
                        insurableChildRcbdetailsDTO = new InsurableChildRcbdetailsDTO();

                        insurableChildRcbdetailsDTO.InputType = masterList.FirstOrDefault(p => p.ProductMasterId == insChild.InputId).Value;
                        insurableChildRcbdetailsDTO.UserInputType = masterList.FirstOrDefault(p => p.ProductMasterId == insChild.InputId).UserInputType;
                        insurableChildRcbdetailsDTO.InputId = masterList.FirstOrDefault(p => p.ProductMasterId == insChild.InputId).ProductMasterId;

                        insurableRcbdetailsDTO.InsurableChildRcbdetail.Add(insurableChildRcbdetailsDTO);

                    }
                    // insurable child

                    // cover ---//cover child
                    foreach (var coverlist in item.TblCoverRcbdetails)
                    {
                        coverRcbdetailsDTO = new CoverRcbdetailsDTO();

                        coverRcbdetailsDTO.InputType = masterList.FirstOrDefault(p => p.ProductMasterId == coverlist.InputId).Value;
                        coverRcbdetailsDTO.UserInputType = masterList.FirstOrDefault(p => p.ProductMasterId == coverlist.InputId).UserInputType;
                        coverRcbdetailsDTO.InputId = masterList.FirstOrDefault(p => p.ProductMasterId == coverlist.InputId).ProductMasterId;
                        insurableRcbdetailsDTO.CoverRcbdetails.Add(coverRcbdetailsDTO);
                        foreach (var coverchild in coverlist.TblCoverChildRcbdetails)
                        {
                            coverChildRcbdetailsDTO = new CoverChildRcbdetailsDTO();

                            coverChildRcbdetailsDTO.InputType = masterList.FirstOrDefault(p => p.ProductMasterId == coverchild.InputId).Value;
                            coverChildRcbdetailsDTO.UserInputType = masterList.FirstOrDefault(p => p.ProductMasterId == coverchild.InputId).UserInputType;
                            coverChildRcbdetailsDTO.InputId = masterList.FirstOrDefault(p => p.ProductMasterId == coverchild.InputId).ProductMasterId;
                            coverRcbdetailsDTO.CoverChildRcbdetail.Add(coverChildRcbdetailsDTO);

                        }
                    }
                    ProductRcbInsurableDetails.Add(insurableRcbdetailsDTO);
                }
                catch (Exception E)
                {

                }
            }
            //    var tblrcbdetails = _context.TblProductRcbdetails.Where(item => item.ProductId == ProductId).ToList();

            //  ProductRiskDetailsDTO productRiskDetailsDTO = new ProductRiskDetailsDTO();
            // productRiskDetailsDTO.ProductRcbDetails.AddRange(tblProduct);
            //productRiskDetailsDTO.ProductRcbInsurableDetails.AddRange(tblrcbdetails);


            DTO.ProductRcbDetails = rcbDetails;
            DTO.ProductRcbInsurableDetails = ProductRcbInsurableDetails;

            //  var result = ((IEnumerable)DTO).Cast<object>().ToList();


            return DTO;

        }
        public async Task<List<LeadInfoDTO>> BulkSMS(ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));


            var LeadInfo = _context.TblLeadInfo.Where(x => x.Smsstatus == true && x.Emailstatus == true).ToList();

            foreach (var item in LeadInfo)
            {
                SMSRequest SMSDTO = new SMSRequest();

                SMSDTO.APIKey = "6nnnnyhH4ECKDFC5n59Keg";
                SMSDTO.SenderId = "SMSTST";
                SMSDTO.Channel = "2";
                SMSDTO.RecipientNumber = item.MobileNumber;

                SMSDTO.SMSMessage = "Hello " + item.FirstName + ", For PolicyBooking click on the below Link http://micav0002.azurewebsites.net/pages/policy/" + item.Id;

                //SMS API
                var SMSAPI = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=6nnnnyhH4ECKDFC5n59Keg&senderid=SMSTST&channel=2&DCS=0&flashsms=0&number=91" + SMSDTO.RecipientNumber + "&text=" + SMSDTO.SMSMessage;

                var client = new WebClient();
                var content = client.DownloadString(SMSAPI);


                //Email Service
                EmailRequest emailDTO = new EmailRequest();
                emailDTO.To = item.EmailId;
                emailDTO.Subject = "Policy Booking Link";
                emailDTO.Message = "Hello " + item.FirstName + ", For PolicyBooking click on the below Link http://micav0002.azurewebsites.net/pages/policy/" + item.Id;

                try
                {
                    await _emailService.SendEmail(emailDTO.To, emailDTO.Subject, emailDTO.Message);

                }
                catch (Exception ex)
                {

                    throw;
                }

                item.Smsstatus = false;
                item.Emailstatus = false;
                var _update = _context.TblLeadInfo.Update(item);
                _context.SaveChanges();
            }

            var FinalLeadInfo = _mapper.Map<List<LeadInfoDTO>>(LeadInfo);

            return FinalLeadInfo;

        }

        public async Task<LeadInfoDTO> GetLeadInfo(int LeadID, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var LeadData = _context.TblLeadInfo.FirstOrDefault(x => x.Id == LeadID);

            var FinalLeadInfo = _mapper.Map<LeadInfoDTO>(LeadData);

            return FinalLeadInfo;

        }

        public async Task<List<CoverListValue>> BenefitValueLGIAsync(LGIDTO product, ApiContext apiContext)
        {

            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            //    var tblProduct = _context.TblProducts.FirstOrDefault(item => item.ProductCode == productCode);

            var value = "";
            //string connectionString = "Server=inubepeg.database.windows.net;Database=MICAProd;User ID=MICAUSER;Password=MICA*user123;Trusted_Connection=False;";
            //using (SqlConnection connection = new SqlConnection(connectionString))
            //{
            //    // string queryForCol = "select * from[PC].[tblBenifitRangeDetails] where BenifitID IN(select BenefitID from[PC].[tblProductBenefits] where CoverID IN(select CoverID from[PC].[tblProductCovers] where insurableitemId IN(select InsurableItemId from[PC].[tblProductInsurableItems]where productid ="+ tblProduct.ProductId + ")))";


            //    connection.Open();

            //    using (SqlCommand command = new SqlCommand(queryForCol, connection))
            //    {
            //        SqlDataReader reader = command.ExecuteReader();
            //        while (reader.Read())
            //        {

            //            var fromValue=(double)reader[3];
            //            var toValue=(double)reader[4];
            //            var PremiumAmount = reader[5].ToString();
            //            if ((fromValue <= coverEventFactorValue) && (toValue >= coverEventFactorValue))
            //            {

            //                value = PremiumAmount.ToString();
            //            }
            //            else {
            //                value = "Please Give Valid Range";
            //            }

            //        }
            //    }
            //    connection.Close();
            //}
            var Data = (from p in _context.TblProducts
                        where p.ProductCode == product.ProductCode
                        //  join m in _context.TblmasProductMaster on product.CoverName equals m.Value
                        join i in _context.TblProductInsurableItems on p.ProductId equals i.ProductId
                        join c in _context.TblProductCovers on i.InsurableItemId equals c.InsurableItemId //where (c.CoverTypeId==m.ProductMasterId)
                        join b in _context.TblProductBenefits on c.CoverId equals b.CoverId
                        join br in _context.TblBenifitRangeDetails on b.BenefitId equals br.BenifitId
                        select new LGIList
                        {
                            CoverName = _context.TblmasProductMaster.SingleOrDefault(s => s.ProductMasterId == c.CoverTypeId).Value,
                            CoverID = c.CoverTypeId,
                            PremiumAmount = br.PremiumAmount,
                            FromValue = br.FromValue,
                            ToValue = br.ToValue

                        }
                    ).ToList();
            LGIDTO LGIobj = new LGIDTO();
            List<CoverListValue> CoverListValue = null;
            CoverListValue listValue = null;
            foreach (var item in product.CoverListValue)
            {
                listValue = new CoverListValue();

                var final = Data.SingleOrDefault(x => x.CoverName == item.CoverName);

                if (item.CoverValue >= final.FromValue && item.CoverValue <= final.ToValue)
                {
                    listValue.CoverName = item.CoverName;
                    listValue.BenefitValue = final.PremiumAmount;
                }


                CoverListValue.Add(listValue);

            }

            return CoverListValue;

            //foreach (var item in Data) {

            //    CoverListValue = new CoverListValue();

            //    CoverListValue.BenefitValue = item.BenefitValue;
            //    CoverListValue.CoverName = item.CoverName;
            //    LGIobj.CoverValue.Add(CoverListValue);
            //}

            //if (Data != null)
            //{
            //   value= "";
            //}
            //else {
            //    value = "Please Give Valid Range";
            //}
            //return value;

        }
        /* Promo Document Upload */
        public async Task<DocumentResponse> PromoDocupload(string productcode, string productId, HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            //int result = GetActiveResult();
            //if (result == 1)
            //{
            var files = httpRequest.Form.Files;
            //var docId = GetActiveResult(file.Name); HttpRequest
            DataTable dt = new DataTable();
            foreach (var file in files)
            {
                var filename = file.Name;
                //var tblbankdoc = await GetDocumentId(file.Name, apiContext);
                if (file == null || file.Length <= 0)
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"formfile is empty" };
                }
                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Invalid file, please upload .xlsx file" };
                }
                bool sms = true;
                bool email = true;
                dt.Columns.Add("PromoCode1", typeof(string));
                dt.Columns.Add("PromoCode2", typeof(string));
                //dt.Columns.Add("PolicyNumber", typeof(string));
                dt.Columns.Add("IsActive", typeof(bool));
                dt.Columns.Add("IsApply", typeof(bool));
                dt.Columns.Add("ProductCode", typeof(string));
                dt.Columns.Add("ProductId", typeof(string));

                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream, cancellationToken);
                    try
                    {
                        using (var package = new ExcelPackage(stream))
                        {
                            ExcelWorksheet worksheet = package.Workbook.Worksheets["PromoCode Details"];
                            if (worksheet != null)
                            {
                                var rowCount = worksheet.Dimension.Rows;
                                for (int row = 2; row <= rowCount; row++)
                                {
                                    DataRow dr = dt.NewRow();
                                    //dr["BankFileId"] = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                                    //dr["Id"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    dr["PromoCode1"] = worksheet.Cells[row, 2].Value.ToString().Trim();
                                    dr["PromoCode2"] = worksheet.Cells[row, 3].Value.ToString().Trim();
                                    dr["IsActive"] = true;
                                    dr["IsApply"] = false;
                                    dr["ProductCode"] = worksheet.Cells[row, 4].Value.ToString().Trim();
                                    dr["ProductId"] = worksheet.Cells[row, 5].Value.ToString().Trim();

                                    dt.Rows.Add(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        var error = ex.ToString();
                        return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                    }
                }
            }
            try
            {
                // add list to db ..
                // here just read and return
                var connectionString = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
                //string connetionString = "Data Source=inubepeg.database.windows.net;Initial Catalog=MICADev;User Id=MICAUSER;Password=MICA*user123";
                using (var bulkCopy = new SqlBulkCopy(connectionString, SqlBulkCopyOptions.KeepIdentity))
                {
                    // my DataTable column names match my SQL Column names, so I simply made this loop. However if your column names don't match, just pass in which datatable name matches the SQL column name in Column Mappings
                    foreach (DataColumn col in dt.Columns)
                    {
                        bulkCopy.ColumnMappings.Add(col.ColumnName, col.ColumnName);
                    }
                    bulkCopy.BulkCopyTimeout = 600;
                    bulkCopy.DestinationTableName = "[PC].[TblPromo]";
                    bulkCopy.WriteToServer(dt);
                }
            }
            catch (Exception ex)
            {
                var error = ex.ToString();
                return new DocumentResponse { Status = BusinessStatus.Error, ResponseMessage = $"Value entered is invalid, please the values and re-enter" };
                //return DemoResponse<List<BankFileDTO>>.GetResult(-1, error);
            }
            return new DocumentResponse { Status = BusinessStatus.Ok, ResponseMessage = $"Document uploaded succefully!" };
            //return DemoResponse<List<BankFileDTO>>.GetResult(0, "OK", list);
            //}
            //return DemoResponse<List<BankFileDTO>>.GetResult(2, "Data still processing");
        }

        public async Task<ProductResponse> PromoApply(PromoDTO promo, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var data = _context.TblPromo.Any(e => e.PromoCode1 == promo.PromoCode1 && e.PromoCode2 == promo.PromoCode2);
            if (data == true)
            {
                return new ProductResponse() { Status = BusinessStatus.Ok, ResponseMessage = $"PromoCode1:{promo.PromoCode1} and PromoCode2:{promo.PromoCode2} is Valid" };
            }
            else
            {
                return new ProductResponse() { Status = BusinessStatus.NotFound, ResponseMessage = $"PromoCode is not valid" };
            }
        }
        public async Task<dynamic> GetProductRateConfig(int productid, ApiContext apiContext)
        {
            //_context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //var mapData=_context.TblProductRatingMapping.Where(s => s.ProductId == productid).ToList();

            //dynamic mapcalc = new ExpandoObject();
            //foreach (var item in mapData) {
            //    AddProperty(mapcalc, item.RiskParameterName, "string");

            //}
            //return mapcalc;
            return null;
        }

        public void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)
        {
            // ExpandoObject supports IDictionary so we can extend it like this
            var expandoDict = expando as IDictionary<string, object>;
            if (expandoDict.ContainsKey(propertyName))
                expandoDict[propertyName] = propertyValue;
            else
                expandoDict.Add(propertyName, propertyValue);
        }

        public async Task<List<ProductRatingMapping>> GetProductRateMapping(int productid, ApiContext apiContext)
        {
            //_context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            //var mapData = _context.TblProductRatingMapping.Where(s => s.ProductId == productid)
            //    .ToList();

            //var mapList = _mapper.Map<List<ProductRatingMapping>>(mapData);
            //return mapList;
            return null;
        }



        public async Task<IEnumerable<MasDTO>> GetHandleEventsMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<MasDTO> val = await _integrationService.GetHandleEventsMaster(lMasterlist, apiContext);

            return val;
        }
        public async Task<IEnumerable<MasDTO>> GetRiskParam(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<MasDTO> riskpm;

            riskpm = _context.TblmasProductMaster.Where(s => s.MasterType == "Risk")
                        .Select(p => new MasDTO
                        {
                            mID = p.ProductMasterId,
                            mValue = p.Value,
                            mType = lMasterlist
                        }).ToList();

            IEnumerable<MasDTO> risk = riskpm.GroupBy(x => x.mValue).Select(o => o.FirstOrDefault());
            return risk;

        }

        public async Task<List<MappingDto>> CreateMapping(MappingListDto MapDto, ApiContext apiContext)
        {
            _context = (MICAPCContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try
            {

                var _tblmapping = _mapper.Map<List<TblmasMapping>>(MapDto.mapping);
                _context.TblmasMapping.AddRange(_tblmapping);

                _context.SaveChanges();
                var Mappingitem = _mapper.Map<List<MappingDto>>(_tblmapping);
                return Mappingitem;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
