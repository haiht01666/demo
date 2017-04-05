package dao;

import java.sql.SQLException;
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
	public List<User> getStaffs() {
		String sql = "Select * from ";
		return null;
	}

	@Override
	public List<User> getMembers() {
		// TODO Auto-generated method stub
		return null;
	}

}
