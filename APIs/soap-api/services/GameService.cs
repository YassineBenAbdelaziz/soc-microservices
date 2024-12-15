using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using App.Core.Models;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using App.Core.Database;
using App.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Core.Services {

    
    public class GameService : IGameService {

    private readonly GameDbContext _context;

    public GameService(GameDbContext context)
    {
        _context = context;
    }

   public async Task<GameModel?> FindByIdAsync(int id)
    {   
        var game = await _context.sales.FirstOrDefaultAsync(g => g.Id == id);
        return game ;
    }
    }
}





