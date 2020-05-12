using System;
using System.Collections.Generic;

namespace iNube.Services.Lead.Entities
{
    public partial class TblContacts
    {
        public TblContacts()
        {
            InverseParentContact = new HashSet<TblContacts>();
            TblDependants = new HashSet<TblDependants>();
            TblLifeNeedAnalysis = new HashSet<TblLifeNeedAnalysis>();
            TblLifeQq = new HashSet<TblLifeQq>();
            TblOpportunity = new HashSet<TblOpportunity>();
        }

        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? ContactTypeId { get; set; }
        public string PhoneNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string Work { get; set; }
        public int? Age { get; set; }
        public int? OccupationId { get; set; }
        public string Nicno { get; set; }
        public decimal? MaritalStatusId { get; set; }
        public decimal? NationalityId { get; set; }
        public string MonthlyIncome { get; set; }
        public int? FamilyMembersCount { get; set; }
        public int? DependenceCount { get; set; }
        public DateTime? LastUpdated { get; set; }
        public bool? IsDeleted { get; set; }
        public decimal? AddressId { get; set; }
        public int? ParentContactId { get; set; }
        public bool? Isparent { get; set; }
        public string Relationship { get; set; }
        public string Employer { get; set; }
        public string ContactType { get; set; }
        public string LeadNo { get; set; }
        public string Place { get; set; }
        public string PassportNo { get; set; }
        public string CreatedBy { get; set; }
        public string ClientCode { get; set; }
        public string SpouseName { get; set; }
        public DateTime? SpouseDob { get; set; }
        public int? SpouseAge { get; set; }
        public int? CurrentAge { get; set; }
        public int? SpouseCurrentAge { get; set; }
        public string IntroducerCode { get; set; }
        public string Salutation { get; set; }
        public string Currency { get; set; }
        public string Title { get; set; }
        public DateTime? CreationDate { get; set; }
        public string HandledBy { get; set; }

        public virtual TblAddress Address { get; set; }
        public virtual TblContacts ParentContact { get; set; }
        public virtual ICollection<TblContacts> InverseParentContact { get; set; }
        public virtual ICollection<TblDependants> TblDependants { get; set; }
        public virtual ICollection<TblLifeNeedAnalysis> TblLifeNeedAnalysis { get; set; }
        public virtual ICollection<TblLifeQq> TblLifeQq { get; set; }
        public virtual ICollection<TblOpportunity> TblOpportunity { get; set; }
    }
}
