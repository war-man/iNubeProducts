using iNube.Services.Dispatcher.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService.MotorDispatcher
{
    public class MotorDispatcherService: IDispatcherService
    {
        public async Task<IEnumerable<DispatcherParamListDTO>> GetParameterByEvent(string DisptcherName, string Object, string Event, ApiContext Context)
        {
            throw new NotImplementedException();
        }
        public async Task<object> DispatcherEvent(dynamic DispatcherEventObject, string EventType, ApiContext Context)
        {
            throw new NotImplementedException();
        }
        public async Task<DispatcherResponse> CreateDispatcherTask(DispatcherDTO dispatcherDto, ApiContext Context)
        {
            throw new NotImplementedException();
        }
        public async Task<IEnumerable<DispatcherDTO>> GetDispatcherTask(ApiContext Context)  
        {
            throw new NotImplementedException();
        }

        public Task<object> DispatcherEventTask(dynamic DispatcherEventObject, decimal dispatcherId, decimal mapperId, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }

        public async Task<MapperResponse> SaveDynamicMapper(List<MapperDTO> mapperDTOs, ApiContext Context)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DDTO>> GetMasterDispatcher(ApiContext Context)
        {
            throw new NotImplementedException();
        }
    }
}
