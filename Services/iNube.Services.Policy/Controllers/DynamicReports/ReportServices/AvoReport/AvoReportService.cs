using iNube.Services.DynamicReports.model;
using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicReports.ReportServices.AvoReport
{
    public class AvoReportService : IReportProductService
    {
        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext context)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<string>> GetParameters(int ReportConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddDTO>> GetReportConfigName(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddDTO>> GetReportNameForPermissions(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<DataTable> QueryExecution(QueryDTO queryDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<ReportConfigResonse> SaveConfigParameters(ReportConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
