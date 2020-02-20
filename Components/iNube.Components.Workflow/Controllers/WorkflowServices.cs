using iNube.Components.Workflow.Entities;
using iNube.Components.Workflow.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Components.Workflow.Controllers
{
    public interface IWorkflowServices
    {
        
        IEnumerable<TblWfprocess> GetAllWfprocess();
        TblWfprocess CreateWfprocess(TblWfprocess tblwfprocess);
        void UpdateWfprocess(TblWfprocess tblwfprocess);

         
        IEnumerable<TblWfstage> GetAllWfstage(decimal WfprocessId);
        TblWfstage CreateWfstage(TblWfstage tblwfstage);

     
        IEnumerable<TblWfstageflow> GetAllWfstageflow();
        TblWfstageflow CreateWfstageflow(TblWfstageflow tblwfstageflow);

        
        IEnumerable<TblWfstageStatus> GetAllWfstageStatus(decimal WfstageId);
        TblWfstageStatus CreateWfstageStatus(TblWfstageStatus tblwfstagestatus);

       
        IEnumerable<TblWfstatusflow> GetAllWfstatusflow();
        TblWfstatusflow CreateWfstatusflow(TblWfstatusflow tblwfstatusflow);

    
        IEnumerable<TblWorkflow> GetAllWorkflow();
        TblWorkflow CreateWorkflow(TblWorkflow tblworkflow);

        
        IEnumerable<TblWorkflowHistory> GetAllWorkflowHistory(decimal WorkflowId);
        TblWorkflowHistory CreateWorkflowHistory(TblWorkflowHistory tblworkflowhistory);


    }

    public class WorkflowServices : IWorkflowServices
    {
        private WorkflowContext _context;

        public WorkflowServices(WorkflowContext context)
        {
            _context = context;
        }


        
        public IEnumerable<TblWfprocess> GetAllWfprocess()
        {
            return _context.TblWfprocess;
        }

        
        public TblWfprocess CreateWfprocess(TblWfprocess tblwfprocess)
        {
            try
            {
                _context.TblWfprocess.Add(tblwfprocess);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return tblwfprocess;
        }

        
        public void UpdateWfprocess(TblWfprocess tblwfprocess)
        {
            var tbl_wfprocess = _context.TblWfprocess.Find(tblwfprocess.WfprocessId);

            if (tbl_wfprocess == null)
                throw new AppException("Workflow not found");

            if (tblwfprocess.WfprocessId != tblwfprocess.WfprocessId)
            {
                // username has changed so check if the new username is already taken
                if (_context.TblWfprocess.Any(x => x.WfprocessId == tblwfprocess.WfprocessId))
                    throw new AppException("WorkflowID " + tblwfprocess.WfprocessId + " is already taken");
            }

            // update user properties
            tbl_wfprocess.Wfname = tblwfprocess.Wfname;
            

            _context.TblWfprocess.Update(tbl_wfprocess);
            _context.SaveChanges();
        }



        public IEnumerable<TblWfstage> GetAllWfstage(decimal WfprocessId)
        {
            var tbl_wfstage = _context.TblWfstage.Where(p=> p.WfprocessId == WfprocessId).ToList();

            if (tbl_wfstage == null)
                throw new AppException("Workflow not found");
            return tbl_wfstage;
        }
        

        
        public TblWfstage CreateWfstage(TblWfstage tblwfstage)
        {
            try
            {
                _context.TblWfstage.Add(tblwfstage);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return tblwfstage;
        }


        
        public IEnumerable<TblWfstageflow> GetAllWfstageflow()
        {
            return _context.TblWfstageflow;
        }

        public TblWfstageflow CreateWfstageflow(TblWfstageflow tblwfstageflow)
        {
            try
            {
                _context.TblWfstageflow.Add(tblwfstageflow);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }


            return tblwfstageflow;
        }



       
        public IEnumerable<TblWfstageStatus> GetAllWfstageStatus(decimal WfstageId)
        {
            var tbl_wfstagestatus = _context.TblWfstageStatus.Where(p => p.WfstageId == WfstageId).ToList();

            if (tbl_wfstagestatus == null)
                throw new AppException("Workflow not found");
            return tbl_wfstagestatus;
        }

        
        public TblWfstageStatus CreateWfstageStatus(TblWfstageStatus tblwfstagestatus)
        {
            try
            {
                _context.TblWfstageStatus.Add(tblwfstagestatus);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }


            return tblwfstagestatus;
        }


        
        public IEnumerable<TblWfstatusflow> GetAllWfstatusflow()
        {
            return _context.TblWfstatusflow;
        }

        

        public TblWfstatusflow CreateWfstatusflow(TblWfstatusflow tblwfstatusflow)
        {
            try
            {
                _context.TblWfstatusflow.Add(tblwfstatusflow);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }

            return tblwfstatusflow;
        }

       
        public IEnumerable<TblWorkflow> GetAllWorkflow()
        {
            return _context.TblWorkflow;
        }

        public TblWorkflow CreateWorkflow(TblWorkflow tblworkflow)
        {
            try
            {
                _context.TblWorkflow.Add(tblworkflow);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // throw;
            }
            return tblworkflow;
        }

        
        public IEnumerable<TblWorkflowHistory> GetAllWorkflowHistory(decimal WorkflowId)
        {
            var tbl_wfhistory = _context.TblWorkflowHistory.Where(p => p.WorkflowId == WorkflowId).ToList();

            if (tbl_wfhistory == null)
                throw new AppException("Workflow not found");
            return tbl_wfhistory;
        }

        public TblWorkflowHistory CreateWorkflowHistory(TblWorkflowHistory tblworkflowhistory)
        {
            try
            {
                _context.TblWorkflowHistory.Add(tblworkflowhistory);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // throw;
            }
            return tblworkflowhistory;
        }

    }
}

