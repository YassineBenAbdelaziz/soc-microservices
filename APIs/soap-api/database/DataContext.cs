using Microsoft.EntityFrameworkCore;
using dotenv.net;
using App.Core.Models;

namespace App.Core.Database;

public class GameDbContext : DbContext
{
    public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

    public DbSet<GameModel> sales { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            DotEnv.Load();
            string? connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (connectionString == null)
                throw new InvalidOperationException("DATABASE_URL environment variable is not set.");

            optionsBuilder.UseNpgsql(connectionString);
        }
    }
}
