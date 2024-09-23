using WebApplication6.Models;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication6.Services
{
    public class CartService : ICartService
    {
        private List<CartItem> _cartItems = new List<CartItem>();

        public List<CartItem> GetAllCartItems()
        {
            return _cartItems;
        }

        public CartItem GetCartItemById(int id)
        {
            return _cartItems.FirstOrDefault(item => item.CartItemId == id);
        }

        public void AddToCart(CartItem item)
        {
            _cartItems.Add(item);
        }

        public void RemoveFromCart(int id)
        {
            var cartItem = _cartItems.FirstOrDefault(item => item.CartItemId == id);
            if (cartItem != null)
            {
                _cartItems.Remove(cartItem);
            }
        }

        public void UpdateCartItem(CartItem item)
        {
            var existingItem = _cartItems.FirstOrDefault(i => i.CartItemId == item.CartItemId);
            if (existingItem != null)
            {
                existingItem.Quantity = item.Quantity;
            }
        }

        public void Checkout()
        {
       
            _cartItems.Clear();
        }
    }
}
