using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class SupervisorTracking
    {

    }

    public class SupervisorTrackingClaim
    {
        public int? OD_Intimated_Pending_Registraion { get; set; }
        public int? OD_Pending_Provider_Assigment { get; set; }
        public int? OD_Reopened_Claims { get; set; }
        public int? OD_Pending_Survey { get; set; }
        public int? OD_Pending_Estimation { get; set; }
        public int? OD_Pending_Investigations { get; set; }
        public int? OD_Pending_Technical_Approval { get; set; }
        public int? OD_Pending_ZCM_Approval { get; set; }
        public int? OD_Pending_CCM_Approval { get; set; }

        public int? Theft_Intimated_Pending_Registraion { get; set; }
        public int? Theft_Reopened_Claims { get; set; }
        public int? Theft_Pending_Investigations { get; set; }
        public int? Theft_Pending_ZCM_Approval { get; set; }
        public int? Theft_Pending_CCM_Approval { get; set; }

        public int? TP_Intimated_Pending_Registraion { get; set; }
        public int? TP_Pending_Advocate_Assigment { get; set; }
        public int? TP_Reopened_Claims { get; set; }
        public int? TP_Pending_Investigations { get; set; }
        public int? TP_Pending_ZCM_Approval { get; set; }
        public int? TP_Pending_CCM_Approval { get; set; }
        public int? TP_Pending_Opiniun { get; set; }
        public int? TP_Pending_Letigations { get; set; }
        public int? TP_Pending_Appeal { get; set; }
    }

    public class SupervisorTrackingSPM
    {
        public int? SPM_Empanelment_Pending_Approval { get; set; }
        public int? SPM_Empanelment_Verification_Pending { get; set; }
        public int? SPM_Empanelment_VerificationDone_PendingApproval { get; set; }
        public int? SPM_Modification_Pending_Approval { get; set; }
        public int? SPM_Modification_Verification_Pending { get; set; }
        public int? SPM_Modification_VerificationDone_PendingApproval { get; set; }
        public int? SPM_Depanel_Pending_Approval { get; set; }
        public int? SPM_Depanel_Verification_Pending { get; set; }
        public int? SPM_Depanel_VerificationDone_PendingApproval { get; set; }
        public int? SPM_Revoke_Pending_Approval { get; set; }
        public int? SPM_Revoke_Verification_Pending { get; set; }
        public int? SPM_Revoke_VerificationDone_PendingApproval { get; set; }
    }
}
