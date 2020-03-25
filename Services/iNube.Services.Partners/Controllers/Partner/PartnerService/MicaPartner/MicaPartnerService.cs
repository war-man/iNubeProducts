using AutoMapper;
using iNube.Services.Partners.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using iNube.Services.Partners.Models;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using System.Text;
using Microsoft.Extensions.Primitives;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.Model;
using iNube.Services.UserManagement.Helpers;
using Newtonsoft.Json;
using System.Dynamic;
using iNube.Services.Partners.Helpers;
using Microsoft.Extensions.Configuration;

namespace iNube.Services.Partners.Controllers.Partner.PartnerService
{

    public class MicaPartnerService : IPartnerProductService
    {
        private MICAPRContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        /// <summary>
        /// Initializes a new instance of the <see cref="PartnerService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="integrationService">The integration service.</param>
        /// <param name="emailService">The email service.</param>
        public MicaPartnerService(MICAPRContext context, IMapper mapper, IIntegrationService integrationService, IEmailService emailService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _emailService = emailService;
            _configuration = configuration;
        }
        /// <summary>
        /// Creates the partner asynchronous.
        /// </summary>
        /// <param name="partnerDTO">The partner dto.</param>
        /// <returns></returns>
        public async Task<PartnerResponse> CreatePartnerAsync(PartnersDTO partnerDTO, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            TblPartners partner = _mapper.Map<TblPartners>(partnerDTO);
            partnerDTO.Flag = false;
            // _context.Entry(partner).State = partner.PartnerId == 0 ? EntityState.Added : EntityState.Modified;
            if (partner.PartnerId == 0)
            {
                partner.CreatedBy = apiContext.UserId;
                partner.OrganizationId = apiContext.OrgId;
                partnerDTO.Flag = true;
                partner.CreatedDate = DateTime.Now;
                _context.TblPartners.Add(partner);
            }
            else
            {
                partner.ModifyDate = DateTime.Now;
                partner.ModifyBy = apiContext.UserId;
                var address = _context.TblPartnerAddress.Where(p => p.PartnerId == partner.PartnerId);
                foreach (var item in address)
                {
                    _context.TblPartnerAddress.Remove(item);
                }
                //_context.Entry(partner).State = EntityState.Modified;
                _context.Update(partner);
            }
            _context.SaveChanges();
            if (partner.PartnerId == 0)
            {
                await SendEmailAsync(partner.Email, partner.PartnerName);
            }
            partnerDTO.PartnerId = partner.PartnerId;

            List<string> lstParameters = new List<string>();
            lstParameters.Add(partnerDTO.PartnerId.ToString());
            lstParameters.Add(partnerDTO.PartnerName);

            return new PartnerResponse() { Status = BusinessStatus.Created, Id = partnerDTO.PartnerId.ToString(), partner = partnerDTO,ResponseMessage = $"Partner ID: {partnerDTO.PartnerId} successfully {(partnerDTO.Flag == true ? "created " : "modified")} for Partner: {partnerDTO.PartnerName}" , MessageKey = (partnerDTO.Flag == true ? "CreatePartnerMsg" : "ModifiedPartnerMsg") , MessageValue = lstParameters };
        }
        /// <summary>
        /// Gets the master asynchronous.
        /// </summary>
        /// <param name="sMasterList">The s master list.</param>
        /// <param name="partnerId">The partner identifier.</param>
        /// <returns></returns>
        public async Task<IEnumerable<ddDTO>> GetMasterAsync(ApiContext apiContext, string sMasterList, string partnerId = "")
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            IEnumerable<ddDTO> ddDTOs;
            if (sMasterList == "Product" && !string.IsNullOrEmpty(partnerId))
            {
                var productList = await _integrationService.GetProductMasterAsync(apiContext);
                // Get Partner Product
                var lstPolicyProduct = _context.TblPolicyAgreement.Where(a => a.AgentId == Convert.ToDecimal(partnerId)).Select(p => p.ProductIdPk).ToList();
                if (lstPolicyProduct.Count > 0)
                {
                    var filterProduct = productList.ToList().Where(p => lstPolicyProduct.Contains(p.mID));
                    return filterProduct;
                }
                else {
                
                    return null;
                }
                
            }
            else if (sMasterList == "Partner")
            {
                ddDTOs = _context.TblPartners.OrderByDescending(p => p.OrganizationId==apiContext.OrgId)
                 .Select(c => new ddDTO
                 {
                     mID = (int)c.PartnerId,
                     mValue = c.PartnerName,
                     mType = sMasterList
                 });
            }
            else
            {
                ddDTOs = _context.TblmasPrcommonTypes
                 .Select(c => new ddDTO
                 {
                     mID = c.CommonTypeId,
                     mValue = c.Value,
                     mType = c.MasterType
                 });
            }
            return ddDTOs;
        }
        /// <summary>
        /// Gets the partner.
        /// </summary>
        /// <param name="partnerId">The partner identifier.</param>
        /// <returns></returns>
        public async Task<PartnersDTO> GetPartner(int partnerId, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblPartners _tblPartner = _context.TblPartners.Where(org => org.PartnerId == partnerId)
                                    .Include(add => add.TblPartnerAddress)
                                    .FirstOrDefault();
            PartnersDTO _partnerDTO = _mapper.Map<PartnersDTO>(_tblPartner);
            return _partnerDTO;

        }
        /// <summary>
        /// Saves the assign product.
        /// </summary>
        /// <param name="AssignProductDto">The assign product dto.</param>
        /// <returns></returns>
        public async Task<PolicyAgreementResponse> SaveAssignProduct( AssignProductDTO AssignProductDto, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblPolicyAgreement tb = null;
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            ErrorInfo error = null;
            string demodata = "";
            StringBuilder sb = new StringBuilder();
            var partner = _context.TblPartners.FirstOrDefault(p => p.PartnerId == AssignProductDto.PartnerId);
            var partnerName = partner.PartnerName;

            List<ProductDTO> productList = new List<ProductDTO>();
                foreach (var item in AssignProductDto.lstProductId)
                {
                foreach (var pId in item)
                {
                    var productDetails = await _integrationService.GetProductNameAsync((decimal)pId, apiContext);
                    productList.Add(productDetails);
                    if (productDetails.PartnerId.ToString() != "")
                    {

                        demodata = String.Concat(pId.ToString().PadLeft(5, '0'), "/" + AssignProductDto.PartnerId.ToString().PadLeft(5, '0'));
                        var pks = _context.TblPolicyAgreement.Any(x => x.PolicyNo == demodata);
                        if (pks == false)
                        {
                            tb = new TblPolicyAgreement();
                            tb.PolicyNo = String.Concat(pId.ToString().PadLeft(5, '0'), "/" + AssignProductDto.PartnerId.ToString().PadLeft(5, '0'));
                            tb.AgentId = AssignProductDto.PartnerId;
                            //tb.CreatedBy = apiContext.UserId;
                            tb.PolicyStartDate = AssignProductDto.EffectiveFrom;
                            tb.PolicyEndDate = AssignProductDto.EffectiveTo;
                            tb.PolicyIssueDate = AssignProductDto.AssignDate;
                            tb.ProductIdPk = Convert.ToInt32(AssignProductDto.ProductId);
                            tb.CreatedDate = DateTime.Now;
                            tb.IsUploadedToIcm = 1;
                            tb.ProductIdPk = pId;
                            _context.TblPolicyAgreement.Add(tb);
                            sb.Append(demodata + ",");
                        }
                        else
                        {
                            error = new ErrorInfo() { ErrorCode = "AssignProduct", ErrorMessage = $"Product code {demodata} already assigned to partner {partnerName}" };
                            Errors.Add(error);
                        }
                    }
                    else
                    {
                        if (productDetails.PartnerId == AssignProductDto.PartnerId)
                        {
                            demodata = String.Concat(pId.ToString().PadLeft(5, '0'), "/" + AssignProductDto.PartnerId.ToString().PadLeft(5, '0'));
                            var pks = _context.TblPolicyAgreement.Any(x => x.PolicyNo == demodata);
                            if (pks == false)
                            {
                                tb = new TblPolicyAgreement();
                                tb.PolicyNo = String.Concat(pId.ToString().PadLeft(5, '0'), "/" + AssignProductDto.PartnerId.ToString().PadLeft(5, '0'));
                                tb.AgentId = AssignProductDto.PartnerId;
                                //tb.CreatedBy = apiContext.UserId;
                                tb.PolicyStartDate = AssignProductDto.EffectiveFrom;
                                tb.PolicyEndDate = AssignProductDto.EffectiveTo;
                                tb.PolicyIssueDate = AssignProductDto.AssignDate;
                                tb.ProductIdPk = Convert.ToInt32(AssignProductDto.ProductId);
                                tb.CreatedDate = DateTime.Now;
                                tb.IsUploadedToIcm = 1;
                                tb.ProductIdPk = pId;
                                _context.TblPolicyAgreement.Add(tb);
                                sb.Append(demodata + ",");
                            }
                            else
                            {
                                error = new ErrorInfo() { ErrorCode = "AssignProduct", ErrorMessage = $"Product code {demodata} already assigned to partner {partnerName}" };
                                Errors.Add(error);
                            }
                        }
                        else
                        {
                            error = new ErrorInfo() { ErrorCode = "AssignProduct", ErrorMessage = $"Product code {demodata} cannot be assigned to partner {partnerName}" };
                        }
                    }
                }
            }

            _context.SaveChanges();
        
            

            var tbl_assignProduct = _mapper.Map<TblPolicyAgreement>(tb);
            var product = _mapper.Map<PolicyAgreementDTO>(tb);
            var policyAgreementResponse = new PolicyAgreementResponse();
            if (Errors.Count > 0)
            {
                policyAgreementResponse.Errors.AddRange(Errors);
                policyAgreementResponse.Status = BusinessStatus.PreConditionFailed;
                policyAgreementResponse.ResponseMessage = $"Product already assigned to partner {partnerName}!!";
                //Translation response
                policyAgreementResponse.MessageKey = "ProductAlreadyAssignedMsg";
                List<string> lstParameters = new List<string>();
                lstParameters.Add(partnerName);
                policyAgreementResponse.MessageValue = lstParameters;
            }
            else
            {
                policyAgreementResponse.Status = BusinessStatus.Created;
                policyAgreementResponse.ResponseMessage = $"Product code {sb.ToString()} successfully assigned to Partner {partnerName}";
                //Translation response
                policyAgreementResponse.MessageKey = "AssignedProductMsg";
                List<string> lstParamaters = new List<string>();
                lstParamaters.Add(sb.ToString());
                lstParamaters.Add(partnerName);
                policyAgreementResponse.MessageValue = lstParamaters;

            }
            //Email Api Kit
            Task.Run(() => SendApiKitAsync(productList,AssignProductDto, partner.Email, partner.Mobile, apiContext));
            //SendApiKitAsync(AssignProductDto, partner.Email, partner.Mobile, apiContext);
            return policyAgreementResponse;
        }
        private async Task SendApiKitAsync(List<ProductDTO> productList, AssignProductDTO AssignProductDto,string email,string mobileNumber, ApiContext apiContext)
        {
            //List<ProductDTO> productList = new List<ProductDTO>();
            foreach (var item in productList)
            {
                    var productKitModel = await GetProductApiAsync(item, item.ProductId, email, mobileNumber, apiContext);
            }
        }
        /// <summary>
        /// Gets the assign product.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<PolicyAgreementDTO>> GetAssignProduct(decimal partnerId,ApiContext apiContext)
        {
            //apiContext.ServerType = "MicaDev";
            //apiContext.ProductType = "Mica";
            //apiContext.Token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6ImFkbWluQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiIiwiUGFydG5lcklkIjoiIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkludWJlIiwiVXNlck5hbWUiOiJpbnViZWFkbWluIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6Ik1pY2FEZXYiLCJleHAiOjE1NzQ2Njg1OTcsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.Vmsuj6xrpn3WOGnA5diEc82_HHvAV0Nnr1NWVD3VSkk";

           // _context = (MICAPRContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var tblPolicyAgreements = (from a in _context.TblPolicyAgreement.Where(x => x.AgentId == partnerId)
                                       join b in _context.TblPartners on a.AgentId equals b.PartnerId

                                       select new PolicyAgreementDTO
                                       {
                                           PartnerName = b.PartnerName,
                                           PolicyStartDate=a.PolicyStartDate,
                                           PolicyEndDate=a.PolicyEndDate,
                                           CreatedDate=a.CreatedDate,
                                           ProductIdPk=a.ProductIdPk,
                                           PolicyId=a.PolicyId,
                                           PolicyNo=a.PolicyNo,
                                           AgentId=a.AgentId
                                       }).ToList();
            var productNameList = await _integrationService.GetProductMasterAsync(apiContext);
            if (productNameList!=null) { 
            foreach (var item in tblPolicyAgreements) {
                item.ProductName = productNameList.FirstOrDefault(p => p.mID==item.ProductIdPk).mValue;
               
            }
            }
            var agreement = _mapper.Map<IEnumerable<PolicyAgreementDTO>>(tblPolicyAgreements);
            //var policyAgreementResponse = new PolicyAgreementResponse();

            return agreement;
        }
        /// <summary>
        /// Gets the search partner.
        /// </summary>
        /// <param name="partnerSearchDTO">The partner search dto.</param>
        /// <returns></returns>
        public async Task<IEnumerable<PartnersDTO>> GetSearchPartner(PartnerSearchDTO partnerSearchDTO, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            string[] lstPartnerType = new string[] { "PartnerType", "PartnerClass" };

            var masterList = _context.TblmasPrcommonTypes.Where(p => lstPartnerType.Contains(p.MasterType))
                              .ToDictionary(m => m.CommonTypeId, n => n.Value);

            PartnerSearchDTO _partnerSearchDTO = new PartnerSearchDTO();
            var _tblPartners = _context.TblPartners.OrderByDescending(p => p.CreatedDate).Select(x => x);

            if (!string.IsNullOrEmpty(partnerSearchDTO.partnerName))
            {
                _tblPartners = _tblPartners.Where(p => p.PartnerName.Contains(partnerSearchDTO.partnerName));
            }
            if (!string.IsNullOrEmpty(partnerSearchDTO.partnerCode))
            {
                _tblPartners = _tblPartners.Where(p => p.PartnerCode.Contains(partnerSearchDTO.partnerCode));
            }
            if (!string.IsNullOrEmpty(partnerSearchDTO.Email))
            {
                _tblPartners = _tblPartners.Where(p => p.Email == partnerSearchDTO.Email);
            }
            if (partnerSearchDTO.PartnerId > 0)
            {
                _tblPartners = _tblPartners.Where(p => p.PartnerId == partnerSearchDTO.PartnerId);
            }
            if (partnerSearchDTO.PartnerTypeId > 0)
            {
                _tblPartners = _tblPartners.Where(p => p.PartnerTypeId == partnerSearchDTO.PartnerTypeId);
            }
            if (partnerSearchDTO.PartnerClassId > 0)
            {
                _tblPartners = _tblPartners.Where(p => p.PartnerClassId == partnerSearchDTO.PartnerClassId);
            }
            if (partnerSearchDTO.Status == 24)
            {
                _tblPartners = _tblPartners.Where(p => p.IsActive == false);
            }
            if (partnerSearchDTO.Status == 23)
            {
                _tblPartners = _tblPartners.Where(p => p.IsActive == true);
            }
            var partners = _mapper.Map<IEnumerable<PartnersDTO>>(_tblPartners);
            foreach (var item in partners)
            {
                item.PartnerType = masterList.FirstOrDefault(p => p.Key == item.PartnerTypeId).Value;
                item.PartnerClass = masterList.FirstOrDefault(p => p.Key == item.PartnerClassId).Value;
            }
            return partners;

        }
        /// <summary>
        /// Gets the search product details.
        /// </summary>
        /// <param name="productdetails">The productdetails.</param>
        /// <returns></returns>
        public async Task<PolicyAgreementDTO> GetSearchProductDetails(SearchProductModel productdetails, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tbl_productdetails = _context.TblPolicyAgreement.Where(p => p.AgentId == productdetails.PartnerId && p.ProductIdPk == productdetails.ProductId).FirstOrDefault();
            var details = _mapper.Map<PolicyAgreementDTO>(tbl_productdetails);
            return details;
        }
        /// <summary>
        /// Sends the email asynchronous.
        /// </summary>
        /// <param name="emailId">The email identifier.</param>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public async Task<bool> SendEmailAsync(string emailId, string name)
        {
            try
            {
                EmailTest emailTest = new EmailTest();
                emailTest.To = emailId;
                emailTest.Subject = "MICA partner creation";
                emailTest.Message = $"Dear {name},\n" + "      " + "\n" + "We are so excited that you are now part of the MICA family! We take great pride in our Partner,\n community and clients.  As your Independent Partner-platform we offer a variety of choices \n and aim to provide exceptional service with every encounter. we offer a choice of multiple insurance \n carriers, coverages, price, and more.. \n\n You may login to our website using your MICA User ID created under this Partner ID you may \n access our product and service offerings, Insurance carrier information and more." + "\n\n Thanks & Regards:\n Team MICA";

                await _emailService.SendEmail(emailTest.To, emailTest.Subject, emailTest.Message);
            }
            catch (Exception ex)
            {

                throw;
            }
            return true;
        }
        public async Task<PolicyAgreementDTO> DeletePartnerById(decimal partnerId, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var tbl_partnerdata = _context.TblPartners.Where(item => item.PartnerId == partnerId).FirstOrDefault();
            tbl_partnerdata.IsActive = false;
            _context.SaveChanges();
            return null;
        }
        
        //Assign Product to Partner
        public async Task<IEnumerable<ddDTO>> GetAssignProductbyId(AssignedProducts assignedProducts, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var productList = await _integrationService.GetProductMasterAsync(apiContext);
            if (!string.IsNullOrEmpty(assignedProducts.ProductName)) {
                productList=productList.Where(s => s.mValue.Contains(assignedProducts.ProductName));

            }
            if (!string.IsNullOrEmpty(assignedProducts.ProductCode))
            {
                productList = productList.Where(s => s.productCode.Contains(assignedProducts.ProductCode));

            }
            if (assignedProducts.Lobid>0)
            {
                productList = productList.Where(s => s.lobid==assignedProducts.Lobid);

            }
            if (assignedProducts.Cobid>0)
            {
                productList = productList.Where(s => s.cobid==assignedProducts.Cobid);

            }
            foreach (var item in productList)
            {
               // item.mValue =item.productCode+" - "+ item.mValue;
                item.Label = item.productCode + " - " + item.mValue;
            }
            var lstPolicyProduct = _context.TblPolicyAgreement.Where(a => a.AgentId == assignedProducts.PartnerId).Select(p => p.ProductIdPk).ToList();
            if (lstPolicyProduct.Count > 0)
            {
                var filterProduct = productList.ToList().Where(p => !lstPolicyProduct.Contains(p.mID));
              
                return filterProduct;
            }
            return productList;
        }

        public async Task<IEnumerable<PartnerProductDTO>> GetPartnerbyProductid(int id, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var result = from a in _context.TblPolicyAgreement.Where(x => x.ProductIdPk == id)
                         join b in _context.TblPartners on a.AgentId equals b.PartnerId
                         select new PartnerProductDTO
                         {
                             PartnerId = b.PartnerId,
                             PartnerName = b.PartnerName,
                             mID = b.PartnerId,
                             mValue = b.PartnerName,
                         };

            return result;
        }

        private object GetSearchPartner(PartnerSearchDTO partnerSearchDTO1, object partnerSearchDTO2, ApiContext apiContext1, ApiContext apiContext2)
        {
            throw new NotImplementedException();
        }

        #region APIKIt
        public async Task<ProductApiModel> GetPartnerApiKitAsync(decimal productId, ApiContext apiContext)
        {
            var product = await _integrationService.GetProductNameAsync(productId, apiContext);
            var productKitModel =await GetProductApiAsync(product, productId,"ashish.sinha@inubesolutions.com","9742745384", apiContext);
           
            return productKitModel;
        }
        //ProductApiKit
        private async Task<ProductApiModel> GetProductApiAsync(ProductDTO product, decimal productId,string partnerEmail,string mobileNumber, ApiContext apiContext)
        {
            // Gte The Product details
            //  var product=await _integrationService.GetProductNameAsync(productId, apiContext);

            var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
            ProductApiModel model = new ProductApiModel();
            model.PName = product.ProductName;

            #region CreatePolicy
            ApiMethods apiMethod = new ApiMethods();
            apiMethod.SLNo = "1";
            apiMethod.methodName = "CreatePolicy";
            model.numberOfApi.Add(apiMethod);

            MethodsCall methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            dynamic policy = new ExpandoObject();
            var policyParams = await GetPolicyParamsAsync(productId, apiContext, policy, policyRiskDetails);
            methodsCall.dataParams.AddRange(policyParams);

            //SampleCallModel sampleCallModel = new SampleCallModel();
            //sampleCallModel.PolicyDate = DateTime.Now;
            //sampleCallModel.ProductID = 317;
            //sampleCallModel.ProposerName = " one";

            //methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(policy, Formatting.Indented);


            URLLinkModel model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CreateMultiCoverPolicy";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CreateMultiCoverPolicy";
            methodsCall.uRLLinkModels.Add(model1);
            //model.methodsCalls.Add(methodsCall);


            MethodTypeModel methodTypeModel = new MethodTypeModel();
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);


            UrlParams urlParams = new UrlParams();
            urlParams.ParamsType = "abc";
            methodsCall.urlParams.Add(urlParams);

           

            Response response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            response = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);


            #endregion
            #region PolicyCancellation

            //Policy Cancelation
            apiMethod = new ApiMethods();
            apiMethod.SLNo = "2";
            apiMethod.methodName = "PolicyCancellation";
            model.numberOfApi.Add(apiMethod);

            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;

            var pcRequest = FillPolicyCancelRequest();
            var fields = ReflectionUtils.GetAllFields(pcRequest.GetType());
            dynamic policyCancel = new ExpandoObject();
            List<DataParams> lstPcdataParams = new List<DataParams>();
            //var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
            DataParams dataParams = null;
            foreach (var item in fields)
            {
                dataParams = new DataParams();
                dataParams.Field = item.Name;
                dataParams.DataType = item.FieldType.Name;
               // dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                dataParams.Description = "";
                lstPcdataParams.Add(dataParams);
                AddProperty(policyCancel, item.Name, item.FieldType.Name);
            }
            methodsCall.dataParams.AddRange(lstPcdataParams);
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(policyCancel, Formatting.Indented);
            methodsCall.Response.Add(response);
            model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/PolicyCancellation";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/PolicyCancellation";
            methodsCall.uRLLinkModels.Add(model1);

            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);

            #endregion

            #region ClaimIntimation
            //Claim Intimation
            apiMethod = new ApiMethods();
            apiMethod.SLNo = "3";
            apiMethod.methodName = "ClaimIntimate";
            model.numberOfApi.Add(apiMethod);
            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            var cIRequest = FillClaimIntimationRequest();
            var fieldsdata = ReflectionUtils.GetAllFields(cIRequest.GetType());
            dynamic claimIntimation = new ExpandoObject();
            List<DataParams> lstCIdataParams = new List<DataParams>();
            var ciRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
            DataParams dataparams = null;
            foreach (var item in fieldsdata)
            {
                dataparams = new DataParams();
                dataparams.Field = item.Name;
                dataparams.DataType = item.FieldType.Name;
                // dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                dataparams.Description = "";
                lstCIdataParams.Add(dataparams);
                AddProperty(claimIntimation, item.Name, item.FieldType.Name);
            }
            methodsCall.dataParams.AddRange(lstCIdataParams);
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(claimIntimation, Formatting.Indented);
            methodsCall.Response.Add(response);
            model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicesclaims.azurewebsites.net/api/ClaimManagement/ClaimIntimate";
            model1.ProductionLink = "https://inubeservicesclaims.azurewebsites.net/api/ClaimManagement/ClaimIntimate";
            methodsCall.uRLLinkModels.Add(model1);
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);
            #endregion




            #region Add Insurable Item
            apiMethod = new ApiMethods();
            apiMethod.SLNo = "4";
            apiMethod.methodName = "Add InsurableItem";
            model.numberOfApi.Add(apiMethod);

            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            policy = new ExpandoObject();
            var InsurableParams = await GetInsurableParamsAsync(productId, apiContext, policy, policyRiskDetails);
            methodsCall.dataParams.AddRange(InsurableParams);

            //SampleCallModel sampleCallModel = new SampleCallModel();
            //sampleCallModel.PolicyDate = DateTime.Now;
            //sampleCallModel.ProductID = 317;
            //sampleCallModel.ProposerName = " one";

            //methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(policy, Formatting.Indented);


            model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/AddInsurableItem";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/AddInsurableItem";
            methodsCall.uRLLinkModels.Add(model1);
            //model.methodsCalls.Add(methodsCall);


            methodTypeModel = new MethodTypeModel();
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);


            urlParams = new UrlParams();
            urlParams.ParamsType = "abc";
            methodsCall.urlParams.Add(urlParams);



            response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            response = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);


            #endregion

            #region Remove Insurable Item
            apiMethod = new ApiMethods();
            apiMethod.SLNo = "5";
            apiMethod.methodName = "Remove InsurableItem";
            model.numberOfApi.Add(apiMethod);

            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            policy = new ExpandoObject();
            var RemoveInsurableParams = await RemoveInsurableParamsAsync(productId, apiContext, policy, policyRiskDetails);
            methodsCall.dataParams.AddRange(InsurableParams);

            //SampleCallModel sampleCallModel = new SampleCallModel();
            //sampleCallModel.PolicyDate = DateTime.Now;
            //sampleCallModel.ProductID = 317;
            //sampleCallModel.ProposerName = " one";

            //methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(policy, Formatting.Indented);


            model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/RemoveInsurableItem";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/RemoveInsurableItem";
            methodsCall.uRLLinkModels.Add(model1);
            //model.methodsCalls.Add(methodsCall);


            methodTypeModel = new MethodTypeModel();
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);


            urlParams = new UrlParams();
            urlParams.ParamsType = "abc";
            methodsCall.urlParams.Add(urlParams);



            response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            response = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);


            #endregion

            #region CalaculatePremium
            apiMethod = new ApiMethods();
            apiMethod.SLNo = "6";
            apiMethod.methodName = "Calculate Premium";
            model.numberOfApi.Add(apiMethod);

            methodsCall = new MethodsCall();
            methodsCall.Name = apiMethod.methodName;
            methodsCall.PolicyType = apiMethod.methodName;
            policy = new ExpandoObject();
            var CalculateRateParams = await CalculateRateParamsAsync(productId, apiContext, policy);
            methodsCall.dataParams.AddRange(CalculateRateParams);

            //SampleCallModel sampleCallModel = new SampleCallModel();
            //sampleCallModel.PolicyDate = DateTime.Now;
            //sampleCallModel.ProductID = 317;
            //sampleCallModel.ProposerName = " one";

            //methodsCall.SampleCallModel = sampleCallModel;
            methodsCall.PolicyRequest = JsonConvert.SerializeObject(policy, Formatting.Indented);


            model1 = new URLLinkModel();
            model1 = new URLLinkModel();
            model1.TestLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CalCulatePremium";
            model1.ProductionLink = "https://inubeservicespolicy.azurewebsites.net/api/Policy/CalCulatePremium";
            methodsCall.uRLLinkModels.Add(model1);
            //model.methodsCalls.Add(methodsCall);


            methodTypeModel = new MethodTypeModel();
            methodTypeModel = new MethodTypeModel();
            methodTypeModel.Type = "[HttpPost]";
            methodsCall.methodTypeModels.Add(methodTypeModel);
            model.methodsCalls.Add(methodsCall);


            urlParams = new UrlParams();
            urlParams.ParamsType = "abc";
            methodsCall.urlParams.Add(urlParams);



            response = new Response();
            response.ResponseType = "Success Response";
            response.code = "200";
            response.Content = "";
            methodsCall.Response.Add(response);

            response = new Response();
            response.ResponseType = "Error Response";
            response.code = "404 NOT FOUND";
            response.Content = "";
            methodsCall.Response.Add(response);


            #endregion

            EmailRequest emailTest = new EmailRequest() { IsAttachment = true, Message = $"ProductApiKit for Mica Services", Subject = $"ApiKit for Product", To = partnerEmail };
            model.EmailTest = emailTest;
            // return model;

            SendNotificationAsync(model, mobileNumber,apiContext);

            return model;
        }
        private async Task<List<DataParams>> GetPolicyParamsAsync(decimal productId, ApiContext apiContext,dynamic policy,dynamic policyRiskDetails)
        {
            List<DataParams> lstdataParams = new List<DataParams>();
            //var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
            DataParams dataParams = null;
           
            foreach (var item in policyRiskDetails.ProductRcbDetails)
            {
                dataParams = new DataParams();
                dataParams.Field = item.InputType;
                dataParams.DataType = item.UserInputType;
                dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" :"No";
                dataParams.Description = "";
                lstdataParams.Add(dataParams);
                AddProperty(policy, item.InputType, item.UserInputType);
            }
            //For Insurable 
            dataParams = new DataParams();
            dataParams.Field = "InsurableItem Parameter Details";
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            dynamic insurableItems = new List<dynamic>();
            foreach (var insItem in policyRiskDetails.ProductRcbInsurableDetails)
            {
                dynamic insurableItem = new ExpandoObject();
                dataParams = new DataParams();
                dataParams.Field = insItem.InputType;
               // dataParams.DataType = item.UserInputType;
               // dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
               // dataParams.Description = "";
                lstdataParams.Add(dataParams);
                AddProperty(insurableItem, "InsurableName", insItem.InputType);
                dynamic InsurableFields = new List<dynamic>();
                dynamic insurableDetail = new ExpandoObject();
                foreach (var item in insItem.InsurableChildRcbdetail)
                {
                    dataParams = new DataParams();
                    dataParams.Field = item.InputType;
                    dataParams.DataType = item.UserInputType;
                    dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                    dataParams.Description = "";
                    lstdataParams.Add(dataParams);
                    AddProperty(insurableDetail, item.InputType, item.UserInputType);
                }
                InsurableFields.Add(insurableDetail);
                AddProperty(insurableItem, "RiskItems", InsurableFields);

                //Cover Details
                dynamic Covers = new List<dynamic>();
               
                foreach (var citem in insItem.CoverRcbdetails)
                {
                    dynamic coverItem = new ExpandoObject();
                    dataParams = new DataParams();
                    dataParams.Field = citem.InputType;
                    //dataParams.DataType = item.UserInputType;
                    //dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                    dataParams.Description = "";
                    lstdataParams.Add(dataParams);
                    AddProperty(coverItem, "CoverName", citem.InputType);

                    dynamic coverDetails = new List<dynamic>();
                    dynamic coverDetailItem = new ExpandoObject();
                    foreach (var item in citem.CoverChildRcbdetail)
                    {
                        dataParams = new DataParams();
                        dataParams.Field = item.InputType;
                        dataParams.DataType = item.UserInputType;
                        dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                        dataParams.Description = "";
                        lstdataParams.Add(dataParams);
                        AddProperty(coverDetailItem, item.InputType, item.UserInputType);
                    }
                    coverDetails.Add(coverDetailItem);
                    AddProperty(coverItem, "CoverFields", coverDetails);
                    Covers.Add(coverItem);
                }
                AddProperty(insurableItem, "Covers", Covers);
                insurableItems.Add(insurableItem);
            }
            AddProperty(policy, "InsurableItem", insurableItems);
            return lstdataParams;
        }

        private async Task<List<DataParams>> GetInsurableParamsAsync(decimal productId, ApiContext apiContext, dynamic policy, dynamic policyRiskDetails)
        {
            List<DataParams> lstdataParams = new List<DataParams>();
            //var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
            DataParams dataParams = null;
            dataParams = new DataParams();
            dataParams.Field = "PolicyNumber";
            dataParams.DataType = "string";
            dataParams.IsRequired =  "Yes" ;
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            AddProperty(policy, "PolicyNumber", "string");

       

            //For Insurable 
            dataParams = new DataParams();
            dataParams.Field = "InsurableItem Parameter Details";
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            dynamic insurableItems = new List<dynamic>();
            foreach (var insItem in policyRiskDetails.ProductRcbInsurableDetails)
            {
                dynamic insurableItem = new ExpandoObject();
                dataParams = new DataParams();
                dataParams.Field = insItem.InputType;
                // dataParams.DataType = item.UserInputType;
                // dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                // dataParams.Description = "";
                lstdataParams.Add(dataParams);
                AddProperty(insurableItem, "InsurableName", insItem.InputType);
                dynamic InsurableFields = new List<dynamic>();
                dynamic insurableDetail = new ExpandoObject();
                foreach (var item in insItem.InsurableChildRcbdetail)
                {
                    dataParams = new DataParams();
                    dataParams.Field = item.InputType;
                    dataParams.DataType = item.UserInputType;
                    dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                    dataParams.Description = "";
                    lstdataParams.Add(dataParams);
                    AddProperty(insurableDetail, item.InputType, item.UserInputType);
                }
                InsurableFields.Add(insurableDetail);
                AddProperty(insurableItem, "RiskItems", InsurableFields);              
                
                insurableItems.Add(insurableItem);
            }

    
            AddProperty(policy, "InsurableItem", insurableItems);
        


            return lstdataParams;
        }

        private async Task<List<DataParams>> RemoveInsurableParamsAsync(decimal productId, ApiContext apiContext, dynamic policy, dynamic policyRiskDetails)
        {
            List<DataParams> lstdataParams = new List<DataParams>();
            //var policyRiskDetails = await _integrationService.GetInsurableRiskDetails(productId, apiContext);
            DataParams dataParams = null;
            dataParams = new DataParams();
            dataParams.Field = "PolicyNumber";
            dataParams.DataType = "string";
            dataParams.IsRequired = "Yes";
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            AddProperty(policy, "PolicyNumber", "string");



            //For Insurable 
            dataParams = new DataParams();
            dataParams.Field = "InsurableItem Parameter Details";
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            dynamic insurableItems = new List<dynamic>();
            foreach (var insItem in policyRiskDetails.ProductRcbInsurableDetails)
            {
                dynamic insurableItem = new ExpandoObject();
                dataParams = new DataParams();
                dataParams.Field = insItem.InputType;
                // dataParams.DataType = item.UserInputType;
                // dataParams.IsRequired = Convert.ToBoolean(item.IsReqired) ? "Yes" : "No";
                // dataParams.Description = "";
                lstdataParams.Add(dataParams);
                AddProperty(insurableItem, "InsurableName", insItem.InputType);
                dynamic InsurableFields = new List<dynamic>();
                //dynamic insurableDetail = new ExpandoObject();
                var insurableDetail = "IdentificationNumber" + ":" + "string";
                InsurableFields.Add(insurableDetail);
                AddProperty(insurableItem, "RiskItems", InsurableFields);

                insurableItems.Add(insurableItem);
            }


            AddProperty(policy, "InsurableItem", insurableItems);



            return lstdataParams;
        }

        private async Task<List<DataParams>> CalculateRateParamsAsync(decimal productId, ApiContext apiContext, dynamic policy)
        {
            List<DataParams> lstdataParams = new List<DataParams>();
            // Get The ratingId
            var ratingId = 37;
            var policyRateDetails = await _integrationService.GetRateParamsAsync(ratingId, apiContext);
            DataParams dataParams = null;
            //For Insurable 
            dataParams = new DataParams();
            dataParams.Field = "dictionary_rule";
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            dynamic insurableItem = new ExpandoObject();
            foreach (var insItem in policyRateDetails.parameterList)
            {
               
                dataParams = new DataParams();
                dataParams.Field = insItem;
                dataParams.DataType = "string";
                dataParams.IsRequired = "Yes";
                lstdataParams.Add(dataParams);
                AddProperty(insurableItem, insItem.ToString(),null);
            }
            AddProperty(policy, "dictionary_rule", insurableItem);

            dataParams = new DataParams();
            dataParams.Field = "rateList";
            dataParams.Description = "";
            lstdataParams.Add(dataParams);
            dynamic rateList = new ExpandoObject();
            foreach (var insItem in policyRateDetails.rateList)
            {

                dataParams = new DataParams();
                dataParams.Field = insItem;
                dataParams.DataType = "string";
                dataParams.IsRequired = "Yes";
                lstdataParams.Add(dataParams);
                AddProperty(rateList, insItem.ToString(), null);
            }
            AddProperty(policy, "rateList", rateList);

            return lstdataParams;
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
        public PolicycancelDTO FillPolicyCancelRequest()
        {
            PolicycancelDTO policycancelDTO = new PolicycancelDTO();
            policycancelDTO.EventId = "Policy EventId";
            policycancelDTO.Policynumber = "Policy Number generated for the eventId";
            policycancelDTO.PolicyStatusId = "Respective cancellation status";
            policycancelDTO.Remarks = "Reason behind the cancellation";
            return policycancelDTO;
        }
        private ClaimDataDTO FillClaimIntimationRequest()
        {
            ClaimDataDTO claimIntimationDTO = new ClaimDataDTO();
            claimIntimationDTO.PolicyNumber = "000-111-222";
            claimIntimationDTO.lossDateTime = DateTime.Now;
            claimIntimationDTO.locationOfLoss = "Banglore";
            claimIntimationDTO.lossIntimatedBy = 0;
            claimIntimationDTO.lossDescription = "loss";
            claimIntimationDTO.ClaimAmount = 2;
            claimIntimationDTO.AccHolderName = "xyz";
            claimIntimationDTO.AccNumber = "1234567890213";
            claimIntimationDTO.BankName = "AXIS";
            claimIntimationDTO.BankBranchAdd = "123";
            claimIntimationDTO.IfscCode = "123deffre";
            claimIntimationDTO.EmailId = "vithal@inubesolutions.com";
            claimIntimationDTO.DocumentType = "";
            claimIntimationDTO.DocumentName = "name";
            claimIntimationDTO.ClaimStatusId = 9;
            claimIntimationDTO.Active = true;
            claimIntimationDTO.PolicyId = 26;
            claimIntimationDTO.ClaimInsurableId = 0;
            claimIntimationDTO.InsurableItem = "Person";
            claimIntimationDTO.Name = "abc";
            claimIntimationDTO.IdentificationNo = "8907676";
            claimIntimationDTO.TypeOfLoss = "loss";
            claimIntimationDTO.BenefitAmount = 4;
            claimIntimationDTO.ClaimAmounts = 3000;
            claimIntimationDTO.CreatedBy = "GS";
            claimIntimationDTO.PartnerId = 0;
            claimIntimationDTO.OrganizationId = 112;
            claimIntimationDTO.ClaimNumber = "1234-76-908";
            BankAccountsDTO bankAccountsDTO = new BankAccountsDTO();
            bankAccountsDTO.AccountHolderName = "asdf";
            bankAccountsDTO.AccountNumber = "1234567";
            bankAccountsDTO.AccountType = "savings";
            bankAccountsDTO.BankBranchAddress = "rbi layout";
            bankAccountsDTO.BankId = 60;
            bankAccountsDTO.BankName = "Axis";
            bankAccountsDTO.ClaimId = 12;
            bankAccountsDTO.CreatedBy = "Admin";
            bankAccountsDTO.CreatedDate = DateTime.Now;
            claimIntimationDTO.TblBankAccounts.Add(bankAccountsDTO);
            ClaimInsurableDTO claimInsurableDTO = new ClaimInsurableDTO();
            claimInsurableDTO.ApprovedClaimAmounts = 0;
            claimInsurableDTO.BenefitAmount = 2000;
            claimInsurableDTO.ClaimAmounts = 2000;
            claimInsurableDTO.ClaimId = 12;
            claimInsurableDTO.ClaimInsurableId = 10;
            claimInsurableDTO.CoverName = "dbi";
            claimIntimationDTO.ClaimInsurable.Add(claimInsurableDTO);
            return claimIntimationDTO;
        }

        private async Task SendNotificationAsync(ProductApiModel productKitModel,string MobileNumber, ApiContext apiContext)
        {
            try
            {

                Partners.Models.NotificationRequest request = new Partners.Models.NotificationRequest();
                request.TemplateKey = "ProductApi";
                request.AttachPDF = true;
                request.NotificationPayload = JsonConvert.SerializeObject(productKitModel);
                request.SendEmail = true;
                request.SendSms = true;
                request.smsRequest = new Partners.Models.SMSRequest()
                {
                    RecipientNumber = MobileNumber,
                    SMSMessage = $"Product {productKitModel.PName} is assigned successfully. For Policy Creation : http://bit.ly/2Y9eAZV and Claims Intimation: http://bit.ly/33EQvLz use respective link.",
                };
                var notificationResponse = await _integrationService.SendNotificationAsync(request, apiContext);
            }
            catch (Exception ex)
            {

                var msgr = ex.ToString();
            }
        }
        #endregion
        public async Task<PartnerUploadlogoResponse> UploadLogo(LogoDTO logo, ApiContext apiContext)
        {
            //throw new NotImplementedException();
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            //var claimdetails = _context.TblClaimdoc.SingleOrDefault(x => x.ClaimId == ClaimId);

            var partner = _context.TblPartners.SingleOrDefault(a => a.PartnerId == logo.PartnerId);
            partner.Logo = logo.Document;

            var result = _mapper.Map<TblPartners>(partner);

            _context.Update(result);
            _context.SaveChanges();

            var _partner = _mapper.Map<PartnersDTO>(result);

            return new PartnerUploadlogoResponse { Status = BusinessStatus.Created, details = _partner, ResponseMessage = $"logo uploaded successfully!" };
        }

        public async Task<PartnerResponse> PartnerCodeValidations(string partnercode, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var partnerCode = _context.TblPartners.Any(item => item.PartnerCode == partnercode);
            if (partnerCode == true)
            {
                return new PartnerResponse { Status = BusinessStatus.InputValidationFailed, ResponseMessage = $"PartnerCode already Exist" };
            }
            else
            {
                return new PartnerResponse { Status = BusinessStatus.Ok };
            }
        }

        //Delete Partner
        public async void DeletePartner(decimal PartnerId, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var partner = _context.TblPartners.Find(PartnerId);
           // var delete_partAddress = _context.TblPartnerAddress.Where(a=>a.PartnerId==PartnerId);
            //if (partner != null)
            //{
            //    partner.IsActive = false;
            //    _context.TblPartners.Update(partner);
            //    _context.SaveChanges();
            //}

            if(partner.IsActive==true )
            {
                partner.IsActive = false;
                _context.TblPartners.Update(partner);
                _context.SaveChanges();
            }
            else
            {
                partner.IsActive = true;
                _context.TblPartners.Update(partner);
                _context.SaveChanges();
            }
        }

        public async Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(decimal OrgId,ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var partner = (from tblPartner in _context.TblPartners.OrderByDescending(item => item.CreatedDate)
                          where (tblPartner.OrganizationId == OrgId)
                          select new PartnerDetailsDTO
                          {
                              PartnerId = tblPartner.PartnerId,
                              PartnerName = tblPartner.PartnerName,
                              Email = tblPartner.Email,
                              OrgId = tblPartner.OrganizationId
                          }).ToList();
            partner.Add(new PartnerDetailsDTO { PartnerId= 0, PartnerName="All" , Email="All",OrgId=0 });

            var partnerDetails = _mapper.Map<IEnumerable<PartnerDetailsDTO>>(partner);

            return partnerDetails;

        }

        public async Task<string> GetPartnerNameById(decimal PartnerId, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            try { 
            var pName = _context.TblPartners.SingleOrDefault(p => p.PartnerId == PartnerId).PartnerName;
            //var _pName = _mapper.Map<PartnerNameById>(pName);
            return pName;
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public async Task<PolicyAgreementResponse> EditAssignProductDate(EditAssignProductDTO policyAgreementDTO,ApiContext apiContext)
        {
            _context= (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var policyAgreement = _context.TblPolicyAgreement.Find(policyAgreementDTO.PolicyId);

            if (policyAgreement == null)
                throw new AppException("Record not found");

            // update policy end date
            policyAgreement.PolicyEndDate = policyAgreementDTO.PolicyEndDate;

            _context.TblPolicyAgreement.Update(policyAgreement);
            _context.SaveChanges();
            return new PolicyAgreementResponse() {Status=BusinessStatus.Updated, ResponseMessage = "Policy End date updated successfully!" , editAssign = policyAgreementDTO , MessageKey ="DateModifiedSuccessfully"};
        }
    }
}
