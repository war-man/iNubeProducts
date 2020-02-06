using AutoMapper;
using iNube.Services.Claims.Controllers.ClaimManagement.IntegrationServices;
using iNube.Services.Claims.Models;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework.Notification;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Controllers.ClaimManagement.ClaimService
{
    public interface IClaimManagementService
    {
        Task<ClaimResponse> CreateClaimAsync(dynamic policyDetail, ApiContext apiContext);
        Task<ClaimDTO> GetClaimById(decimal claimId, ApiContext apiContext);
        Task<ClaimDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext);
        Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claim, ApiContext apiContext);
        Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext);
        Task<List<FinanceProcessDTO>> GetFinanceBankDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext);
        Task<List<FinanceProcessDTO>> GetSettledFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext);
        Task<List<FinanceProcessDTO>> GetPaymentFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext);
        Task<ClaimProcessDTO> ClaimProcess(ClaimProcessDTO claimsDTO, ApiContext apiContext);
        Task<ClaimsDTO> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext);
        Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext);
        Task<IEnumerable<SearchDTO>> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext);
        Task<List<object>> ClaimDetails(decimal ClaimId, ApiContext apiContext);
        Task<List<object>> PaymentDetails(decimal ClaimId, ApiContext apiContext);
        Task<List<object>> ClaimEnquiry(decimal ClaimId, ApiContext apiContext);
        //IEnumerable<string> ClaimDetails(decimal ClaimId, ApiContext apiContext);
        Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext);
        Task<byte[]> ImageData(int ClaimId, ApiContext context);
        Task<List<object>> ClaimStatus(decimal ClaimId, decimal statusId, ApiContext apiContext);
        Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext);
        Task<List<object>> GetClaimsByProductPartner(PolicySearchbyPidDTO claimDash, ApiContext apiContext);
        Task<List<ClaimResponseDTO>> ClaimsReport(ClaimsRequest claimsRequest, ApiContext apiContext);
        Task<BankDocumentDTO> GetDocumentId(string filename, ApiContext apiContext);
        Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest cDTO, ApiContext apiContext);
        Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, ApiContext apiContext);
        Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
    }
    public class ClaimManagementService : IClaimManagementService
    {
        public IIntegrationService _integrationService;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly Func<string, IClaimProductService> _productService;

        public ClaimManagementService(Func<string, IClaimProductService> productService, IMapper mapper, IIntegrationService integrationService, IConfiguration configuration, IEmailService emailService)
        {
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
            _emailService = emailService;
            _productService = productService;
        }

        public async Task<ClaimResponse> CreateClaimAsync(dynamic policyDetail, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).CreateClaimAsync(policyDetail, apiContext);
        }

        public async Task<ClaimsDTO> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ClaimIntimate(claims, apiContext);
        }

        public async Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).UploadFiles(claimdoc, apiContext);
        }

        public async Task<byte[]> ImageData(int ClaimId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ImageData(ClaimId, apiContext);
        }

        public async Task<ClaimDTO> GetClaimById(decimal claimId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetClaimById(claimId, apiContext);
        }

        public async Task<ClaimDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetClaimByNumber(claimNumber, apiContext);
        }

        public async Task<BankDocumentDTO> GetDocumentId(string filename, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetDocumentId(filename,apiContext);
        }

        public async Task<IEnumerable<SearchDTO>> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).SearchClaim(searchclaim, apiContext);
        }

        public async Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claim, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetSearchClaims(claim, apiContext);
        }

        public async Task<List<object>> GetClaimsByProductPartner(PolicySearchbyPidDTO claimDash, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetClaimsByProductPartner(claimDash, apiContext);
        }

        public async Task<List<FinanceProcessDTO>> GetFinanceBankDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetFinanceBankDataAsync(financeRequest, apiContext);
        }

        public async Task<List<FinanceProcessDTO>> GetSettledFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetSettledFinanceDataAsync(financeRequest, apiContext);
        }

        public async Task<List<FinanceProcessDTO>> GetPaymentFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetPaymentFinanceDataAsync(financeRequest, apiContext);
        }

        public async Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetClaimGWP(claimgwp, apiContext);
        }
        public async Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetMaster(sMasterlist, apiContext);
        }

        public async Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).BillingEventData(pDTO, apiContext);
        }
        public async Task<ClaimProcessDTO> ClaimProcess(ClaimProcessDTO claimsDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ClaimProcess(claimsDTO, apiContext);

        }

        public async Task<List<object>> ClaimEnquiry(decimal ClaimId, ApiContext apiContext)
        {

            return await _productService(apiContext.ProductType).ClaimEnquiryAsync(ClaimId, apiContext);
        }
        public async Task<List<object>> ClaimDetails(decimal ClaimId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ClaimDetailsAsync(ClaimId, apiContext);
        }

        public async Task<List<object>> ClaimStatus(decimal ClaimId, decimal statusId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ClaimStatusAsync(ClaimId, statusId, apiContext);
        }

        public async Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ModifyActive(claims, apiContext);
        }

        public async Task<List<ClaimResponseDTO>> ClaimsReport(ClaimsRequest claimsRequest, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).ClaimsReport(claimsRequest, apiContext);
        }

        public async Task<List<object>> PaymentDetails(decimal ClaimId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).PaymentDetailsAsync(ClaimId, apiContext);
        }

        //public Task<BillingEventResponseDTO> BillingEventResponseAsync(BillingEventRequest cDTO, ApiContext apiContext)
        //{
        //    return _productService(apiContext.ProductType).BillingEventResponseAsync(cDTO, apiContext);
        //}

        public async Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest cDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).BillingEventResponse(cDTO, apiContext);
        }

        public async Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).DocumentView(ClaimId, isDoc, apiContext);
        }

        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).Documentupload(httpRequest, cancellationToken, apiContext);
        }
    }
}
