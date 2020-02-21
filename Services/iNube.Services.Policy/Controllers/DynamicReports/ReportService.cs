using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using iNube.Services.Policy.Entities.DynamicReportEntites;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicReports
{
    public interface IReportService
    {
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
    }

    public class ReportService : IReportService
    {
        private MICARPContext _context;
        private IMapper _mapper;
        private IRPIntegrationService _integrationService;
        //private readonly IConfiguration _configuration;
        private readonly Func<string, IReportProductService> _productService;

        public ReportService(Func<string, IReportProductService> productService, MICARPContext context, IMapper mapper, IRPIntegrationService integrationService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            //_configuration = configuration;
            _productService = productService;
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetMaster(lMasterlist, apiContext);
        }
    }
}
