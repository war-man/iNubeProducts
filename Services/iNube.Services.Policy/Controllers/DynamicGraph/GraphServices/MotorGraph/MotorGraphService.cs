using iNube.Services.DynamicGraph.model;
using iNube.Services.DynamicReports.model;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicGraph.GraphServices.MotorGraph
{
    public class MotorGraphService : IGraphProductService
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

        public Task<List<object>> QueryExecution(QueryDTOs queryDTO, ApiContext apiContext)
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
        public async Task<object> GetLabels(int DashboardConfigParamId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
