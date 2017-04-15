package dao;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import model.EditRoleForm;
import model.Order;
import model.User;

public interface ManageDao {
	public int createMember(User user,int lever) throws SQLException;

	/*
	 * Get staff only
	 */
	public List<User> getStaffs() throws SQLException;

	/**
	 * get all member
	 * 
	 * @return list user
	 */
	public List<User> getMembers() throws SQLException;

	public int editRole(EditRoleForm formdata) throws SQLException;

	public User getUserById(int id) throws SQLException;

	public List<Order> getAllOrder() throws SQLException;
	
	public int createOrder(Order order) throws SQLException;
	
	/**
	 * 
	 * @param user user information
	 * @param numberDay period time from sign update
	 * @return total price
	 * @throws SQLException
	 */
	public Double totalOrderPrice(User user,int numberDay) throws SQLException;
	
	public int updateOrder(Order order) throws SQLException;
	
	public List<Order> getAllOrder(Date dateFrom , Date dateTo) throws SQLException; 
}
