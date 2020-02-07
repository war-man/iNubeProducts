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
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.Model;

namespace iNube.Services.Partners.Controllers.Partner.PartnerService
{

    public interface IPartnerService
    {
        Task<PartnerResponse> CreatePartnerAsync(PartnersDTO partnerDTO, ApiContext apiContext);
        Task<PartnersDTO> GetPartner(int partnerID, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetMasterAsync(ApiContext apiContext, string sMasterList, string partnerId = "");
        Task<IEnumerable<PolicyAgreementDTO>> GetAssignProduct(decimal partnerId,ApiContext apiContext);
        Task<PolicyAgreementResponse> SaveAssignProduct(AssignProductDTO assignProductDto, ApiContext apiContext);
        Task<IEnumerable<PartnersDTO>> GetSearchPartner(PartnerSearchDTO partnerSearchDTO, ApiContext apiContext);
        Task<PolicyAgreementDTO> GetSearchProductDetails(SearchProductModel productdetails, ApiContext apiContext);
        Task<PolicyAgreementDTO> DeletePartnerById(decimal partnerId, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetAssignProductbyId(AssignedProducts assignedProducts, ApiContext apiContext);
        Task<IEnumerable<PartnerProductDTO>> GetPartnerbyProductid(int id, ApiContext apiContext);
        Task<ProductApiModel> GetPartnerApiKit(decimal productId, ApiContext apiContext);
        Task<PartnerUploadlogoResponse> UploadLogo(LogoDTO logo, ApiContext apiContext);
        Task<PartnerResponse> PartnerCodeValidations(string partnercode, ApiContext apiContext);
        void DeletePartner(decimal PartnerId, ApiContext apiContext);
        Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(decimal OrgId,ApiContext apiContext);
        Task<string> GetPartnerNameById(decimal PartnerId, ApiContext apiContext);
    }

    public class PartnerService : IPartnerService
    {
        private MICAPRContext _context;
        private IMapper _mapper;
        private IIntegrationService _integrationService;
        private readonly IEmailService _emailService;
        private readonly Func<string, IPartnerProductService> _partnerProductService;
        /// <summary>
        /// Initializes a new instance of the <see cref="PartnerService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="integrationService">The integration service.</param>
        /// <param name="emailService">The email service.</param>
        public PartnerService(Func<string, IPartnerProductService> partnerProductService, IMapper mapper, IIntegrationService integrationService, IEmailService emailService)
        {
            _partnerProductService = partnerProductService;
            _mapper = mapper;
            _integrationService = integrationService;
            _emailService = emailService;
        }
        /// <summary>
        /// Creates the partner asynchronous.
        /// </summary>
        /// <param name="partnerDTO">The partner dto.</param>
        /// <returns></returns>
        public async Task<PartnerResponse> CreatePartnerAsync(PartnersDTO partnerDTO, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).CreatePartnerAsync(partnerDTO, apiContext);
        }
        /// <summary>
        /// Gets the master asynchronous.
        /// </summary>
        /// <param name="sMasterList">The s master list.</param>
        /// <param name="partnerId">The partner identifier.</param>
        /// <returns></returns>
        public async Task<IEnumerable<ddDTO>> GetMasterAsync(ApiContext apiContext, string sMasterList, string partnerId = "")
        {
            return await _partnerProductService(apiContext.ProductType).GetMasterAsync(apiContext, sMasterList, partnerId);
        }
        /// <summary>
        /// Gets the partner.
        /// </summary>
        /// <param name="partnerId">The partner identifier.</param>
        /// <returns></returns>
        public async Task<PartnersDTO> GetPartner(int partnerId, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetPartner(partnerId, apiContext);
        }
        /// <summary>
        /// Saves the assign product.
        /// </summary>
        /// <param name="AssignProductDto">The assign product dto.</param>
        /// <returns></returns>
        public async Task<PolicyAgreementResponse> SaveAssignProduct(AssignProductDTO AssignProductDto, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).SaveAssignProduct(AssignProductDto, apiContext);
        }
        /// <summary>
        /// Gets the assign product.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<PolicyAgreementDTO>> GetAssignProduct(decimal partnerId,ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetAssignProduct(partnerId,apiContext);
        }
        /// <summary>
        /// Gets the search partner.
        /// </summary>
        /// <param name="partnerSearchDTO">The partner search dto.</param>
        /// <returns></returns>
        public async Task<IEnumerable<PartnersDTO>> GetSearchPartner(PartnerSearchDTO partnerSearchDTO, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetSearchPartner(partnerSearchDTO, apiContext);
        }
        /// <summary>
        /// Gets the search product details.
        /// </summary>
        /// <param name="productdetails">The productdetails.</param>
        /// <returns></returns>
        public async Task<PolicyAgreementDTO> GetSearchProductDetails(SearchProductModel productdetails, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetSearchProductDetails(productdetails, apiContext);
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
            return await _partnerProductService(apiContext.ProductType).DeletePartnerById(partnerId, apiContext);
        }
        public async Task<IEnumerable<ddDTO>> GetAssignProductbyId(AssignedProducts assignedProducts, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetAssignProductbyId(assignedProducts, apiContext);
        }

        public async Task<IEnumerable<PartnerProductDTO>> GetPartnerbyProductid(int id, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetPartnerbyProductid(id, apiContext);
        }
        public async Task<PartnerUploadlogoResponse> UploadLogo(LogoDTO logo, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).UploadLogo(logo, apiContext);
        }

        public async Task<ProductApiModel> GetPartnerApiKit(decimal productId, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetPartnerApiKitAsync(productId, apiContext);
        }

        public async Task<PartnerResponse> PartnerCodeValidations(string partnercode, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).PartnerCodeValidations(partnercode, apiContext);
        }

        public void DeletePartner(decimal PartnerId, ApiContext apiContext)
        {
             _partnerProductService(apiContext.ProductType).DeletePartner(PartnerId, apiContext);
        }
        public async Task<IEnumerable<PartnerDetailsDTO>> GetPartnerDetails(decimal OrgId,ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetPartnerDetails(OrgId ,apiContext);
        }
        public async Task<string> GetPartnerNameById(decimal PartnerId, ApiContext apiContext)
        {
            return await _partnerProductService(apiContext.ProductType).GetPartnerNameById(PartnerId,apiContext);
        }
    }
}
