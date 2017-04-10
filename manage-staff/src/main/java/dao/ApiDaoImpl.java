package dao;

import model.User;
import org.springframework.stereotype.Repository;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayOutputStream;
import java.sql.Blob;
import java.sql.Date;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Repository
public class ApiDaoImpl extends DBManager implements ApiDao {

	@Override public User getLoginInfo(String userId) {
		User user = new User();
		String sql = "SELECT u.id ,name,email, address, phone, birthday ,identifier, bank_name, bank_account, bank_address, bank_user, avatar FROM users u where u.id=?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				user.setUserCode(rs.getString(1));
				user.setDispName(rs.getString(2));
				user.setEmail(rs.getString(3));
				user.setAddress(rs.getString(4));
				user.setPhone(rs.getString(5));
				user.setBirthday(rs.getDate(6));
				user.setIdentifier(rs.getString(7));
				user.setBankName(rs.getString(8));
				user.setBankAccount(rs.getString(9));
				user.setBankAddress(rs.getString(10));
				user.setBankUser(rs.getString(11));
				Blob blob = rs.getBlob(11);
				String blobStr = new String(blob.getBytes(1, (int)blob.length()));
				user.setUserAvatar(blobStr);
			}
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
	@Override public String getPasswordEncrypt(String userId) {
		String password = "";
		String sql = "SELECT password FROM users u where u.id=?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				password = rs.getString(1);
			}
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
		return password;
	}

	@Override public int updatePersonalInfo(User user) {
		int record = 0;
		String sql = "UPDATE users SET address = ?, phone = ?, email = ?, bank_name = ?, bank_account = ?, bank_address = ?, bank_user = ?, avatar = ? where id=?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, user.getAddress());
			stmt.setString(2, user.getPhone());
			//DateFormat df = new SimpleDateFormat("dd/MM/YYYY");
			//stmt.setDate(3, new Date(user.getBirthday().getTime()));
			stmt.setString(3, user.getEmail());
			stmt.setString(4, user.getBankName());
			stmt.setString(5, user.getBankAccount());
			stmt.setString(6, user.getBankAddress());
			stmt.setString(7, user.getBankUser());
			// set avatar
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] imageByte = decoder.decodeBuffer(user.getUserAvatar());
			Blob avatar =  getConnection().createBlob();
			avatar.setBytes(1, imageByte);
			stmt.setBlob(8, avatar);
			stmt.setString(9, user.getUserCode());
			record = stmt.executeUpdate();
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
		return record;
	}
}
