package service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import constant.LeverType;
import constant.OrderType;
import constant.RevenueGroupType;
import constant.RevenuePercent;
import constant.RevenueType;
import constant.Roles;
import constant.Status;
import constant.TimePeriodCheck;
import dao.ManageDao;
import model.EditRoleForm;
import model.Feedback;
import model.Order;
import model.Revenue;
import model.RevenueForm;
import model.User;

@Service
public class ManageServiceImpl implements ManageService {

	@Autowired
	ManageDao dao;

	@Override
	public int createMember(User parent, int lever) throws SQLException {

		return dao.createMember(parent, lever);
	}

	@Override
	public List<User> lstUser(String role) throws SQLException {
		if (role.equals(Roles.ROLE_ADMIN.toString()))
			return dao.getStaffs();
		else if (role.equals(Roles.ROLE_SPADMIN.toString()))
			return dao.getMembers();
		else
			return null;
	}

	@Override
	public int editRole(EditRoleForm formdata) throws SQLException {
		return dao.editRole(formdata);
	}

	@Override
	public User getUserById(int id) throws SQLException {
		return dao.getUserById(id);
	}

	@Override
	public List<Order> getAllOrder() throws SQLException {
		return dao.getAllOrder();
	}

	@Override
	public int createOrder(Order order) throws SQLException {
		return dao.createOrder(order);
	}

	private Revenue calcuRevenuePersonal(Order order) throws SQLException {
		// String packageValueParent = checkPackage(user.getParentId());
		Revenue revenue = new Revenue();
		// only calcu revenue for order product or by package
		if (order.getType() == OrderType.ORDER_PRODUCT.getCode()) {
			revenue.setByerId(order.getUserId());
			revenue.setOrderId(order.getId());
			revenue.setOrderName(order.getOrderName());
			revenue.setOrderPrice(order.getPrice() * order.getQuantity());
			revenue.setCdate(order.getOrderDate());
			User user = dao.getUserById(order.getUserId());
			String packageValue = getLever(user.getCdate(), order.getOrderDate(), user);
			revenue.setReceiverId(order.getUserId());
			if (packageValue.equals(LeverType.PRO_DISTRIBUTE.name())) {
				// cá nhân được 20%
				revenue.setRevenuePecent(RevenuePercent.TWENTY.toString());
				revenue.setRevenueValue(RevenuePercent.TWENTY.getValue() * order.getTotal());
			}
			if (packageValue.equals(LeverType.SALE_MEMBER.name())) {
				// cá nhân được 10%
				revenue.setRevenuePecent(RevenuePercent.TEN.toString());
				revenue.setRevenueValue(RevenuePercent.TEN.getValue() * order.getTotal());
			}
			if (packageValue.equals(LeverType.SALE_PRO.name())) {
				// cá nhân được 15%
				revenue.setRevenuePecent(RevenuePercent.FEFTEEN.toString());
				revenue.setRevenueValue(RevenuePercent.FEFTEEN.getValue() * order.getTotal());
			}

		}
		return revenue;

	}

	private Revenue calcuRevenueGroup(Order order) throws SQLException {
		User user = dao.getUserById(order.getUserId());
		User parent = dao.getUserById(user.getParentId());
		// String packageValueParent = checkPackage(user.getParentId());
		Revenue revenue = new Revenue();
		if (order.getType() == OrderType.ORDER_PACKAGE.getCode()
				|| order.getType() == OrderType.ORDER_PRODUCT.getCode()) {
			revenue.setByerId(order.getUserId());
			revenue.setOrderId(order.getId());
			revenue.setOrderName(order.getOrderName());
			revenue.setByerName(order.getUserName());
			revenue.setOrderPrice(order.getTotal());
			revenue.setCdate(order.getOrderDate());

			revenue.setReceiverId(parent.getId());
			revenue.setReceiverName(parent.getDispName());
			revenue.setRevenuePecent(RevenuePercent.TEN.toString());
			revenue.setType(RevenueType.GROUP.getValue());
			revenue.setRevenueValue(RevenuePercent.TEN.getValue() * order.getTotal());
		}

		return revenue;
	}

	@Override
	public String getLeverUser(int userId) throws SQLException {
		return getLever(userId);
	}

	private String getLever(Date dateFrom, Date dateto, User user) throws SQLException {
		if (user.getLever() == LeverType.New.getValue()) {
			// if type is new then calculate lever follow by total value of
			// order interval 45 day
			return dao.getLever(dateFrom, dateto, user.getId());
		} else {
			if (user.getLever() == LeverType.SALE_MEMBER.getValue())
				return LeverType.SALE_MEMBER.name();
			if (user.getLever() == LeverType.SALE_PRO.getValue())
				return LeverType.SALE_PRO.name();
			if (user.getLever() == LeverType.PRO_DISTRIBUTE.getValue())
				return LeverType.PRO_DISTRIBUTE.name();
			else
				return LeverType.New.name();
		}
	}

	/**
	 * check package of user
	 * 
	 * @param userId
	 *            user id
	 * @return package value
	 */
	private String getLever(int userId) throws SQLException {
		User user = dao.getUserById(userId);
		if (user.getLever() == LeverType.New.getValue()) {
			Double totalPrice = dao.totalOrderPrice(user, TimePeriodCheck.TIME_ORDER_PERIOD_45);
			if (totalPrice >= LeverType.PRO_DISTRIBUTE.getAmount())
				return LeverType.PRO_DISTRIBUTE.name();
			if (totalPrice >= LeverType.SALE_PRO.getAmount())
				return LeverType.SALE_PRO.name();
			if (totalPrice >= LeverType.SALE_MEMBER.getAmount())
				return LeverType.SALE_MEMBER.name();
			else
				return LeverType.New.name();
		} else {
			if (user.getLever() == LeverType.SALE_MEMBER.getValue())
				return LeverType.SALE_MEMBER.name();
			if (user.getLever() == LeverType.SALE_PRO.getValue())
				return LeverType.SALE_PRO.name();
			if (user.getLever() == LeverType.PRO_DISTRIBUTE.getValue())
				return LeverType.PRO_DISTRIBUTE.name();
			else
				return LeverType.New.name();
		}
	}

	@Override
	public int updateOrder(Order order) throws SQLException {
		return dao.updateOrder(order);
	}

	@Override
	public List<Revenue> getAllRevenue(RevenueForm form) throws SQLException {
		Calendar cal = Calendar.getInstance();
		cal.setTime(form.getCdate());
		cal.set(Calendar.DAY_OF_MONTH, 1);
		Date dateFrom = cal.getTime();
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date dateTo = cal.getTime();
		List<Order> lstOrder = dao.getAllOrder(dateFrom, dateTo);

		List<Revenue> lstRevenue = new ArrayList<>();
		if (form.getType() == RevenueType.PERSONAL.getValue()) {
			for (Order order : lstOrder) {
				Revenue revenue = calcuRevenuePersonal(order);
				if (revenue.getRevenueValue() != null) {
					lstRevenue.add(revenue);
				}
			}
		}
		if (form.getType() == RevenueType.GROUP.getValue()) {
			for (Order order : lstOrder) {
				Revenue revenue = calcuRevenueGroup(order);
				if (revenue.getRevenueValue() != null) {
					lstRevenue.add(revenue);
				}
			}
		}
		return lstRevenue;
	}

	@Override
	public String resetPassword(List<String> lstUserId) throws SQLException {
		String result = "";
		String password = makePassword();
		if (dao.resetPassword(lstUserId, password) > 0)
			result = password;
		return result;
	}

	private String makePassword() {
		String randomStr = UUID.randomUUID().toString();
		while (randomStr.length() < 8) {
			randomStr += UUID.randomUUID().toString();
		}
		return randomStr.substring(0, 8);
	}

	@Override
	public List<Feedback> getAllFeedback() throws SQLException {
		return dao.getAllFeedback();
	}

	@Override
	public User detailUser(int id) throws SQLException {
		User user = dao.getUserById(id);
		user.setLeverValue(getLever(user.getId()));
		Calendar cal = Calendar.getInstance();
		cal.setTime(user.getCdate());
		cal.add(Calendar.DATE, 45);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		String status = "";
		if (new Date().before(cal.getTime())) {
			if (user.getLeverValue().equals(LeverType.New.name())) {
				status = Status.INACTIVE;
			} else {
				status = Status.ACTIVE;
			}
		} else {
			status = dao.isUserActive(id) ? Status.ACTIVE : Status.INACTIVE;
		}
		user.setStatus(status);
		return user;
	}

	private int converLeverToInt(String lever){
		if(lever.equals(LeverType.PRO_DISTRIBUTE.name()))
			return LeverType.PRO_DISTRIBUTE.getValue();
		else if(lever.equals(LeverType.SALE_PRO.name()))
			return LeverType.SALE_PRO.getValue();
		else if(lever.equals(LeverType.SALE_MEMBER.name()))
			return LeverType.SALE_MEMBER.getValue();
		else
			return LeverType.New.getValue();
	}
	@Override
	public List<Revenue> getRevenueGroup(RevenueForm form) throws SQLException {
		List<User> lstUser = dao.getMembers();
		List<Revenue> lstRevenue = new ArrayList<>();
		if (form.getType() == RevenueGroupType.WEEK.getValue()) {
			for (User user : lstUser) {
				String baseLever;
				if (user.getLever() == LeverType.New.getAmount())
					baseLever = dao.getLever(user.getCdate(), form.getDateFrom(), user.getId());
				else
					baseLever = getLever(user.getId());
				if (baseLever.equals(LeverType.New.name())) {
					continue;
				}

				// check mua năng động
				if (!isProactive(user, form.getDateFrom()))
					continue;
				int lever = converLeverToInt(baseLever);
			
				String finalLever = getFinalLevel(user, form.getDateFrom(), form.getDateTo(), lever);
				Double totalRevenue = totalRevenueGroup(user, form.getDateFrom(), form.getDateTo());
				if (!finalLever.equals(LeverType.New.name())) {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					revenue.setUserLever(finalLever);
					revenue.setRevenuePecent("5%");
					revenue.setOrderPrice(totalRevenue);
					revenue.setRevenueValue(totalRevenue * 0.05);
					lstRevenue.add(revenue);

				}
			}
		}
		if (form.getType() == RevenueGroupType.MONTH.getValue()) {
			Calendar cal = Calendar.getInstance();
			cal.setTime(form.getCdate());
			cal.set(Calendar.DATE, 1);
			form.setDateFrom(cal.getTime());
			cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
			form.setDateTo(cal.getTime());
			for (User user : lstUser) {
				if(user.getCdate().after(form.getDateFrom()) || user.getCdate().equals(form.getDateFrom())){
					//if datefrom nhỏ hơn hoặc bằng ngày tạo tk thì ko được hưởng hoa hồng trong tháng đó.
					continue;
				}
				String baseLever;
				if (user.getLever() == LeverType.New.getAmount())
					baseLever = dao.getLever(user.getCdate(), form.getDateFrom(), user.getId());
				else
					baseLever = getLever(user.getId());
				if (!baseLever.equals(LeverType.SALE_PRO.name())
						&& !baseLever.equals(LeverType.PRO_DISTRIBUTE.name())) {
					continue;
				}

				// check mua năng động
				if (!isProactive(user, form.getDateFrom()))
					continue;
				
				int lever = converLeverToInt(baseLever);
				String finalLever = getFinalLevel(user, form.getDateFrom(), form.getDateTo(),lever);
				Double totalRevenue = totalRevenueGroup(user, form.getDateFrom(), form.getDateTo());
				if (baseLever.equals(LeverType.PRO_DISTRIBUTE.name()) || finalLever.equals(LeverType.DSD.name())) {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					
					if (finalLever.equals(LeverType.DSD.name()) && baseLever.equals(LeverType.PRO_DISTRIBUTE.name())) {
						revenue.setUserLever(finalLever);
						Double total = dao.getAllRevenue(form.getDateFrom(), form.getDateTo());
						revenue.setRevenuePecent("1%");
						revenue.setOrderPrice(total);
						revenue.setRevenueValue(total * 0.01);
					} else {
						revenue.setUserLever(baseLever);
						revenue.setRevenuePecent("3%");
						revenue.setRevenueValue(totalRevenue * 0.03);
						revenue.setOrderPrice(totalRevenue);
					}
					lstRevenue.add(revenue);

				}
			}
		}
		if (form.getType() == RevenueGroupType.QUARTER.getValue()) {
			Calendar cal1 = Calendar.getInstance();
			cal1.set(Calendar.MONTH, form.getNum() * 3 - 3);
			cal1.set(Calendar.DAY_OF_MONTH, 1);
			cal1.set(Calendar.YEAR, Calendar.getInstance().get(Calendar.YEAR));
			form.setDateFrom(cal1.getTime());
			cal1.set(Calendar.MONTH, form.getNum() * 3 - 1);
			cal1.set(Calendar.DAY_OF_MONTH, cal1.getActualMaximum(Calendar.DAY_OF_MONTH));
			form.setDateTo(cal1.getTime());

			for (User user : lstUser) {
				String baseLever;
				if (user.getLever() == LeverType.New.getAmount())
					baseLever = dao.getLever(user.getCdate(), form.getDateFrom(), user.getId());
				else
					baseLever = getLever(user.getId());
				if (!baseLever.equals(LeverType.SALE_PRO.name())
						&& !baseLever.equals(LeverType.PRO_DISTRIBUTE.name())) {
					continue;
				}
				// check mua năng động
				Calendar cal = Calendar.getInstance();
				cal.setTime(form.getDateFrom());
				if (!isProactive(user, cal.getTime()))
					continue;
				cal.add(Calendar.MONTH, 1);
				if (!isProactive(user, cal.getTime()))
					continue;
				cal.add(Calendar.MONTH, 1);
				if (!isProactive(user, cal.getTime()))
					continue;
				
				int lever = converLeverToInt(baseLever);
				String finalLever = getFinalLevel(user, form.getDateFrom(), form.getDateTo(),lever);
				Double totalRevenue = totalRevenueGroup(user, form.getDateFrom(), form.getDateTo());
				if (!finalLever.equals(LeverType.New.name()) && !finalLever.equals(LeverType.TL.name())) {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					revenue.setUserLever(finalLever);
					revenue.setOrderPrice(totalRevenue);
					if (finalLever.equals(LeverType.MSD.name())) {
						revenue.setRevenuePecent("2%");
						revenue.setRevenueValue(totalRevenue * 0.02);
					} else {
						revenue.setRevenuePecent("3%");
						revenue.setRevenueValue(totalRevenue * 0.03);
					}
					lstRevenue.add(revenue);

				}
			}
		}

		return lstRevenue;
	}

	private boolean isProactive(User user, Date time) throws SQLException {
		Calendar cal = Calendar.getInstance();
		cal.setTime(user.getCdate());
		cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_45);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		if (time.after(cal.getTime())) {
			return dao.isProactive(user.getId(), time);
		} else
			return true;
	}

	private Double totalRevenueGroup(User user, Date dateFrom, Date dateTo) throws SQLException {
		Double result = 0.0;
		result += getRevenue(user, dateFrom, dateTo);
		List<User> lstAllChild = dao.getAllChild(user.getChildId());
		for (User child : lstAllChild) {
			result += getRevenue(child, dateFrom, dateTo);
		}
		return result;
	}

	private String getFinalLevel(User user, Date dateFrom, Date dateTo, int lever) throws SQLException {
		String result = LeverType.New.name();
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFrom);
		// - 1 month
		cal.add(Calendar.MONTH, -1);
		cal.set(Calendar.DATE, 1);
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(user.getCdate());
		cal1.add(Calendar.MONTH, -1);
		int maxlever = 0;
		while (cal.getTime().after(cal1.getTime())) {
			//tính lever từ tháng create account đến trước thời điểm tính hoa hồng 1 tháng
			int baselever = getBaseLever(user, cal.getTime(), lever);
			cal.add(Calendar.MONTH, -1);
			if (baselever > maxlever)
				maxlever = baselever;
		}
		if (maxlever == LeverType.GDSD.getValue())
			return LeverType.GDSD.name();
		if (maxlever == LeverType.DSD.getValue())
			return LeverType.DSD.name();
		if (maxlever == LeverType.MSD.getValue())
			return LeverType.MSD.name();
		if (maxlever == LeverType.TL.getValue())
			return LeverType.TL.name();
		return result;
	}

	private int getBaseLever(User user, Date time, int lever) throws SQLException {
		int result = 0;
		Double totalRevenue = 0.0;
		List<User> listChild = dao.getChild(user.getId());
		List<Double> lstRevenueOfChild = new ArrayList<>();
		Date dateFrom = time;
		Calendar cal = Calendar.getInstance();
		cal.setTime(time);
		cal.set(Calendar.DATE, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date dateTo = cal.getTime();
		// calculate revenue personal
		Double revenuePerson = getRevenue(user, dateFrom, dateTo);
		totalRevenue += revenuePerson;
		for (User child : listChild) {
			Double totalRevenueChild = 0.0;
			totalRevenueChild += getRevenue(child, dateFrom, dateTo);
			List<User> lstAllChild = dao.getAllChild(child.getChildId());
			for (User u : lstAllChild) {
				totalRevenueChild += getRevenue(u, dateFrom, dateTo);
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
			if (countChildValid >= 6 && lever >= LeverType.SALE_PRO.getValue())
				return LeverType.GDSD.getValue();
		}
		if (totalRevenue >= LeverType.DSD.getAmount()) {
			int countChildValid = 0;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.MSD.getAmount())
					countChildValid++;
			}
			if (countChildValid >= 3 && lever >= LeverType.SALE_PRO.getValue())
				return LeverType.DSD.getValue();
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
			if (countChildValid >= 2 && lever >= LeverType.SALE_PRO.getValue()) {
				if (check) {
					for (Double value : lstRevenueOfChild) {
						if (value < LeverType.MSD.getAmount() * 0.2) {
							validTL = false;
							break;
						}
					}
					if (validTL)
						return LeverType.MSD.getValue();
				} else {
					return LeverType.MSD.getValue();
				}
			}
		}
		if (totalRevenue >= LeverType.TL.getAmount()) {
			// int countChildValid = 0;
			boolean check = false;
			boolean validTL = true;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.TL.getAmount()) {
					check = true;
					break;
				}
			}
			if (lever >= LeverType.SALE_MEMBER.getValue()) {
				if (check) {
					for (Double value : lstRevenueOfChild) {
						if (value < LeverType.TL.getAmount() * 0.2) {
							validTL = false;
							break;
						}
					}
					if (validTL)
						return LeverType.TL.getValue();
				} else {
					return LeverType.TL.getValue();
				}
			}

		}
		return result;
	}

	private Double getRevenue(User user, Date dateFrom, Date dateTo) throws SQLException {
		return dao.getRevenuePersonal(user, dateFrom, dateTo);
	}

}
