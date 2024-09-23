using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace WebApplication6.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string url { get; set; }

    }
    public class User
    {
        [Key]
        public int customer_id { get; set; }

        [Required]
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string address { get; set; }
    }
    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class SalesDbContext : DbContext
    {
        public DbSet<Product> Products2 { get; set; }
        public DbSet<UserModel> Users {  get; set; }
        public DbSet<User> Users1 { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<CartItemDto> CartItems1 { get; set; }
        public SalesDbContext(DbContextOptions<SalesDbContext> options) : base(options) { }

    }
}
