using Microsoft.AspNetCore.Mvc;
using WebApplication6.Services;
using WebApplication6.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WebApplication6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsApiController : ControllerBase
    {
        private readonly SalesDbContext _context;
        private readonly IProductService _productService;

        public CartsApiController(SalesDbContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetCartItems()
        {
            var cartItems = _context.CartItems
                .Select(item => new CartItemDto
                {
                    CartItemId = item.CartItemId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    ProductName = item.Product.ProductName,
                    Url = item.Product.url,
                    Description = item.Product.Description
                })
                .ToList();

            return Ok(cartItems);
        }

        [HttpGet("{id}")]
        public IActionResult GetCartItemById(int id)
        {
            var cartItem = _context.CartItems
                .Where(item => item.CartItemId == id)
                .Select(item => new CartItemDto
                {
                    CartItemId = item.CartItemId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    ProductName = item.Product.ProductName,
                    Url = item.Product.url,
                    Description = item.Product.Description
                })
                .FirstOrDefault();

            if (cartItem == null)
            {
                return NotFound(new { status = "Cart item not found." });
            }

            return Ok(cartItem);
        }

        [HttpPost("{productId}")]
        public IActionResult AddToCart(int productId, [FromBody] int quantity)
        {
            var product = _productService.GetProductById(productId);
            if (product == null)
            {
                return NotFound(new { status = "Product not found." });
            }

            var cartItem = new CartItem
            {
                ProductId = productId,
                Quantity = quantity,
                Product = product
            };

            _context.CartItems.Add(cartItem);
            _context.SaveChanges();

            var cartItemDto = new CartItemDto
            {
                CartItemId = cartItem.CartItemId,
                ProductId = cartItem.ProductId,
                Quantity = cartItem.Quantity,
                ProductName = cartItem.Product.ProductName,
                Url = cartItem.Product.url,
                Description = cartItem.Product.Description
            };

            return Ok(new { status = "Product added to cart successfully.", cartItem = cartItemDto });
        }


        [HttpPut("{cartItemId}")]
        public IActionResult UpdateCartItem(int cartItemId, [FromBody] int quantity)
        {
            var cartItem = _context.CartItems.FirstOrDefault(item => item.CartItemId == cartItemId);
            if (cartItem == null)
            {
                return NotFound(new { status = "Cart item not found." });
            }

            cartItem.Quantity = quantity;
            _context.CartItems.Update(cartItem);
            _context.SaveChanges();

            var cartItemDto = new CartItemDto
            {
                CartItemId = cartItem.CartItemId,
                ProductId = cartItem.ProductId,
                Quantity = cartItem.Quantity,
                ProductName = cartItem.Product.ProductName,
                Url = cartItem.Product.url,
                Description = cartItem.Product.Description
            };

            return Ok(new { status = "Cart item updated successfully.", cartItem = cartItemDto });
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveFromCart(int id)
        {
            var cartItem = _context.CartItems.FirstOrDefault(item => item.CartItemId == id);
            if (cartItem == null)
            {
                return NotFound(new { status = "Cart item not found." });
            }

            _context.CartItems.Remove(cartItem);
            _context.SaveChanges();
            return Ok(new { status = "Product removed from cart successfully." });
        }

        [HttpPost("checkout")]
        public IActionResult Checkout()
        {
            _context.Database.ExecuteSqlRaw("DELETE FROM CartItems");
            _context.SaveChanges();
            return Ok(new { status = "Order placed successfully." });
        }

    }
}
