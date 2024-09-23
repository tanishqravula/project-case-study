using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication6.Models;
using System.Linq;

namespace WebApplication6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public UserApiController(SalesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Users1.ToList());
        }


        [HttpPost]
        public IActionResult Create(User obj)
        {
            _context.Users1.Add(obj);
            _context.SaveChanges();
            return Ok(new { status = "User details added successfully." });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Invalid model state." });
            }

            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.email) || string.IsNullOrEmpty(loginRequest.password))
            {
                return BadRequest(new { success = false, message = "Invalid request. Please provide email and password." });
            }

            var user = _context.Users1.FirstOrDefault(u => u.email == loginRequest.email);

            if (user == null)
            {
                return Ok(new { success = false, message = "User not found." });
            }

            if (user.password != loginRequest.password)
            {
                return Ok(new { success = false, message = "Invalid password." });
            }

            return Ok(new { success = true, message = "Login successful." });
        }

    }
}
