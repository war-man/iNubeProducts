using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using iNube.Services.Policy.Controllers.DynamicReports.IntegrationServices;
using iNube.Services.Policy.RPModels;
//using iNube.Services.UserManagement.Helpers;
using iNube.Services.Policy.Helpers.DynamicReportHelpers;
using iNube.Services.Policy.Entities.DynamicReportEntities;

namespace iNube.Services.Policy.Controllers.DynamicReports.ReportServices.MicaReport
{
    public class MicaReportService : IReportProductService
    {
        private MICARPContext _context;
        private IMapper _mapper;
        private IRPIntegrationService _integrationService;
        private readonly IConfiguration _configuration;

        public MicaReportService(MICARPContext context, IMapper mapper, IRPIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICARPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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

        public async Task<ReportConfigResonse> SaveConfigParameters(ReportConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            try
            {
                _context = (MICARPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

                var dto = _mapper.Map<TblReportConfig>(reportConfigDTO);
                _context.TblReportConfig.Add(dto);
                _context.SaveChanges();
                var paramDto = _mapper.Map<ReportConfigDTO>(dto);
                return new ReportConfigResonse { Status = BusinessStatus.Created, ResponseMessage = "Parameter Configuration Done Successfully!" };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ddDTO>> GetReportConfigName(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICARPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddDTO> obj;
            obj = from pr in _context.TblReportConfig.OrderByDescending(p => p.CreatedDate)
                  select new ddDTO
                  {
                      mID = pr.ReportConfigId,
                      mValue = pr.ReportConfigName,
                      mType = lMasterlist,

                  };
            return obj;
        }

        public async Task<IEnumerable<ReportParamsDTO>> GetParameters(int ReportConfigId, ApiContext apiContext)
        {
            _context = (MICARPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var reportparamList = from tblreportConfig in _context.TblReportConfig
                                  join tblconfigParam in _context.TblReportConfigParam on tblreportConfig.ReportConfigId equals tblconfigParam.ReportConfigId
                                  where tblreportConfig.ReportConfigId == ReportConfigId
                                  select new ReportConfigParamDTO
                                  {
                                      ParameterName = tblconfigParam.ParameterName,
                                      RangeType = tblconfigParam.RangeType,
                                      DataType = tblconfigParam.DataType
                                  };
            List<ReportParamsDTO> AddparamList = new List<ReportParamsDTO>();
            //List<string> typeList = new List<string>();
            foreach(var i in reportparamList)
            {
                if(i.RangeType =="Yes")
                {
                    AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName + "" + "From", DataType = i.DataType });
                    AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName + "" + "To", DataType = i.DataType });
                }

                else
                {
                    AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName , DataType = i.DataType });
                    //typeList.Add(i.ParameterName);
                }

            }
            return AddparamList;
        }
    }
}
