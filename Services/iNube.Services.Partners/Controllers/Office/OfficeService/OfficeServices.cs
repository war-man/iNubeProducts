﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using iNube.Services.Partners.Entities;
using iNube.Services.Partners.Models;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;

namespace iNube.Services.Partners.Controllers.Office.OfficeService
{

    public interface IOfficeService
    {
        Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO, ApiContext apiContext);
        Task<OrgOfficeDTO> GetOffice(int officeID, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext);
        Task<IEnumerable<OrgOfficeDTO>> SearchOfficeData(int officeID, ApiContext apiContext);

        int TestMethod();
    }
    public class OfficeService : IOfficeService
    {
        private MICAPRContext _context;
        private IMapper _mapper;

        private readonly Func<string, IOfficeProductService> _officeProductService;
        public OfficeService(Func<string, IOfficeProductService> officeProductService, IMapper mapper)
        {
            _officeProductService = officeProductService;
            _mapper = mapper;

        }

        public async Task<OfficeResponse> CreateOffice(OrgOfficeDTO officeDTO, ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).CreateOffice(officeDTO, apiContext);
        }

        public async Task<OrgOfficeDTO> GetOffice(int officeID, ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).GetOffice(officeID, apiContext);
        }
        public async Task<IEnumerable<OrgOfficeDTO>> SearchOfficeData(int officeID, ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).SearchOfficeData(officeID, apiContext);
        }
        public async Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).GetAllOfficeData(apiContext);
        }

        public int TestMethod()
        {
            return 0;
        }


    }
}