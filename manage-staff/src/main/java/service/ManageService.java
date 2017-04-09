package service;

import java.sql.SQLException;
import java.util.List;

import model.EditRoleForm;
import model.Order;
import model.User;

public interface ManageService {
	public int createMember(User parent,int lever) throws SQLException;
	
	public List<User> lstUser(String role) throws SQLException;
	
	public int editRole(EditRoleForm formdata) throws SQLException;
	
	public User getUserById(int id) throws SQLException;
	
	public List<Order> getAllOrder() throws SQLException;
	
	public int createOrder(Order order) throws SQLException;
	
	public void calcuRevenue(int userId) throws SQLException;
	
	public String getLeverUser(int userId)throws SQLException;
}
