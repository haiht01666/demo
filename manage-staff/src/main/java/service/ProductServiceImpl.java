package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ProductDao;
import model.Category;
import model.Product;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductDao dao;
	
	@Override
	public List<Category> getAllCategory() {
		return dao.getAllCategory();
	}

	@Override
	public List<Product> getAllProduct() {
		return dao.getAllProduct();
	}

	@Override
	public List<Product> getProductPage(int limit, int offset) {
		return dao.getProductPage(limit, offset);
	}

	@Override
	public int getNumberProducts() {
		return dao.getNumberProducts();
	}

	@Override
	public Product getProductById(int id) {
		return dao.getProductById(id);
	}

	@Override
	public int createProduct(Product product) {
		return dao.createProduct(product);
	}

	@Override
	public boolean existProduct(int id) {
		return dao.existProduct(id);
	}

	@Override
	public int updateProduct(Product product) {
		return dao.updateProduct(product);
	}

	@Override
	public int deleteProduct(int id) {
		return dao.deleteProduct(id);
	}

}
