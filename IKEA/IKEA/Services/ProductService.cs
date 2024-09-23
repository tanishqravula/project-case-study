using IKEA.Models;
using IKEA.Repositories;



namespace IKEA.Services
{
    public class ProductService : IProductService
    {
        public IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }
        public List<Product> GetAllProducts()
        {
            return _repository.GetAllProducts();
        }
        public Product GetProductById(int id)
        {
            return _repository.GetProductById(id);
        }

        public void AddProduct(Product productObj)
        {
            _repository.AddProduct(productObj);
        }
        public void UpdateProduct(int id,Product Obj)
        {
            _repository.UpdateProduct(id,Obj);
        }
        public Product DeleteProduct(int id)
        {
            return _repository.DeleteProduct(id);
        }
  /*      public List<Product> GetProductsByCategory(string category)
        {
            return _repository.GetProductsByCategory(category);
        }
        public List<Product> GetOutOfStockProducts()
        {
            return _repository.GetOutOfStockProducts();
        }
        public List<Product> GetProductsInGivenRange(int price1, int price2)
        {
            return _repository.GetProductsInGivenRange(price1, price2);
        }
        public List<string> GetCategoryNames()
        {
            return _repository.GetCategoryNames();
        }  */

    }
}
