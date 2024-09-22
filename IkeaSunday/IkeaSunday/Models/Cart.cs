namespace IkeaSunday.Models
{
    public class Cart
    {
        public int CartId { get; set; }
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }
        public ICollection<CartProduct> CartProducts { get; set; } // Collection of CartProduct join entities
    }

}
