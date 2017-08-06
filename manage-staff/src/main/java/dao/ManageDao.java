package dao;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import model.Banner;
import model.EditRoleForm;
import model.Feedback;
import model.Order;
import model.Revenue;
import model.User;

public interface ManageDao {
	public int createMember(User user, int lever) throws SQLException;

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

	//get all order with type = 1
	public List<Order> getAllOrder() throws SQLException;

	public int createOrder(Order order) throws SQLException;

	/**
	 * 
	 * @param user
	 *            user information
	 * @param numberDay
	 *            period time from sign update
	 * @return total price
	 * @throws SQLException
	 */
	public Double totalOrderPrice(User user, int numberDay) throws SQLException;

	public int updateOrder(Order order) throws SQLException;

	public List<Order> getAllOrder(Date dateFrom, Date dateTo) throws SQLException;

	public List<Order> getAllOrderPersonal(String userCode, Date dateFrom, Date dateTo) throws SQLException;

	public String getLever(Date dateFrom, Date dateTo, int userId) throws SQLException;

	public int resetPassword(List<String> lstUserId, String password) throws SQLException;

	public List<Feedback> getAllFeedback() throws SQLException;

	public boolean isUserActive(int userId) throws SQLException;

	/**
	 * 
	 * @param userId
	 *            : user id
	 * @param time
	 *            : chu kỳ mua năng động
	 * @return
	 * @throws SQLException
	 */
	public boolean isProactive(int userId, Date time) throws SQLException;

	public List<User> getChild(int userId) throws SQLException;

	public Double getRevenuePersonal(User user, Date dateFrom, Date dateTo) throws SQLException;

	public List<User> getAllChild(String childId) throws SQLException;

	/**
	 * get all revenue of company on period time
	 * 
	 * @param dateFrom
	 * @param dateto
	 * @return total revenue
	 * @throws SQLException
	 */
	public Double getAllRevenue(Date dateFrom, Date dateto) throws SQLException;

	public List<Order> getAllOrder(Date dateFrom, Date dateTo, int userId) throws SQLException;

	public Date getLatestDateProActive(int userID) throws SQLException;

	public int updateLeverUser(int userID, int lever) throws SQLException;

	Double totalOrderValue(Date start, Date end, int userId) throws SQLException;

	public List<Banner> getAllBanner() throws SQLException;

	public int createBanner(Banner banner) throws SQLException;
	
	public int deleteBanner(int id) throws SQLException;
	
	public Order getOrderByUser(User user) throws SQLException;
	
	public int deleteOrder(int id) throws SQLException;
	
	public int deleteRevenues(Revenue revenue) throws SQLException;
	
	public int updateRevenue(Revenue revenue) throws SQLException;
	
	public int createRevenue(Revenue revenue) throws SQLException;
	
	//get all order with type = 1
	public List<Order> getAllOrderType() throws SQLException;
	
	//public List<User> getAllOrder() throws SQLException;

}
