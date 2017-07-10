package service;

import java.util.List;

import model.Category;
import model.Product;

public interface ProductService {
	
	public List<Category> getAllCategory();

	public List<Product> getAllProduct();

	List<Product> getProductPage(int limit, int offset);

	int getNumberProducts();
	int getNumberProductsSearch(String searchStr);

	public Product getProductById(int id);
	
	public int createProduct(Product product);

	boolean existProduct(int id);

	public int updateProduct(Product product);
	
	public int deleteProduct(int id);

	boolean existCategory(String category);

	List<Product> getProductsByCategory(int limit, int offset, String category);

	int getNumberProductsCategory(String category);

	List<Product> searchProduct(int limit, int offset, String searchStr);


}
