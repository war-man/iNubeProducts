﻿using iNube.Services.Claims.Models;
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
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimResponse> CreateClaimAsync(dynamic policyDetail, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimDataDTO> GetClaimById(decimal claimId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }


        //public ClaimdocDTO UploadFiles(int claimid, ClaimdocDTO claimdoc, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimSearchResponseDTO> SearchClaim(SearchClaimDTO searchclaim, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimsDTO> ClaimBankSave(ClaimsDTO claimsDTO)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimDataDTO> GetClaimByNumber(string claimNumber, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimDTOGWP> GetClaimGWP(ClaimDTOGWP claimgwp, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ddDTO>> GetMaster(string sMasterlist, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claim, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimDTO> SendRequestAsync(ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<FinanceProcessDTO>> GetFinanceBankDataAsync(SearchFinanceRequest financeRequest,ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<FinanceProcessDTO>> GetSettledFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<FinanceProcessDTO>> GetPaymentFinanceDataAsync(SearchFinanceRequest financeRequest, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimProcessResponseDTO> ClaimProcess(ClaimProcessDTO claimsDTO, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimResponses> ClaimIntimate(ClaimDataDTO claims, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<object>> ClaimStatusAsync(decimal claimId, decimal statusId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<object>> ClaimDetailsAsync(decimal ClaimId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }


        //public string UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<BankDocumentDTO> GetDocumentId(string filename, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<byte[]> ImageData(int ClaimId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimsDTO> ModifyActive(ClaimsActive claims, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<object>> GetClaimsByProductPartner(PolicySearchbyPidDTO claimDash,ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<ClaimResponseDTO>> ClaimsReport(ClaimsRequest claimsRequest, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<ClaimDocUpload> UploadFiles(ClaimdocDTO claimdoc, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<object>> PaymentDetailsAsync(decimal ClaimId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<List<object>> ClaimEnquiryAsync(decimal ClaimId, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ClaimdocDTO>> DocumentView(decimal ClaimId, bool isDoc, bool isPolicy, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            throw new NotImplementedException();
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<DocumentResponse> Documentupload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
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
        public Task<BankAccountsDTO> SearchClaimBankDetails(int claimid, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Models.BillingEventDataDTO>> BillingEventData(Models.BillingEventRequest pDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<BillingEventResponseDTO> BillingEventResponse(Models.BillingEventRequest cDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
