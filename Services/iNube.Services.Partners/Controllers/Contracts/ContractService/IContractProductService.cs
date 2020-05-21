using iNube.Utility.Framework.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNube.Services.Partners.Controllers.Contracts.ContractService
{
    interface IContractProductService
    {

        Task<bool> GetmasterData(ApiContext apiContext);
    }
}
