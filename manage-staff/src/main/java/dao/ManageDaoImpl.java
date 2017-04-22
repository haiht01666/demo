package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import constant.LeverType;
import constant.OrderType;
import constant.TimePeriodCheck;
import model.EditRoleForm;
import model.Feedback;
import model.Order;
import model.User;

@Repository
public class ManageDaoImpl extends DBManager implements ManageDao {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public int createMember(User parent, int lever) throws SQLException {
		int memberId = 0;
		String sql1 = "Insert into users(enable,parent_id,child_id,cdate,lever) values(0,?,?,now(),?)";
		String sql2 = "Insert into roles(role,user_id) values(?,?)";
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			st = conn.createStatement();
			// get last id insert
			rs = st.executeQuery("SELECT max(id) FROM users");
			while (rs.next()) {
				memberId = rs.getInt(1) + 1;
			}
			stmt = conn.prepareStatement(sql1);
			stmt.setInt(1, parent.getId());
			stmt.setString(2, parent.getChildId() + "-" + memberId);
			stmt.setInt(3, lever);
			stmt.executeUpdate();

			stmt = conn.prepareStatement(sql2);
			stmt.setString(1, "STAFF");
			stmt.setInt(2, memberId);
			stmt.executeUpdate();
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			conn.rollback();
		} finally {
			if (conn != null) {
				conn.close();
				stmt.close();
				rs.close();
			}
		}
		return memberId;
	}

	@Override
	public List<User> getStaffs() throws SQLException {
		List<User> result = new ArrayList<>();
		String sql = "SELECT u.id,u.name,u.cdate,u.enable,o.order_date,r.role,u.parent_id,u.lever FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF'";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				User user = new User();
				user.setId(rs.getInt(1));
				user.setDispName(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setEnable(rs.getBoolean(4));
				user.setLastOrderDate(rs.getDate(5));
				user.setRole(rs.getString(6));
				user.setParentId(rs.getInt(7));
				int lever = rs.getInt(8);
				if (lever == LeverType.SALE_MEMBER.getValue())
					user.setLeverValue(LeverType.SALE_MEMBER.name());
				else if (lever == LeverType.SALE_PRO.getValue())
					user.setLeverValue(LeverType.SALE_PRO.name());
				else if (lever == LeverType.PRO_DISTRIBUTE.getValue())
					user.setLeverValue(LeverType.PRO_DISTRIBUTE.name());
				else
					user.setLeverValue(LeverType.New.name());
				result.add(user);

			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			st.close();
			rs.close();
		}
		return result;
	}

	@Override
	public List<User> getMembers() throws SQLException {
		List<User> result = new ArrayList<>();

		String sql = "SELECT u.id,u.name,u.cdate,u.enable,o.order_date,r.role,u.parent_id,u.lever,u.child_id FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF' or r.role = 'ADMIN'";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				User user = new User();
				user.setId(rs.getInt(1));
				user.setDispName(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setEnable(rs.getBoolean(4));
				user.setLastOrderDate(rs.getDate(5));
				user.setRole(rs.getString(6));
				user.setParentId(rs.getInt(7));
				int lever = rs.getInt(8);
				user.setChildId(rs.getString(9));
				if (lever == LeverType.SALE_MEMBER.getValue())
					user.setLeverValue(LeverType.SALE_MEMBER.name());
				else if (lever == LeverType.SALE_PRO.getValue())
					user.setLeverValue(LeverType.SALE_PRO.name());
				else if (lever == LeverType.PRO_DISTRIBUTE.getValue())
					user.setLeverValue(LeverType.PRO_DISTRIBUTE.name());
				else
					user.setLeverValue(LeverType.New.name());
				result.add(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			st.close();
			rs.close();
		}
		return result;
	}

	@Override
	public int editRole(EditRoleForm formdata) throws SQLException {
		String sql = "Update roles set role = ? where user_id = ? ";
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			for (String userId : formdata.getLstUserId()) {
				stmt = conn.prepareStatement(sql);
				stmt.setString(1, formdata.getRole());
				stmt.setInt(2, Integer.parseInt(userId));
				stmt.executeUpdate();
			}
			conn.commit();
		} catch (Exception e) {
			conn.rollback();
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			st.close();
		}
		return 1;
	}

	@Override
	public User getUserById(int id) throws SQLException {
		User user = new User();
		String sql = "SELECT name , email , cdate ,phone,bank_name,bank_account,bank_branch,parent_id,lever,child_id,address,birthday,identifier FROM users where id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			rs = stmt.executeQuery();
			while (rs.next()) {
				user.setDispName(rs.getString(1));
				user.setEmail(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setPhone(rs.getString(4));
				user.setBankName(rs.getString(5));
				user.setBankAccount(rs.getString(6));
				user.setBankBranch(rs.getString(7));
				user.setParentId(rs.getInt(8));
				user.setLever(rs.getInt(9));
				user.setId(id);
				user.setChildId(rs.getString(10));
				user.setAddress(rs.getString(11));
				user.setBirthday(rs.getDate(12));
				user.setIdentifier(rs.getString(13));
				break;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return user;
	}

	@Override
	public List<Order> getAllOrder() throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql = "SELECT user_id,name,cdate,price,quantity,type,total,id FROM orders";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				Order order = new Order();
				order.setUserId(rs.getInt(1));
				order.setOrderName(rs.getString(2));
				order.setOrderDate(rs.getDate(3));
				order.setPrice(rs.getDouble(4));
				order.setQuantity(rs.getInt(5));
				order.setId(rs.getInt(8));
				int type = rs.getInt(6);
				order.setType(type);
				if (type == OrderType.ORDER_PROACTIVE.getCode())
					order.setTypeValue(OrderType.ORDER_PROACTIVE.getValue());
				else if (type == OrderType.ORDER_PACKAGE.getCode())
					order.setTypeValue(OrderType.ORDER_PACKAGE.getValue());
				else if (type == OrderType.ORDER_PRODUCT.getCode())
					order.setTypeValue(OrderType.ORDER_PRODUCT.getValue());
				else
					order.setTypeValue(OrderType.ORDER_PRODUCT.DefaultValue());
				order.setTotal(rs.getDouble(7));
				lstOrder.add(order);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			st.close();
			rs.close();
		}
		return lstOrder;
	}

	@Override
	public int createOrder(Order order) throws SQLException {
		int result = 0;
		String sql = "insert into orders(name,cdate,user_id,price,quantity,type,total) values(?,?,?,?,?,?,?)";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, order.getOrderName());
			stmt.setDate(2, new java.sql.Date(order.getOrderDate().getTime()));
			stmt.setInt(3, order.getUserId());
			stmt.setDouble(4, order.getPrice());
			stmt.setInt(5, order.getQuantity());
			stmt.setInt(6, order.getType());
			stmt.setDouble(7, order.getPrice() * order.getQuantity());
			result = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
		}
		return result;
	}

	@Override
	public Double totalOrderPrice(User user, int numberDay) throws SQLException {
		Double result = 0d;
		String sql = "SELECT sum(total) as total FROM orders where user_id=? and (cdate between ? and (? + INTERVAL ? DAY)) and type =?  ";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, user.getId());
			stmt.setDate(2, new java.sql.Date(user.getCdate().getTime()));
			stmt.setDate(3, new java.sql.Date(user.getCdate().getTime()));
			stmt.setInt(4, numberDay);
			stmt.setInt(5, OrderType.ORDER_PACKAGE.getCode());
			rs = stmt.executeQuery();
			while (rs.next()) {
				result = rs.getDouble(1);
			}
			// if 45 day not complete package
			if (result < LeverType.SALE_MEMBER.getAmount()) {
				String sql1 = "SELECT sum(total) as total FROM orders where user_id=? and (cdate between ? + INTERVAL ? DAY and LAST_DAY(? + INTERVAL ? DAY )) and type =?  ";
				stmt = conn.prepareStatement(sql1);
				stmt.setInt(1, user.getId());
				stmt.setDate(2, new java.sql.Date(user.getCdate().getTime()));
				stmt.setInt(3, numberDay);
				stmt.setDate(4, new java.sql.Date(user.getCdate().getTime()));
				stmt.setInt(5, numberDay);
				stmt.setInt(6, OrderType.ORDER_PACKAGE.getCode());
				rs = stmt.executeQuery();
				while (rs.next()) {
					result = rs.getDouble(1);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			rs.close();
			stmt.close();
		}
		return result;
	}

	@Override
	public int updateOrder(Order order) throws SQLException {
		int result = 0;
		String sql = "update orders set user_id=? ,name=?,price=?,quantity=?,type=?,total=?,cdate=? where id=?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, order.getUserId());
			stmt.setString(2, order.getOrderName());
			stmt.setDouble(3, order.getPrice());
			stmt.setInt(4, order.getQuantity());
			stmt.setInt(5, order.getType());
			stmt.setDouble(6, order.getPrice() * order.getQuantity());
			stmt.setDate(7, new java.sql.Date(order.getOrderDate().getTime()));
			stmt.setInt(8, order.getId());
			result = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}

	@Override
	public List<Order> getAllOrder(Date dateFrom, Date dateTo) throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql = "SELECT user_id,name,cdate,price,quantity,type,total,id FROM orders where cdate between ? and ? ";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setDate(1, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(2, new java.sql.Date(dateTo.getTime()));
			rs = stmt.executeQuery();
			while (rs.next()) {
				Order order = new Order();
				order.setUserId(rs.getInt(1));
				order.setOrderName(rs.getString(2));
				order.setOrderDate(rs.getDate(3));
				order.setPrice(rs.getDouble(4));
				order.setQuantity(rs.getInt(5));
				order.setId(rs.getInt(8));
				int type = rs.getInt(6);
				order.setType(type);
				if (type == OrderType.ORDER_PROACTIVE.getCode())
					order.setTypeValue(OrderType.ORDER_PROACTIVE.getValue());
				else if (type == OrderType.ORDER_PACKAGE.getCode())
					order.setTypeValue(OrderType.ORDER_PACKAGE.getValue());
				else if (type == OrderType.ORDER_PRODUCT.getCode())
					order.setTypeValue(OrderType.ORDER_PRODUCT.getValue());
				else
					order.setTypeValue(OrderType.ORDER_PRODUCT.DefaultValue());
				order.setTotal(rs.getDouble(7));
				lstOrder.add(order);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			st.close();
			rs.close();
		}
		return lstOrder;
	}

	@Override
	public String getLever(Date dateFrom, Date dateTo, int userId) throws SQLException {
		String result = LeverType.New.name();
		String sql = "SELECT sum(total) as total FROM orders where user_id=? and (cdate between ? and ?) and type = ? ";
		boolean check = false;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, userId);
			stmt.setInt(4, OrderType.ORDER_PACKAGE.getCode());
			Calendar cal = Calendar.getInstance();
			cal.setTime(dateFrom);
			cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_45);
			Calendar cal2 = Calendar.getInstance();
			cal2.setTime(dateTo);
			cal2.add(Calendar.DATE, -1);
			if (dateTo.after(cal.getTime())) {
				stmt.setDate(2, new java.sql.Date(dateFrom.getTime()));
				stmt.setDate(3, new java.sql.Date(cal.getTime().getTime()));
				check = true;
			} else {
				stmt.setDate(2, new java.sql.Date(dateFrom.getTime()));
				stmt.setDate(3, new java.sql.Date(cal2.getTime().getTime()));
			}
			rs = stmt.executeQuery();
			Double total = 0.0;
			while (rs.next()) {
				total = rs.getDouble(1);
			}
			if (check && total < LeverType.SALE_MEMBER.getAmount()) {
				Calendar cal1 = Calendar.getInstance();
				cal1.setTime(cal.getTime());
				cal1.set(Calendar.DAY_OF_MONTH, cal1.getActualMaximum(Calendar.DAY_OF_MONTH));
				if (dateTo.after(cal1.getTime())) {
					stmt.setDate(2, new java.sql.Date(cal.getTime().getTime()));
					stmt.setDate(3, new java.sql.Date(cal1.getTime().getTime()));
				} else {
					stmt.setDate(2, new java.sql.Date(cal.getTime().getTime()));
					stmt.setDate(3, new java.sql.Date(cal2.getTime().getTime()));
				}
				rs = stmt.executeQuery();
				while (rs.next()) {
					total = rs.getDouble(1);
				}
			}
			if (total >= LeverType.PRO_DISTRIBUTE.getAmount())
				return LeverType.PRO_DISTRIBUTE.name();
			else if (total >= LeverType.SALE_PRO.getAmount())
				return LeverType.SALE_PRO.name();
			else if (total >= LeverType.SALE_MEMBER.getAmount())
				return LeverType.SALE_MEMBER.name();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}

	@Override
	public int resetPassword(List<String> lstUserId, String password) throws SQLException {
		int result = 0;
		int id;
		String sql = "update users set password = ? where id = ?";
		try {
			conn = getConnection();
			if (lstUserId != null && lstUserId.size() > 0) {
				for (String userId : lstUserId) {
					id = Integer.parseInt(userId);
					if (isUserEnable(id)) {
						stmt = conn.prepareStatement(sql);
						stmt.setString(1, passwordEncoder.encode(password));
						stmt.setInt(2, id);
						result = stmt.executeUpdate();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}

	private boolean isUserEnable(int userId) throws SQLException {
		boolean result = false;
		String sql = "select enable from users where id =?";
		conn = getConnection();
		stmt = conn.prepareStatement(sql);
		stmt.setInt(1, userId);
		rs = stmt.executeQuery();
		while (rs.next()) {
			result = rs.getBoolean(1);
		}
		return result;
	}

	@Override
	public List<Feedback> getAllFeedback() throws SQLException {
		String sql = "select title , cdate , content , user_id from feedbacks";
		List<Feedback> result = new ArrayList<>();
		Feedback feedback = null;
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				feedback = new Feedback();
				feedback.setTitle(rs.getString(1));
				feedback.setCdate(rs.getDate(2));
				feedback.setContent(rs.getString(3));
				feedback.setUserId(rs.getInt(4));
				result.add(feedback);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			st.close();
			rs.close();
		}
		return result;
	}

	@Override
	public boolean isUserActive(int userId) throws SQLException {
		String sql = "select id from orders where (cdate between ? and now()) and user_id = ? and type =?";
		try {
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.MONTH, -1);
			cal.set(Calendar.DATE, 1);
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setDate(1, new java.sql.Date(cal.getTime().getTime()));
			stmt.setInt(2, userId);
			stmt.setInt(3,OrderType.ORDER_PROACTIVE.getCode());
			rs = stmt.executeQuery();
			return rs.next();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
	}

	@Override
	public boolean isProactive(int userId,Date date) throws SQLException {
		String sql = "Select cdate from orders where (cdate between ? and ?) and type = ? and user_id = ? order by cdate desc";
		try {
			Order order = new Order();
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.set(Calendar.DATE, 1);
			Date dateFrom = cal.getTime();
			cal.set(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_15);
			Date dateTo = cal.getTime();
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setDate(1, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(2, new java.sql.Date(dateTo.getTime()));
			stmt.setInt(3, OrderType.ORDER_PROACTIVE.getCode());
			stmt.setInt(4, userId);
			rs = stmt.executeQuery();
			while(rs.next()){
				order.setOrderDate(rs.getDate(1));
				break;
			}
			if(order.getOrderDate() == null)
				return false;
			else{
				if(date.after(order.getOrderDate()))
					return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return false;
	}

	@Override
	public List<User> getChild(int userId) throws SQLException {
		String sql = "Select id,child_id,cdate ,lever from users where parent_id = ?";
		List<User> lstUser = new ArrayList<>();
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, userId);
			rs = stmt.executeQuery();
			while(rs.next()){
				User user = new User();
				user.setId(rs.getInt(1));
				user.setChildId(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setLever(rs.getInt(4));
				lstUser.add(user);
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return lstUser;
	}

	@Override
	public Double getRevenuePersonal(User user, Date dateFrom , Date dateTo) throws SQLException {
		Double result = 0.0;
		String sql = "SELECT sum(total) as total FROM orders where user_id=? and (cdate between ? and ?)  and type = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, user.getId());
			stmt.setDate(2, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(3, new java.sql.Date(dateTo.getTime()));
			stmt.setInt(4, OrderType.ORDER_PRODUCT.getCode());
			rs = stmt.executeQuery();
			while(rs.next()){
				result = rs.getDouble(1);
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}

	@Override
	public List<User> getAllChild(String childId) throws SQLException {
		String sql = "Select id,child_id,cdate ,lever from users where child_id like ?";
		List<User> lstUser = new ArrayList<>();
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, childId+"-%");
			rs = stmt.executeQuery();
			while(rs.next()){
				User user = new User();
				user.setId(rs.getInt(1));
				user.setChildId(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setLever(rs.getInt(4));
				lstUser.add(user);
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return lstUser;
	}

	@Override
	public Double getAllRevenue(Date dateFrom, Date dateto) throws SQLException {
		String sql = "SELECT sum(total) as total FROM orders where cdate between ? and ?  and type = ? ";
		Double result = 0.0;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setDate(1, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(2, new java.sql.Date(dateto.getTime()));
			stmt.setInt(3, OrderType.ORDER_PRODUCT.getCode());
			rs = stmt.executeQuery();
			while(rs.next()){
				result =  rs.getDouble(1);
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}
	

}
