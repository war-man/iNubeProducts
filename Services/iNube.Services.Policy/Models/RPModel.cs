using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Policy.Models
{
    public partial class ddDTO
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public partial class ReportConfigDTO
    {
        public ReportConfigDTO()
        {
            ReportConfigParamDetailsDTO = new HashSet<ReportConfigParamDetailsDTO>();
        }

        public int ReportConfigId { get; set; }
        public string ReportConfigName { get; set; }
        public string Dbschema { get; set; }
        public string Query { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<ReportConfigParamDetailsDTO> ReportConfigParamDetailsDTO { get; set; }
    }

    public partial class ReportConfigParamDTO
    {
        public ReportConfigParamDTO()
        {
            ReportConfigParamDetailsDTO = new HashSet<ReportConfigParamDetailsDTO>();
        }

        public int ReportConfigParamId { get; set; }
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<ReportConfigParamDetailsDTO> ReportConfigParamDetailsDTO { get; set; }
    }

    public partial class ReportConfigParamDetailsDTO
    {
        public int ParamDetailsId { get; set; }
        public int? ReportConfigId { get; set; }
        public int? ReportConfigParamId { get; set; }

        public virtual ReportConfigDTO ReportConfig { get; set; }
        public virtual ReportConfigParamDTO ReportConfigParam { get; set; }
    }

    public partial class RpmastersDTO
    {
        public int MastersId { get; set; }
        public string MasterType { get; set; }
        //public string TypeCode { get; set; }
        public string Value { get; set; }
    }
}
