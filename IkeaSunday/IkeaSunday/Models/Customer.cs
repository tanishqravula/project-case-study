namespace IkeaSunday.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public Cart Cart { get; set; } // One-to-one relationship with Cart
    }

}
