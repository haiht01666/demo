package dao;

import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Repository;

import common.CommonUtils;
import constant.OrderType;
import constant.TimePeriodCheck;

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
}
