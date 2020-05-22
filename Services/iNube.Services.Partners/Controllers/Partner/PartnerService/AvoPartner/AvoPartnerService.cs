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
using Microsoft.Extensions.Configuration;

namespace iNube.Services.Partners.Controllers.Partner.PartnerService
{

    public class AvoPartnerService : IPartnerProductService
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
        public AvoPartnerService(MICAPRContext context, IMapper mapper, IIntegrationService integrationService, IEmailService emailService, IConfiguration configuration)
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
            // _context.Entry(partner).State = partner.PartnerId == 0 ? EntityState.Added : EntityState.Modified;
            if (partner.PartnerId == 0)
            {
                partner.CreatedDate = DateTime.Now;
                _context.TblPartners.Add(partner);
            }
            else
            {
                partner.ModifyDate = DateTime.Now;
                //_context.Entry(partner).State = EntityState.Modified;
                _context.Update(partner);
            }
            _context.SaveChanges();
            if (partner.PartnerId == 0)
            {
                await SendEmailAsync(partner.Email, partner.PartnerName);
            }
            partnerDTO.PartnerId = partner.PartnerId;
            return new PartnerResponse() { Status = BusinessStatus.Created, Id = partnerDTO.PartnerId.ToString(), partner = partnerDTO, ResponseMessage = $"Partner ID: {partnerDTO.PartnerId} successfully {(partnerDTO.PartnerId == 0 ? "created " : "modified")} for Partner: {partnerDTO.PartnerName}" };
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
                return productList;
            }
            else if (sMasterList == "Partner")
            {
                ddDTOs = _context.TblPartners.OrderByDescending(p => p.CreatedDate)
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
        public async Task<PolicyAgreementResponse> SaveAssignProduct(AssignProductDTO AssignProductDto, ApiContext apiContext)
        {

            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            TblPolicyAgreement tb = null;
            List<ErrorInfo> Errors = new List<ErrorInfo>();
            ErrorInfo error = null;
            string demodata = "";
            StringBuilder sb = new StringBuilder();
            var partnerName = _context.TblPartners.FirstOrDefault(p => p.PartnerId == AssignProductDto.PartnerId).PartnerName;
            foreach (var item in AssignProductDto.lstProductId)
            {
                foreach (var pId in item)
                {
                    demodata = String.Concat(pId.ToString().PadLeft(5, '0'), "/" + AssignProductDto.PartnerId.ToString().PadLeft(5, '0'));
                    var pks = _context.TblPolicyAgreement.Any(x => x.PolicyNo == demodata);
                    if (pks == false)
                    {
                        tb = new TblPolicyAgreement();
                        tb.PolicyNo = String.Concat(pId.ToString().PadLeft(5, '0'), "/" + AssignProductDto.PartnerId.ToString().PadLeft(5, '0'));
                        tb.AgentId = AssignProductDto.PartnerId;
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

            }
            else
            {
                policyAgreementResponse.Status = BusinessStatus.Created;
                policyAgreementResponse.ResponseMessage = $"Product code {sb.ToString()} successfully assigned to Partner {partnerName}";

            }
            return policyAgreementResponse;
        }
        /// <summary>
        /// Gets the assign product.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<PolicyAgreementDTO>> GetAssignProduct(decimal partnerId,ApiContext apiContext)
        {

            //_context = (MICAPRContext)DbManager.GetContext(apiContext.ProductType, apiContext.ServerType);

            //var tblPolicyAgreements=_context.TblPolicyAgreement.ToList();
            //var agreement=_mapper.Map<IEnumerable<PolicyAgreementDTO>>(tblPolicyAgreements);
            ////var policyAgreementResponse = new PolicyAgreementResponse();

            //return agreement;
            var tblPolicyAgreements = (from a in _context.TblPolicyAgreement.Where(x => x.AgentId == partnerId)
                                       join b in _context.TblPartners on a.AgentId equals b.PartnerId

                                       select new PolicyAgreementDTO
                                       {
                                           PartnerName = b.PartnerName,
                                           PolicyStartDate = a.PolicyStartDate,
                                           PolicyEndDate = a.PolicyEndDate,
                                           CreatedDate = a.CreatedDate,
                                           ProductIdPk = a.ProductIdPk
                                       }).ToList();
            //var productNameList = await _integrationService.GetProductNameAsync(apiContext);

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
        public async Task<IEnumerable<ddDTO>> GetAssignProductbyId(AssignedProducts assignedProducts, ApiContext apiContext)
        {
            _context = (MICAPRContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var productList = await _integrationService.GetProductMasterAsync(apiContext);
            if (!string.IsNullOrEmpty(assignedProducts.ProductName))
            {
                productList = productList.Where(s => s.mValue.Contains(assignedProducts.ProductName));

            }
            if (!string.IsNullOrEmpty(assignedProducts.ProductCode))
            {
                productList = productList.Where(s => s.mValue.Contains(assignedProducts.ProductName));

            }
            if (assignedProducts.Lobid > 0)
            {
                productList = productList.Where(s => s.lobid == assignedProducts.Lobid);

            }
            if (assignedProducts.Cobid > 0)
            {
                productList = productList.Where(s => s.cobid == assignedProducts.Cobid);

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
            throw new NotImplementedException();
        }

        public async Task<ProductApiModel> GetPartnerApiKitAsync(decimal productId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        public async Task<PartnerUploadlogoResponse> UploadLogo(LogoDTO logo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<PartnerResponse> PartnerCodeValidations(string partnercode, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public void DeletePartner(decimal PartnerId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        //For Accounting
        public async Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(decimal OrgId,ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetPartnerNameById(decimal PartnerId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyAgreementResponse> EditAssignProductDate(EditAssignProductDTO policyAgreementDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PartnersDTO> GetPartnerDetailsByPartnerCode(string partnerCode, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyAgreementResponse> ValidateAssignProduct(string partnerCode, int productId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
