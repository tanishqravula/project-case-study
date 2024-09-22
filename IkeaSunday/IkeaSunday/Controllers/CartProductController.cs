using IkeaSunday.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using IkeaSunday.Data;

[Route("api/[controller]")]
[ApiController]
public class CartProductController : ControllerBase
{
    private readonly AppikeaDbContext _context;

    public CartProductController(AppikeaDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetCartProducts()
    {
        var cartProducts = _context.CartProducts.Include(cp => cp.Cart).Include(cp => cp.Product).ToList();
        return Ok(cartProducts);
    }

    [HttpGet("{cartId}/{productId}")]
    public IActionResult GetCartProduct(int cartId, int productId)
    {
        var cartProduct = _context.CartProducts
            .Include(cp => cp.Cart)
            .Include(cp => cp.Product)
            .FirstOrDefault(cp => cp.CartId == cartId && cp.ProductId == productId);

        if (cartProduct == null)
        {
            return NotFound();
        }

        return Ok(cartProduct);
    }

    [HttpPost]
    public IActionResult PostCartProduct(CartProduct cartProduct)
    {
        var product = _context.Products.Find(cartProduct.ProductId);
        if (cartProduct.Quantity > product.StockQuantity)
        {
            return BadRequest("Quantity exceeds available stock.");
        }

        _context.CartProducts.Add(cartProduct);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetCartProduct), new { cartId = cartProduct.CartId, productId = cartProduct.ProductId }, cartProduct);
    }

    [HttpPut("{cartId}/{productId}")]
    public IActionResult PutCartProduct(int cartId, int productId, CartProduct cartProduct)
    {
        if (cartId != cartProduct.CartId || productId != cartProduct.ProductId)
        {
            return BadRequest();
        }

        var product = _context.Products.Find(cartProduct.ProductId);
        if (cartProduct.Quantity > product.StockQuantity)
        {
            return BadRequest("Quantity exceeds available stock.");
        }

        _context.Entry(cartProduct).State = EntityState.Modified;

        try
        {
            _context.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CartProductExists(cartId, productId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{cartId}/{productId}")]
    public IActionResult DeleteCartProduct(int cartId, int productId)
    {
        var cartProduct = _context.CartProducts.Find(cartId, productId);
        if (cartProduct == null)
        {
            return NotFound();
        }

        _context.CartProducts.Remove(cartProduct);
        _context.SaveChanges();

        return NoContent();
    }

    private bool CartProductExists(int cartId, int productId)
    {
        return _context.CartProducts.Any(e => e.CartId == cartId && e.ProductId == productId);
    }
}
