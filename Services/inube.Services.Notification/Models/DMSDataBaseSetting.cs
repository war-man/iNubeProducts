using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace inube.Services.Notification.Models
{
    public class DMSDatabaseSettings : IDMSDatabaseSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDMSDatabaseSettings
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
 
}
