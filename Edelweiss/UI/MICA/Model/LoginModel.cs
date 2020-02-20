using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MICA.Model
{
    public class LoginModel
    {
        //public bool status;

        public string UserName { get; set; }

        public string Password { get; set; }

        //public bool RememberMe { get; set; }

        //public string Type { get; set; }

        //public string ReturnUrl { get; set; }

        //public int ErrorCode { get; set; }
        //public string OTPGenerated { get; set; }
        //public string OTPFromUser { get; set; }
        //public DateTime OTPGeneratedTime { get; set; }
        //public string ContactNo { get; set; }
        //public int resendCount { get; set; }
        //public Guid userid { get; set; }
        public string Message { get; set; }
    }
    public class Datahandle
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        //public string email { get; set; }
        public string password { get; set; }
    }
}
