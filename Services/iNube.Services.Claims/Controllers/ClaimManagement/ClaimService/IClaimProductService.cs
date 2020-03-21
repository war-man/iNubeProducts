using iNube.Services.Claims.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Controllers.ClaimManagement.ClaimService
{
    public interface IClaimProductService
    {
        Task<ClaimResponse> CreateClaimAsync(dynamic policyDetail, ApiContext apiContext);
        Task<ClaimDTO> GetClaimById(decimal claimId, ApiContext apiContext);
        Task<ClaimDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext);
        Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claim, ApiContext apiContext);
        Task<List<FinanceProcessDTO>> GetFinanceBankDataAsync(SearchFinanceRequest financeRequest,ApiContext apiContext);
        //Task<ClaimDTO> SendRequestAsync(ApiContext apiContext);
        Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext);
        Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext);
        Task<ClaimProcessDTO> ClaimProcess(ClaimProcessDTO claimsDTO, ApiContext apiContext);
        Task<ClaimResponses> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext);
        Task<ClaimSearchResponseDTO> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext);
        Task<List<object>> ClaimStatusAsync(decimal claimId, decimal statusId, ApiContext apiContext);
        Task<List<object>> ClaimDetailsAsync(decimal ClaimId, ApiContext apiContext);
        Task<List<object>> PaymentDetailsAsync(decimal ClaimId, ApiContext apiContext);
        Task<List<object>> ClaimEnquiryAsync(decimal ClaimId, ApiContext apiContext);
        //IEnumerable<string> ClaimDetails(decimal ClaimId, ApiContext apiContext);
        Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext);
        Task <byte[]> ImageData(int ClaimId, ApiContext apiContext);
        Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext);
        Task<List<object>> GetClaimsByProductPartner(PolicySearchbyPidDTO claimDash,ApiContext apiContext);
        Task<List<FinanceProcessDTO>> GetSettledFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext);
        Task<List<FinanceProcessDTO>> GetPaymentFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext);
        Task<List<ClaimResponseDTO>> ClaimsReport(ClaimsRequest claimsRequest, ApiContext apiContext);
        Task<BankDocumentDTO> GetDocumentId(string filename, ApiContext apiContext);
        //Task<BillingEventResponseDTO> BillingEventResponseAsync(BillingEventRequest cDTO, ApiContext apiContext);
        Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest cDTO, ApiContext apiContext);
        Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, ApiContext apiContext);
        Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<decimal> GetBalanceSumInsured(string policyNo, ApiContext apiContext);
        Task<IEnumerable<SearchDTO>> SearchClaimByUserid(SearchClaimDTO searchclaim, ApiContext apiContext);
        Task<ClaimCounts> GetClaimCount(ApiContext apiContext);
        Task<IEnumerable<commonddDTO>> GetMasterForVehicleLocation(string lMasterlist, ApiContext apiContext);
        Task<BankAccountsDTO> SearchClaimBankDetails(int claimid, ApiContext apiContext);
    }

}
