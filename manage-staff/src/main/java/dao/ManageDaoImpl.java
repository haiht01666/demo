package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import constant.LeverType;
import constant.OrderType;
import model.EditRoleForm;
import model.Order;
import model.User;

@Repository
public class ManageDaoImpl extends DBManager implements ManageDao {

	@Override
	public int createMember(User parent,int lever) throws SQLException {
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
		try{
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);	
			while(rs.next()){
				User user = new User();
				user.setId(rs.getInt(1));
				user.setDispName(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setEnable(rs.getBoolean(4));
				user.setLastOrderDate(rs.getDate(5));
				user.setRole(rs.getString(6));
				user.setParentId(rs.getInt(7));
				int lever = rs.getInt(8);
				if(lever == LeverType.SALE_MEMBER.getValue())
					user.setLeverValue(LeverType.SALE_MEMBER.name());
				else if(lever == LeverType.SALE_PRO.getValue())
					user.setLeverValue(LeverType.SALE_PRO.name());
				else if(lever == LeverType.PRO_DISTRIBUTE.getValue())
					user.setLeverValue(LeverType.PRO_DISTRIBUTE.name());
				else
					user.setLeverValue(LeverType.New.name());
				result.add(user);
				
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		}finally{
			conn.close();
			st.close();
			rs.close();
		}
		return result;
	}

	@Override
	public List<User> getMembers() throws SQLException{
		List<User> result = new ArrayList<>();
		
		String sql = "SELECT u.id,u.name,u.cdate,u.enable,o.order_date,r.role,u.parent_id,u.lever FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF' or r.role = 'ADMIN'";
		try{
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while(rs.next()){
				User user = new User();
				user.setId(rs.getInt(1));
				user.setDispName(rs.getString(2));
				user.setCdate(rs.getDate(3));
				user.setEnable(rs.getBoolean(4));
				user.setLastOrderDate(rs.getDate(5));
				user.setRole(rs.getString(6));
				user.setParentId(rs.getInt(7));
				int lever = rs.getInt(8);
				if(lever == LeverType.SALE_MEMBER.getValue())
					user.setLeverValue(LeverType.SALE_MEMBER.name());
				else if(lever == LeverType.SALE_PRO.getValue())
					user.setLeverValue(LeverType.SALE_PRO.name());
				else if(lever == LeverType.PRO_DISTRIBUTE.getValue())
					user.setLeverValue(LeverType.PRO_DISTRIBUTE.name());
				else
					user.setLeverValue(LeverType.New.name());
				result.add(user);
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new SQLException();
		}finally{
			conn.close();
			st.close();
			rs.close();
		}
		return result;
	}

	@Override
	public int editRole(EditRoleForm formdata) throws SQLException {
		String sql = "Update roles set role = ? where user_id = ? ";
		try{
			conn = getConnection();
			conn.setAutoCommit(false);
			for(String userId : formdata.getLstUserId()){
				stmt = conn.prepareStatement(sql);
				stmt.setString(1, formdata.getRole());
				stmt.setInt(2, Integer.parseInt(userId));
				stmt.executeUpdate();
			}
			conn.commit();
		}catch(Exception e){
			conn.rollback();
			e.printStackTrace();
			throw new SQLException();
		}
		finally{
			conn.close();
			st.close();
		}
		return 1;
	}

	@Override
	public User getUserById(int id) throws SQLException {
		User user = new User();
		String sql = "SELECT name , email , cdate ,phone,bank_name,bank_account,bank_branch,parent_id,lever,child_id FROM users where id = ?";
		try{
		conn = getConnection();
		stmt= conn.prepareStatement(sql);
		stmt.setInt(1, id);
		rs = stmt.executeQuery();
		while(rs.next()){
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
			break;
		}
		}catch(Exception e){
			e.printStackTrace();
			throw new SQLException();
		}finally{
			conn.close();
			stmt.close();
			rs.close();
		}
		return user;
	}

	@Override
	public List<Order> getAllOrder() throws SQLException {
		List<Order> lstOrder = new ArrayList<>();
		String sql ="SELECT user_id,user_name,name,cdate,price,quantity,type,total FROM orders";
		try{
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while(rs.next()){
				Order order = new Order();
				order.setUserId(rs.getInt(1));
				order.setUserName(rs.getString(2));
				order.setOrderName(rs.getString(3));
				order.setOrderDate(rs.getDate(4));
				order.setPrice(rs.getDouble(5));
				order.setQuantity(rs.getInt(6));
				int type = rs.getInt(7);
				if(type == OrderType.ORDER_PROACTIVE.getCode())
					order.setTypeValue(OrderType.ORDER_PROACTIVE.getValue());
				else if(type == OrderType.ORDER_PACKAGE.getCode())
					order.setTypeValue(OrderType.ORDER_PACKAGE.getValue());
				else if(type == OrderType.ORDER_PRODUCT.getCode())
					order.setTypeValue(OrderType.ORDER_PRODUCT.getValue());
				else 
					order.setTypeValue(OrderType.ORDER_PRODUCT.DefaultValue());
				order.setTotal(rs.getDouble(8));
				lstOrder.add(order);
			}
		}catch(Exception e){
			e.printStackTrace();
			throw new SQLException();
		}finally{
			conn.close();
			st.close();
			rs.close();
		}
		return lstOrder;
	}

	@Override
	public int createOrder(Order order) throws SQLException {
		int result = 0;
		String sql ="insert into orders(name,cdate,user_name,user_id,price,quantity,type,total) values(?,now(),?,?,?,?,?,?)";
		try{
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, order.getOrderName());
			stmt.setString(2, order.getUserName());
			stmt.setInt(3, order.getUserId());
			stmt.setDouble(4, order.getPrice());
			stmt.setInt(5, order.getQuantity());
			stmt.setInt(6, order.getType());
			stmt.setDouble(7, order.getPrice()*order.getQuantity());
			result = stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			throw new SQLException();
		}finally{
			conn.close();
			stmt.close();
		}
		return result;
	}

	@Override
	public Double totalOrderPrice(User user, int numberDay) throws SQLException {
		Double result = 0d;
		String sql = "SELECT sum(total) as total FROM orders where user_id=? and cdate between cdate and (cdate + INTERVAL ? DAY) group by user_id  ";
		try{
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, user.getId());
			stmt.setInt(2, numberDay);
			rs = stmt.executeQuery();
			while(rs.next()){
				result = rs.getDouble(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			throw new SQLException();
		}finally{
			conn.close();
			stmt.close();
		}
		return result;
	}

}
