using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.DynamicReports.model
{
    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public class ReportConfigResonse : ResponseStatus
    {
        ReportConfigDTO reportConfig { get; set; }
    }

    public partial class ReportConfigDTO
    {
        public ReportConfigDTO()
        {
            TblReportConfigParam = new HashSet<ReportConfigParamDTO>();
        }

        public int ReportConfigId { get; set; }
        public string ReportConfigName { get; set; }
        public string Dbschema { get; set; }
        public string Query { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<ReportConfigParamDTO> TblReportConfigParam { get; set; }
    }

    public partial class ReportConfigParamDTO
    {
        public int ReportConfigParamId { get; set; }
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ReportConfigId { get; set; }

        public virtual ReportConfigDTO ReportConfig { get; set; }
    }

    public partial class RpmastersDTO
    {
        public int MastersId { get; set; }
        public string MasterType { get; set; }
        //public string TypeCode { get; set; }
        public string Value { get; set; }
    }

    public partial class ReportParamsDTO
    {
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
    }

    public partial class QueryDTO
    {
        public QueryDTO()
        {
            paramList = new List<Params>();
        }
        public int ReportConfigId { get; set; }
        public List<Params> paramList { get; set; }
    }

    public partial class Params
    {
        public string ParameterName { get; set; }
        public string ParameterValue { get; set; }
    }
    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public partial class DynamicConfigDTO
    {
        public decimal ConfigId { get; set; }
        public string ItemType { get; set; }
        public string Name { get; set; }
        public string ItemDescription { get; set; }
        public string Url { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrderBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    public partial class DynamicPermissionsDTO
    {
        public decimal DynamicPermissionId { get; set; }
        public decimal? DynamicId { get; set; }
        public string DynamicName { get; set; }
        public string DynamicType { get; set; }
        public string Userid { get; set; }
        public string Roleid { get; set; }
        public string UserorRole { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrderBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
