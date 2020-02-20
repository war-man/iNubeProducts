using System;
using System.Collections.Generic;

public class User
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime? DobTest { get; set; }//DateTime
    public string Dob { get; set; }
    public int StateId { get; set; }//ddl
    public int CityId { get; set; }//ddl
    public int UserTypeId { get; set; }//rbtn
    public bool IsEmployee { get; set; }//chk
    public double  Salary { get; set; }
}
public class AssignRole
{
    public string Admin { get; set; }
    //public string CONFIGURATOR { get; set; }
    //public string MANAGEMEMT { get; set; }
    public string Configurator { get; set; }
    public string Operations { get; set; }
}
public class AssignViewModel
{
    public AssignViewModel()
    {
        //lstUser = new List<CreateUser>();
        lstConfig = new List<Config>();

    }

    public AssignRole Role { get; set; }
    public List<Config> lstConfig { get; set; }
    //public ProductBasic pd { get; set; }
    //public List<CreateUser> lstUser { get; set; }
}
public class Config
{
    public string CONFIGURATOR { get; set; }
    public int CONFIGURATORId { get; set; }

}
public class CreateUser
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string MaritalStatus { get; set; }
    public string DateofBirth { get; set; }
    public string DateofJoining { get; set; }
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public int PinCode { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public int TelNoOffice { get; set; }
    public int Number { get; set; }
    public string EmailId { get; set; }
    public string PANNo { get; set; }
    public string BranchName { get; set; }
    public int BranchCode { get; set; }
}
