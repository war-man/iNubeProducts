using AutoMapper;
using AutoMapper.Configuration;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using iNube.Services.DynamicGraph.model;
using iNube.Services.Policy.Entities.DynamicGraphEntities;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;

namespace iNube.Services.Policy.Controllers.DynamicGraph
{
    public interface IGraphService
    {
        Task<IEnumerable<ddlDTOs>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<DashboardConfigResonse> SaveConfigParameters(DashboardConfigDTO reportConfigDTO, ApiContext apiContext);
        Task<IEnumerable<ddlDTOs>> GetReportConfigName(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<DashboardParamsDTO>> GetParameters(int ReportConfigId, ApiContext apiContext);
        Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext);
        Task<DataTable> QueryExecution(QueryDTOs queryDTO, ApiContext apiContext);
        Task<IEnumerable<ddlDTOs>> GetReportNameForPermissions(ApiContext apiContext);
        Task<IEnumerable<DashboardConfigParamDTO>> GetParameterDetails(int ReportConfigId, ApiContext apiContext);
        void DeleteParameter(int ReportConfigParamId, ApiContext apiContext);
        Task<DashboardConfigDTO> UpdateReport(DashboardConfigDTO reportConfigDTO, ApiContext apiContext);
    }

    public class GraphService : IGraphService
    {
        private MICADBContext _context;
        private IMapper _mapper;
        //private IDBIntegrationService _integrationService;
        //private readonly IConfiguration _configuration;
        private readonly Func<string, IGraphProductService> _productService;

        public GraphService(Func<string, IGraphProductService> productService, MICADBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            //_integrationService = integrationService;
            //_configuration = configuration;
            _productService = productService;
        }

        public async Task<IEnumerable<ddlDTOs>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetMaster(lMasterlist, apiContext);
        }
        public async Task<DashboardConfigResonse> SaveConfigParameters(DashboardConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).SaveConfigParameters(reportConfigDTO, apiContext);
        }
        public async Task<IEnumerable<ddlDTOs>> GetReportConfigName(string lMasterlist, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetReportConfigName(lMasterlist, apiContext);
        }
        public async Task<IEnumerable<DashboardParamsDTO>> GetParameters(int ReportConfigId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetParameters(ReportConfigId, apiContext);
        }
        public async Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetQueryById(ReportConfigId, apiContext);
        }
        public async Task<DataTable> QueryExecution(QueryDTOs queryDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).QueryExecution(queryDTO,apiContext);
        }
        public async Task<IEnumerable<ddlDTOs>> GetReportNameForPermissions(ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetReportNameForPermissions(apiContext);
        }
        public async Task<IEnumerable<DashboardConfigParamDTO>> GetParameterDetails(int ReportConfigId, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).GetParameterDetails(ReportConfigId,apiContext);
        }
        public async void DeleteParameter(int ReportConfigParamId, ApiContext apiContext)
        {
             _productService(apiContext.ProductType).DeleteParameter(ReportConfigParamId, apiContext);
        }
        public async Task<DashboardConfigDTO> UpdateReport(DashboardConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            return await _productService(apiContext.ProductType).UpdateReport(reportConfigDTO, apiContext);
        }
    }
}
