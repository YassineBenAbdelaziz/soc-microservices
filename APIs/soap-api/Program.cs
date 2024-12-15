
using System;
using System.ServiceModel;
using App.Core.Services;
using SoapCore;
using App.Core.Database;
using dotenv.net;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

DotEnv.Load();
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

if (string.IsNullOrEmpty(connectionString))
    throw new InvalidOperationException("DATABASE_URL environment variable is not set.");


builder.Services.AddDbContext<GameDbContext>(options =>
    options.UseNpgsql(connectionString));



builder.Services.AddScoped<IGameService, GameService>();
builder.Services.AddControllers();

var app = builder.Build();


app.UseSoapEndpoint<IGameService>("/Service.asmx", new SoapEncoderOptions());

app.UseAuthorization();
app.MapControllers();


app.Run();
