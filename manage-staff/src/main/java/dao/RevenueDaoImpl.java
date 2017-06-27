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

}
