using iNube.Services.Accounting.Entities;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Accounting.Models
{
    
    public  class AccountTypeDto
    {
        public decimal AccountTypeId { get; set; }
        public string AccountType { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string FromRange { get; set; }
        public string ToRange { get; set; }
    }
    
    public class AccountResponce: ResponseStatus
    {
        public CoaaccountsDto CreateAcc { get; set; }
    }

    public class CoaMapResponse: ResponseStatus
    {
        public CoaaccountMappingDto CreateRes { get; set; }
        public CoaMapMsgDto coaRes { get; set; }
    }

    public class TransactionMapResponse : ResponseStatus
    {
        public TransactionRuleMappingDto CreateTrans { get; set; }
    }

    //public class TransactionResponse : ResponseStatus
    //{
    //    public TransactionDto CreateTrasactionRes { get; set; }
    //}
    public class TransactionResponse : ResponseStatus
    {
        public TransactionHeaderDto CreateTrasactionRes { get; set; }
    }
    public class CoaMapMsgDto
    {
        public decimal AccountId { get; set; }
        public decimal AccountTypeId { get; set; }
        public int AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string IsActive { get; set; }
    }

    public  class CoaaccountsDto
    {
        public decimal AccountId { get; set; }
        public decimal AccountTypeId { get; set; }
        public int AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string IsActive { get; set; }
    }

    public class CoaaccountsSearchDto
    {
        public decimal AccountId { get; set; }
        public decimal AccountTypeId { get; set; }
        public int AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string AccountType { get; set; }
    }

    public class CoaaccountMappingDto
    {
        public decimal AccountMappingId { get; set; }
        public int? AccountId { get; set; }
        public int? RefAccountCode { get; set; }
        public string Name { get; set; }
        public int? CustomerId { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string AccountType { get; set; }
        public string MicaAccountCode { get; set; }
    }

    public class CoaMappingSearchDto
    {
        public decimal AccountMappingId { get; set; }
        public int? AccountId { get; set; }
        public string AccountName { get; set; }
        public int? RefAccountCode { get; set; }
        public string Name { get; set; }
        public int? CustomerId { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string AccountType { get; set; }
        public string MicaAccountCode { get; set; }
    }

    public class TransactionDto
    {
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public decimal? Amount { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public int? AccountCode { get; set; }
        public string Currency { get; set; }
        public decimal? PartnerId { get; set; }
        public decimal? OrganizationId { get; set; }
        public decimal? ContractId { get; set; }
        public decimal? TransactionHeaderId { get; set; }
        public decimal? ProductId { get; set; }
    }
    //public class TransactionAccountSearchDto
    //{
    //    public decimal TransactionId { get; set; }
    //    public string AccountName { get; set; }
    //    public string TypeOfTransaction { get; set; }
    //    public decimal? Amount { get; set; }
    //    public string Description { get; set; }
    //    public DateTime? CreatedDate { get; set; }
    //    public string IsActive { get; set; }
    //    public string RuleName { get; set; }
    //    public string Object { get; set; }
    //    public string Event { get; set; }
    //    public string AccountType { get; set; }
    //    public string Value { get; set; }
    //    public int? AccountCode { get; set; }
    //    public string Currency { get; set; }
    //}
    public class TransactionAccountSearchDto
    {
        public decimal TransactionHeaderId { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public decimal? Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public int? CustomerAcCode { get; set; }
        public string CustomerAcName { get; set; }
        public string ReferenceDescription { get; set; }
    }


    public class TransactionRuleMappingConditionsDto
    {
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string TypeofTransaction { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public string SubLedgerReference { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string LedgerObject { get; set; }
        public string LedgerColName { get; set; }
        public string TableName { get; set; }
        public decimal SubLedgerReferencesId { get; set; }
    }

    public  class TransactionRuleMappingDto
    {
        public TransactionRuleMappingDto()
        {
            TransactionConditions = new HashSet<TransactionConditionsDto>();
            SubLedgerReferences = new HashSet<SubLedgerReferencesDto>();
        }

        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }

        public virtual ICollection<TransactionConditionsDto> TransactionConditions { get; set; }
        public virtual ICollection<SubLedgerReferencesDto> SubLedgerReferences { get; set; }
    }

    public  class TransactionHeaderDto
    {
        public TransactionHeaderDto()
        {
            Transaction = new HashSet<TransactionDto>();
            TransactionSubLedger = new HashSet<TransactionSubLedgerDto>();
        }

        public decimal TransactionHeaderId { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        
        public virtual ICollection<TransactionDto> Transaction { get; set; }
        public virtual ICollection<TransactionSubLedgerDto> TransactionSubLedger { get; set; }
    }

    public class AccountSearchDto
    {
        public decimal AccountId { get; set; }
        public decimal? AccountTypeId { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string IsActive { get; set; }
        
    }

    public class AccountSearchDetailsDto
    {
        public decimal AccountId { get; set; }
        public decimal? AccountTypeId { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string IsActive { get; set; }
        public string AccountType { get; set; }

    }
    public class TransactionSearchDto
    {
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public int? DebitAcCode { get; set; }
        public int? CreditAcCode { get; set; }
        public int? Amount { get; set; }
        public int? CurrencyId { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string AccountName { get; set; }
    }
    public class AccountDetailsDto
    {
        public decimal AccountId { get; set; }
        public decimal AccountTypeId { get; set; }
        public int AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountDesc { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string AccountType { get; set; }
    }

    public class TransactionConditionsDto
    {
        public decimal TransactionConditionsId { get; set; }
        public string TypeofTransaction { get; set; }
        public int? AccountCode { get; set; }
        public string AccountType { get; set; }
        //Addition for AccountName for Fetching 
        public string AccountName { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
        public string SubLedgerReference { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
    }

    public class JournalEntryConfriguationDto
    {
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string TypeofTransaction { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
    }
    public  class CoaAccountMappingDto
    {
        public string MicaAccountType { get; set; }
        public int MicaAccountCode { get; set; }
        public string MicaAccountName { get; set; }
        public string CustomerName { get; set; }
        public int? CustomerAcCode { get; set; }
        public string CustomerAcName { get; set; }
        public string CustomerAcDescription { get; set; }

    }


    public class SubLedgerReferencesDto
    {
        public decimal SubLedgerReferencesId { get; set; }
        public string LedgerObject { get; set; }
        public string LedgerColName { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
        public string TableName { get; set; }

    }
    

    public  class TransactionSubLedgerDto
    {
        public decimal TransactionSubLedgerId { get; set; }
        public decimal TransactionHeaderId { get; set; }
        public decimal SubLedgerReferencesId { get; set; }
        public string Value { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string IsActive { get; set; }
    }

    // Model ExcelImport for COAMapping
    public class CoaMappingExcelImportDTO
    {
        public int accountId { get; set; }
        public int refAccountCode { get; set; }
        public string name { get; set; }
        public int customerId { get; set; }
        public string description { get; set; }
        public string accountType { get; set; }
    }
    public class CoaMapExcelImportDTO
    {
        public string MICAAccountType { get; set; }
        public int MicaAccountCode { get; set; }
        public string MicaAccountName { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAccountCode { get; set; }
        public string CustomerAccountsName { get; set; }
        public string CustomerAccountDescription { get; set; }
    }

    public class TransactionSearchAccountDto
    {
        public decimal TransactionHeaderId { get; set; }
        public decimal TransactionRuleMappingId { get; set; }
        public string RuleName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public decimal TransactionId { get; set; }
        public string TypeOfTransaction { get; set; }
        public decimal? Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string IsActive { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public string AccountType { get; set; }
        public string Value { get; set; }
        public int? AccountCode { get; set; }
        public string AccountName { get; set; }
        public int? CustomerAcCode { get; set; }
        public string CustomerAcName { get; set; }
        public string ReferenceDescription { get; set; }
        public decimal? OrgId { get; set; }
        public decimal? PartnerId { get; set; }
    }



    public class DemoResponse<T>
    {
        public int Code { get; set; }

        public string Msg { get; set; }

        public T Data { get; set; }

        public static DemoResponse<T> GetResult(int code, string msg, T data = default(T))
        {
            return new DemoResponse<T>
            {
                Code = code,
                Msg = msg,
                Data = data
            };
        }
    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

}
