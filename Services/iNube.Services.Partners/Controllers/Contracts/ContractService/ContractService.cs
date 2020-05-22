using AutoMapper;
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
    public interface IContractService
    {
        Task<bool> GetmasterData(ApiContext apiContext);
        Task<FileUploadResponse> ContractUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<RecruitmentDTO> RecruitmentByCode(string RecNo, ApiContext apiContext);
        Task<IncentiveResponse> IncentiveCalculation(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext);
        Task<object> SearchTarget(TargetDto tblParticipantMasterDto, ApiContext apiContext);

    }

    public class ContractService : IContractService
    {
        private IMapper _mapper;
        private readonly Func<string, IContractProductService> _contractProductService;

        public ContractService(Func<string, IContractProductService> contractProductService, IMapper mapper)
        {
            _contractProductService = contractProductService;
            _mapper = mapper;

        }
        
        public async Task<bool> GetmasterData(ApiContext apiContext)
        {
            return await _contractProductService(apiContext.ProductType).GetmasterData(apiContext);
        }

       public async Task<FileUploadResponse> ContractUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _contractProductService(apiContext.ProductType).ContractUpload(httpRequest, cancellationToken,apiContext);
        }
        public async Task<RecruitmentDTO> RecruitmentByCode(string RecNo, ApiContext apiContext)
        {
            return await _contractProductService(apiContext.ProductType).RecruitmentByCode(RecNo, apiContext);
        }

        public async Task<IncentiveResponse> IncentiveCalculation(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            return await _contractProductService(apiContext.ProductType).IncentiveCalculation(httpRequest, cancellationToken, apiContext);
        }
        public async Task<object> SearchTarget(TargetDto tblParticipantMasterDto, ApiContext apiContext)
        {
            return await _contractProductService(apiContext.ProductType).SearchTarget(tblParticipantMasterDto, apiContext);
        }
    }
}
