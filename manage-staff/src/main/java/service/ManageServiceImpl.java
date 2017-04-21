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
import model.RevenueInfo;
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
			String packageValue = getLever(user.getCdate(),order.getOrderDate(),user);
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

	private String getLever(Date dateFrom , Date dateto , User user) throws SQLException {
		if (user.getLever() == LeverType.New.getValue()) {
			// if type is new then calculate lever follow by total value of
			// order interval 45 day
			return dao.getLever(dateFrom, dateto,user.getId());
		} else {
			if (user.getLever() == LeverType.SALE_MEMBER.getValue())
				return  LeverType.SALE_MEMBER.name();
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
		user.setLeverValue(getLever(user.getCdate(),new Date(),user));
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
				if (!baseLever.equals(LeverType.SALE_PRO) && !baseLever.equals(LeverType.PRO_DISTRIBUTE)) {
					continue;
				}

				// check mua năng động
				if (!isProactive(user, form.getDateFrom()))
					continue;
				RevenueInfo revenueInfo = totalRevenueOfGroup(user, form.getDateFrom(), form.getDateTo());
				String finalLever = revenueInfo.getLevel();
				Double totalRevenue = revenueInfo.getTotalRevenue();
				if (!finalLever.equals(LeverType.New.name())) {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					revenue.setUserLever(finalLever);
					revenue.setRevenuePecent("5%");
					revenue.setRevenueValue(totalRevenue * 0.05);
					lstRevenue.add(revenue);

				}
			}
		}
		if (form.getType() == RevenueGroupType.MONTH.getValue()) {
			Calendar cal = Calendar.getInstance();
			cal.setTime(form.getCdate());
			form.setDateFrom(cal.getTime());
			cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
			form.setDateTo(cal.getTime());
			for (User user : lstUser) {
				String baseLever;
				if (user.getLever() == LeverType.New.getAmount())
					baseLever = dao.getLever(user.getCdate(), form.getDateFrom(), user.getId());
				else
					baseLever = getLever(user.getId());
				if (!baseLever.equals(LeverType.SALE_PRO) && !baseLever.equals(LeverType.PRO_DISTRIBUTE)) {
					continue;
				}

				// check mua năng động
				if (!isProactive(user, form.getDateFrom()))
					continue;
				RevenueInfo revenueInfo = totalRevenueOfGroup(user, form.getDateFrom(), form.getDateTo());
				String finalLever = revenueInfo.getLevel();
				Double totalRevenue = revenueInfo.getTotalRevenue();
				if (baseLever.equals(LeverType.PRO_DISTRIBUTE.name()) && finalLever.equals(LeverType.DSD.name())) {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					revenue.setUserLever(finalLever);
					if (finalLever.equals(LeverType.DSD.name())) {
						Double total = dao.getAllRevenue(form.getDateFrom(), form.getDateTo());
						revenue.setRevenuePecent("1%");
						revenue.setOrderPrice(total);
						revenue.setRevenueValue(total * 0.01);
					} else {
						revenue.setRevenuePecent("5%");
						revenue.setRevenueValue(totalRevenue * 0.05);
						revenue.setOrderPrice(totalRevenue);
					}
					lstRevenue.add(revenue);

				}
			}
		}
		if (form.getType() == RevenueGroupType.QUARTER.getValue()) {
			Calendar cal1 = Calendar.getInstance();
			cal1.set(Calendar.MONTH, form.getNum()*3 - 3);
			cal1.set(Calendar.DAY_OF_MONTH, 1);
			cal1.set(Calendar.YEAR, Calendar.getInstance().get(Calendar.YEAR));
			form.setDateFrom(cal1.getTime());
			cal1.set(Calendar.MONTH, form.getNum()*3 -1);
			form.setDateTo(cal1.getTime());
			
			for (User user : lstUser) {
				String baseLever;
				if (user.getLever() == LeverType.New.getAmount())
					baseLever = dao.getLever(user.getCdate(), form.getDateFrom(), user.getId());
				else
					baseLever = getLever(user.getId());
				if (!baseLever.equals(LeverType.SALE_PRO) && !baseLever.equals(LeverType.PRO_DISTRIBUTE)) {
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
				cal.add(Calendar.MONTH, 1);
				if (!isProactive(user, cal.getTime()))
					continue;
				RevenueInfo revenueInfo = totalRevenueOfGroup(user, form.getDateFrom(), form.getDateTo());
				String finalLever = revenueInfo.getLevel();
				Double totalRevenue = revenueInfo.getTotalRevenue();
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

	private RevenueInfo totalRevenueOfGroup(User user, Date dateFrom, Date dateTo) throws SQLException {
		RevenueInfo result = new RevenueInfo();
		Double totalRevenue = 0.0;
		List<User> listChild = dao.getChild(user.getId());
		List<Double> lstRevenueOfChild = new ArrayList<>();
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
		result.setTotalRevenue(totalRevenue);
		result.setLevel(LeverType.New.name());
		if (totalRevenue >= LeverType.GDSD.getAmount()) {
			int countChildValid = 0;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.MSD.getAmount())
					countChildValid++;
			}
			if (countChildValid >= 6)
				result.setLevel(LeverType.GDSD.name());
		}
		if (totalRevenue >= LeverType.DSD.getAmount()) {
			int countChildValid = 0;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.MSD.getAmount())
					countChildValid++;
			}
			if (countChildValid >= 3)
				result.setLevel(LeverType.DSD.name());
		}
		if (totalRevenue >= LeverType.MSD.getAmount()) {
			int countChildValid = 0;
			for (Double value : lstRevenueOfChild) {
				if (value >= LeverType.TL.getAmount())
					countChildValid++;
			}
			if (countChildValid >= 2)
				result.setLevel(LeverType.MSD.name());
		}
		if (totalRevenue >= LeverType.TL.getAmount()) {
			result.setLevel(LeverType.TL.name());
		}
		return result;
	}

	private Double getRevenue(User user, Date dateFrom, Date dateTo) throws SQLException {
		return dao.getRevenuePersonal(user, dateFrom, dateTo);
	}
	
}
