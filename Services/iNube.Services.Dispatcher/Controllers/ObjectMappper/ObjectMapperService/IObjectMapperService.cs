using iNube.Services.Dispatcher.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService
{
    public interface IObjectMapperService
    {
        Task<dynamic> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext);
        //Task<dynamic> DynamicMapperCheck(dynamic Obj, string mapName, ApiContext apiContext);
        Task<List<DDTO>> GetMasterDynamicMapper(ApiContext apiContext);
    }
}
