using System;
using System.Collections.Generic;

namespace iNube.Services.Partners.Entities
{
    public partial class TblPartners
    {
        public TblPartners()
        {
            TblPartnerAddress = new HashSet<TblPartnerAddress>();
        }

        public decimal PartnerId { get; set; }
        public int? PartnerTypeId { get; set; }
        public int? PartnerClassId { get; set; }
        public int? SalutationId { get; set; }
        public string PartnerName { get; set; }
        public string Fax { get; set; }
        public string Telephone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Pan { get; set; }
        public string Website { get; set; }
        public bool? Gst { get; set; }
        public string Gstnumber { get; set; }
        public string Pannumber { get; set; }
        public string Cinnumber { get; set; }
        public string PartnerCode { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public bool? IsActive { get; set; }
        public decimal? OrganizationId { get; set; }
        public byte[] Logo { get; set; }

        public virtual TblmasPrcommonTypes PartnerClass { get; set; }
        public virtual TblmasPrcommonTypes PartnerType { get; set; }
        public virtual TblmasPrcommonTypes Salutation { get; set; }
        public virtual ICollection<TblPartnerAddress> TblPartnerAddress { get; set; }
    }
}
