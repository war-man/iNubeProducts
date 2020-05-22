﻿using iNube.Services.Dispatcher.Models;
using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Dispatcher.Controllers.Dispatcher.DispatcherService
{
    public interface IDispatcherService
    {
        Task<IEnumerable<DispatcherParamListDTO>> GetParameterByEvent(string DisptcherName, string Object, string Event, ApiContext Context);
        Task<object> DispatcherEvent(dynamic DispatcherEventObject, string EventType ,ApiContext Context);
    }
}