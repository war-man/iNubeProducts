using AutoMapper;
using iNube.Utility.Framework.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Data;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using iNube.Services.Dispatcher.Entities;
using iNube.Services.Dispatcher.Helpers;
using iNube.Services.Dispatcher.Models;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.IntegrationServices;
using iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService.MicaObjectMapper;

namespace iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.MicaDispatcher
{
    public class MicaDispatcherService : IDispatcherService
    {
        public IIntegrationService _integrationService;
        public MicaObjectMapperService _micaService;
        private MICADTContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IDispatcherService> _ratingService;

        public MicaDispatcherService(Func<string, IDispatcherService> ratingService, IMapper mapper, MICADTContext context, IIntegrationService integrationService, MicaObjectMapperService micaService,
        IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _ratingService = ratingService;
            _integrationService = integrationService;
            _micaService = micaService;
        }

        public async Task<IEnumerable<DispatcherParamListDTO>> GetParameterByEvent(string DisptcherName, string Object, string Event, ApiContext Context)
        {
            //var paramData = from tblDispatcher in _context.TblDispatcher
            //                where (tblDispatcher.DispatcherName == DisptcherName)
            //                join tblDispatcherSet in _context.TblDispatcherSet on tblDispatcher.DispatcherId equals tblDispatcherSet.DispatcherId
            //                where (tblDispatcherSet.Object == Object && tblDispatcherSet.Event == Event)
            //                join tblDispatcherSetDetails in _context.TblDispatcherSetDetails on tblDispatcherSet.DispatcherSetId equals tblDispatcherSetDetails.DispatcherSetId
            //                select new DispatcherParamListDTO
            //                {
            //                    ParameterName = tblDispatcherSetDetails.Parameter
            //                };
            return null;
        }

        public async Task<object> DispatcherEvent(dynamic DispatcherEventObject,string EventType,ApiContext Context)
        {
            //var dispatcherTaskList = _context.TblDispatcher.Include(add => add.TblDispatcherTask).Include("TblDispatcherTask.TblDispatcherTaskDetails");
            var dispatcherTaskList = _context.TblDispatcher.Where(it => it.DispatcherTaskName == EventType).Include(add => add.TblDispatcherTask);

            Dictionary<string, dynamic> dict = new Dictionary<string, dynamic>();
            string OutputObject = "";
            foreach (var item in dispatcherTaskList)
            {
                OutputObject = item.OutputObject;
                foreach (var it in item.TblDispatcherTask)
                {
                    if (it.InputObject == item.InputObject)
                    {
                        var apiCall = await _integrationService.DipatcherApiCall(DispatcherEventObject.TxnObject, it.Api, Context);
                        if (it.OutputTypeObject == "JSONObj")
                        {
                            Type mType = apiCall.GetType();
                            if (mType.Name == "JObject")
                            {
                                var apiCl = JsonConvert.SerializeObject(apiCall);
                                dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());
                                dict.Add(it.OutputObject, jsonApi);
                            }
                            else
                            {
                                var apiCl = JsonConvert.SerializeObject(apiCall[0]);
                                dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());
                                dict.Add(it.OutputObject, jsonApi);
                            }
                        }
                        else
                        {
                            var apiCl = JsonConvert.SerializeObject(apiCall);
                            dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());
                            dict.Add(it.OutputObject, jsonApi);
                        }
                    }
                    else
                    {
                        var apiCall = await _integrationService.DipatcherApiCall(dict[it.InputObject], it.Api, Context);
                        if (it.OutputTypeObject == "JSONObj")
                        {
                            Type mType = apiCall.GetType();
                            if (mType.Name == "JObject")
                            {
                                var apiCl = JsonConvert.SerializeObject(apiCall);
                                dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());
                                dict.Add(it.OutputObject, jsonApi);
                            }
                            else
                            {
                                var apiCl = JsonConvert.SerializeObject(apiCall[0]);
                                dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());
                                dict.Add(it.OutputObject, jsonApi);
                            }
                        }
                        else
                        {
                            var apiCl = JsonConvert.SerializeObject(apiCall);
                            dynamic jsonApi = JsonConvert.DeserializeObject<dynamic>(apiCl.ToString());
                            dict.Add(it.OutputObject, jsonApi);
                        }
                    }
                }
            }
            return dict[OutputObject];
        }
    }
}
