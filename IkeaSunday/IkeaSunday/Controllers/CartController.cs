using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IkeaSunday.Models;
using IkeaSunday.Data;

namespace IkeaSunday.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppikeaDbContext _context;

        public CartController(AppikeaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCarts()
        {
            var carts = _context.Carts.Include(c => c.Customer).ToList();
            return Ok(carts);
        }

        [HttpGet("{id}")]
        public IActionResult GetCart(int id)
        {
            var cart = _context.Carts.Include(c => c.Customer).FirstOrDefault(c => c.CartId == id);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        [HttpPost]
        public IActionResult PostCart(Cart cart)
        {
            _context.Carts.Add(cart);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCart), new { id = cart.CartId }, cart);
        }

        [HttpPut("{id}")]
        public IActionResult PutCart(int id, Cart cart)
        {
            if (id != cart.CartId)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        [HttpDelete("{id}")]
        public IActionResult DeleteCart(int id)
        {
            var cart = _context.Carts.Find(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            _context.SaveChanges();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartId == id);
        }
    }

}
