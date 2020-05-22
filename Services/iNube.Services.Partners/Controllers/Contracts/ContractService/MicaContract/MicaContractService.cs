using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService.MicaContract
{
    public class MicaContractService: IContractProductService
    {
        private MICAPRContext _context = null;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;

        public MicaContractService(MICAPRContext context, IMapper mapper, IConfiguration configuration)
        {
            // _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<bool> GetmasterData(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<FileUploadResponse> ContractUpload(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<RecruitmentDTO> RecruitmentByCode(string RecNo, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IncentiveResponse> IncentiveCalculation(HttpRequest httpRequest, CancellationToken cancellationToken, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

    }
}
