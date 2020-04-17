using AutoMapper;
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

namespace iNube.Services.Policy.Controllers.DynamicReports.ReportServices.AvoReport
{
    public class AvoReportService : IReportProductService
    {
        private AVORPContext _context;
        private IMapper _mapper;
        private IRPIntegrationService _integrationService;
        private readonly IConfiguration _configuration;

        public AvoReportService(AVORPContext context, IMapper mapper, IRPIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }

        public async Task<IEnumerable<ddDTO>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
                _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

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
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
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
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            // HandleEvent objEvent = new HandleEvent();

            var reportparamList = from tblreportConfig in _context.TblReportConfig
                                  join tblconfigParam in _context.TblReportConfigParam on tblreportConfig.ReportConfigId equals tblconfigParam.ReportConfigId
                                  where tblreportConfig.ReportConfigId == ReportConfigId
                                  select new ReportConfigParamDTO
                                  {
                                      ParameterName = tblconfigParam.ParameterName,
                                      RangeType = tblconfigParam.RangeType,
                                      DataType = tblconfigParam.DataType
                                  };
            //List<ReportParamsDTO> AddparamList = new List<ReportParamsDTO>();
            List<ReportParamsDTO> lstParams = new List<ReportParamsDTO>();
            ReportParamsDTO param = null;
            foreach (var i in reportparamList)
            {
                param = new ReportParamsDTO();
                if (i.RangeType == "Yes")
                {
                    //AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName + "" + "From", DataType = i.DataType });
                    //AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName + "" + "To", DataType = i.DataType });
                    param = new ReportParamsDTO { ParameterName = i.ParameterName + "From", DataType = i.DataType, RangeType = i.RangeType };
                    lstParams.Add(param);
                    param = new ReportParamsDTO { ParameterName = i.ParameterName + "To", DataType = i.DataType, RangeType = i.RangeType };
                    lstParams.Add(param);
                }

                else
                {
                    param = new ReportParamsDTO { ParameterName = i.ParameterName, DataType = i.DataType, RangeType = i.RangeType };
                    lstParams.Add(param);
                }

            }
            //return AddparamList;
            return lstParams;
        }

        public async Task<string> GetQueryById(int ReportConfigId, ApiContext apiContext)
        {
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var queryData = _context.TblReportConfig.SingleOrDefault(x => x.ReportConfigId == ReportConfigId).Query;
            return queryData;
        }

        public async Task<DataTable> QueryExecution(QueryDTO queryDTO, ApiContext apiContext)
        {
            //_context = (MICARPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

            //var connectionString = _configuration.GetConnectionString("PCConnection");
            var dbConnectionString = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
            var connectionString = dbConnectionString.Dbconnection;
            var query = await GetQueryById(queryDTO.ReportConfigId, apiContext);
            //var query = "select * from [CM].[tblClaimInsurable] where ClaimId=@ClaimId and Name=@Name";
            // var query = "select * from [CM].[tblClaimInsurable] where ClaimId='335' ";
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    //connection.Open();
                    SqlCommand command = new SqlCommand(query, connection);
                    command.CommandType = CommandType.Text;
                    foreach (var item in queryDTO.paramList)
                    {
                        command.Parameters.AddWithValue("@" + item.ParameterName, item.ParameterValue);
                    }

                    DataSet ds = new DataSet();
                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    adapter.Fill(ds, "Query");
                    connection.Close();
                    return ds.Tables[0];
                }
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }

        public async Task<IEnumerable<ddDTO>> GetReportNameForPermissions(ApiContext apiContext)
        {
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddDTO> obj;
            obj = from pr in _context.TblReportConfig.OrderByDescending(p => p.CreatedDate)
                  select new ddDTO
                  {
                      mID = pr.ReportConfigId,
                      mValue = pr.ReportConfigName,
                      // mType = lMasterlist,

                  };
            return obj;
        }

        public async Task<IEnumerable<ReportConfigParamDTO>> GetParameterDetails(int ReportConfigId, ApiContext apiContext)
        {
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var reportparamList = from tblreportConfig in _context.TblReportConfig
                                  join tblconfigParam in _context.TblReportConfigParam on tblreportConfig.ReportConfigId equals tblconfigParam.ReportConfigId
                                  where tblreportConfig.ReportConfigId == ReportConfigId
                                  select new ReportConfigParamDTO
                                  {
                                      ParameterName = tblconfigParam.ParameterName,
                                      RangeType = tblconfigParam.RangeType,
                                      DataType = tblconfigParam.DataType,
                                      ReportConfigParamId = tblconfigParam.ReportConfigParamId,
                                      ReportConfigId = (int)tblconfigParam.ReportConfigId
                                  };
            var _reportparamList = _mapper.Map<IEnumerable<ReportConfigParamDTO>>(reportparamList);
            return _reportparamList;
        }

        public async void DeleteParameter(int ReportConfigParamId, ApiContext apiContext)
        {
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var delete_param = _context.TblReportConfigParam.Find(ReportConfigParamId);
            if (delete_param != null)
            {
                _context.TblReportConfigParam.Remove(delete_param);
                _context.SaveChanges();
            }
        }

        public async Task<ReportConfigDTO> UpdateReport(ReportConfigDTO reportConfigDTO, ApiContext apiContext)
        {
            _context = (AVORPContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var report = _mapper.Map<TblReportConfig>(reportConfigDTO);
                var configData = _context.TblReportConfig.Find(report.ReportConfigId);

                if (configData == null)
                {
                    throw new ApplicationException("Record Not Found");
                }
                configData.Query = reportConfigDTO.Query;
                configData.ModifiedDate = DateTime.Now;
                configData.IsActive = true;
                //configData.TblReportConfigParam = reportConfigDTO.TblReportConfigParam;
                _context.TblReportConfig.Update(configData);
                _context.SaveChanges();

                var _configData = _mapper.Map<ReportConfigDTO>(configData);
                return _configData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
