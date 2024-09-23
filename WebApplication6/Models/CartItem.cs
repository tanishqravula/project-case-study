using System.ComponentModel.DataAnnotations;

namespace WebApplication6.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
    public class CartItemDto
    {
        [Key]
        public int CartItemId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
    }

}
