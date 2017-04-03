package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import model.User;
import model.UserForm;

@Repository
public class UserDaoImpl extends DBManager implements UserDao {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User getUserByCode(String code) {
		User user = new User();
		String sql = "SELECT u.id ,password,name,enable,role,child_id FROM users u join roles r on u.id = r.user_id where u.id=?";
		List<String> roles = new ArrayList<>();
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, Integer.parseInt(code));
			rs = stmt.executeQuery();
			while (rs.next()) {
				user.setUserCode(rs.getString(1));
				user.setPassWord(rs.getString(2));
				user.setDispName(rs.getString(3));
				user.setEnable(rs.getBoolean(4));
				roles.add(rs.getString(5));
				user.setChildId(rs.getString(6));
				break;
			}
			user.setRoles(roles);
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return user;
	}

	@Override
	public boolean isUserEnable(int id) {
		String sql = "Select id,enable from users where id=?";
		User user = new User();
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			rs = stmt.executeQuery();
			while (rs.next()) {
				user.setId(rs.getInt(1));
				user.setEnable(rs.getBoolean(2));
			}
			if (!user.isEnable())
				return true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return false;
	}

	@Override
	public int createUser(UserForm user) {
		String sql = "Update users set name = ? , email = ? , phone = ? , bank_name = ? , bank_account =? , bank_address = ? , password = ? , enable = ? , signup_date = now() where id = ? ";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, user.getName());
			stmt.setString(2, user.getEmail());
			stmt.setString(3, user.getPhone());
			stmt.setString(4, user.getBankName());
			stmt.setString(5, user.getBankAccount());
			stmt.setString(6, user.getBankAdd());
			stmt.setString(7, passwordEncoder.encode(user.getPassword()));
			stmt.setBoolean(8, true);
			stmt.setInt(9, Integer.parseInt(user.getId()));
			return stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

}
