using AutoMapper;
using iNube.Services.Policy.Controllers.WrapperAPI.IntegrationServices;
using iNube.Services.Policy.Entities.WrapperAPIEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Controllers.WrapperAPI
{
    public interface IWrapperService
    {
      //
    }

    public class WrapperService : IWrapperService
    {
        private MICAWAContext _context;
        private IMapper _mapper;
        private IWAIntegrationService _integrationService;
        //private readonly IConfiguration _configuration;
        private readonly Func<string, IWrapperProductService> _productService;

        public WrapperService(Func<string, IWrapperProductService> productService, MICAWAContext context, IMapper mapper, IWAIntegrationService integrationService)
        {
            _context = context;
            _mapper = mapper;
            _integrationService = integrationService;
            //_configuration = configuration;
            _productService = productService;
        }

        //
    }
}