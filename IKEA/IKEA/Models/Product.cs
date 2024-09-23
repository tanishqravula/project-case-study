using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace IKEA.Models
{
    public class Product
    {

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public string Category { get; set; }
        public int StockQuantity { get; set; }
        public string imageURL { get; set; }
    }
    public class IkeaDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public IkeaDbContext(DbContextOptions<IkeaDbContext> options)
         : base(options)
        {

        }
    }
}