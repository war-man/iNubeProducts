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
        public const int PolicyStatusOnHold = 3;
        public const int PolicyStatusCancelled = 4;

        public const int PolicyStageQuote = 5;
        public const int PolicyStageProposal = 6;
        public const int PolicyStagePolicy = 7;
        public const string ProposalCancelStatus = "ProposalCancel";
        public const string PolicyCancelStatus = "PolicyCancel";
        public const string PolicyStatus = "PolicyIssued";
        public const string ProposalStatus = "ProposalCreated";
        
        public const int PolicyStageProposalCreated = 8;
        public const int PolicyStageQuoteCreated = 9;
        public const int PolicyStageExpired = 10;
        public const int PolicyStageCancelled = 11;//policyStatus creeated
        public const int PolicyStagePolicyIssued = 12;
        public const int PolicyStagePolicyLive = 13;
        public const int PolicyStageStatusCancelled = 21;
       
    }
}
