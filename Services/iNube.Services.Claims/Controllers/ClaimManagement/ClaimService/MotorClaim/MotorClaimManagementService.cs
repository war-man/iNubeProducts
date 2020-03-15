using iNube.Services.Claims.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using static iNube.Services.Claims.Models.BankAccountsDTO;

namespace iNube.Services.Claims.Controllers.ClaimManagement.ClaimService
{

    public class MotorClaimManagementService : IClaimProductService
    {
        public async Task<ClaimResponse> CreateClaimAsync(dynamic policyDetail, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimDTO> GetClaimById(decimal claimId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //public ClaimdocDTO UploadFiles(int claimid, ClaimdocDTO claimdoc, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<IEnumerable<SearchDTO>> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimsDTO> ClaimBankSave(ClaimsDTO claimsDTO)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claim, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimDTO> SendRequestAsync(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FinanceProcessDTO>> GetFinanceBankDataAsync(SearchFinanceRequest financeRequest,ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FinanceProcessDTO>> GetSettledFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FinanceProcessDTO>> GetPaymentFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimProcessDTO> ClaimProcess(ClaimProcessDTO claimsDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimResponses> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<object>> ClaimStatusAsync(decimal claimId, decimal statusId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<object>> ClaimDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        //public string UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<BankDocumentDTO> GetDocumentId(string filename, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<byte[]> ImageData(int ClaimId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<object>> GetClaimsByProductPartner(PolicySearchbyPidDTO claimDash,ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ClaimResponseDTO>> ClaimsReport(ClaimsRequest claimsRequest, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

       public async Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<object>> PaymentDetailsAsync(decimal ClaimId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<List<object>> ClaimEnquiryAsync(decimal ClaimId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest cDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<decimal> GetBalanceSumInsured(string policyNo)
        {
            throw new NotImplementedException();
        }

        public Task<decimal> GetBalanceSumInsured(string policyNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SearchDTO>> SearchClaimByUserid(SearchClaimDTO searchclaim, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<ClaimCounts> GetClaimCount(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<commonddDTO>> GetMasterForVehicleLocation(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
