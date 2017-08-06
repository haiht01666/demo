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
import model.Order;
import model.Revenue;
import model.RevenueApi;
import model.Revenues;
import model.User;

@Service
public class RevenueServiceImpl implements RevenueService {

	@Autowired
	ManageDao dao;

	@Autowired
	RevenueDao revenueDao;

	@Override
	public String getBaseLever(User user, Date date) throws SQLException {
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
				totalOrderValue = dao.totalOrderValue(user.getCdate(), cal.getTime(), user.getId());
			} else {
				totalOrderValue = dao.totalOrderValue(user.getCdate(), date, user.getId());
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
	public boolean isActive(User user, Date date) throws SQLException {
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
				return revenueDao.isActive(user.getId(), date);
			} else {
				return true;
			}

		}
		return false;
	}

	@Override
	public String getLever(User user, Date date, List<Order> lstOrder) throws SQLException {
		String baseLever = getBaseLever(user, date);
		if (baseLever == null)
			return LeverType.New.name();
		if (!isActive(user, date))
			return baseLever;
		if ((baseLever.equals(LeverType.PRO_DISTRIBUTE.name()) || baseLever.equals(LeverType.SALE_PRO.name()))
				&& user.getCdate() != null) {
			Date dateFrom = null;
			Date dateTo = date;
			Calendar cal1 = Calendar.getInstance();
			cal1.setTime(user.getCdate());
			cal1.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_39);
			cal1 = CommonUtils.setMaxHour(cal1);
			if (date.after(cal1.getTime())) {
				// Nếu ngày check lever > ngày tạo 39 day thì sẽ check xem nó
				// active hay ko ?
				Date currentProActive = revenueDao.getProactiveDateCurrent(date, user.getId());
				if (currentProActive == null) {
					return baseLever;
				}
				if (revenueDao.isProActive(user.getId(), currentProActive)) {
					// nếu active liên tiếp 2 tháng thì sẽ tính lever từ ngày
					// check - 30 day
					Calendar cal = Calendar.getInstance();
					cal.setTime(date);
					cal.add(Calendar.DATE, -30);
					dateFrom = cal.getTime();
				} else {
					// nếu không sẽ tính lever từ ngày active hiện tại
					dateFrom = currentProActive;
				}
			} else {
				dateFrom = user.getCdate();
			}
			String lever = getFinalLever(user, dateFrom, dateTo, lstOrder);
			if (lever != null)
				return lever;
			else
				return baseLever;
		} else {
			return baseLever;
		}
	}

	private String getFinalLever(User user, Date dateFrom, Date dateTo, List<Order> lstOrder) throws SQLException {
		Double totalRevenue = 0.0;
		List<User> listChild = dao.getChild(user.getId());
		// revenue of all child
		List<Double> lstRevenueOfChild = new ArrayList<>();
		// revenue of child lever 1
		List<Double> lstRevenueOfChild1 = new ArrayList<>();

		for (User child : listChild) {
			Double totalRevenueChild = 0.0;
			totalRevenueChild += totalRevenue(child, dateFrom, dateTo,lstOrder); //dao.getRevenuePersonal(child, dateFrom, dateTo);
			lstRevenueOfChild1.add(totalRevenueChild);
			List<User> lstAllChild = dao.getAllChild(child.getChildId());
//			for (User u : lstAllChild) {
//				totalRevenueChild += dao.getRevenuePersonal(u, dateFrom, dateTo);
//			}
			totalRevenueChild += totalRevenue(lstAllChild, dateFrom, dateTo, lstOrder);
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
			else {
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
			// check s1 >= 20%
			boolean checkS1 = false;
			for (Double value : lstRevenueOfChild1) {
				if (value >= LeverType.TL.getAmount() * 0.2) {
					checkS1 = true;
					break;
				}
			}
			if (!checkS1) {
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

	@Override
	public int saveRevenue(Revenue revenue, User user, Date cate) throws SQLException {
		return revenueDao.saveRevenue(revenue, user, cate);
	}

	@Override
	public RevenueApi getTotalRevenueInfo(Date cdate, int userId) throws SQLException {
		return revenueDao.getRevenueInfo(cdate, userId);
	}

	@Override
	public RevenueApi getRevenueInfo(Date from, Date to, int userId) throws SQLException {
		return revenueDao.getRevenueInfo(from, to, userId);
	}

	@Override
	public Double getTotalRevenue(Date date, User user) throws SQLException {
		Double result = 0.0;
		List<User> lstAllChild = dao.getAllChild(user.getChildId());
		for (User u : lstAllChild) {
			result += revenueDao.getTotalRevenue(date, u.getId());
		}
		return result;
	}

	@Override
	public Date getDateRevenue(int id) throws SQLException {
		return revenueDao.getDateRevenue(id);
	}

	@Override
	public int saveRevenues(Revenues lstRevenue) throws SQLException {
		return revenueDao.saveRevenues(lstRevenue);
	}

	private Double totalRevenue(List<User> lstAllChild, Date dateFrom, Date dateTo, List<Order> lstOrder)
			throws SQLException {
		Calendar fromDate = Calendar.getInstance();
		fromDate.setTime(dateFrom);
		fromDate = CommonUtils.setMinHour(fromDate);
		
		Calendar toDate = Calendar.getInstance();
		toDate.setTime(dateTo);
		toDate = CommonUtils.setMaxHour(toDate);
		
		Double result = 0.0;
		for (User child : lstAllChild) {
			for (Order order : lstOrder) {
				if (child.getId() == order.getUserId()) {
					if ((order.getOrderDate().after(fromDate.getTime()) || order.getOrderDate().equals(fromDate.getTime()))
							&& (order.getOrderDate().before(toDate.getTime()) || order.getOrderDate().equals(toDate.getTime())))
						result += order.getTotal();
				}
			}
		}
		return result;
	}

	private Double totalRevenue(User child, Date dateFrom, Date dateTo, List<Order> lstOrder) throws SQLException {
		Calendar fromDate = Calendar.getInstance();
		fromDate.setTime(dateFrom);
		fromDate = CommonUtils.setMinHour(fromDate);
		
		Calendar toDate = Calendar.getInstance();
		toDate.setTime(dateTo);
		toDate = CommonUtils.setMaxHour(toDate);
		Double result = 0.0;
		for (Order order : lstOrder) {
			if (child.getId() == order.getUserId()) {
				if ((order.getOrderDate().after(fromDate.getTime()) || order.getOrderDate().equals(fromDate.getTime()))
						&& (order.getOrderDate().before(toDate.getTime()) || order.getOrderDate().equals(toDate.getTime())))
					result += order.getTotal();
			}
		}
		return result;
	}

}
