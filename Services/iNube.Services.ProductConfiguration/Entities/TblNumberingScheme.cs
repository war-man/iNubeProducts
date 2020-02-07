using System;
using System.Collections.Generic;

namespace iNube.Services.ProductConfiguration.Entities
{
    public partial class TblNumberingScheme
    {
        public decimal NumberingSchemeId { get; set; }
        public decimal? ProductId { get; set; }
        public decimal? PartnerId { get; set; }
        public string Fixedcode { get; set; }
        public int Nextnumber { get; set; }
        public int Highestnumber { get; set; }
        public int Step { get; set; }
        public Guid Rowguid { get; set; }
        public string NumberingType { get; set; }
    }
}
