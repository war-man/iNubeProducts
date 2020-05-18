using AutoMapper;
using iNube.Services.Dispatcher.Entities;
using iNube.Services.Dispatcher.Helpers;
using iNube.Utility.Framework.Model;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Controllers.ObjectMapper.ObjectMapperService
{
    public interface IDTObjectMapperService
    {
        Task<dynamic> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext);
        //Task<dynamic> DynamicMapperCheck(dynamic Obj, string mapName, ApiContext apiContext);
    }

    public class ObjectMapperService : IDTObjectMapperService
    {
        private MICADTContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly Func<string, IObjectMapperService> _objectService;

        public ObjectMapperService(Func<string, IObjectMapperService> objectService, IMapper mapper, MICADTContext context,
            IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
            _objectService = objectService;
        }
        public async Task<dynamic> DynamicMapper(dynamic inputModel, string mappingname, ApiContext apiContext)
        {
            return await _objectService(apiContext.ProductType).DynamicMapper(inputModel, mappingname, apiContext);
        }
        //public async Task<dynamic> DynamicMapperCheck(dynamic Obj, string mapName, ApiContext apiContext)
        //{
        //    return await _objectService(apiContext.ProductType).DynamicMapperCheck(Obj, mapName, apiContext);
        //}
    }
}


