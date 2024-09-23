using IKEA.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using IKEA.Repositories;
using IKEA.Services;
using static IKEA.Models.Product;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<IkeaDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("IkeaDbContext")));

builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<IProductService, ProductService>();

builder.Services.AddCors(o => o.AddPolicy("AllowAllOrigins", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));
var app = builder.Build();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();

app.MapControllers();

app.Run();
