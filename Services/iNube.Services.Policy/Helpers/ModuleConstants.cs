using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Helpers
{
    public static class ModuleConstants
    {
        public const int PolicyStatusActive = 1;
        public const int PolicyStatusInActive = 2;
        public const int PolicyStatusExpired = 3;
        public const int PolicyStatusCanceled = 4;

        public const int PolicyStageQuote = 5;
        public const int PolicyStageProposal = 6;
        public const int PolicyStagePolicy = 7;
        public const string PolicyStatus = "PolicyIssued";
    }
}
