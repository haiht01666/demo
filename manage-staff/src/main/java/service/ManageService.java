package service;

import java.sql.SQLException;
import java.util.List;

import model.EditRoleForm;
import model.Feedback;
import model.Order;
import model.Revenue;
import model.RevenueForm;
import model.User;

public interface ManageService {
	public int createMember(User parent,int lever) throws SQLException;
	
	public List<User> lstUser(String role) throws SQLException;
	
	public int editRole(EditRoleForm formdata) throws SQLException;
	
	public User getUserById(int id) throws SQLException;
	
	public List<Order> getAllOrder() throws SQLException;
	
	public int createOrder(Order order) throws SQLException;
	
	public String getLeverUser(int userId)throws SQLException;
	
	public int updateOrder(Order order) throws SQLException;
	
	public List<Revenue> getAllRevenue(RevenueForm form) throws SQLException;

	Revenue getRevenuePersonal(String userCode, RevenueForm form) throws SQLException;

	public String resetPassword(List<String> lstUserId) throws SQLException;
	
	public List<Feedback> getAllFeedback() throws SQLException;
	
	public User detailUser(int id) throws SQLException;
	
	public List<Revenue> getRevenueGroup(RevenueForm form) throws SQLException; 
	
	public List<Revenue> getRevenueMonth() throws SQLException; 
	
}
