using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using iNube.Services.Policy.Entities.DynamicReportEntites;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using iNube.Services.Policy.Models;
//using iNube.Services.UserManagement.Helpers;
using iNube.Services.Policy.Helpers.DynamicReportHelpers;

namespace iNube.Services.Policy.Controllers.DynamicReports.ReportServices.MicaReport
{
    public class MicaReportService : IReportProductService
    {
        private MICARPContext _context;
        private IMapper _mapper;
        private IRPIntegrationService _integrationService;
        //private readonly IConfiguration _configuration;

        public MicaReportService(MICARPContext context, IMapper mapper, IRPIntegrationService integrationService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            //_configuration = configuration;
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context=(MICARPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
            IEnumerable<ddDTO> ddDTOs;

            ddDTOs = _context.TblRpmasters
             .Select(c => new ddDTO
             {
                 mID = c.MastersId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;

        }

    }
}
