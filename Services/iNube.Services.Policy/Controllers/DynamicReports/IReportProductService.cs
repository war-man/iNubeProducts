using iNube.Services.Policy.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.DynamicReports
{
    public interface IReportProductService
    {
        Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext);
    }
}
