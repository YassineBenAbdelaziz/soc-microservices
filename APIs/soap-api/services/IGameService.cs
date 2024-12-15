using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;
using App.Core.Models;
using System.Diagnostics;
using System.Xml.Linq;

namespace App.Core.Services
{
[ServiceContract]
public interface IGameService
    {
        [OperationContract]
        Task<GameModel?> FindByIdAsync(int id);
    }
}
