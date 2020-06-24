using iNube.Services.DynamicGraph.model;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicGraph
{
    public interface IGraphProductService
    {
        Task<IEnumerable<ddlDTOs>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<DashboardConfigResonse> SaveConfigParameters(DashboardConfigDTO reportConfigDTO, ApiContext apiContext);
        Task<IEnumerable<ddlDTOs>> GetGraphConfigName(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<DashboardParamsDTO>> GetParameters(int ReportConfigId, ApiContext apiContext);
        Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext);
        Task<DataTable> QueryExecution(QueryDTOs queryDTO, ApiContext apiContext);
        Task<IEnumerable<ddlDTOs>> GetGraphNameForPermissions(ApiContext apiContext);
        Task<IEnumerable<DashboardConfigParamDTO>> GetParameterDetails(int ReportConfigId, ApiContext apiContext);
        void DeleteParameter(int ReportConfigParamId, ApiContext apiContext);
        Task<DashboardConfigDTO> UpdateDashboard(DashboardConfigDTO reportConfigDTO, ApiContext apiContext);
        Task<object> GetLabels(int DashboardConfigParamId, ApiContext apiContext);
    }
}
