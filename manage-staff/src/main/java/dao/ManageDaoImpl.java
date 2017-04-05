package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

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
		String sql = "SELECT u.id,u.name,u.signup_date,u.enable,o.order_date FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF'";
		try{
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while(rs.next()){
				User user = new User();
				user.setId(rs.getInt(1));
				user.setDispName(rs.getString(2));
				user.setSignUpDate(rs.getDate(3));
				user.setEnable(rs.getBoolean(4));
				user.setLastOrderDate(rs.getDate(5));
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
		String sql = "SELECT u.id,u.name,u.signup_date,u.enable,o.order_date FROM users u join roles r on u.id = r.user_id left join (select max(cdate) as order_date , user_id from orders) o on u.id = o.user_id WHERE r.role = 'STAFF' or r.role = 'ADMIN'";
		try{
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while(rs.next()){
				User user = new User();
				user.setId(rs.getInt(1));
				user.setDispName(rs.getString(2));
				user.setSignUpDate(rs.getDate(3));
				user.setEnable(rs.getBoolean(4));
				user.setLastOrderDate(rs.getDate(5));
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

}
