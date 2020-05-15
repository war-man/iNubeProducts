using System;
using System.Collections.Generic;

namespace iNube.Services.Policy.Entities.AvoEntities
{
    public partial class TblPolicyClients
    {
        public TblPolicyClients()
        {
            TblPolicyRelationship = new HashSet<TblPolicyRelationship>();
        }

        public decimal PolicyClientId { get; set; }
        public int? CustomerId { get; set; }
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
        public string Oldnicno { get; set; }
        public string Newnicno { get; set; }
        public string PreferredName { get; set; }
        public int? Nationality { get; set; }
        public int? MaritalStatus { get; set; }
        public int? OccupationId { get; set; }
        public bool? IsPermanentAddrSameasCommAddr { get; set; }
        public decimal? PermanetAddressId { get; set; }
        public string CompanyName { get; set; }
        public string NatureOfDuties { get; set; }
        public string MonthlyIncome { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string AlteranteMobileNo { get; set; }
        public bool? IsProposerAssured { get; set; }
        public int? Age { get; set; }
        public string Citizenship1 { get; set; }
        public string Citizenship2 { get; set; }
        public string ResidentialNationality { get; set; }
        public string ResidentialNationalityStatus { get; set; }
        public bool? OccupationHazardousWork { get; set; }
        public string PassportNumber { get; set; }
        public string DrivingLicense { get; set; }
        public string UstaxpayerId { get; set; }
        public string SpecifyResidental { get; set; }
        public string SpecifyHazardousWork { get; set; }
        public bool? CitizenShip { get; set; }
        public string ContactPerson { get; set; }
        public string Designation { get; set; }
        public string BusinessRegistrationNo { get; set; }
        public string CountryOccupation { get; set; }
        public string ProposerTelepohoneNo { get; set; }
        public string ProposerEamilId { get; set; }
        public string HandledBy { get; set; }

        public virtual TblPolicyClientAddress PermanetAddress { get; set; }
        public virtual ICollection<TblPolicyRelationship> TblPolicyRelationship { get; set; }
    }
}
