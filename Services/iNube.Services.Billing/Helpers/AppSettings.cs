using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Billing.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public int Weekly { get; set; }
        public int Monthly { get; set; }
        public int Quarterly { get; set; }
        public int BiWeekly { get; set; }
        public int BiMonthly { get; set; }
    }
}
