using System;
using System.Collections.Generic;

namespace iNube.Services.Proposal.PLEntities
{
    public partial class TblCustomers
    {
        public TblCustomers()
        {
            TblPolicyClients = new HashSet<TblPolicyClients>();
        }

        public int CustomerId { get; set; }
        public decimal? AdressId { get; set; }
        public short ClientType { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string NameWithInitials { get; set; }
        public string CorporateName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string HomeNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string WorkNo { get; set; }
        public string AltEmailId { get; set; }
        public string Fax { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Status { get; set; }
        public string PassportNo { get; set; }
        public string PreferredName { get; set; }
        public string CustUniqueId { get; set; }
        public decimal? MaritalStatusId { get; set; }
        public decimal? NationalityId { get; set; }
        public string Oldnicno { get; set; }
        public string Newnicno { get; set; }
        public string MonthlyIncome { get; set; }
        public string CompanyName { get; set; }
        public string NatureofDuties { get; set; }
        public string Citizenship1 { get; set; }
        public string Citizenship2 { get; set; }
        public string ResidentialNationality { get; set; }
        public string ResidentialNationalityStatus { get; set; }
        public bool? OccupationHazardousWork { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicense { get; set; }
        public string UstaxpayerId { get; set; }
        public string CountryOccupation { get; set; }

        public virtual TblAddress Adress { get; set; }
        public virtual ICollection<TblPolicyClients> TblPolicyClients { get; set; }
    }
}
