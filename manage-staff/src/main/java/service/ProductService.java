package service;

import java.util.List;

import model.Category;
import model.Product;

public interface ProductService {
	
	public List<Category> getAllCategory();

	public List<Product> getAllProduct();
	
	public Product getProductById(int id);
	
	public int createProduct(Product product);

	boolean existProduct(int id);

	public int updateProduct(Product product);
	
	public int deleteProduct(int id);
	
}