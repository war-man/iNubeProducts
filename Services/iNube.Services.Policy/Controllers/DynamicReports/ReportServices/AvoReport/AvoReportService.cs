using iNube.Services.Policy.RPModels;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
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

        public Task<IEnumerable<ReportParamsDTO>> GetParameters(int ReportConfigId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ddDTO>> GetReportConfigName(string lMasterlist, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public Task<ReportConfigResonse> SaveConfigParameters(ReportConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
