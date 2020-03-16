using iNube.Services.DynamicReports.model;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicReports
{
    public interface IReportProductService
    {
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
        Task<ReportConfigResonse> SaveConfigParameters(ReportConfigDTO reportConfigDTO, ApiContext apiContext);
        Task<IEnumerable<ddDTO>> GetReportConfigName(string lMasterlist, ApiContext apiContext);
        Task<IEnumerable<string>> GetParameters(int ReportConfigId, ApiContext apiContext);
        Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext);
        Task<DataTable> QueryExecution(QueryDTO queryDTO, ApiContext apiContext);
    }
}
