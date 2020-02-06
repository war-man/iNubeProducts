using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblLifeQq
    {
        public TblLifeQq()
        {
            TblQuoteMemberDetials = new HashSet<TblQuoteMemberDetials>();
            TblTopupDetails = new HashSet<TblTopupDetails>();
        }

        public int LifeQqid { get; set; }
        public int VersionNo { get; set; }
        public int ContactId { get; set; }
        public int? PolicyTermId { get; set; }
        public int? ProductNameId { get; set; }
        public decimal? QqSumAssured { get; set; }
        public int? PremiumPayingTermId { get; set; }
        public bool? IsActive { get; set; }
        public int? PremiumTerm { get; set; }
        public int? NeedId { get; set; }
        public string QuoteNo { get; set; }
        public int? StatusId { get; set; }
        public string PreferredTerm { get; set; }
        public DateTime? CreateDate { get; set; }
        public string AnnualPremium { get; set; }
        public string HalfyearlyPremium { get; set; }
        public string QuarterlyPremium { get; set; }
        public string Monthly { get; set; }
        public string Vat { get; set; }
        public string Cess { get; set; }
        public string PolicyFee { get; set; }
        public string Createdby { get; set; }
        public string AllocatedFrom { get; set; }
        public int PlanId { get; set; }
        public string PlanCode { get; set; }
        public int? NoOfChild { get; set; }
        public string PreferredLanguage { get; set; }
        public int? PensionPeriod { get; set; }
        public bool? SelfPay { get; set; }
        public bool? IsFamilyFloater { get; set; }
        public bool? Deductable { get; set; }
        public int? DrawDownPeriod { get; set; }
        public int? RetirementAge { get; set; }
        public int? MonthlySurvivorIncome { get; set; }
        public int? Sam { get; set; }
        public int? AnnualizePremium { get; set; }
        public string Qtype { get; set; }
        public string OnGoingProposalWithAia { get; set; }
        public string PreviousPolicyWithAia { get; set; }
        public int? NoOfOnGoingProposalWithAia { get; set; }
        public int? NoOfPreviousPolicyWithAia { get; set; }
        public byte[] ProspectSignature { get; set; }
        public string ProposerSignPath { get; set; }
        public byte[] Wpsignature { get; set; }
        public string WppsignPath { get; set; }
        public string SignType { get; set; }
        public string MaturityBenifits { get; set; }
        public string RefNo { get; set; }
        public string IsAfc { get; set; }
        public string ModalPremium { get; set; }
        public bool? IsTopUp { get; set; }
        public string SurrenderYear { get; set; }
        public bool? IsSurrender { get; set; }
        public DateTime? RiskCommencementDate { get; set; }

        public virtual TblContacts Contact { get; set; }
        public virtual ICollection<TblQuoteMemberDetials> TblQuoteMemberDetials { get; set; }
        public virtual ICollection<TblTopupDetails> TblTopupDetails { get; set; }
    }
}
