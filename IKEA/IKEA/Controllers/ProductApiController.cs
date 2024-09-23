using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using IKEA.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IKEA.Models;
using IKEA.Services;

namespace IKEA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class ProductApiController : ControllerBase
    {
        public IProductService _service;
        public ProductApiController(IProductService service)
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_service.GetAllProducts());
        }
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            Product obj = _service.GetProductById(id);

            if (obj == null)
            {
                return NotFound(new { result = "Requested Product details are not available." });
            }
            else
            {
                return Ok(obj);
            }
        }


        [HttpPost]
        public IActionResult CreateStudent(Product obj)
        {
            _service.AddProduct(obj);
            return Ok(new { result = "Product Details added to db" });
        }
        [HttpPut("{id}")]
        public IActionResult EditProduct(int id, Product obj)
        {
            _service.UpdateProduct(id,obj);
            return Ok(new { result = "Product details updated in server." });
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            Product obj = _service.DeleteProduct(id);

            if (obj != null)
            {


                return Ok(new { status = "Product details are deleted from server." });
            }
            else
            {
                return NotFound(new { status = "Requested Product details does not exists." });
            }

        }
  /*      [HttpGet("category/{category}")]
        public IActionResult GetProductsByCategory(string category)
        {
            List<Product> obj = _service.GetProductsByCategory(category);

            if (obj == null)
            {
                return NotFound(new { result = "Requested Product category details are not available." });
            }
            else
            {
                return Ok(obj);
            }
        }

        [HttpGet("GetOutOfStockProducts")]
        public IActionResult GetOutOfStockProducts()
        {
            List<Product> obj = _service.GetOutOfStockProducts();

            if (obj == null)
            {
                return NotFound(new { result = "Requested Product category details are not available." });
            }
            else
            {
                return Ok(obj);
            }
        }
        [HttpGet("{price1},{price2}")]
        public IActionResult GetProductsInGivenRange(int price1, int price2)
        {
            List<Product> obj = _service.GetProductsInGivenRange(price1, price2);

            if (obj == null)
            {
                return NotFound(new { result = "Requested Product category details are not available." });
            }
            else
            {
                return Ok(obj);
            }
        }
        [HttpGet("GetCategoryNames")]
        public IActionResult GetCategoryNames()
        {
            return Ok(_service.GetCategoryNames());
        }
  */
    }
}
