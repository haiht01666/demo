package service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import constant.LeverType;
import constant.Roles;
import constant.TimePeriodCheck;
import dao.ManageDao;
import model.EditRoleForm;
import model.Order;
import model.User;

@Service
public class ManageServiceImpl implements ManageService {

	@Autowired
	ManageDao dao;

	@Override
	public int createMember(User parent,int lever) throws SQLException {

		return dao.createMember(parent,lever);
	}

	@Override
	public List<User> lstUser(String role) throws SQLException{
		if(role.equals(Roles.ROLE_ADMIN.toString()))
			return dao.getStaffs();
		else if(role.equals(Roles.ROLE_SPADMIN.toString()))
			return dao.getMembers();
		else
			return null;
	}

	@Override
	public int editRole(EditRoleForm formdata) throws SQLException{
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

	@Override
	public void calcuRevenue(int userId) throws SQLException {
		User user = dao.getUserById(userId);
		String packageValue = getLever(userId);
		//String packageValueParent = checkPackage(user.getParentId());
		if(packageValue.equals(LeverType.PRO_DISTRIBUTE.name())){
			//cá nhân được 30% 
		}
		if(packageValue.equals(LeverType.SALE_MEMBER.name())){
			//cá nhân được 10% 
			//cha được hưởng 10%
		}
		if(packageValue.equals(LeverType.SALE_PRO.name())){
			//cá nhân được 15% 
			//cha được hương 10%
		}
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public String getLeverUser(int userId) throws SQLException {
		return getLever(userId);
	}

	/**
	 * check package of user
	 * @param userId user id
	 * @return package value
	 */
	private String getLever(int userId)throws SQLException{
		User user = dao.getUserById(userId);
		String result = "";	
		if(user.getLever() == LeverType.New.getValue()){
			Double totalPrice = dao.totalOrderPrice(user, TimePeriodCheck.TIME_ORDER_PERIOD_45);
			if(totalPrice >= LeverType.PRO_DISTRIBUTE.getAmount())
				return LeverType.PRO_DISTRIBUTE.name();
			if(totalPrice >= LeverType.SALE_PRO.getAmount())
				return LeverType.SALE_PRO.name();
			if(totalPrice > LeverType.SALE_MEMBER.getAmount())
				return LeverType.SALE_MEMBER.name();
			else
				return LeverType.New.name();
		}else{
			if(user.getLever() == LeverType.SALE_MEMBER.getValue())
				return LeverType.SALE_MEMBER.name();
			if(user.getLever() == LeverType.SALE_PRO.getValue())
				return LeverType.SALE_PRO.name();
			if(user.getLever() == LeverType.PRO_DISTRIBUTE.getValue())
				return LeverType.PRO_DISTRIBUTE.name();
		}
		return result;
	}

	
}
