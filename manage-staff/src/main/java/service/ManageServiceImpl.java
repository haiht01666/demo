package service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.CommonUtils;
import constant.LeverType;
import constant.OrderType;
import constant.RevenueGroupType;
import constant.RevenuePercent;
import constant.RevenueType;
import constant.Roles;
import constant.Status;
import constant.TimePeriodCheck;
import dao.ManageDao;
import model.Banner;
import model.EditLeverForm;
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

	@Autowired
	RevenueService revenueService;

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
		int status = 1;
		User user = dao.getUserById(order.getUserId());
		if (order.getType() == OrderType.ORDER_PROACTIVE.getCode()) {
			if (revenueService.isActive(user, new Date())) {
				Date activeDate = dao.getLatestDateProActive(order.getUserId());
				Calendar cal = Calendar.getInstance();
				if (activeDate == null) {
					cal.setTime(user.getCdate());
					cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_39 + 1);
				} else {
					cal.setTime(activeDate);
					cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_30);
				}
				order.setOrderDate(cal.getTime());
			} else {
				order.setOrderDate(new Date());
			}
		}
		if (order.getType() == OrderType.ORDER_PACKAGE.getCode()) {
			order.setOrderDate(new Date());
			Calendar cal = Calendar.getInstance();
			cal.setTime(user.getCdate());
			cal.add(Calendar.DATE, TimePeriodCheck.TIME_ORDER_PERIOD_39);
			cal = CommonUtils.setMaxHour(cal);
			if (new Date().after(cal.getTime())) {
				// update lever for user
				status = dao.updateLeverUser(user.getId(), order.getUserLever());
			} else {
				return -1;
			}
		}
		if (status > 0)
			return dao.createOrder(order);
		else
			return 0;
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
	public Revenue getRevenuePersonal(String userCode, RevenueForm form) throws SQLException {
		Calendar cal = Calendar.getInstance();
		cal.setTime(form.getCdate());
		cal.set(Calendar.DAY_OF_MONTH, 1);
		Date dateFrom = cal.getTime();
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date dateTo = cal.getTime();
		List<Order> lstOrder = dao.getAllOrderPersonal(userCode, dateFrom, dateTo);

		Revenue revenue = null;
		if (form.getType() == RevenueType.PERSONAL.getValue()) {
			for (Order order : lstOrder) {
				revenue = calcuRevenuePersonal(order);
			}
		}
		if (form.getType() == RevenueType.GROUP.getValue()) {
			for (Order order : lstOrder) {
				revenue = calcuRevenueGroup(order);
			}
		}
		return revenue;
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
		user.setLeverValue(revenueService.getLever(user, new Date()));
		String status = "";
		status = revenueService.isActive(user, new Date()) ? Status.ACTIVE : Status.INACTIVE;
		user.setStatus(status);
		return user;
	}

	@Override
	public List<Revenue> getRevenueGroup(RevenueForm form) throws SQLException {
		List<User> lstUser = dao.getMembers();
		List<Revenue> lstRevenue = new ArrayList<>();
		if (form.getType() == RevenueGroupType.WEEK.getValue()) {

			for (User user : lstUser) {
				Calendar startDate = Calendar.getInstance();
				startDate.setTime(form.getDateFrom());
				startDate.add(Calendar.DATE, 1);
				Calendar endDate = Calendar.getInstance();
				endDate.setTime(form.getDateTo());
				endDate.add(Calendar.DATE, 1);

				Double totalRevenue = new Double(0.0);
				Revenue revenue = new Revenue();
				revenue.setReceiverId(user.getId());
				Double revenueProD = 0.0;
				Date revenueDate = revenueService.getDateRevenue(user.getId());

				boolean check = false;
				for (Date date = startDate.getTime(); startDate.before(endDate); startDate.add(Calendar.DATE,
						1), date = startDate.getTime()) {
					// System.out.println(date);
					if (!revenueService.isActive(user, date))
						continue;
					String lever = revenueService.getLever(user, date);
					if (lever.equals(LeverType.PRO_DISTRIBUTE.name())) {
						if (check) {
							Double total = totalRevenueGroup(user, date, date);
							revenueProD += total;
							totalRevenue += total * 0.03;
						} else {
							if (revenueDate == null) {
								Calendar cal = Calendar.getInstance();
								cal.setTime(date);
								cal.add(Calendar.DATE, -30);
								Double totalBVGroup = totalRevenueGroup(user, cal.getTime(), date);
								if (totalBVGroup >= LeverType.PRO_DISTRIBUTE.getAmount()) {
									revenueProD += totalBVGroup;
									totalRevenue += totalBVGroup * 0.03;
									check = true;
								}
							} else {
								Calendar cal = Calendar.getInstance();
								cal.setTime(revenueDate);
								cal.add(Calendar.DATE, 1);
								Double totalBVGroup = totalRevenueGroup(user, cal.getTime(), date);
								if (totalBVGroup >= LeverType.PRO_DISTRIBUTE.getAmount()) {
									revenueProD += totalBVGroup;
									totalRevenue += totalBVGroup * 0.03;
									check = true;
								}
							}

						}
					} else if (lever.equals(LeverType.TL.name()) || lever.equals(LeverType.MSD.name())
							|| lever.equals(LeverType.DSD.name()) || lever.equals(LeverType.GDSD.name())) {
						// nhận thêm 2% từ trước nữa
						totalRevenue += revenueProD * 0.02;
						revenueProD = 0.0;
						totalRevenue += totalRevenueGroup(user, date, date) * 0.05;
					} else {
						continue;
					}
				}
				Calendar fromDate = Calendar.getInstance();
				fromDate.setTime(form.getDateFrom());
				fromDate.add(Calendar.DATE, 1);
				// get revenue direct
				Double revenueDirect = revenueService.getDirectRevenue(user.getId(), fromDate.getTime(),
						form.getDateTo());
				if (revenueDirect > 0 || totalRevenue > 0) {
					revenue.setRevenueDirect(revenueDirect);
					revenue.setUserName(user.getDispName());
					revenue.setRevenueValue(totalRevenue);
					revenue.setOrderName("Hoa hồng nhóm theo tuần");
					revenue.setType(RevenueType.WEEK.getValue());
					revenue.setCdate(form.getDateTo());
					revenue.setReceiverId(user.getId());
					lstRevenue.add(revenue);
				}
			}
		}
		if (form.getType() == RevenueGroupType.MONTH.getValue()) {
			Calendar dateFrom = Calendar.getInstance();
			dateFrom.setTime(form.getCdate());
			dateFrom.set(Calendar.DATE, 1);
			Calendar dateTo = Calendar.getInstance();
			dateTo.set(Calendar.DAY_OF_MONTH, dateFrom.getActualMaximum(Calendar.DAY_OF_MONTH));
			dateTo = CommonUtils.setMaxHour(dateTo);
			for (User user : lstUser) {
				boolean check = false;
				for (Date date = dateFrom.getTime(); dateFrom.before(dateTo); dateFrom.add(Calendar.DATE,
						1), date = dateFrom.getTime()) {
					String lever = revenueService.getLever(user, date);
					if (lever.equals(LeverType.GDSD.name())) {
						check = true;
						break;
					} else
						continue;
				}
				if (check) {
					Double total = dao.getAllRevenue(dateFrom.getTime(), dateTo.getTime());
					if (total > 0) {
						Revenue revenue = new Revenue();
						revenue.setReceiverId(user.getId());
						revenue.setUserName(user.getDispName());
						revenue.setRevenueValue(total * RevenuePercent.ONE.getValue());
						revenue.setUserLever(LeverType.GDSD.name());
						revenue.setTotalOrderValue(total);
						revenue.setRevenuePecent(RevenuePercent.ONE.name());
						revenue.setOrderName("Hoa hồng nhóm theo tháng");
						revenue.setType(RevenueType.MONTH.getValue());
						revenue.setCdate(dateTo.getTime());
						revenue.setReceiverId(user.getId());
						lstRevenue.add(revenue);
					}
				}

			}
		}
		if (form.getType() == RevenueGroupType.QUARTER.getValue()) {

			for (User user : lstUser) {
				String lever1 = "";
				String lever2 = "";
				String lever3 = "";

				Calendar dateFrom1 = Calendar.getInstance();
				dateFrom1.set(Calendar.MONTH, form.getNum() * 3 - 3);
				dateFrom1.set(Calendar.DAY_OF_MONTH, 1);
				dateFrom1.set(Calendar.YEAR, Calendar.getInstance().get(Calendar.YEAR));

				Calendar dateTo1 = Calendar.getInstance();
				dateTo1.setTime(dateFrom1.getTime());
				dateTo1.set(Calendar.DAY_OF_MONTH, dateTo1.getActualMaximum(Calendar.DAY_OF_MONTH));
				dateTo1 = CommonUtils.setMaxHour(dateTo1);

				for (Date date = dateFrom1.getTime(); dateFrom1.before(dateTo1); dateFrom1.add(Calendar.DATE,
						1), date = dateFrom1.getTime()) {
					// check first month
					String lever = revenueService.getLever(user, date);
					if (lever.equals(LeverType.GDSD.name())) {
						lever1 = lever;
						break;
					} else if (lever.equals(LeverType.DSD.name())) {
						lever1 = lever;
					} else if (lever.equals(LeverType.MSD.name())) {
						if (lever1.equals(""))
							lever1 = lever;
					} else {
						continue;
					}
				}
				if (lever1.equals(""))
					continue;

				Calendar dateFrom2 = Calendar.getInstance();
				dateFrom2.set(Calendar.MONTH, form.getNum() * 3 - 2);
				dateFrom2.set(Calendar.DAY_OF_MONTH, 1);
				dateFrom2.set(Calendar.YEAR, Calendar.getInstance().get(Calendar.YEAR));

				Calendar dateTo2 = Calendar.getInstance();
				dateTo2.setTime(dateFrom2.getTime());
				dateTo2.set(Calendar.DAY_OF_MONTH, dateTo2.getActualMaximum(Calendar.DAY_OF_MONTH));
				dateTo2 = CommonUtils.setMaxHour(dateTo2);
				for (Date date = dateFrom2.getTime(); dateFrom2.before(dateTo1); dateFrom2.add(Calendar.DATE,
						1), date = dateFrom2.getTime()) {
					// check second month
					String lever = revenueService.getLever(user, date);
					if (lever.equals(LeverType.GDSD.name())) {
						lever2 = lever;
						break;
					} else if (lever.equals(LeverType.DSD.name())) {
						lever2 = lever;
					} else if (lever.equals(LeverType.MSD.name())) {
						if (lever2.equals(""))
							lever2 = lever;
					} else {
						continue;
					}
				}
				if (lever2.equals(""))
					continue;

				Calendar dateFrom3 = Calendar.getInstance();
				dateFrom3.set(Calendar.MONTH, form.getNum() * 3 - 1);
				dateFrom3.set(Calendar.DAY_OF_MONTH, 1);
				dateFrom3.set(Calendar.YEAR, Calendar.getInstance().get(Calendar.YEAR));

				Calendar dateTo3 = Calendar.getInstance();
				dateTo3.setTime(dateFrom3.getTime());
				dateTo3.set(Calendar.DAY_OF_MONTH, dateTo3.getActualMaximum(Calendar.DAY_OF_MONTH));
				dateTo3 = CommonUtils.setMaxHour(dateTo3);

				for (Date date = dateFrom3.getTime(); dateFrom3.before(dateTo3); dateFrom3.add(Calendar.DATE,
						1), date = dateFrom3.getTime()) {
					// check 3th month
					String lever = revenueService.getLever(user, date);
					if (lever.equals(LeverType.GDSD.name())) {
						lever3 = lever;
						break;
					} else if (lever.equals(LeverType.DSD.name())) {
						lever3 = lever;
					} else if (lever.equals(LeverType.MSD.name())) {
						if (lever3.equals(""))
							lever3 = lever;
					} else {
						continue;
					}
				}
				if (lever3.equals(""))
					continue;
				Double total = totalRevenueGroup(user, dateFrom1.getTime(), dateTo3.getTime());
				if (lever1.equals(LeverType.MSD.name()) || lever2.equals(LeverType.MSD.name())
						|| lever3.equals(LeverType.MSD.name())) {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					revenue.setUserName(user.getDispName());
					revenue.setRevenueValue(total * RevenuePercent.TWO.getValue());
					revenue.setUserLever(LeverType.MSD.name());
					revenue.setTotalOrderValue(total);
					revenue.setRevenuePecent(RevenuePercent.TWO.name());
					revenue.setCdate(dateTo3.getTime());
					revenue.setReceiverId(user.getId());
					lstRevenue.add(revenue);
					continue;
				} else {
					Revenue revenue = new Revenue();
					revenue.setReceiverId(user.getId());
					revenue.setUserName(user.getDispName());
					revenue.setRevenueValue(total * RevenuePercent.THREE.getValue());
					if (lever1.equals(LeverType.DSD.name()) || lever2.equals(LeverType.DSD.name())
							|| lever3.equals(LeverType.DSD.name()))
						revenue.setUserLever(LeverType.DSD.name());
					else
						revenue.setUserLever(LeverType.GDSD.name());
					revenue.setTotalOrderValue(total);
					revenue.setRevenuePecent(RevenuePercent.THREE.name());
					revenue.setOrderName("Hoa hồng nhóm theo tháng");
					revenue.setType(RevenueType.QUATER.getValue());
					revenue.setCdate(dateTo3.getTime());
					revenue.setReceiverId(user.getId());
					lstRevenue.add(revenue);
				}
			}
		}

		return lstRevenue;
	}

	private Double totalRevenueGroup(User user, Date dateFrom, Date dateTo) throws SQLException {
		Double result = 0.0;
		List<User> lstAllChild = dao.getAllChild(user.getChildId());
		for (User child : lstAllChild) {
			result += getRevenue(child, dateFrom, dateTo);
		}
		return result;
	}

	private Double getRevenue(User user, Date dateFrom, Date dateTo) throws SQLException {
		return dao.getRevenuePersonal(user, dateFrom, dateTo);
	}

	@Override
	public List<Revenue> getRevenueMonth() throws SQLException {
		// get all user
		List<User> lstUser = dao.getMembers();
		List<Revenue> revenues = new ArrayList<>();
		for (User user : lstUser) {
			Revenue revenue = new Revenue();
			revenue.setUserName(user.getDispName());
			revenue.setReceiverId(user.getId());
			boolean check = false;
			for (int i = 1; i < 13; i++) {
				Calendar cal = Calendar.getInstance();
				cal.set(Calendar.MONTH, i - 1);
				// first day of month
				cal.set(Calendar.DAY_OF_MONTH, 1);
				Date dateFrom = cal.getTime();
				// last day of mounth
				cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
				Date dateTo = cal.getTime();
				Double value = 0.0;
				switch (i) {
				case 1:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setJan(value);
					break;
				case 2:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setFeb(value);
					break;
				case 3:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setMar(value);
					break;
				case 4:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setApr(value);
					break;
				case 5:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setMay(value);
					break;
				case 6:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setJun(value);
					break;
				case 7:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setJul(value);
					break;
				case 8:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setAug(value);
					break;
				case 9:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setSep(value);
					break;
				case 10:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setOct(value);
					break;
				case 11:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setNov(value);
					break;
				case 12:
					value = totalRevenueGroup(user, dateFrom, dateTo);
					if (value > 0)
						check = true;
					revenue.setDec(value);
					break;
				default:
					break;
				}
			}
			if (check)
				revenues.add(revenue);
		}
		return revenues;
	}

	/**
	 * 
	 * @param form
	 *            form data : userId , dateFrom , dateTo , type = 0 -> hoa hồng
	 *            trực tiếp , = 1 -> hoa hồng group
	 * @return
	 * @throws SQLException
	 */
	@Override
	public Double apiGetRevenue(RevenueForm form) throws SQLException {
		Double result = 0.0;
		// lấy danh sách các order trong khoảng thời gian
		List<Order> lstOrder = dao.getAllOrder(form.getDateFrom(), form.getDateTo(), form.getUserId());

		if (form.getType() == RevenueType.PERSONAL.getValue()) {
			// hoa hồng cá nhân
			for (Order order : lstOrder) {
				Revenue revenue = calcuRevenuePersonal(order);
				if (revenue.getRevenueValue() != null) {
					result += revenue.getRevenueValue();
				}
			}
		}
		if (form.getType() == RevenueType.GROUP.getValue()) {
			List<Order> orders = new ArrayList<>();
			List<User> lstChild = dao.getChild(form.getUserId());
			for (User child : lstChild) {
				orders.addAll(dao.getAllOrder(form.getDateFrom(), form.getDateTo(), child.getId()));
			}
			// hoa hồng nhóm
			for (Order order : orders) {
				Revenue revenue = calcuRevenueGroup(order);
				if (revenue.getRevenueValue() != null) {
					result += revenue.getRevenueValue();
				}
			}
		}
		return result;
	}

	@Override
	public Double totalOrderValue(Date start, Date end) throws SQLException {
		return null;
	}

	@Override
	public List<Banner> getAllBanner() throws SQLException {
		return dao.getAllBanner();
	}

	@Override
	public int createBanner(Banner banner) throws SQLException {
		return dao.createBanner(banner);
	}

	@Override
	public int deleteBanner(int id) throws SQLException {
		return dao.deleteBanner(id);
	}

	@Override
	public int editLever(EditLeverForm formdata) throws SQLException {
		User user = dao.getUserById(formdata.getId());
		if (user.getCdate() == null) {
			return 0;
		}
		// get order info by user id
		Order order = dao.getOrderByUser(user);
		Revenue revenue = new Revenue();
		revenue.setReceiverId(user.getParentId());
		revenue.setByerId(user.getId());
		if (order != null) {
			// update order and update revenue
			
			if (formdata.getLever() == LeverType.New.getValue()) {
				// delete order
				if(dao.deleteOrder(order.getId()) > 0)
					return dao.deleteRevenues(revenue);
			} else {
				// update order
				order.setUserId(user.getId());
				order.setQuantity(1);
				order.setType(OrderType.ORDER_PRODUCT.getCode());
				if (formdata.getLever() == LeverType.SALE_MEMBER.getValue()) {
					order.setOrderName(LeverType.SALE_MEMBER.name());
					order.setPrice((double)LeverType.SALE_MEMBER.getAmount());
					revenue.setOrderName(LeverType.SALE_MEMBER.name());
					revenue.setOrderPrice((double)LeverType.SALE_MEMBER.getAmount()*0.1);
				}

				if (formdata.getLever() == LeverType.SALE_PRO.getValue()) {
					order.setOrderName(LeverType.SALE_PRO.name());
					order.setPrice((double)LeverType.SALE_PRO.getAmount());
					revenue.setOrderName(LeverType.SALE_PRO.name());
					revenue.setOrderPrice((double)LeverType.SALE_PRO.getAmount()*0.1);
				}
				if (formdata.getLever() == LeverType.PRO_DISTRIBUTE.getValue()) {
					order.setOrderName(LeverType.PRO_DISTRIBUTE.name());
					order.setPrice((double)LeverType.PRO_DISTRIBUTE.getAmount());
					revenue.setOrderName(LeverType.PRO_DISTRIBUTE.name());
					revenue.setOrderPrice((double)LeverType.PRO_DISTRIBUTE.getAmount()*0.1);
				}
				if(dao.updateOrder(order) > 0)
					return dao.updateRevenue(revenue);
			}
		} else {
			// insert order and revenue
			if (formdata.getLever() == LeverType.SALE_MEMBER.getValue()
					|| formdata.getLever() == LeverType.SALE_PRO.getValue()
					|| formdata.getLever() == LeverType.PRO_DISTRIBUTE.getValue()) {
				//insert into orders(name,cdate,user_id,price,quantity,type,total) values(?,?,?,?,?,?,?)
				Order ord = new Order();
				ord.setOrderDate(user.getCdate());
				ord.setQuantity(1);
				ord.setType(OrderType.ORDER_PRODUCT.getCode());
				ord.setUserId(user.getId());
				if (formdata.getLever() == LeverType.SALE_MEMBER.getValue()) {
					ord.setOrderName(LeverType.SALE_MEMBER.name());
					ord.setPrice((double)LeverType.SALE_MEMBER.getAmount());
					revenue.setOrderName(LeverType.SALE_MEMBER.name());
					revenue.setOrderPrice((double)LeverType.SALE_MEMBER.getAmount()*0.1);
				}

				if (formdata.getLever() == LeverType.SALE_PRO.getValue()) {
					ord.setOrderName(LeverType.SALE_PRO.name());
					ord.setPrice((double)LeverType.SALE_PRO.getAmount());
					revenue.setOrderName(LeverType.SALE_PRO.name());
					revenue.setOrderPrice((double)LeverType.SALE_PRO.getAmount()*0.1);
				}
				if (formdata.getLever() == LeverType.PRO_DISTRIBUTE.getValue()) {
					ord.setOrderName(LeverType.PRO_DISTRIBUTE.name());
					ord.setPrice((double)LeverType.PRO_DISTRIBUTE.getAmount());
					revenue.setOrderName(LeverType.PRO_DISTRIBUTE.name());
					revenue.setOrderPrice((double)LeverType.PRO_DISTRIBUTE.getAmount()*0.1);
				}
				if(dao.createOrder(ord) > 0){
					revenue.setCdate(user.getCdate());
					revenue.setType(RevenueType.DIRECT.getValue());
					return dao.createRevenue(revenue);
				}
			}else{
				return 1;
			}
		}
		return 0;
	}

}
