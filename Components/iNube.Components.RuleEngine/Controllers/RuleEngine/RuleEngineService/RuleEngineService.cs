using System;
using System.Collections.Generic;
using System.Linq;
using iNube.Components.RuleEngine.Entities;
using iNube.Components.RuleEngine.Helpers;

namespace iNube.Components.RuleEngine.Controllers.RuleConfig.RuleEngineService
{
    public interface IRuleEngineService
    {
        
    }

    public class RuleEngineService : IRuleEngineService
    {
        private RuleEngineContext _context;

        public RuleEngineService(RuleEngineContext context)
        {
            _context = context;
        }
        
    }
}
