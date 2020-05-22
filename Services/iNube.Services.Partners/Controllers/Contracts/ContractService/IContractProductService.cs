using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService
{
    public interface IContractProductService
    { 
        Task<bool> GetmasterData(ApiContext apiContext);
        Task<FileUploadResponse> ContractUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<RecruitmentDTO> RecruitmentByCode(string RecNo, ApiContext apiContext);
        Task<IncentiveResponse> IncentiveCalculation(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<object> SearchTarget(TargetDto tblParticipantMasterDto, ApiContext apiContext);

    }
}
