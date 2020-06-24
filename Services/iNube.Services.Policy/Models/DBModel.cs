using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.DynamicGraph.model
{
    public partial class ddlDTOs
    {
        public int mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }

    public class DashboardConfigResonse : ResponseStatus
    {
        DashboardConfigDTO reportConfig { get; set; }
    }

    public partial class DashboardConfigDTO
    {
        public DashboardConfigDTO()
        {
            DashboardConfigParamDTO = new HashSet<DashboardConfigParamDTO>();
           // AxisDetailsDTO = new AxisDetailsDTO();
        }

        public int DashboardConfigId { get; set; }
        public string DashboardConfigName { get; set; }
        public string Dbschema { get; set; }
        public string Query { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? ModifiedDate { get; set; }
        //public string AxisDetails { get; set; }
        //public string XAxisLable { get; set; }
        //public string YAxisLable { get; set; }
        //public string ChartType { get; set; }
        //public string Title { get; set; }
        public AxisDetailsDTO AxisDetailsDTO { get; set; }
        public virtual ICollection<DashboardConfigParamDTO> DashboardConfigParamDTO { get; set; }
        //public ICollection<AxisDetailsDTO> AxisDetailsDTO { get; set; }
    }

    public partial class DashboardConfigParamDTO
    {
        public int DashboardConfigParamId { get; set; }
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int DashboardConfigId { get; set; }
        public string XaxisLable { get; set; }
        public string YaxisLable { get; set; }

        public virtual DashboardConfigDTO ReportConfig { get; set; }
    }
    public class labelsDTO
    {
        public string Xaxis{ get; set; }
        public string Yaxis { get; set; }
    }

    public partial class dbmastersDTO
    {
        public int MastersId { get; set; }
        public string MasterType { get; set; }
        //public string TypeCode { get; set; }
        public string Value { get; set; }
    }

    public partial class DashboardParamsDTO
    {
        public string ParameterName { get; set; }
        public string RangeType { get; set; }
        public string DataType { get; set; }
    }

    public partial class QueryDTOs
    {
        public QueryDTOs()
        {
            paramList = new List<DbParams>();
        }
        public int dashboardConfigId { get; set; }
        public List<DbParams> paramList { get; set; }
    }

    public partial class DbParams
    {
        public string ParameterName { get; set; }
        public string ParameterValue { get; set; }
    }
    public class EnvironmentsResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public class AxisDetailsDTO
    {
        public string XAxisLable { get; set; }
        public string YAxisLable { get; set; }
        public string ChartType { get; set; }
        public string Title { get; set; }
    }
}
