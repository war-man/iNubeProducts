using AutoMapper;
using iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.IntegrationServices;
using iNube.Services.Dispatcher.Entities;
using iNube.Services.Dispatcher.Helpers;
using iNube.Services.Dispatcher.Models;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService
{
    public interface IDTDispatcherService
    {
        Task<IEnumerable<DispatcherParamListDTO>> GetParameterByEvent(string DisptcherName, string Object, string Event, ApiContext Context);
        Task<object> DispatcherEvent(dynamic DispatcherEventObject, string EventType, ApiContext Context);
        Task<DispatcherResponse> CreateDispatcherTask(DispatcherDTO dispatcherDto, ApiContext apiContext);
        Task<object> DispatcherEventTask(dynamic DispatcherEventObject, decimal dispatcherId, decimal mapperId, ApiContext Context);
        Task<IEnumerable<DispatcherDTO>> GetDispatcherTask(ApiContext Context);
    }

    public class DispatcherService : IDTDispatcherService
    {
        public IIntegrationService _integrationService;
        private MICADTContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IDispatcherService> _objectService;

        public DispatcherService(Func<string, IDispatcherService> objectService, IMapper mapper, MICADTContext context, IIntegrationService integrationService ,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _objectService = objectService;
            _integrationService = integrationService;
        }
        public async Task<IEnumerable<DispatcherParamListDTO>> GetParameterByEvent(string DisptcherName, string Object, string Event, ApiContext Context)
        {
            return await _objectService(Context.ProductType).GetParameterByEvent(DisptcherName, Object, Event,Context);
        }
        public async Task<object> DispatcherEvent(dynamic DispatcherEventObject, string EventType, ApiContext Context)
        {
            return await _objectService(Context.ProductType).DispatcherEvent(DispatcherEventObject, EventType, Context);
        }
        public async Task<DispatcherResponse> CreateDispatcherTask(DispatcherDTO dispatcherDto, ApiContext Context)
        {
            return await _objectService(Context.ProductType).CreateDispatcherTask(dispatcherDto, Context);
        }
        public async Task<object> DispatcherEventTask(dynamic DispatcherEventObject, decimal dispatcherId, decimal mapperId, ApiContext Context)
        {
            return await _objectService(Context.ProductType).DispatcherEventTask(DispatcherEventObject, dispatcherId, mapperId, Context);
        }
        public async Task<IEnumerable<DispatcherDTO>> GetDispatcherTask(ApiContext Context)
        {
            return await _objectService(Context.ProductType).GetDispatcherTask(Context);
        }

    }
}


