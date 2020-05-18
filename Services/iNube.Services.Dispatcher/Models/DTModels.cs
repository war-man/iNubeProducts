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
            DispatcherSetDTO = new HashSet<DispatcherSetDTO>();
        }

        public decimal DispatcherId { get; set; }
        public string DispatcherName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<DispatcherSetDTO> DispatcherSetDTO { get; set; }
    }

    public partial class DispatcherSetDTO
    {
        public DispatcherSetDTO()
        {
            DispatcherSetDetailsDTO = new HashSet<DispatcherSetDetailsDTO>();
        }

        public decimal DispatcherSetId { get; set; }
        public decimal? DispatcherId { get; set; }
        public string Object { get; set; }
        public string Event { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual DispatcherDTO Dispatcher { get; set; }
        public virtual ICollection<DispatcherSetDetailsDTO> DispatcherSetDetailsDTO { get; set; }
    }
    public partial class DispatcherSetDetailsDTO
    {
        public decimal DispatcherSetDetailsId { get; set; }
        public decimal? DispatcherSetId { get; set; }
        public string Parameter { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual DispatcherSetDTO DispatcherSet { get; set; }
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

    public class DispatcherTaskDTO
    {
        public DispatcherTaskDTO()
        {
            DispatcherTaskDetailsDTO = new HashSet<DispatcherTaskDetailsDTO>();
        }

        public decimal DispatcherTaskId { get; set; }
        public string DispatcherTaskName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<DispatcherTaskDetailsDTO> DispatcherTaskDetailsDTO { get; set; }
    }
    public class DispatcherTaskDetailsDTO
    {
        public decimal DispatcherTaskDetailsId { get; set; }
        public decimal? DispatcherTaskId { get; set; }
        public string Event { get; set; }
        public string Api { get; set; }
        public string InputObject { get; set; }
        public string OutputObject { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ResponseMsg { get; set; }

        public virtual DispatcherTaskDTO DispatcherTask { get; set; }
    }

    public partial class ObjMapDetailsDTO
    {
        public string ObjMapSource { get; set; }
        public string ObjMapTarget { get; set; }
        public string ObjMapTargetPath { get; set; }

    }
}
