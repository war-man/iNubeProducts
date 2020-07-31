using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Models
{
    public partial class MapperDTO
    {
        public MapperDTO()
        {
            MapperDetailsDTO = new HashSet<MapperDetailsDTO>();
        }

        public decimal MapperId { get; set; }
        public string MapperName { get; set; }
        public string SourceComponent { get; set; }
        public string TargetComponent { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<MapperDetailsDTO> MapperDetailsDTO { get; set; }
    }
    public partial class MapperDetailsDTO
    {
        public decimal MapperDetailsId { get; set; }
        public decimal? MapperId { get; set; }
        public string SourceParameter { get; set; }
        public string TargetParameter { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string TargetParameterPath { get; set; }

        public virtual MapperDTO Mapper { get; set; }
    }

    public class EnvironmentResponse : ResponseStatus
    {
        public string Dbconnection { get; set; }
    }

    public partial class MappingDetailsDTO
    {
        public decimal Id { get; set; }
        public decimal? MappingDetailsId { get; set; }
        public string SourceParameter { get; set; }
        public string TargetParameter { get; set; }

        public virtual MapperDTO MappingDetails { get; set; }
    }

    public partial class KeyValueList
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
    public partial class TargetPathDetails
    {
        public string TargetParam { get; set; }
        public string Value { get; set; }
    }

    public partial class DispatcherDTO
    {
        public DispatcherDTO()
        {
            DispatcherTaskDTO = new HashSet<DispatcherTaskDTO>();
        }

        public decimal DispatcherId { get; set; }
        public string DispatcherTaskName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string InputObject { get; set; }
        public string OutputObject { get; set; }

        public virtual ICollection<DispatcherTaskDTO> DispatcherTaskDTO { get; set; }
    }

    public partial class DispatcherTaskDTO
    {
        public decimal DispatcherTaskId { get; set; }
        public decimal? DispatcherId { get; set; }
        public string Api { get; set; }
        public string ResponseMsg { get; set; }
        public string InputObject { get; set; }
        public string OutputObject { get; set; }
        public string InputTypeObject { get; set; }
        public string OutputTypeObject { get; set; }

        public virtual DispatcherDTO Dispatcher { get; set; }
    }


    public class DispatcherParamListDTO
    {
        public string ParameterName { get; set; }
    }
    public class DispatcherEvent
    {
        public string ObjName { get; set; }
        public string Obj { get; set; }
    }

    public class DispatcherResponse : ResponseStatus
    {
        public DispatcherDTO dispatcher { get; set; }
    }


    public partial class ObjMapDetailsDTO
    {
        public string ObjMapSource { get; set; }
        public string ObjMapTarget { get; set; }
        public string ObjMapTargetPath { get; set; }

    }
    public partial class DispatcherDetails
    {
        public decimal TaskId { get; set; }
        public string Value { get; set; }
    }
    public class MapperResponse : ResponseStatus
    {
        public MapperDTO Mapper { get; set; }
    }
    public partial class DDTO
    {
        public decimal mID { get; set; }
        public string mValue { get; set; }
        public string mType { get; set; }
    }
}
