using AutoMapper;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService
{
    public interface IContractService
    {
        Task<bool> GetmasterData(ApiContext apiContext);
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
    }
}
