using AutoMapper;
using AutoMapper.Configuration;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using iNube.Services.Policy.Entities.DynamicReportEntities;
using iNube.Services.DynamicReports.model;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicReports
{
    public interface IReportService
    {
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<ReportConfigResonse> SaveConfigParameters(ReportConfigDTO reportConfigDTO, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetReportConfigName(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<string>> GetParameters(int ReportConfigId, ApiContext apiContext);
        Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext);
        Task<DataTable> QueryExecution(QueryDTO queryDTO, ApiContext apiContext);
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
        public async Task<ReportConfigResonse> SaveConfigParameters(ReportConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).SaveConfigParameters(reportConfigDTO, apiContext);
        }
        public async Task<IEnumerable<ddDTO>> GetReportConfigName(string lMasterlist, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetReportConfigName(lMasterlist, apiContext);
        }
        public async Task<IEnumerable<string>> GetParameters(int ReportConfigId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetParameters(ReportConfigId, apiContext);
        }
        public async Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetQueryById(ReportConfigId, apiContext);
        }
        public async Task<DataTable> QueryExecution(QueryDTO queryDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).QueryExecution(queryDTO,apiContext);
        }
    }
}
