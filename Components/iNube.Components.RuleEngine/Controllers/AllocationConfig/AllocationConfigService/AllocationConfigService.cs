using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iNube.Components.RuleEngine.Entities.AllocationEntities;
using AutoMapper;
using iNube.Utility.Framework.LogPrivider.LogService;
using iNube.Utility.Framework.Notification;
using static iNube.Components.RuleEngine.Models.ALModels;
using iNube.Utility.Framework.Model;
using iNube.Services.ReInsurance.Helpers;
using Newtonsoft.Json;

namespace iNube.Components.RuleEngine.Controllers.AllocationConfig.AllocationConfigService
{
    public interface IAllocationConfigService
    {
       // List<dynamic> MastertypeData();
        List<ddDTOs> MastertypeData();
        Task<IEnumerable<ddDTOs>> GetAllocationRules(ApiContext apiContext);
        List<string> CheckRuleSets(String EventId, dynamic expression, ApiContext apiContext);
        //Task CheckRuleSets(string eventId, object dynamic, ApiContext context);
    }

    public class AllocationConfigService : IAllocationConfigService
    {
        private MICAALContext _context;
        //  public IIntegrationService _integrationService;
        private IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private ILoggerManager _logger;
        private readonly IEmailService _emailService;
        public AllocationConfigService(MICAALContext context, IMapper mapper, IServiceProvider serviceProvider, ILoggerManager logger, IEmailService emailService)
        {

            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _emailService = emailService;
            _context = context;
            // _integrationService = integrationService;
        }



        //Function implementation


        //public List<dynamic> MastertypeData()
        //{

        //    return null;
        //}
        public List<ddDTOs> MastertypeData()
        {
            var MasterData = _context.TblAllocation
                                                    .Select(x => new ddDTOs
                                                    {
                                                        mID = x.AllocationId,
                                                        mType = "Allocation",
                                                        mValue = x.AllocationName

                                                    }).ToList();
            return MasterData;
        }

        public async Task<IEnumerable<ddDTOs>> GetAllocationRules(ApiContext apiContext)
        {
            // _context = (MICAALContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            IEnumerable<ddDTOs> MasterData;
            MasterData = _context.TblAllocation
                                                   .Select(x => new ddDTOs
                                                   {
                                                       mID = x.AllocationId,
                                                       mType =x.AllocationObj,
                                                       mValue = x.AllocationName

                                                   });
            return MasterData;
        }

        public List<string> CheckRuleSets(String EventId, dynamic expression, ApiContext apiContext)
        {
            HandleExecEvent objEvent = new HandleExecEvent();

            var ruleConditionList = (from tblAlloc in _context.TblAllocation.Where(it => it.AllocationId == Convert.ToDecimal(EventId))
                                     join tblAllocRules in _context.TblAllocationRules on tblAlloc.AllocationId equals tblAllocRules.AllocationId
                                     //    join tblParameter in _context.TblRatingParameters on tblConditions.RatingParameters equals tblParameter.ParametersId

                                     select new
                                     {
                                         AllocationId = tblAlloc.AllocationId,
                                         AllocName = tblAlloc.AllocationName,
                                         AllocObj = tblAlloc.AllocationObj,
                                         Input = tblAllocRules.Input,
                                         Ouput = tblAllocRules.Output,
                                         IsMulti = tblAllocRules.IsMulti
                                     }).ToList();
            List<string> check = new List<string>();
            try
            {
                foreach (var item in ruleConditionList)
                {
                    var inputParameter = (string)expression[item.AllocObj];
                    if (item.Input == inputParameter)
                    {
                        check.Add(item.Ouput);
                    }
                }

                return check;
            }
            catch (Exception ex) {
                return null;

            }


        }
    }
}


