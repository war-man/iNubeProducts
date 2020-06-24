using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Configuration;

using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using iNube.Services.Policy.Controllers.DynamicGraph.IntegrationServices;
using iNube.Services.Policy.Models;
//using iNube.Services.UserManagement.Helpers;
using iNube.Services.Policy.Helpers.DynamicDBHelpers;
using iNube.Services.Policy.Entities.DynamicGraphEntities;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;
using iNube.Services.DynamicGraph.model;
using Newtonsoft.Json;
using System.Reflection;
using iNube.Utility.Framework.Core.Helpers;
using System.Collections;

namespace iNube.Services.Policy.Controllers.DynamicGraph.GraphServices.MicaGraph
{
    public class MicaGraphService : IGraphProductService
    {
        private MICADBContext _context;
        private IMapper _mapper;
        private IDBIntegrationService _integrationService;
        private readonly IConfiguration _configuration;

        public MicaGraphService(MICADBContext context, IMapper mapper, IDBIntegrationService integrationService, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            _configuration = configuration;
        }

        public async Task<IEnumerable<ddlDTOs>> GetMaster(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddlDTOs> ddDTOs;

            ddDTOs = _context.TblDbmasters
             .Select(c => new ddlDTOs
             {
                 mID = c.MastersId,
                 mValue = c.Value,
                 mType = c.MasterType
             });
            return ddDTOs;
        }

        public async Task<DashboardConfigResonse> SaveConfigParameters(DashboardConfigDTO dashboardConfigDTO, ApiContext apiContext)
        {
            try
            {
                _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

                var dto = _mapper.Map<TblDashboardConfig>(dashboardConfigDTO);
               
                //To store as Json
                AxisDetailsDTO axisDetailsDTO = new AxisDetailsDTO();
                axisDetailsDTO.XAxisLable = dashboardConfigDTO.AxisDetailsDTO.XAxisLable;
                axisDetailsDTO.YAxisLable = dashboardConfigDTO.AxisDetailsDTO.YAxisLable;
                axisDetailsDTO.ChartType = dashboardConfigDTO.AxisDetailsDTO.ChartType;
                axisDetailsDTO.Title = dashboardConfigDTO.AxisDetailsDTO.Title;

                string output = JsonConvert.SerializeObject(axisDetailsDTO);
                dto.AxisDetails = output;

                _context.TblDashboardConfig.Add(dto);
                _context.SaveChanges();
                var paramDto = _mapper.Map<DashboardConfigDTO>(dto);
                return new DashboardConfigResonse { Status = BusinessStatus.Created, ResponseMessage = "Parameter Configuration Done Successfully!" };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ddlDTOs>> GetGraphConfigName(string lMasterlist, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddlDTOs> obj;
            obj = from pr in _context.TblDashboardConfig.OrderByDescending(p => p.CreatedDate)
                  select new ddlDTOs
                  {
                      mID = pr.DashboardConfigId,
                      mValue = pr.DashboardConfigName,
                      mType = lMasterlist,

                  };
            return obj;
        }

        public async Task<IEnumerable<DashboardParamsDTO>> GetParameters(int dashboardConfigId, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            // HandleEvent objEvent = new HandleEvent();

            var dashboardparamList = from tbldashboardConfig in _context.TblDashboardConfig
                                  join tblconfigParam in _context.TblDashboardConfigParam on tbldashboardConfig.DashboardConfigId equals tblconfigParam.DashboardConfigId
                                  where tbldashboardConfig.DashboardConfigId == dashboardConfigId
                                  select new DashboardConfigParamDTO
                                  {
                                      ParameterName = tblconfigParam.ParameterName,
                                      RangeType = tblconfigParam.RangeType,
                                      DataType = tblconfigParam.DataType
                                  };
            //List<ReportParamsDTO> AddparamList = new List<ReportParamsDTO>();
            List<DashboardParamsDTO> lstParams = new List<DashboardParamsDTO>();
            DashboardParamsDTO param = null;
            foreach (var i in dashboardparamList)
            {
                param = new DashboardParamsDTO();
                if (i.RangeType == "Yes")
                {
                    //AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName + "" + "From", DataType = i.DataType });
                    //AddparamList.Add(new ReportParamsDTO { ParameterName = i.ParameterName + "" + "To", DataType = i.DataType });
                    param = new DashboardParamsDTO { ParameterName = i.ParameterName + "From", DataType = i.DataType, RangeType = i.RangeType };
                    lstParams.Add(param);
                    param = new DashboardParamsDTO { ParameterName = i.ParameterName + "To", DataType = i.DataType, RangeType = i.RangeType };
                    lstParams.Add(param);
                }

                else
                {
                    param = new DashboardParamsDTO { ParameterName = i.ParameterName, DataType = i.DataType, RangeType = i.RangeType };
                    lstParams.Add(param);
                }

            }
            //return AddparamList;
            return lstParams;
        }

        public async Task<string> GetQueryById(int dashboardConfigId, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var queryData = _context.TblDashboardConfig.SingleOrDefault(x => x.DashboardConfigId == dashboardConfigId).Query;
            return queryData;
        }

        public async Task<DataTable> QueryExecution(QueryDTOs queryDTO, ApiContext apiContext)
        {
            //_context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType,_configuration));

            //var connectionString = _configuration.GetConnectionString("PCConnection");
            var dbConnectionString = await _integrationService.GetEnvironmentConnection(apiContext.ProductType, Convert.ToDecimal(apiContext.ServerType));
            var connectionString = dbConnectionString.Dbconnection;
            var query = await GetQueryById(queryDTO.dashboardConfigId, apiContext);
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
                    var data= ds.Tables[0];
                    List<object> ReturnData = new List<object>();
                    return data;
                }
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }

        public async Task<IEnumerable<ddlDTOs>> GetGraphNameForPermissions(ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            IEnumerable<ddlDTOs> obj;
            obj = from pr in _context.TblDashboardConfig.OrderByDescending(p => p.CreatedDate)
                  select new ddlDTOs
                  {
                      mID = pr.DashboardConfigId,
                      mValue = pr.DashboardConfigName,
                      // mType = lMasterlist,

                  };
            return obj;
        }

        public async Task<IEnumerable<DashboardConfigParamDTO>> GetParameterDetails(int dashboardConfigId, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            var dashboardparamList = from tbldashboardConfig in _context.TblDashboardConfig
                                  join tblconfigParam in _context.TblDashboardConfigParam on tbldashboardConfig.DashboardConfigId equals tblconfigParam.DashboardConfigId
                                  where tbldashboardConfig.DashboardConfigId == dashboardConfigId
                                  select new DashboardConfigParamDTO
                                  {
                                      ParameterName = tblconfigParam.ParameterName,
                                      RangeType = tblconfigParam.RangeType,
                                      DataType = tblconfigParam.DataType,
                                      DashboardConfigParamId = tblconfigParam.DashboardConfigParamId,
                                      DashboardConfigId = (int)tblconfigParam.DashboardConfigId
                                  };
            var _dashboardparamList = _mapper.Map<IEnumerable<DashboardConfigParamDTO>>(dashboardparamList);
            return _dashboardparamList;
        }

        public async void DeleteParameter(int dashboardConfigParamId, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));
            var delete_param = _context.TblDashboardConfigParam.Find(dashboardConfigParamId);
            if (delete_param != null)
            {
                _context.TblDashboardConfigParam.Remove(delete_param);
                _context.SaveChanges();
            }
        }

        public async Task<DashboardConfigDTO> UpdateDashboard(DashboardConfigDTO dashboardConfigDTO, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            try
            {
                var report = _mapper.Map<TblDashboardConfig>(dashboardConfigDTO);
                var configData = _context.TblDashboardConfig.Find(report.DashboardConfigId);

                if (configData == null)
                {
                    throw new ApplicationException("Record Not Found");
                }
                configData.Query = dashboardConfigDTO.Query;
                configData.ModifiedDate = DateTime.Now;
                configData.IsActive = true;
                //configData.TblReportConfigParam = reportConfigDTO.TblReportConfigParam;
                _context.TblDashboardConfig.Update(configData);
                _context.SaveChanges();

                var _configData = _mapper.Map<DashboardConfigDTO>(configData);
                return _configData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }

        public async Task<object> GetLabels(int dashboardConfigId, ApiContext apiContext)
        {
            _context = (MICADBContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType, _configuration));

            // var axeslabels = _context.TblDashboardConfig.Where(a => a.DashboardConfigId == dashboardConfigId).FirstOrDefault();
            //labelsDTO labelsDTO = new labelsDTO();
            //labelsDTO.Xaxis = axeslabels.XaxisLable;
            //labelsDTO.Yaxis = axeslabels.YaxisLable;
            // var labels = _mapper.Map<DashboardConfigDTO>(axeslabels);

            // var data = labels.axis;
            //return labels;

            // var axeslabels = _context.TblDashboardConfig.FirstOrDefault(a => a.DashboardConfigId == dashboardConfigId);
            var data = _context.TblDashboardConfig.Where(a => a.DashboardConfigId == dashboardConfigId).Select(add => add.AxisDetails).ToList();
            // var data = _context.TblDashboardConfig.FirstOrDefault(a => a.DashboardConfigId == dashboardConfigId).AxisDetails;
            // var labels = _mapper.Map<DashboardConfigDTO>(axeslabels);
            //  data.Select(a=>)
           // List<object> Obj1AsObjects = data[0].Cast<object>().ToList();

            //string output = JsonConvert.SerializeObject(Obj1AsObjects[0]);
            //var json = JsonConvert.DeserializeObject<object>(axeslabels.AxisDetails.ToString());
            


            //var info =  json.GetType().GetProperty("XAxisLable");
            //var c = info.GetValue(json, null);

            var axisLabel = _context.TblDashboardConfig.Where(a => a.DashboardConfigId == dashboardConfigId).FirstOrDefault();
            var json = JsonConvert.DeserializeObject<object>(axisLabel.AxisDetails.ToString());
            return json;
            

        }
    }
}
