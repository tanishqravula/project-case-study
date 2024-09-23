
using Microsoft.EntityFrameworkCore;
using IKEA.Models;
namespace IKEA.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public IkeaDbContext _context;
        public ProductRepository(IkeaDbContext context)
        {
            _context = context;
        }

        public List<Product> GetAllProducts()
        {
            List<Product> products = _context.Products.ToList();
            return products;
        }
        public Product GetProductById(int id)
        {
            return _context.Products.Find(id);
        }

        public void AddProduct(Product productObj)
        {
            _context.Products.Add(productObj);
            _context.SaveChanges();
        }
        public void UpdateProduct(int id, Product obj)
        {
            /* obj = _context.Products.Find(id);
             _context.Products.Update(obj);
             _context.SaveChanges(); */
            var existingProduct = _context.Products.Find(id);
            if (existingProduct != null)
            {
                existingProduct.ProductName = obj.ProductName;
                existingProduct.Description = obj.Description;
                existingProduct.UnitPrice = obj.UnitPrice;
                existingProduct.Category = obj.Category;
                existingProduct.StockQuantity = obj.StockQuantity;
                existingProduct.imageURL = obj.imageURL;

                _context.Products.Update(existingProduct);
                _context.SaveChanges();
            }
        }
        public Product DeleteProduct(int id)
        {
            Product obj = _context.Products.Find(id);
            _context.Products.Remove(obj);
            _context.SaveChanges();
            return obj;
        }
  /*      public List<Product> GetProductsByCategory(string category)
        {
            List<Product> products = _context.Products.Where(predicate => predicate.Category == category).ToList();
            return products;
        }
        public List<Product> GetOutOfStockProducts()
        {
            List<Product> products = _context.Products.Where(predicate => predicate.Quantity == 0).ToList();
            return products;
        }
        public List<Product> GetProductsInGivenRange(int price1, int price2)
        {
            List<Product> products = _context.Products.Where(predicate => predicate.UnitPrice <= price2 && predicate.UnitPrice >= price1).ToList();
            return products;
        }
        public List<string> GetCategoryNames()
        {
            List<string> categories = _context.Products.Select(p => p.Category).Distinct().ToList();
            return categories;
        }  */

    }
}
