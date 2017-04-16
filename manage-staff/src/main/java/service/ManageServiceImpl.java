package service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import constant.LeverType;
import constant.OrderType;
import constant.RevenuePercent;
import constant.RevenueType;
import constant.Roles;
import constant.TimePeriodCheck;
import dao.ManageDao;
import model.EditRoleForm;
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
			String packageValue = LeverType.New.name();
			if (user.getLever() == LeverType.New.getValue()) {
				// if type is new then calculate lever follow by total value of
				// order interval 45 day
			
				packageValue = dao.getLever(user.getCdate(),order.getOrderDate(), order.getUserId());
			} else {
				if (user.getLever() == LeverType.SALE_MEMBER.getValue())
					packageValue = LeverType.SALE_MEMBER.name();
				if (user.getLever() == LeverType.SALE_PRO.getValue())
					packageValue = LeverType.SALE_PRO.name();
				if (user.getLever() == LeverType.PRO_DISTRIBUTE.getValue())
					packageValue = LeverType.PRO_DISTRIBUTE.name();
			}
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

	/**
	 * check package of user
	 * 
	 * @param userId
	 *            user id
	 * @return package value
	 */
	private String getLever(int userId) throws SQLException {
		User user = dao.getUserById(userId);
		Double totalPrice = dao.totalOrderPrice(user, TimePeriodCheck.TIME_ORDER_PERIOD_45);
		if (totalPrice >= LeverType.PRO_DISTRIBUTE.getAmount())
			return LeverType.PRO_DISTRIBUTE.name();
		if (totalPrice >= LeverType.SALE_PRO.getAmount())
			return LeverType.SALE_PRO.name();
		if (totalPrice >= LeverType.SALE_MEMBER.getAmount())
			return LeverType.SALE_MEMBER.name();
		else
			return LeverType.New.name();
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

	public static void main(String[] arg) {
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		// cal.add(cal.DATE, 1);
		System.err.println(date);
		System.err.println(cal.getTime());
		System.err.println(date.after(cal.getTime()));
	}
}
