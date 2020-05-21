﻿using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.Partners.Entities;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService.MotorContract
{
    public class MotorContractService : IContractProductService
    {
        private MICAPRContext _context = null;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;

        public MotorContractService(MICAPRContext context, IMapper mapper, IConfiguration configuration)
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
