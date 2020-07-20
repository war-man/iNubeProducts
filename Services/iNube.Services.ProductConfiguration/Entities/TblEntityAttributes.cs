using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblEntityAttributes
    {
        public decimal Id { get; set; }
        public decimal EntityId { get; set; }
        public decimal? FieldType { get; set; }
        public string EntityLevel { get; set; }
        public string LabelText { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string FilterName { get; set; }
        public string ListObject { get; set; }
        public bool? Required { get; set; }
        public bool? FutureDate { get; set; }
        public string Checked { get; set; }
        public string ParentId { get; set; }
        public string Parameter { get; set; }
        public virtual TblEntityDetails Entity { get; set; }
        public virtual TblmasDynamic FieldTypeNavigation { get; set; }
    }
}
