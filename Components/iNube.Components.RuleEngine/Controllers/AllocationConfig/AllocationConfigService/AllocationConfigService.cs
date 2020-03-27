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
        // Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(decimal paramid, ApiContext apiContext);
        Task<List<HandleModel>> GetRateRule(decimal paramid, ApiContext apiContext);
        Task<AllocParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext);
        //Task<AllocationDTO> CreateAllocationRules(AllocationDTO allocDto, ApiContext apiContext);
        Task<AllocationResponse> CreateAllocationRules(AllocationDTO allocDto, ApiContext apiContext);

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
                                                       mType = x.AllocationObj,
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
                data = _context.TblAllocationParameters
                          .Select(x => new ParameterSetDataDTO
                          {
                              mID = x.AllocParametersId,
                              //mType = x.AllocParamName,
                              //mValue = x.Type
                              mType = x.Type,
                              mValue = x.AllocParamName
                          });
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AllocParamSetResponce> CreateParamSet(ParameterSetDTO paramSetDto, ApiContext apiContext)
        {
            // _context = (MICARTContext)(await DbManager.GetContextAsync(apiContext.ProductType, apiContext.ServerType));


            try
            {
                var dto = _mapper.Map<TblAllocationParameters>(paramSetDto);
                _context.TblAllocationParameters.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<ParameterSetDTO>(dto);
                // return acntDTO;
                return new AllocParamSetResponce { Status = BusinessStatus.Created, ResponseMessage = $"Configuration of Parameter Succesfully Done! \n Allocation Config Name: {acntDTO.AllocParamName}" };
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        //        public async Task<IEnumerable<GetParamSetDetailDTO>> GetRateRule(decimal paramid,ApiContext apiContext)
        //        {
        //           try { 
        //            var Rate_list = (from tblAllocParam in _context.TblAllocationParameters where tblAllocParam.AllocParametersId == paramid
        //                             join tblAllocParSet in _context.TblAllocParameterSet on tblAllocParam.AllocParametersId equals tblAllocParSet.AllocParametersId
        //                             join tblAllocParSetDet in _context.TblAllocParameterSetDetails on tblAllocParam.AllocParametersId equals tblAllocParSetDet.AllocParametersId
        //                             select new GetParamSetDetailDTO
        //                                     {


        //                                 AllocParamSetID = tblAllocParSet.AllocParametersId,
        //                                 AllocParametersID = tblAllocParam.AllocParametersId,

        //                                 Type = tblAllocParam.Type,
        //                                 Input = tblAllocParSet.Input,
        //                                 Output = tblAllocParSetDet.Output,

        //                             }).ToList();



        //            var data = "";
        //            return Rate_list;
        //        }
        //            catch (Exception ex)
        //            {
        //                throw ex;
        //            }
        //}
        public async Task<List<HandleModel>> GetRateRule(decimal paramid, ApiContext apiContext)
        {
            try
            {
                // Dictionary<decimal?, String> dict = new Dictionary<decimal?, string>();
                //  Dictionary<string, string> dict = new Dictionary<string, string>();
                var InputParam = (from tblInput in _context.TblAllocParameterSet
                                  where tblInput.AllocParametersId == paramid

                                  select new
                                  {
                                      Inputval = tblInput.Input,
                                      InputId = tblInput.AllocParametersId

                                  }).ToList();
                var OutputParam = (from tblOutput in _context.TblAllocParameterSetDetails
                                   where tblOutput.AllocParametersId == paramid
                                   select new
                                   {
                                       Outputval = tblOutput.Output,
                                       OutputId = tblOutput.AllocParametersId
                                   }).ToList();

                List<HandleModel> check = new List<HandleModel>();
                foreach (var item in InputParam)
                {
                    HandleModel obj = new HandleModel();
                    obj.AllocParametersID = item.InputId;
                    obj.Parameter = item.Inputval;

                    check.Add(obj);
                    // check.Add(item.InputId, item.Inputval);


                }
                foreach (var item in OutputParam)
                {
                    HandleModel obj = new HandleModel();
                    obj.AllocParametersID = item.OutputId;
                    obj.Parameter = item.Outputval;
                    check.Add(obj);
                }


                //var data = "";
                return check;
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
            catch (Exception ex)
            {
                return null;

            }


        }

        //Alloc Rule Post
        public async Task<AllocationResponse> CreateAllocationRules(AllocationDTO allocDto, ApiContext apiContext)
        {
            var name = _context.TblAllocParameterSet.Where(x => x.AllocParametersId == Convert.ToInt32(allocDto.AllocationObj)).Select(x => x.Input).Single();


            try
            {
                var dto = _mapper.Map<TblAllocation>(allocDto);
                dto.AllocationObj = name;


                _context.TblAllocation.Add(dto);
                _context.SaveChanges();
                var acntDTO = _mapper.Map<AllocationDTO>(dto);
                return new AllocationResponse { Status = BusinessStatus.Created, ResponseMessage = $"Allocation Conditions Succesfully Done! \n Alloc Config Name: {acntDTO.AllocationId}" };
                // return acntDTO;
            }
            catch (Exception ex)
            {

            }



            return null;
        }

    }
}


