package service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.CommonUtils;
import constant.LeverType;
import constant.TimePeriodCheck;
import dao.ManageDao;
import dao.RevenueDao;
import model.User;

@Service
public class RevenueServiceImpl implements RevenueService {

	@Autowired
	ManageDao dao;

	@Autowired
	RevenueDao revenueDao;

	@Override
	public boolean isActive(int id, Date date) throws SQLException {
		User user = dao.getUserById(id);
		if (user.getCdate() != null) {
			// date create account
			Date createDate = user.getCdate();
			Calendar cal = Calendar.getInstance();
			cal.setTime(createDate);
			cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_39);
			cal = CommonUtils.setMaxHour(cal);
			System.err.println(cal.getTime().toString());
			if (date.after(cal.getTime())) {
				// if date > create date + 39 day then check user buy pro-active
				// ?
				return revenueDao.isActive(id, date);
			} else {
				return true;
			}

		}
		return false;
	}

	@Override
	public String getBaseLever(int userId, Date date) throws SQLException {
		User user = dao.getUserById(userId);
		Double totalOrderValue = 0.0;
		if (user.getCdate() != null) {
			int lever = user.getLever();
			Calendar cal = Calendar.getInstance();
			cal.setTime(user.getCdate());
			cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_39);
			cal = CommonUtils.setMaxHour(cal);
			if (date.after(cal.getTime())) {
				if (lever > 0) {
					if (lever == LeverType.PRO_DISTRIBUTE.getValue())
						return LeverType.PRO_DISTRIBUTE.name();
					if (lever == LeverType.SALE_PRO.getValue())
						return LeverType.SALE_PRO.name();
					if (lever == LeverType.SALE_MEMBER.getValue())
						return LeverType.SALE_MEMBER.name();
				}
				totalOrderValue = dao.totalOrderValue(user.getCdate(), cal.getTime(), userId);
			} else {
				totalOrderValue = dao.totalOrderValue(user.getCdate(), date, userId);
			}
			if (totalOrderValue >= LeverType.PRO_DISTRIBUTE.getAmount())
				return LeverType.PRO_DISTRIBUTE.name();
			if (totalOrderValue >= LeverType.SALE_PRO.getAmount())
				return LeverType.SALE_PRO.name();
			if (totalOrderValue >= LeverType.SALE_MEMBER.getAmount())
				return LeverType.SALE_MEMBER.name();
		}
		return null;
	}

	@Override
	public String getLever(int userId, Date date) throws SQLException {
		User user = dao.getUserById(userId);
		String baseLever = getBaseLever(userId, date);
		if(baseLever == null)
			return LeverType.New.name();
		if (!revenueDao.isActive(userId, date))
			return baseLever;
		if ((baseLever.equals(LeverType.PRO_DISTRIBUTE.name()) || baseLever.equals(LeverType.SALE_PRO.name()))
				&& user.getCdate() != null) {
			Date dateFrom = null;
			Date dateTo = date;
			Date currentProActive = revenueDao.getProactiveDateCurrent(date, userId);
			if (revenueDao.isProActive(userId, currentProActive)) {
				Calendar cal = Calendar.getInstance();
				cal.setTime(date);
				cal.add(Calendar.DATE, -30);
				dateFrom = cal.getTime();
			} else {
				dateFrom = currentProActive;
			}
			String lever = getFinalLever(user, dateFrom, dateTo);
			if (lever != null)
				return lever;
			else
				return baseLever;
		} else {
			return baseLever;
		}
	}

	private String getFinalLever(User user, Date dateFrom, Date dateTo) throws SQLException {
		Double totalRevenue = 0.0;
		List<User> listChild = dao.getChild(user.getId());
		//revenue of all child
		List<Double> lstRevenueOfChild = new ArrayList<>();
		//revenue of chile lever 1
		List<Double> lstRevenueOfChild1 = new ArrayList<>();

		for (User child : listChild) {
			Double totalRevenueChild = 0.0;
			totalRevenueChild += dao.getRevenuePersonal(child, dateFrom, dateTo);
			lstRevenueOfChild1.add(totalRevenueChild);
			List<User> lstAllChild = dao.getAllChild(child.getChildId());
			for (User u : lstAllChild) {
				totalRevenueChild += dao.getRevenuePersonal(u, dateFrom, dateTo);
			}
			lstRevenueOfChild.add(totalRevenueChild);
			totalRevenue += totalRevenueChild;
		}
		if (totalRevenue >= LeverType.GDSD.getAmount()) {
			int countChildValid = 0;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.MSD.getAmount())
					countChildValid++;
			}
			if (countChildValid >= 6)
				return LeverType.GDSD.name();
		}
		if (totalRevenue >= LeverType.DSD.getAmount()) {
			int countChildValid = 0;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.MSD.getAmount())
					countChildValid++;
			}
			if (countChildValid >= 3)
				return LeverType.DSD.name();
		}
		if (totalRevenue >= LeverType.MSD.getAmount()) {
			int countChildValid = 0;
			boolean check = false;
			boolean validTL = true;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.TL.getAmount())
					countChildValid++;
				if (value >= LeverType.MSD.getAmount())
					check = true;
			}
			if (countChildValid >= 2) 
				return LeverType.MSD.name();
			else{
				if (check) {
					for (Double value : lstRevenueOfChild) {
						if (value < LeverType.MSD.getAmount() * 0.2) {
							validTL = false;
							break;
						}
					}
					if (validTL)
						return LeverType.MSD.name();
				} else {
					return LeverType.MSD.name();
				}
			}
		}
		if (totalRevenue >= LeverType.TL.getAmount()) {
			// int countChildValid = 0;
			boolean check = false;
			boolean validTL = true;
			//check s1 >= 20% 
			boolean checkS1 = false;
			for(Double value : lstRevenueOfChild1){
				if(value >=  LeverType.TL.getAmount() * 0.2){
					checkS1 = true;
					break;
				}
			}
			if(!checkS1){
				for (Double value : lstRevenueOfChild) {
					if (value >= LeverType.TL.getAmount()) {
						check = true;
						break;
					}
				}
			}
			if (check) {
				for (Double value : lstRevenueOfChild) {
					if (value < LeverType.TL.getAmount() * 0.2) {
						validTL = false;
						break;
					}
				}
				if (validTL)
					return LeverType.TL.name();
			} else {
				return LeverType.TL.name();
			}
		}

		return null;
	}

	@Override
	public Double getDirectRevenue(int userId, Date fromDate, Date endDate) throws SQLException {
		return revenueDao.getDirectRevenue(userId, fromDate, endDate);
	}

}
