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
import constant.RevenueType;
import constant.TimePeriodCheck;
import model.Banner;
import model.EditRoleForm;
import model.Feedback;
import model.Order;
import model.Revenue;
import model.User;

@Repository
public class ManageDaoImpl extends DBManager implements ManageDao {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public int createMember(User parent, int lever) throws SQLException {
		int memberId = 0;
		String sql1 = "Insert into users(enable,parent_id,child_id,cdate,lever,id, birthday) values(0,?,?,now(),?,?, null)";
		String sql2 = "Insert into roles(role,user_id) values(?,?)";
		String sql3 = "insert into revenues(name,cdate,user_id,value,type,child_id) values(?,now(),?,?,?,?)";
		String sql4 = "insert into orders(name,cdate,user_id,price,quantity,type,total) values(?,now(),?,?,?,?,?)";
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
			stmt.setInt(4, memberId);
			stmt.executeUpdate();

			stmt = conn.prepareStatement(sql2);
			stmt.setString(1, "STAFF");
			stmt.setInt(2, memberId);
			stmt.executeUpdate();

			if (lever > 0) {
				stmt = conn.prepareStatement(sql3);
				stmt.setInt(2, parent.getId());
				stmt.setInt(4, RevenueType.DIRECT.getValue());
				stmt.setInt(5, memberId);
				if (lever == LeverType.SALE_MEMBER.getValue()) {
					stmt.setString(1, LeverType.SALE_MEMBER.name());
					stmt.setDouble(3, LeverType.SALE_MEMBER.getAmount() * 0.1);
				}
				if (lever == LeverType.SALE_PRO.getValue()) {
					stmt.setString(1, LeverType.SALE_PRO.name());
					stmt.setDouble(3, LeverType.SALE_PRO.getAmount() * 0.1);
				}
				if (lever == LeverType.PRO_DISTRIBUTE.getValue()) {
					stmt.setString(1, LeverType.PRO_DISTRIBUTE.name());
					stmt.setDouble(3, LeverType.PRO_DISTRIBUTE.getAmount() * 0.1);
				}
				stmt.executeUpdate();

				stmt = conn.prepareStatement(sql4);
				stmt.setInt(2, memberId);
				stmt.setInt(5, OrderType.ORDER_PRODUCT.getCode());
				stmt.setInt(4, 1);
				if (lever == LeverType.SALE_MEMBER.getValue()) {
					stmt.setString(1, LeverType.SALE_MEMBER.name());
					stmt.setDouble(3, LeverType.SALE_MEMBER.getAmount());
					stmt.setDouble(6, LeverType.SALE_MEMBER.getAmount());
				}
				if (lever == LeverType.SALE_PRO.getValue()) {
					stmt.setString(1, LeverType.SALE_PRO.name());
					stmt.setDouble(3, LeverType.SALE_PRO.getAmount());
					stmt.setDouble(6, LeverType.SALE_PRO.getAmount());
				}
				if (lever == LeverType.PRO_DISTRIBUTE.getValue()) {
					stmt.setString(1, LeverType.PRO_DISTRIBUTE.name());
					stmt.setDouble(3, LeverType.PRO_DISTRIBUTE.getAmount());
					stmt.setDouble(6, LeverType.PRO_DISTRIBUTE.getAmount());
				}
				stmt.executeUpdate();
			}

			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			conn.rollback();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return memberId;
	}

	@Override
	public List<User> getStaffs() throws SQLException {
		List<User> result = new ArrayList<>();
		String sql = "SELECT distinct u.id,u.name,u.cdate,u.enable,o.order_date,r.role,u.parent_id,u.lever,u.phone,u.email,u.bank_name,u.bank_account,u.bank_branch FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF'";
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
				user.setPhone(rs.getString(9));
				user.setEmail(rs.getString(10));
				user.setBankName(rs.getString(11));
				user.setBankAccount(rs.getString(12));
				user.setBankBranch(rs.getString(13));

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
			closeConnection(conn, stmt, rs, st);
		}
		return result;
	}

	@Override
	public List<User> getMembers() throws SQLException {
		List<User> result = new ArrayList<>();

		String sql = "SELECT distinct u.id,u.name,u.cdate,u.enable,o.order_date,r.role,u.parent_id,u.lever,u.child_id,u.phone,u.email,u.bank_name,u.bank_account,u.bank_branch  FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF' or r.role = 'ADMIN'";
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
				user.setPhone(rs.getString(10));
				user.setEmail(rs.getString(11));
				user.setBankName(rs.getString(12));
				user.setBankAccount(rs.getString(13));
				user.setBankBranch(rs.getString(14));
				if (lever == LeverType.SALE_MEMBER.getValue())
					user.setLeverValue(LeverType.SALE_MEMBER.name());
				else if (lever == LeverType.SALE_PRO.getValue())
					user.setLeverValue(LeverType.SALE_PRO.name());
				else if (lever == LeverType.PRO_DISTRIBUTE.getValue())
					user.setLeverValue(LeverType.PRO_DISTRIBUTE.name());
				else
					user.setLeverValue(LeverType.New.name());
				user.setChildId(rs.getString(9));
				result.add(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
		}
		return user;
	}

	@Override
	public List<Order> getAllOrder() throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql = "SELECT user_id,name,cdate,price,quantity,type,total,id FROM orders where type = 1";
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
		}
		return lstOrder;
	}

	@Override
	public List<Order> getAllOrderPersonal(String userCode, Date dateFrom, Date dateTo) throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql = "SELECT user_id,name,cdate,price,quantity,type,total,id FROM orders where user_id = ? AND cdate between ? and ? ";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, userCode);
			stmt.setDate(2, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(3, new java.sql.Date(dateTo.getTime()));
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
		closeConnection(conn, stmt, rs, st);
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
			closeConnection(conn, stmt, rs, st);
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
			stmt.setInt(3, OrderType.ORDER_PROACTIVE.getCode());
			rs = stmt.executeQuery();
			return rs.next();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}

	@Override
	public boolean isProactive(int userId, Date date) throws SQLException {
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
			while (rs.next()) {
				order.setOrderDate(rs.getDate(1));
				break;
			}
			if (order.getOrderDate() == null)
				return false;
			else {
				if (date.after(order.getOrderDate()))
					return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
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
			while (rs.next()) {
				User user = new User();
				user.setId(rs.getInt(1));
				user.setChildId(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setLever(rs.getInt(4));
				lstUser.add(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return lstUser;
	}

	@Override
	public Double getRevenuePersonal(User user, Date dateFrom, Date dateTo) throws SQLException {
		Double result = 0.0;
		String sql = "SELECT sum(total) as total FROM orders where user_id=? and (date_format(cdate, '%Y-%m-%d') between ? and ?)";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, user.getId());
			stmt.setDate(2, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(3, new java.sql.Date(dateTo.getTime()));
			// stmt.setInt(4, OrderType.ORDER_PRODUCT.getCode());
			rs = stmt.executeQuery();
			while (rs.next()) {
				result = rs.getDouble(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
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
			stmt.setString(1, childId + "-%");
			rs = stmt.executeQuery();
			while (rs.next()) {
				User user = new User();
				user.setId(rs.getInt(1));
				user.setChildId(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setLever(rs.getInt(4));
				lstUser.add(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return lstUser;
	}

	@Override
	public Double getAllRevenue(Date dateFrom, Date dateto) throws SQLException {
		String sql = "SELECT sum(total) as total FROM orders where date_format(cdate, '%Y-%m-%d') between ? and ?";
		Double result = 0.0;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setDate(1, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(2, new java.sql.Date(dateto.getTime()));
			rs = stmt.executeQuery();
			while (rs.next()) {
				result = rs.getDouble(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return result;
	}

	@Override
	public List<Order> getAllOrder(Date dateFrom, Date dateTo, int userId) throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql = "SELECT user_id,name,cdate,price,quantity,type,total,id FROM orders where (cdate between ? and ? ) and user_id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setDate(1, new java.sql.Date(dateFrom.getTime()));
			stmt.setDate(2, new java.sql.Date(dateTo.getTime()));
			stmt.setInt(3, userId);
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
			closeConnection(conn, stmt, rs, st);
		}
		return lstOrder;
	}

	@Override
	public Date getLatestDateProActive(int userID) throws SQLException {
		String sql = "Select cdate from orders where  type = ? and user_id = ? order by cdate desc";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, OrderType.ORDER_PROACTIVE.getCode());
			stmt.setInt(2, userID);
			rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getDate(1);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return null;
	}

	@Override
	public int updateLeverUser(int userID, int lever) throws SQLException {
		String sql = "update users set lever = ? where id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, lever);
			stmt.setInt(2, userID);
			return stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}

	@Override
	public Double totalOrderValue(Date start, Date end, int userId) throws SQLException {
		String sql = "select total from orders where type = ? and (date_format(cdate, '%Y-%m-%d') between ? and ?) and user_id  = ?";
		Double result = 0.0;
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, OrderType.ORDER_PRODUCT.getCode());
			stmt.setDate(2, new java.sql.Date(start.getTime()));
			stmt.setDate(3, new java.sql.Date(end.getTime()));
			stmt.setInt(4, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				result += rs.getDouble(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0.0;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return result;
	}

	@Override
	public List<Banner> getAllBanner() throws SQLException {
		List<Banner> result = new ArrayList<>();
		String sql = "select name,cdate,id,image_url from banners";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				Banner banner = new Banner();
				banner.setName(rs.getString(1));
				banner.setCdate(rs.getDate(2));
				banner.setId(rs.getInt(3));
				banner.setImageUrl(rs.getString(4));
				result.add(banner);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return result;
	}

	@Override
	public int createBanner(Banner banner) throws SQLException {
		String sql = "insert into banners(name,cdate,image_url) values(?,now(),?)";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, banner.getName());
			stmt.setString(2, banner.getImageUrl());
			return stmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}

	@Override
	public int deleteBanner(int id) throws SQLException {
		String sql = "delete from banners where id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			return stmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}

	@Override
	public Order getOrderByUser(User user) throws SQLException {
		Order order = new Order();
		String sql = "select id,cdate from orders where user_id = ? and (date_format(cdate, '%Y-%m-%d') = ?) order by cdate";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, user.getId());
			stmt.setDate(2, new java.sql.Date(user.getCdate().getTime()));
			rs = stmt.executeQuery();
			while (rs.next()) {
				order.setId(rs.getInt(1));
				order.setOrderDate(rs.getDate(2));
				return order;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return null;
	}

	@Override
	public int deleteOrder(int id) throws SQLException {
		String sql = "delete from orders where id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			return stmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}

	@Override
	public int deleteRevenues(Revenue revenue) throws SQLException {
		String sql = "delete from revenues where user_id = ? and child_id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, revenue.getReceiverId());
			stmt.setInt(2, revenue.getByerId());
			return stmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}

	@Override
	public int updateRevenue(Revenue revenue) throws SQLException {
		int result = 0;
		String sql = "update revenues set name =? ,value=? where user_id =? and child_id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, revenue.getOrderName());
			stmt.setDouble(2, revenue.getOrderPrice());
			stmt.setInt(3, revenue.getReceiverId());
			stmt.setInt(4, revenue.getByerId());
			result = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return result;
	}

	@Override
	public int createRevenue(Revenue revenue) throws SQLException {
		int result = 0;
		String sql = "insert into revenues(name,cdate,user_id,value,type,child_id) values(?,?,?,?,?,?)";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, revenue.getOrderName());
			stmt.setDate(2, new java.sql.Date(revenue.getCdate().getTime()));
			stmt.setInt(3, revenue.getReceiverId());
			stmt.setDouble(4, revenue.getOrderPrice());
			stmt.setInt(5, revenue.getType());
			stmt.setInt(6, revenue.getByerId());
			result = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return result;
	}

	@Override
	public List<Order> getAllOrderType() throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql = "SELECT user_id,cdate,price*quantity FROM orders";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				Order order = new Order();
				order.setUserId(rs.getInt(1));
				order.setOrderDate(rs.getDate(2));
				order.setTotal(rs.getDouble(3));
				lstOrder.add(order);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return lstOrder;
	}

	@Override
	public Date getCurrentBackOffice(int userId) throws SQLException {
		String sql = "SELECT back_office from users where id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getDate(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
		return null;
	}

	@Override
	public int updateBackOffice(int userId, Date date) throws SQLException {
		String sql = "update users set back_office = ? where id = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(2, userId);
			stmt.setDate(1, new java.sql.Date(date.getTime()));
			return stmt.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		} finally {
			closeConnection(conn, stmt, rs, st);
		}
	}
}
