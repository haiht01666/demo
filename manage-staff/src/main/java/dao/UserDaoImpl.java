package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import model.User;

@Repository
public class UserDaoImpl extends DBManager implements UserDao {
	PreparedStatement stmt = null;
	Statement st = null;
	Connection conn = null;
	ResultSet rs = null;

	@Override
	public User getUserByCode(String code) {
		User user = new User();
		String sql = "SELECT code ,password,dispname,enable,role FROM users u join user_role r on u.code = r.usercode where code=?;";
		List<String> roles = new ArrayList<>();
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, Integer.parseInt(code));
			rs = stmt.executeQuery();
			while(rs.next()){
				user.setUserCode(rs.getString(1));
				user.setPassWord(rs.getString(2));
				user.setDispName(rs.getString(3));
				user.setEnable(rs.getBoolean(4));
				roles.add(rs.getString(5));
				break;
			}
			user.setRoles(roles);
		} catch (Exception ex) {
			ex.printStackTrace();
		}finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return user;
	}

}
