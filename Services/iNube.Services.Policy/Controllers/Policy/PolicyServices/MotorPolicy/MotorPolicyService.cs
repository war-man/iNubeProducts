﻿using iNube.Services.Policy.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using iNube.Utility.Framework.Model;

namespace iNube.Services.Policy.Controllers.Policy.PolicyServices
{

    public class MotorPolicyService : IPolicyProductService
    {
        public Task<CdTransactionsResponse> CancelPolicy(PolicycancelDTO policycancelDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyResponse> CreatePolicy(dynamic policyDetail, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<object>> DownloadPolicy(int ProductId, int PartnerId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<object>> GetGrossWrittenPremium(int productId, string productname, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddDTOs>> GetMaster(string sMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PolicyDTO>> GetPolicyByEventId(string eventId, string policyNumber, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyDTO> GetPolicyByNumber(string policyNumber, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyDTO> ModifyPolicy(string policyNumber, PolicyDTO policyDetail, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<string> PolicyCancellation(PolicycancelDTO policycancel, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public void WriteToExcel(string path)
        {
            throw new NotImplementedException();
        }

        public Task<List<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<object>> PolicyDetails(decimal PolicyId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest pDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyInsurableResponse> PolicyInsurableDetails(string PolicyNumber, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<PolicyDataForClaims>> GetPolicyForClaimsInvoice(BillingEventRequest EventRequet, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<object>> GetGrossWrittenPremium(int productId, string productname, int Year, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<ddDTOs>> PolicyDashboardMaster(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<LeadInfoDTO> CustomerPolicy(int CustomerId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
