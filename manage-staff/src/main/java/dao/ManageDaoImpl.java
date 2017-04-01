package dao;

import java.sql.SQLException;

import org.springframework.stereotype.Repository;

@Repository
public class ManageDaoImpl extends DBManager implements ManageDao {

	@Override
	public int createMember(int parentId) throws SQLException {
		int memberId = 0;
		String sql1 = "Insert into users(enable,parent_id) values(0,?)";
		String sql2 = "Insert into roles(role,user_id) values(?,?)";
		try {
			conn = getConnection();
			conn.setAutoCommit(false);
			stmt = conn.prepareStatement(sql1);
			stmt.setInt(1, parentId);
			stmt.executeUpdate();
			st = conn.createStatement();
			// get last id insert
			rs = st.executeQuery("SELECT LAST_INSERT_ID()");
			while (rs.next()) {
				memberId = rs.getInt(1);
			}
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

}
