using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.Partners.Entities.AVO;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService.AvoContract
{
    public class AvoContractService : IContractProductService
    {
        private AVOPRContext _context = null;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AvoContractService(AVOPRContext context, IMapper mapper, IConfiguration configuration)
        {
            // _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<bool> GetmasterData(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
