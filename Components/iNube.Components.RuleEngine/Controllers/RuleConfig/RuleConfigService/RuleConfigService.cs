using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Components.RuleEngine.Entities;
using iNube.Components.RuleEngine.Helpers;
using iNube.Utility.Framework.Model;
using iNube.Utility.Framework;
using iNube.Components.RuleEngine.Models;

namespace iNube.Components.RuleEngine.Controllers.RuleConfig.RuleConfigService
{
    public interface IRuleConfigService
    {
        //tblParameters
        IEnumerable<TblParameters> GetAllParameters();
        TblParameters CreateParameters(TblParameters tblparameter);
        void UpdateParameters(TblParameters tblparameter);

        //tblParamSet 
        IEnumerable<TblParamSet> GetAllParamset();
        TblParamSet CreateParamset(TblParamSet tblparamset);

        //tblParamSetDetails
        IEnumerable<TblParamSetDetails> GetAllParamsetDetail();
        TblParamSetDetails CreateParamsetDetail(TblParamSetDetails tblparamsetDetails);
        
        //tblRules
        IEnumerable<TblRules> GetAllRules();
        TblRules CreateRules(TblRules tblrules);

        //tblRuleConditions
        IEnumerable<TblRuleConditions> GetAllRuleCondition();
        TblRuleConditions CreateRuleCondition(TblRuleConditions tblrulecondition);

        //tblRulesConditionsValue
        IEnumerable<TblRuleConditionValues> GetAllRuleConditionValue();
        TblRuleConditionValues CreateRuleConditionValue(TblRuleConditionValues tblruleconditionvalue);

        //tblRulesParamSetMapping
        IEnumerable<TblRuleParamSetMapping> GetAllRuleSetMapping();
        TblRuleParamSetMapping CreateRuleSetMapping(TblRuleParamSetMapping tblrulesetmap);

        IEnumerable<TblRuleMapping> GetAllRuleMapping(int ruleid, string mastermodel, string action, string modelName);
        //HandleEvent
        IEnumerable<HandleRuleDTO> HandleRuleState(decimal RuleId);


    }

    public class RuleConfigService : IRuleConfigService
    {
        private RuleEngineContext _context;

        public RuleConfigService(RuleEngineContext context)
        {
            _context = context;
        }
        

        // Get All Parameters
        public IEnumerable<TblParameters> GetAllParameters()
        {
            return _context.TblParameters;
        }

        
        // Get All RuleMapping 
        public IEnumerable<TblRuleMapping> GetAllRuleMapping(int ruleid,string mastermodel,string action,string modelName)
        {
            return _context.TblRuleMapping;
        }
        
        //CreateParameters
        public TblParameters CreateParameters(TblParameters tblparameter)
        {
            try
            {
                _context.TblParameters.Add(tblparameter);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

               // throw;
            }
            return tblparameter;
        }

        // Updation of the Parameters
        public void UpdateParameters(TblParameters tblparameter)
        {
            var tbl_parameter = _context.TblParameters.Find(tblparameter.ParamId);

            if (tbl_parameter == null)
                throw new AppException("User not found");

            if (tblparameter.ParamId != tblparameter.ParamId)
            {
                // username has changed so check if the new username is already taken
                if (_context.TblParameters.Any(x => x.ParamId == tblparameter.ParamId))
                    throw new AppException("ParamID " + tblparameter.ParamId + " is already taken");
            }

            // update user properties
            tbl_parameter.ParamName = tblparameter.ParamName;
            tbl_parameter.ParamType = tblparameter.ParamType;
            tbl_parameter.ParamMasterLink = tblparameter.ParamMasterLink;
            tbl_parameter.IsActive = tblparameter.IsActive;
            tbl_parameter.CreatedDate = tblparameter.CreatedDate;

            _context.TblParameters.Update(tbl_parameter);
            _context.SaveChanges();
        }



        //GetAll ParamSet
        public IEnumerable<TblParamSet> GetAllParamset()
        {
            return _context.TblParamSet;
        }

        // Create ParamSet
        public TblParamSet CreateParamset(TblParamSet tblparamset)
        {
            try
            {
                _context.TblParamSet.Add(tblparamset);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }
            return tblparamset;
        }


        //GetAll from ParamSetDetails
        public IEnumerable<TblParamSetDetails> GetAllParamsetDetail()
        {
            return _context.TblParamSetDetails;
        }

        public TblParamSetDetails CreateParamsetDetail(TblParamSetDetails tblparamsetDetails)
        {
            try
            {
                _context.TblParamSetDetails.Add(tblparamsetDetails);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }


            return tblparamsetDetails;
        }



        // GetAll for Rules
        public IEnumerable<TblRules> GetAllRules()
        {
            return _context.TblRules;
        }
        
        // Creating the Rules
        public TblRules CreateRules(TblRules tblrules)
        {
            try
            {
                _context.TblRules.Add(tblrules);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }


            return tblrules;
        }


        // GetAll for RuleConditions
        public IEnumerable<TblRuleConditions> GetAllRuleCondition()
        {
            return _context.TblRuleConditions;
        }

        // Creting the RuleConditions

        public TblRuleConditions CreateRuleCondition(TblRuleConditions tblrulecondition)
        {
            try
            {
                _context.TblRuleConditions.Add(tblrulecondition);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {

                // throw;
            }

            return tblrulecondition;
        }

        // GetAll For RulesConditionsValue
        public IEnumerable<TblRuleConditionValues> GetAllRuleConditionValue()
        {
            return _context.TblRuleConditionValues;
        }
        
        // Creating the RuleCondition Values
        public TblRuleConditionValues CreateRuleConditionValue(TblRuleConditionValues tblruleconditionvalue)
        {
            try
            {
                _context.TblRuleConditionValues.Add(tblruleconditionvalue);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // throw;
            }
            return tblruleconditionvalue;
        }

        // GetAll for RuleParamSetMapping
        public IEnumerable<TblRuleParamSetMapping> GetAllRuleSetMapping()
        {
            return _context.TblRuleParamSetMapping;
        }
        
        // Creatin RuleSetMapping 
        public TblRuleParamSetMapping CreateRuleSetMapping(TblRuleParamSetMapping tblrulesetmap)
        {
            try
            {
                _context.TblRuleParamSetMapping.Add(tblrulesetmap);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // throw;
            }
            return tblrulesetmap;
        }

        // HandleState
        public IEnumerable<HandleRuleDTO> HandleRuleState(decimal RuleId)
        {

            var rule = from tblRuleCondition in _context.TblRuleConditions
                       join tblRules in _context.TblRules on tblRuleCondition.RuleId equals tblRules.RuleId
                       join tblParameters in _context.TblParameters on tblRuleCondition.ConditionAttribute equals tblParameters.ParamId
                       select new
                       {
                           rule_id = tblRules.RuleId,
                           ruleName = tblRules.RuleName,
                           startDate = tblRules.StartDate,
                           endDate = tblRules.EndDate,
                           conditionAttributes = tblRuleCondition.ConditionAttribute,
                           paramId = tblParameters.ParamId,
                           paramName = tblParameters.ParamName,
                           conditionOperator = tblRuleCondition.ConditionOperator,
                           conditionValue = tblRuleCondition.ConditionValueFrom,
                           ruleObj = tblRules.RuleObj,
                           ruleType = tblRules.RuleType,
                           ruleGroup = tblRuleCondition.RuleGroupName
                       };
            var ruleGropList = from tblRuleCondition in _context.TblRuleConditions
                               join tblRules in _context.TblRules on tblRuleCondition.RuleId equals tblRules.RuleId
                               where tblRules.RuleId == RuleId
                               where tblRules.RuleId == RuleId
                               select new
                               {
                                   rule_id = tblRules.RuleId,
                                   ruleName = tblRules.RuleName,
                                   startDate = tblRules.StartDate,
                                   endDate = tblRules.EndDate,
                                   conditionAttributes = tblRuleCondition.ConditionAttribute,
                                   conditionOperator = tblRuleCondition.ConditionOperator,
                                   conditionValue = tblRuleCondition.ConditionValueFrom,
                                   ruleObj = tblRules.RuleObj,
                                   ruleType = tblRules.RuleType,
                                   ruleGroup = tblRuleCondition.RuleGroupName
                               };
            var ruleList = rule;
            List<HandleRuleDTO> ltObj = new List<HandleRuleDTO>();
            foreach (var rl in ruleGropList)
            {
                if (rl.ruleType == "RuleGroup" || rl.ruleObj == "NULL")
                {
                    foreach (var rlList in ruleList)
                    {
                        if (rlList.rule_id == Convert.ToDecimal(rl.ruleGroup))
                        {
                            HandleRuleDTO obj = new HandleRuleDTO();
                            obj.ParamName = rlList.paramName;
                            ltObj.Add(obj);
                        }
                    }
                }
            }
            foreach (var rl in rule)
            {
                if (rl.rule_id == RuleId)
                {
                    HandleRuleDTO obj = new HandleRuleDTO();
                    obj.ParamName = rl.paramName;
                    ltObj.Add(obj);
                }
            }

            return ltObj;
        }

    }
}
