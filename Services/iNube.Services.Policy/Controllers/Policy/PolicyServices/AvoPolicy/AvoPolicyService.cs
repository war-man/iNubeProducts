using iNube.Services.Policy.Models;
using System;
using AutoMapper;
using iNube.Services.Policy.Entities;
using iNube.Services.Policy.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.Policy.Controllers.Policy.IntegrationServices;
using System.Reflection;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;
using Newtonsoft.Json;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using iNube.Utility.Framework.Notification;
using iNube.Utility.Framework.Model;
using iNube.Services.UserManagement.Helpers;

namespace iNube.Services.Policy.Controllers.Policy.PolicyServices
{

    public class AvoPolicyService : IPolicyProductService
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
        public Task<PolicyResponse> CreatePolicyWithPayment(dynamic policyDetail, ApiContext apiContext)
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

        public Task<IEnumerable<PolicyCountDTO>> PolicySearchDashboard(PolicySearchDashboardDTO policysearch, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<EndorsmentDTO> AddInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<EndorsmentDTO> RemoveInsurableItem(dynamic insurableItemRequest, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<EndorsmentDTO> SwitchOnOff(dynamic switchOnOffRequest, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<CdTransactionsDTO> GetCdBalanceBYPolicyAsync(string PolicNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyDTO> GetPolicyDetailsByPolicyNo(string PolicyNO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        Task<decimal> IPolicyProductService.GetPolicyDetailsByPolicyNo(string PolicyNO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyDTO> GetMasterPolicy(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<List<PolicyDetails>> GetAllPolicy(string productCode, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<object> CalCulatePremium(DynamicData premiumParameter, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<PolicyDTO> ModifyInsurabableItem(dynamic modifydata, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> GetInsurableItemDetails(string policyNo, string insurableItemName, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<decimal> UpdateSumInsured(string PolicyNumber, decimal amount, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<ProposalResponse> CreateProposal(dynamic policyDetail, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> GetRiskItemByPolicyNo(string policyNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

      

        Task<List<PolicyPremiumDetailsDTO>> IPolicyProductService.GetRiskItemByPolicyNo(string policyNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

      
        Task<List<dynamic>> IPolicyProductService.GetProposalDetails(string proposalNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

      
        public Task<PolicyResponse> IssuePolicy(dynamic IssuepolicyDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<ProposalResponse> UpdateProposal(object modifydata, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<InsurableField> GetProposalByMobileNo(string MobNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<object> GetPolicyDetailsByNumber(string policyNumber, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
