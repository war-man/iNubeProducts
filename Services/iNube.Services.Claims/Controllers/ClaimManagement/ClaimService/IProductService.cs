using iNube.Services.Claims.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Controllers.ClaimManagement.ClaimService
{
    public interface IProductService
    {
        Task<ClaimResponse> CreateClaimAsync(dynamic policyDetail);
        Task<ClaimDTO> GetClaimById(decimal claimId);
        Task<ClaimDTO> GetClaimByNumber(string claimNumber);
        Task<IEnumerable<ClaimDTO>> GetSearchClaims(ClaimSearchDTO claim);
        Task<FinanceProcessDTO> GetFinanceBankData();
        Task<ClaimDTO> SendRequestAsync();

    }
}