using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Mission10.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {   
        //gets rid of the weird circular references
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.MaxDepth = 64; 
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//connection to the DB
builder.Services.AddDbContext<BowlingLeagueContext>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:BowlingConnection"]);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//accept requests from port 3000
app.UseCors(x => x.WithOrigins("http://localhost:3000"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
