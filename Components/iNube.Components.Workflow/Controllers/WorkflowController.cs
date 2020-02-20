using AutoMapper;
using iNube.Components.Workflow.Entities;
using iNube.Components.Workflow.Helpers;
using iNube.Components.Workflow.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Components.Workflow.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkflowController : ControllerBase
    {
        private IWorkflowServices _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public WorkflowController(
            IWorkflowServices userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        
        [HttpGet]
        public IActionResult GetAllWfprocess()
        {
            var tblwfprocess = _userService.GetAllWfprocess();
            var tblwfprocessDtos = _mapper.Map<IList<WfProcessDto>>(tblwfprocess);
            return Ok(tblwfprocessDtos);
        }


        [HttpGet("{WfprocessId}")]
        public IActionResult GetAllWfstage(decimal WfprocessId)
        {
            var tblwfstage = _userService.GetAllWfstage(WfprocessId);
            var tblwfstageDtos = _mapper.Map<IList<WfStageDto>>(tblwfstage);
            return Ok(tblwfstageDtos);
        }

        
        [HttpGet]
        public IActionResult GetAllWfstageflow()
        {
            var tblwfstageflow = _userService.GetAllWfstageflow();
            var tblwfstageflowDtos = _mapper.Map<IList<WfStageFlowDto>>(tblwfstageflow);
            return Ok(tblwfstageflowDtos);
        }

        
        [HttpGet("{WfstageId}")]
        public IActionResult GetAllWfstageStatus(decimal WfstageId)
        {
            var tblwfstagestatus = _userService.GetAllWfstageStatus(WfstageId);
            var tblwfstagestatusDtos = _mapper.Map<IList<WfStageStatusDto>>(tblwfstagestatus);
            return Ok(tblwfstagestatusDtos);
        }

        
        [HttpGet]
        public IActionResult GetAllWfstatusflow()
        {
            var tblwfstatusflow = _userService.GetAllWfstatusflow();
            var tblstatusflowDtos = _mapper.Map<IList<WfStatusFlowDto>>(tblwfstatusflow);
            return Ok(tblstatusflowDtos);
        }


    
        [HttpGet]
        public IActionResult GetAllWorkflow()
        {
            var tblworkflow = _userService.GetAllWorkflow();
            var tblworkflowDtos = _mapper.Map<IList<WorkflowDto>>(tblworkflow);
            return Ok(tblworkflowDtos);
        }

    
        [HttpGet("{WorkflowId}")]
        public IActionResult GetAllWorkflowHistory(decimal WorkflowId)
        {
            var tblworkflowhistory = _userService.GetAllWorkflowHistory(WorkflowId);
            var tblworkflowhistoryDtos = _mapper.Map<IList<WfHistoryDto>>(tblworkflowhistory);
            return Ok(tblworkflowhistoryDtos);
        }


        
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWfprocess([FromBody]WfProcessDto tblWfprocessDto)
        {
            // map dto to entity
            var tbl_wfprocess = _mapper.Map<TblWfprocess>(tblWfprocessDto);
            try
            {
                // save 
                _userService.CreateWfprocess(tbl_wfprocess);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //update workflow process using id
        [HttpPut]
        public IActionResult UpdateWfprocess(int id, [FromBody]WfProcessDto tblWfprocessDto)
        {
            // map dto to entity and set id
            var tbl_wfprocess = _mapper.Map<TblWfprocess>(tblWfprocessDto);
            tbl_wfprocess.WfprocessId = id;

            try
            {
                // save 
                _userService.UpdateWfprocess(tbl_wfprocess);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

     
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWfstage([FromBody]WfStageDto tblstageDto)
        {
            // map dto to entity
            var tbl_stageDto = _mapper.Map<TblWfstage>(tblstageDto);

            try
            {
                // save 
                _userService.CreateWfstage(tbl_stageDto);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

     
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWfstageflow([FromBody]WfStageFlowDto tblstageflowDto)
        {
            // map dto to entity
            var tbl_stageflow = _mapper.Map<TblWfstageflow>(tblstageflowDto);

            try
            {
                // save 
                _userService.CreateWfstageflow(tbl_stageflow);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWfstageStatus([FromBody]WfStageStatusDto tblstagestatusDto)
        {
            // map dto to entity
            var tbl_stagestatus = _mapper.Map<TblWfstageStatus>(tblstagestatusDto);
            try
            {
                // save 
                _userService.CreateWfstageStatus(tbl_stagestatus);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }


       

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWfstatusflow([FromBody]WfStatusFlowDto tblstatusflowDto)
        {
            // map dto to entity
            var tbl_statusflow = _mapper.Map<TblWfstatusflow>(tblstatusflowDto);
            try
            {
                // save 
                _userService.CreateWfstatusflow(tbl_statusflow);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

      
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWorkflow([FromBody]WorkflowDto tblworkflowDto)
        {
            // map dto to entity
            var tbl_workflow = _mapper.Map<TblWorkflow>(tblworkflowDto);
            try
            {
                // save 
                _userService.CreateWorkflow(tbl_workflow);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

     
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateWorkflowHistory([FromBody]WfHistoryDto tblworkflowhistoryDto)
        {
            // map dto to entity
            var tbl_workflowhistory = _mapper.Map<TblWorkflowHistory>(tblworkflowhistoryDto);
            try
            {
                // save
                _userService.CreateWorkflowHistory(tbl_workflowhistory);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
