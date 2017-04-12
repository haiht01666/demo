package dao;

import model.User;
import org.springframework.stereotype.Repository;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository public class ApiDaoImpl extends DBManager implements ApiDao {

    @Override public User getLoginInfo(String userId) {
        User user = new User();
        String sql = "SELECT u.id ,name,email, address, phone, birthday ,identifier, bank_name, bank_account, bank_branch, bank_user, avatar, child_id,city FROM users u where u.id=?";
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
                user.setBankBranch(rs.getString(10));
                user.setBankUser(rs.getString(11));
                Blob blob = rs.getBlob(12);
                BASE64Encoder encoder = new BASE64Encoder();
                String blobStr = encoder.encode(blob.getBytes(1, (int) blob.length()));
                user.setUserAvatar(blobStr);
                user.setChildId(rs.getString(13));
                user.setCity(rs.getString(14));
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
        String sql = "UPDATE users SET address = ?, phone = ?, email = ?, bank_name = ?, bank_account = ?, bank_branch = ?, bank_user = ?, city = ? where id=?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, user.getAddress());
            stmt.setString(2, user.getPhone());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getBankName());
            stmt.setString(5, user.getBankAccount());
            stmt.setString(6, user.getBankBranch());
            stmt.setString(7, user.getBankUser());
            stmt.setString(8, user.getUserCode());
            stmt.setString(9, user.getCity());
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

    @Override public int saveAvatar(User user) {
        int record = 0;
        String sql = "UPDATE users SET avatar = ? where id=?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            // set avatar
            BASE64Decoder decoder = new BASE64Decoder();
            byte[] imageByte = decoder.decodeBuffer(user.getUserAvatar());
            Blob avatar = conn.createBlob();
            avatar.setBytes(1, imageByte);
            stmt.setBlob(1, avatar);
            stmt.setString(2, user.getUserCode());
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

    @Override public int changePassword(String userCode, String newPass) {
        int record = 0;
        String sql = "UPDATE users SET password = ? where id=?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, newPass);
            stmt.setString(2, userCode);
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

    @Override public int requestSupport(String userCode, String userName, String title, String content) {
        int record = 0;
        String sql = "INSERT INTO feedbacks (title, content, user_id, user_name, cdate) VALUES (?,?,?,?, NOW())";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, title);
            stmt.setString(2, content);
            stmt.setString(3, userCode);
            stmt.setString(4, userName);
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

    @Override public long getTotalAllNpp(String userCode, String childId) {
        long totalRecord = 0;
        String sql = "SELECT count(*) FROM users u1 where u1.child_id LIKE CONCAT('%', ? , '-%')";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            rs = stmt.executeQuery();
            while (rs.next()) {
                totalRecord =  rs.getInt(1);
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
        return totalRecord;
    }

    @Override public List<User> getAllNpp(String userCode, String childId, int litmit, int offset) {
        List<User> listAllNpp = new ArrayList<>();
        String sql = "SELECT u1.id, u1.name, u1.child_id, u1.parent_id, u2.name parent_name, u1.signup_date, u1.phone, u1.city, u1.enable FROM users u1 LEFT JOIN users u2 on u1.parent_id  = u2.id where u1.child_id LIKE CONCAT('%', ? , '-%') ORDER BY u1.id LIMIT ?,?";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            stmt.setInt(2, offset);
            stmt.setInt(3, litmit);
            rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User();
                user.setUserCode(rs.getString(1));
                user.setDispName(rs.getString(2));
                user.setChildId(rs.getString(3));
                user.setParentId(rs.getInt(4));
                user.setParentName(rs.getInt(5));
                user.setSignUpDate(rs.getDate(6));
                user.setPhone(rs.getString(7));
                user.setCity(rs.getString(8));
                user.setEnable(rs.getBoolean(9));
                listAllNpp.add(user);
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
        return listAllNpp;
    }
}
