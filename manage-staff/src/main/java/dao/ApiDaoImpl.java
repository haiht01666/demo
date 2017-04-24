package dao;

import constant.OrderType;
import model.Order;
import model.User;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Repository public class ApiDaoImpl extends DBManager implements ApiDao {

    private String childQuery = "SELECT " +
                        "			u1.id " +
                        "		FROM " +
                        "			users u1 " +
                        "		LEFT JOIN users u2 ON u1.parent_id = u2.id " +
                        "		WHERE " +
                        "			u1.child_id LIKE CONCAT('%', ?, '-%') ";


    @Override public User getLoginInfo(String userId) {
        User user = new User();
        String sql = "SELECT u1.id ,u1.name,u1.email, u1.address, u1.phone, u1.birthday ,u1.identifier, u1.bank_name, u1.bank_account, u1.bank_branch, u1.bank_user, u1.avatar, u1.child_id, u1.city, u2.name as parentname, u1.signup_date FROM users u1 LEFT JOIN users u2 on u1.parent_id = u2.id where u1.id=?";
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
                if(blob != null) {
                    BASE64Encoder encoder = new BASE64Encoder();
                    String blobStr = encoder.encode(blob.getBytes(1, (int) blob.length()));
                    user.setUserAvatar(blobStr);
                }
                user.setChildId(rs.getString(13));
                user.setCity(rs.getString(14));
                user.setParentName(rs.getString(15));
                user.setSignUpDate(rs.getDate(16));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            closeConnection(conn, stmt, rs);
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
            closeConnection(conn, stmt, rs);
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
            stmt.setString(8, user.getCity());
            stmt.setString(9, user.getUserCode());
            record = stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            closeConnection(conn, stmt, rs);
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
            closeConnection(conn, stmt, rs);
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
            closeConnection(conn, stmt, rs);
        }
        return record;
    }

    @Override public int requestSupport(String userCode, String title, String content) {
        int record = 0;
        String sql = "INSERT INTO feedbacks (title, content, user_id, cdate) VALUES (?,?,?, NOW())";
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, title);
            stmt.setString(2, content);
            stmt.setString(3, userCode);
            record = stmt.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            closeConnection(conn, stmt, rs);
        }
        return record;
    }

    @Override public long getTotalNpp(boolean directNpp, String userCode) {
        long totalRecord = 0;
        String sql;
        if (directNpp) {
            sql = "SELECT count(*) FROM users u1 where u1.parent_id = ?";
        } else {
            sql = "SELECT count(*) FROM users u1 where u1.child_id LIKE CONCAT('%', ? , '-%')";
        }
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            rs = stmt.executeQuery();
            while (rs.next()) {
                totalRecord = rs.getInt(1);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            closeConnection(conn, stmt, rs);
        }
        return totalRecord;
    }

    @Override public List<User> getNpp(boolean directNpp, String userCode, Integer limit, Integer offset,
            String orderby) {
        List<User> listAllNpp = new ArrayList<>();
        String sql;
        if (directNpp) {
            sql = "SELECT u1.id, u1.name, u1.child_id, u1.parent_id, u2.name parent_name, u1.signup_date, u1.phone, u1.city, u1.enable FROM users u1 LEFT JOIN users u2 on u1.parent_id  = u2.id where u1.parent_id = ? ORDER BY u1."
                    + orderby;
        } else {
            sql = "SELECT u1.id, u1.name, u1.child_id, u1.parent_id, u2.name parent_name, u1.signup_date, u1.phone, u1.city, u1.enable FROM users u1 LEFT JOIN users u2 on u1.parent_id  = u2.id where u1.child_id LIKE CONCAT('%', ? , '-%') ORDER BY u1."
                    + orderby;
        }
        if (limit != -1) {
            sql += " LIMIT ?,?";
        }
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            if (limit != -1) {
                stmt.setInt(2, offset);
                stmt.setInt(3, limit);
            }
            rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User();
                user.setUserCode(rs.getString(1));
                user.setDispName(rs.getString(2));
                user.setChildId(rs.getString(3));
                user.setParentId(rs.getInt(4));
                user.setParentName(rs.getString(5));
                user.setSignUpDate(rs.getDate(6));
                user.setPhone(rs.getString(7));
                user.setCity(rs.getString(8));
                user.setEnable(rs.getBoolean(9));
                listAllNpp.add(user);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            closeConnection(conn, stmt, rs);
        }
        return listAllNpp;
    }

    @Override public long getTotalOrder(String userCode) {
        long totalRecord = 0;
        String sql;
            sql = "SELECT count(*) FROM orders o where user_id IN (" + childQuery + ")" + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode();
        try {
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            rs = stmt.executeQuery();
            while (rs.next()) {
                totalRecord = rs.getInt(1);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            closeConnection(conn, stmt, rs);
        }
        return totalRecord;
    }

    @Override
    public List<Order> getListOrder(String userCode, Integer limit, Integer offset, String orderby) {
        List<Order> lstOrder = new ArrayList<>();
        String sql = "SELECT " +
                    "	o.user_id, " +
                    "	u. NAME user_name, " +
                    "	o. NAME, " +
                    "	o.cdate, " +
                    "	o.price, " +
                    "	o.quantity, " +
                    "	o.type, " +
                    "	o.total, " +
                    "	u.child_id " +
                    "FROM " +
                    "	orders o " +
                    "LEFT JOIN users u ON o.user_id = u.id " +
                    "WHERE " +
                    "	o.user_id IN (" + childQuery + ")" +
                    "   AND o.type=" + OrderType.ORDER_PRODUCT.getCode() +
                    " order by o." + orderby;
        if (limit != -1) {
            sql += " LIMIT ?,?";
        }
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            if (limit != -1) {
                stmt.setInt(2, offset);
                stmt.setInt(3, limit);
            }
            rs = stmt.executeQuery();
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
                order.setChildId(rs.getString(9));
                lstOrder.add(order);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return lstOrder;
    }

    @Override public BigDecimal getWeekGroupVolume(String userCode, String startDate, String endDate) {
        BigDecimal weekGroupVolume = new BigDecimal(0);
        String sql ="SELECT sum(total) as total FROM orders o where (user_id IN ("+ childQuery  +") OR user_id = ?)" + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode() + " AND cdate between STR_TO_DATE(CONCAT(?,' 00:00:00'), '%d/%m/%Y %T') AND STR_TO_DATE(CONCAT(?,' 23:59:59'), '%d/%m/%Y %T')";
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            stmt.setString(2, userCode);
            stmt.setString(3, startDate);
            stmt.setString(4, endDate);
            rs = stmt.executeQuery();
            while(rs.next()){
                weekGroupVolume = rs.getBigDecimal(1);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return weekGroupVolume;
    }
    @Override public BigDecimal getWeekPersonalVolume(String userCode, String startDate, String endDate) {
        BigDecimal weekGroupVolume = new BigDecimal(0);
        String sql ="SELECT sum(total) as total FROM orders o where user_id = ? " + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode() + " AND cdate between STR_TO_DATE(CONCAT(?,' 00:00:00'), '%d/%m/%Y %T') AND STR_TO_DATE(CONCAT(?,' 23:59:59'), '%d/%m/%Y %T')";
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            stmt.setString(2, startDate);
            stmt.setString(3, endDate);
            rs = stmt.executeQuery();
            while(rs.next()){
                weekGroupVolume = rs.getBigDecimal(1);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return weekGroupVolume;
    }
    @Override public BigDecimal getMonthPersonalVolume(String userCode, String monthYear) {
        BigDecimal monthPersonalVolume = new BigDecimal(0);
        String sql ="SELECT sum(total) as total FROM orders o where user_id = ? " + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode() + " and  DATE_FORMAT(cdate,'%m/%Y') = ?";
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1    , userCode);
            stmt.setString(2, monthYear);
            rs = stmt.executeQuery();
            while(rs.next()){
                monthPersonalVolume = rs.getBigDecimal(1);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return monthPersonalVolume;
    }

    @Override public BigDecimal getMonthGroupVolume(String userCode, String monthYear) {
        BigDecimal monthGroupVolume = new BigDecimal(0);
        String sql ="SELECT sum(total) as total FROM orders o where (user_id IN ("+ childQuery  +") OR user_id = ?) " + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode() + " and  DATE_FORMAT(cdate,'%m/%Y') = ?";
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            stmt.setString(2, userCode);
            stmt.setString(3, monthYear);
            rs = stmt.executeQuery();
            while(rs.next()){
                monthGroupVolume = rs.getBigDecimal(1);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return monthGroupVolume;
    }

    @Override public BigDecimal getYearPersonalVolume(String userCode, String year) {
        BigDecimal monthPersonalVolume = new BigDecimal(0);
        String sql ="SELECT sum(total) as total FROM orders o where user_id = ? " + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode() + " and  DATE_FORMAT(cdate,'%Y') = ?";
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1    , userCode);
            stmt.setString(2, year);
            rs = stmt.executeQuery();
            while(rs.next()){
                monthPersonalVolume = rs.getBigDecimal(1);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return monthPersonalVolume;
    }

    @Override public BigDecimal getYearGroupVolume(String userCode, String year) {
        BigDecimal monthGroupVolume = new BigDecimal(0);
        String sql ="SELECT sum(total) as total FROM orders o where (user_id IN ("+ childQuery  +") OR user_id = ?) " + " AND o.type=" + OrderType.ORDER_PRODUCT.getCode() + " and  DATE_FORMAT(cdate,'%Y') = ?";
        try{
            conn = getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, userCode);
            stmt.setString(2, userCode);
            stmt.setString(3, year);
            rs = stmt.executeQuery();
            while(rs.next()){
                monthGroupVolume = rs.getBigDecimal(1);
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            closeConnection(conn, stmt, rs);
        }
        return monthGroupVolume;
    }
}
