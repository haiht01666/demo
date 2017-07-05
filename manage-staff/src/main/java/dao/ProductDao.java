package dao;

import java.util.List;

import model.Category;
import model.Product;

public interface ProductDao {
	
	public List<Category> getAllCategory();

	public List<Product> getAllProduct();
	
	public Product getProductById(int id);

    boolean existProduct(int id);

    public int createProduct(Product product);
	
	public int updateProduct(Product product);
	
	public int deleteProduct(int id);
}
