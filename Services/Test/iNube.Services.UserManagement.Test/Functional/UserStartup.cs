using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace iNube.Services.UserManagement.Test.Functional
{
    public class UserStartup : Startup
    {
        public UserStartup(IConfiguration env) : base(env)
        {

        }
    
    }
}
