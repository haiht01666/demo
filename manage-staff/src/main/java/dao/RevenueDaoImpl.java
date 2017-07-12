package dao;

import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Repository;

import common.CommonUtils;
import constant.OrderType;
import constant.RevenueType;
import constant.TimePeriodCheck;
import model.Revenue;
import model.RevenueApi;
import model.User;

@Repository
public class RevenueDaoImpl extends DBManager implements RevenueDao{

	@Override
	public boolean isActive(int id , Date date) throws SQLException {
		String sql = "Select cdate from orders where  type = ? and user_id = ? order by cdate desc";
		try {
			Date cdate = null;
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, OrderType.ORDER_PROACTIVE.getCode());
			stmt.setInt(2, id);
			rs = stmt.executeQuery();
			while(rs.next()){
				cdate = rs.getDate(1);
				break;
			}
			if(cdate == null)
				return false;
			else{
				Calendar cal = Calendar.getInstance();
				cal.setTime(cdate);
				cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_30 -1);
				cal = CommonUtils.setMaxHour(cal);
				if(date.after(cal.getTime()))
					return false;
				else
					return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
	}

	@Override
	public Date getProactiveDateCurrent(Date date,int userId) throws SQLException {
		String sql = "Select cdate from orders where  type = ? and user_id = ? and date_format(cdate, '%Y-%m-%d') <= ?";
		try {
			Date cdate = null;
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, OrderType.ORDER_PROACTIVE.getCode());
			stmt.setInt(2, userId);
			stmt.setDate(3, new java.sql.Date(date.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				cdate = rs.getDate(1);
				return cdate;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return null;
	}

	@Override
	public boolean isProActive(int userId, Date date) throws SQLException{
		String sql = "Select cdate from orders where  type = ? and user_id = ? and date_format(cdate, '%Y-%m-%d') = ?";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, OrderType.ORDER_PROACTIVE.getCode());
			stmt.setInt(2, userId);
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(Calendar.DATE, -30);
			stmt.setDate(3, new java.sql.Date(cal.getTime().getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return false;
	}

	@Override
	public Double getDirectRevenue(int userId, Date fromDate, Date endDate) throws SQLException {
		Double result = 0.0;
		String sql = "Select value from revenues where  type = ? and user_id = ? and (date_format(cdate, '%Y-%m-%d') between ? and ?)";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, OrderType.ORDER_PACKAGE.getCode());
			stmt.setInt(2, userId);
			stmt.setDate(3, new java.sql.Date(fromDate.getTime()));
			stmt.setDate(4, new java.sql.Date(endDate.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				result += rs.getDouble(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0.0;
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}

	@Override
	public int saveRevenue(Revenue revenue, User user, Date cate) throws SQLException {
		String sql1 = "select id from revenues where cdate = ? and type = ? and user_id = ?";
		String sql2 = "insert into revenues(name,cdate,user_id,value,type) values(?,?,?,?,?)";
		String sql3 = "update revenues set value = ? where id = ?";
		try {
			int revenueId = 0;
			conn = getConnection();
			stmt = conn.prepareStatement(sql1);
			//check revenue exist
			stmt.setInt(2, revenue.getType());
			stmt.setInt(3, user.getId());
			stmt.setDate(1, new java.sql.Date(cate.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				revenueId += rs.getInt(1);
			}
			if(revenueId > 0){
				//if exist
				stmt = conn.prepareStatement(sql3);
				stmt.setDouble(1, revenue.getRevenueValue());
				stmt.setInt(2, revenueId);
				return stmt.executeUpdate();
			}else{
				stmt = conn.prepareStatement(sql2);
				stmt.setString(1, revenue.getOrderName());
				stmt.setDate(2, new java.sql.Date(cate.getTime()));
				stmt.setInt(3, user.getId());
				stmt.setDouble(4, revenue.getRevenueValue());
				stmt.setInt(5,  revenue.getType());
				return stmt.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
	}

	@Override
	public RevenueApi getRevenueInfo(Date cdate,int userId) throws SQLException {
		RevenueApi result = new RevenueApi();
		String sql= "select value from revenues where user_id = ? and cdate <= ? and type = ?";
		
		String sql1= "select value from revenues where user_id = ? and cdate <= ? and (type = ? || type = ? || type = ?)";
		try {
			Double revenueDirect = 0.0;
			Double revenueGroup = 0.0;
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(3, RevenueType.DIRECT.getValue());
			stmt.setInt(1, userId);
			stmt.setDate(2, new java.sql.Date(cdate.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				//get hoa hồng trực tiếp
				revenueDirect += rs.getDouble(1);
			}
			result.setDirect(revenueDirect);
			
			stmt = conn.prepareStatement(sql1);
			stmt.setInt(3, RevenueType.WEEK.getValue());
			stmt.setInt(4, RevenueType.MONTH.getValue());
			stmt.setInt(5, RevenueType.QUATER.getValue());
			stmt.setInt(1, userId);
			stmt.setDate(2, new java.sql.Date(cdate.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				//get hoa hồng nhóm
				revenueGroup += rs.getDouble(1);
			}
			result.setGroup(revenueGroup);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}

	@Override
	public RevenueApi getRevenueInfo(Date from, Date to, int userId) throws SQLException {
		RevenueApi result = new RevenueApi();
		String sql= "select value from revenues where user_id = ? and (date_format(cdate, '%Y-%m-%d') between ? and ?) and type = ?";
		
		String sql1= "select value from revenues where user_id = ? and (date_format(cdate, '%Y-%m-%d') between ? and ?) and (type = ? || type = ? || type = ?)";
		try {
			Double revenueDirect = 0.0;
			Double revenueGroup = 0.0;
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(4, RevenueType.DIRECT.getValue());
			stmt.setInt(1, userId);
			stmt.setDate(2, new java.sql.Date(from.getTime()));
			stmt.setDate(3, new java.sql.Date(to.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				//get hoa hồng trực tiếp
				revenueDirect += rs.getDouble(1);
			}
			result.setDirect(revenueDirect);
			
			stmt = conn.prepareStatement(sql1);
			stmt.setInt(4, RevenueType.WEEK.getValue());
			stmt.setInt(5, RevenueType.MONTH.getValue());
			stmt.setInt(6, RevenueType.QUATER.getValue());
			stmt.setInt(1, userId);
			stmt.setDate(2, new java.sql.Date(from.getTime()));
			stmt.setDate(3, new java.sql.Date(to.getTime()));
			rs = stmt.executeQuery();
			while(rs.next()){
				//get hoa hồng nhóm
				revenueGroup += rs.getDouble(1);
			}
			result.setGroup(revenueGroup);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			conn.close();
			stmt.close();
			rs.close();
		}
		return result;
	}
}
