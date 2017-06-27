package service;

import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.CommonUtils;
import constant.TimePeriodCheck;
import dao.ManageDao;
import dao.RevenueDao;
import model.User;

@Service
public class RevenueServiceImpl implements RevenueService{

	@Autowired
	ManageDao dao;
	
	@Autowired
	RevenueDao revenueDao;
	
	@Override
	public boolean isActive(int id,Date date) throws SQLException {
		User user = dao.getUserById(id);
		if(user.getCdate() != null){
			//date create account
			Date createDate = user.getCdate();
			Calendar cal = Calendar.getInstance();
			cal.setTime(createDate);
			cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_39);
			cal = CommonUtils.setMaxHour(cal);
			System.err.println(cal.getTime().toString());
			if(date.after(cal.getTime())){
				//if  date > create date + 39 day then check user buy pro-active ?
				return revenueDao.isActive(id, date);
			}else{
				return true;
			}
			
		}
		return false;
	}
	public static void main(String [] arg){
		//current date
		Calendar now = Calendar.getInstance();
		now.set(Calendar.HOUR_OF_DAY, 23);
		now.set(Calendar.MINUTE, 59);
		now.set(Calendar.SECOND, 59);
		now.set(Calendar.MILLISECOND, 59);
		System.err.println(now.getTime().toString());
	}

}
