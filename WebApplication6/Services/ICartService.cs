using WebApplication6.Models;
using System.Collections.Generic;

namespace WebApplication6.Services
{
    public interface ICartService
    {
        List<CartItem> GetAllCartItems();
        CartItem GetCartItemById(int id);
        void AddToCart(CartItem item);
        void RemoveFromCart(int id);
        void UpdateCartItem(CartItem item);
        void Checkout();
    }
}
