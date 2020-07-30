
using iNube.Services.Dispatcher.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService.AvoObjectMapper
{
    public class AvoObjectMapperService : IObjectMapperService
    {

        public async Task<dynamic> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
        //public async Task<dynamic> DynamicMapperCheck(dynamic Obj, string mapName, ApiContext apiContext)
        //{
        //    throw new NotImplementedException();
        //}
       

        public async Task<List<DDTO>> GetMasterDynamicMapper(ApiContext apiContext)
        {
            throw new NotImplementedException();
        }
    }
}
