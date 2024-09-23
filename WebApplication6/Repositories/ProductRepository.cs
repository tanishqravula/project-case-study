using WebApplication6.Models;
using System.Linq;

namespace WebApplication6.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public SalesDbContext _salescontext;
        public ProductRepository(SalesDbContext salescontext)
        {
            _salescontext = salescontext;
        }

        public void AddProduct(Product productobj)
        {
            _salescontext.Products2.Add(productobj);
            _salescontext.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            Product products = _salescontext.Products2.Find(id);
            _salescontext.Products2.Remove(products);
            _salescontext.SaveChanges();
        }

        public List<Product> GetAll()
        {
            return _salescontext.Products2.ToList();
        }

        public Product GetProductById(int id)
        {
            return _salescontext.Products2.Find(id);
        }

        public void UpdateProduct(Product productobj)
        {
            _salescontext.Products2.Update(productobj);
            _salescontext.SaveChanges();
        }

        public List<Product> GetProductsByCategory(string category)
        {
            return _salescontext.Products2.Where(p => p.Category == category).ToList();
        }

        public List<Product> GetOutOfStockProducts()
        {
            return _salescontext.Products2.Where(p => p.Quantity ==0).ToList();
        }

        public List<Product> GetProductsByPriceRange(decimal minPrice, decimal maxPrice)
        {
            return _salescontext.Products2.Where(p => p.UnitPrice >= minPrice && p.UnitPrice <= maxPrice).ToList();
        }

        public List<string> GetAllCategories()
        {
            return _salescontext.Products2.Select(p => p.Category).Distinct().ToList();
        }
    }
}
