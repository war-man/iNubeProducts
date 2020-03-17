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
        dynamic CheckRuleSets(String EventId, dynamic expression, ApiContext apiContext);
        Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet(ApiContext apiContext);
        Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(decimal paramid, ApiContext apiContext);
        Task<ParameterSetDTO> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext);
        Task<AllocationDTO> CreateAllocationRules(AllocationDTO allocDto, ApiContext apiContext);



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
        public async Task<IEnumerable<ParameterSetDataDTO>> GetParameterSet(ApiContext apiContext)
        {
            //_context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));

            try
            {
                IEnumerable<ParameterSetDataDTO> data;
                 data =  _context.TblAllocationParameters
                           .Select( x => new ParameterSetDataDTO
                           {
                               mID = x.AllocParametersId,
                               mType = x.AllocParamName,
                               mValue = x.Type
                           });
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
      
        public async Task<ParameterSetDTO> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext)
        {
            // _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));
          

            try
            {
                var dto = _mapper.Map<TblAllocationParameters>(paramSetDto);
                _context.TblAllocationParameters.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<ParameterSetDTO>(dto);
                return acntDTO;
                // return new ParamSetResponce { Status = BusinessStatus.Created, ResponseMessage = $"Configuration of Parameter Succesfully Done! \n Allocation Config Name: {acntDTO.ParameterSetName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        public async Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(decimal paramid,ApiContext apiContext)
        {
           try { 
            var Rate_list = (from tblAllocParam in _context.TblAllocationParameters where tblAllocParam.AllocParametersId == paramid
                             join tblAllocParSet in _context.TblAllocParameterSet on tblAllocParam.AllocParametersId equals tblAllocParSet.AllocParametersId
                             join tblAllocParSetDet in _context.TblAllocParameterSetDetails on tblAllocParSet.AllocParamSetId equals tblAllocParSetDet.AllocParamSetId
                             select new GetParamSetDetailDTO
                                     {


                                 AllocParamSetID = tblAllocParSet.AllocParamSetId,
                                 AllocParametersID = tblAllocParam.AllocParametersId,
                                 Type = tblAllocParam.Type,
                                 Input = tblAllocParSet.Input,
                                 Output = tblAllocParSetDet.Output,
                          
                             }).ToList();



            var data = "";
            return Rate_list;
        }
            catch (Exception ex)
            {
                throw ex;
            }
}
       
        public dynamic CheckRuleSets(String EventId, dynamic expression, ApiContext apiContext)
        {
            HandleExecEvent objEvent = new HandleExecEvent();

            var ruleConditionList = (from tblAlloc in _context.TblAllocation.Where(it => it.AllocationId == Convert.ToDecimal(EventId))
                                     join tblAllocRules in _context.TblAllocationRules on tblAlloc.AllocationId equals tblAllocRules.AllocationId
                                     //    join tblParameter in _context.TblAllocationParameters on tblConditions.RatingParameters equals tblParameter.ParametersId

                                     select new
                                     {
                                         AllocationId = tblAlloc.AllocationId,
                                         AllocName = tblAlloc.AllocationName,
                                         AllocObj = tblAlloc.AllocationObj,
                                         Input = tblAllocRules.Input,
                                         Ouput = tblAllocRules.Output,
                                         IsMulti = tblAllocRules.IsMulti
                                        
                                     }).ToList();
           // var val = JsonConvert.DeserializeObject<dynamic>(ruleConditionList.ToString());
            List<object> check = new List<object>();
            try
            {
                foreach (var item in ruleConditionList)
                {
                    var c = item.Input;
                    var inputParameter = expression[item.AllocObj].ToString();

                    if (item.Input == inputParameter)
                    {
                        //  List<object> Obj1AsObjects = .Cast<object>().ToList();
                        var Obj1AsObjects = JsonConvert.DeserializeObject<dynamic>(item.Ouput);
                        check.Add(Obj1AsObjects);
                        
                    }
                }
                

                return check[0];
            }
            catch (Exception ex) {
                return null;

            }


        }

        //Alloc Rule Post
        public async Task<AllocationDTO> CreateAllocationRules(AllocationDTO allocDto, ApiContext apiContext)
        {
             var name = _context.TblAllocParameterSet.Where(x => x.AllocParamSetId == Convert.ToInt32(allocDto.AllocationObj)).Select(x => x.Input).Single();


            try
            {
                    var dto = _mapper.Map<TblAllocation>(allocDto);
                dto.AllocationObj = name;


                    _context.TblAllocation.Add(dto);
                    _context.SaveChanges();
                    var acntDTO = _mapper.Map<AllocationDTO>(dto);
                //  return new RatingRulesResponse { Status = BusinessStatus.Created, ResponseMessage = $"Rules Conditions Succesfully Done! \n Rating Config Name: {acntDTO.RatingId}" };
                return acntDTO;
            }
                catch (Exception ex)
                {

                }

            

            return null;
        }

    }
}


