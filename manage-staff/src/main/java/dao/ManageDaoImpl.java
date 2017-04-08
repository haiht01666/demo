package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import model.EditRoleForm;
import model.Order;
import model.User;

@Repository
public class ManageDaoImpl extends DBManager implements ManageDao {

	@Override
	public int createMember(int parentId,String childId) throws SQLException {
		int memberId = 0;
		String sql1 = "Insert into users(enable,parent_id,child_id,cdate) values(0,?,?,now())";
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
			stmt.setInt(1, parentId);
			stmt.setString(2, childId + "-" + memberId);
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
		String sql = "SELECT u.id,u.name,u.cdate,u.enable,o.order_date,r.role FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF'";
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
		
		String sql = "SELECT u.id,u.name,u.cdate,u.enable,o.order_date,r.role FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF' or r.role = 'ADMIN'";
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
		String sql = "SELECT name , email , cdate ,phone,bank_name,bank_account,bank_address FROM users where id = ?";
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
			user.setBankAddress(rs.getString(7));
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
				order.setType(rs.getString(7));
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

}
