using AutoMapper;
using iNube.Services.DynamicGraph.model;
using iNube.Services.DynamicReports.model;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using iNube.Services.Policy.Entities.AVO.DynamicReportEntities;
using iNube.Services.Policy.Helpers.DynamicReportHelpers;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicGraph.GraphServices.AvoGraph
{
    
    public class AvoGraphService : IGraphProductService
    {
        public void DeleteParameter(int ReportConfigParamId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ddlDTOs>> GetMaster(string lMasterlist, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DashboardConfigParamDTO>> GetParameterDetails(int ReportConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DashboardParamsDTO>> GetParameters(int ReportConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddlDTOs>> GetGraphConfigName(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddlDTOs>> GetGraphNameForPermissions(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DataTable> QueryExecution(QueryDTOs queryDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DashboardConfigResonse> SaveConfigParameters(DashboardConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DashboardConfigDTO> UpdateDashboard(DashboardConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
