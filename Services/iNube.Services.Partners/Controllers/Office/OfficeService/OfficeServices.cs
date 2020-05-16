using System;
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
        Task<AVOOrgOffice> GetOffice(string OfficeCode, ApiContext apiContext);
        //  Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext);
        Task<List<MasterDto>> GetAllOfficeData(ApiContext apiContext);
        Task<IEnumerable<AVOOrgOffice>> SearchOfficeData(string OfficeCode, ApiContext apiContext);
        Task<IEnumerable<AVOOrgOffice>> SearchOffById(int Officeid, ApiContext apiContext);

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

        public async Task<AVOOrgOffice> GetOffice(string OfficeCode, ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).GetOffice(OfficeCode, apiContext);
        }
        public async Task<IEnumerable<AVOOrgOffice>> SearchOfficeData(string OfficeCode, ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).SearchOfficeData(OfficeCode, apiContext);
        }
        //public async Task<IEnumerable<ddDTO>> GetAllOfficeData(ApiContext apiContext)
        //{
        //    return await _officeProductService(apiContext.ProductType).GetAllOfficeData(apiContext);
        //}
        public async Task<List<MasterDto>> GetAllOfficeData(ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).GetAllOfficeData(apiContext);
        }

        public async Task<IEnumerable<AVOOrgOffice>> SearchOffById(int Officeid, ApiContext apiContext)
        {
            return await _officeProductService(apiContext.ProductType).SearchOffById(Officeid, apiContext);
        }

        public int TestMethod()
        {
            return 0;
        }


    }
}
