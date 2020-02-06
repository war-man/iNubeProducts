using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.Policy.PolicyServices
{
    public interface IPolicyProductService
    {
        Task<PolicyResponse> CreatePolicy(dynamic policyDetail, ApiContext apiContext);

        Task<PolicyResponse> CreateMultiCoverPolicy(dynamic policyDetail, ApiContext apiContext);

        Task<PolicyDTO> ModifyPolicy(string policyNumber, PolicyDTO policyDetail, ApiContext apiContext);
        Task<IEnumerable<ddDTOs>> GetMaster(string sMasterlist, ApiContext apiContext);
        Task<PolicyDTO> GetPolicyById(decimal policyId, ApiContext apiContext);
        Task<PolicyDTO> GetPolicyByNumber(string policyNumber, ApiContext apiContext);
        Task<string> PolicyCancellation(PolicycancelDTO policycancel, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> PolicySearch(PolicysearchDTO policysearch, ApiContext apiContext);
        Task<CdTransactionsResponse> CancelPolicy(PolicycancelDTO policycancelDTO, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> GetPolicyByEventId(string eventId, string policyNumber, ApiContext apiContext);
        Task<List<object>> GetGrossWrittenPremium(int productId, string productname,int Year, ApiContext apiContext);
        Task<List<object>> DownloadPolicy(int ProductId, int PartnerId, ApiContext apiContext);
        Task<IEnumerable<PolicyDTO>> GetPolicyDetails(ApiContext apiContext);
        Task<IEnumerable<decimal>> GetPolicyByDetails(PolicySearchbyPidDTO policySearchby, ApiContext apiContext);
        Task<List<BillingEventDataDTO>> BillingEventData(BillingEventRequest pDTO, ApiContext apiContext);
        void WriteToExcel(string path);
        Task<List<object>> PolicyDetails(decimal PolicyId, ApiContext apiContext);
        Task<BillingEventResponseDTO> BillingEventResponse(BillingEventRequest pDTO, ApiContext apiContext);
        Task<PolicyInsurableResponse> PolicyInsurableDetails(string PolicyNumber, ApiContext apiContext);
        Task<List<PolicyDataForClaims>> GetPolicyForClaimsInvoice(BillingEventRequest EventRequest, ApiContext apiContext);
        Task<List<ddDTOs>> PolicyDashboardMaster(ApiContext apiContext);
        Task<LeadInfoDTO> CustomerPolicy(int CustomerId, ApiContext apiContext);
    }
}
