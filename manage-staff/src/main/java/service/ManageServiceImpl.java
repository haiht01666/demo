package service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import constant.PackageType;
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
	public int createMember(int parentId,String childId) throws SQLException {

		return dao.createMember(parentId,childId);
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
		String packageValue = checkPackage(userId);
		String packageValueParent = checkPackage(user.getParentId());
		if(packageValue.equals(PackageType.PRO_DISTRIBUTE.name())){
			//cá nhân được 30% 
		}
		if(packageValue.equals(PackageType.SALE_MEMBER.name())){
			//cá nhân được 10% 
		}
		if(packageValue.equals(PackageType.SALE_PRO.name())){
			//cá nhân được 10% 
			if(packageValueParent.equals(PackageType.PRO_DISTRIBUTE.name())){
				//cha được hưởng 20%
			}
			if(packageValueParent.equals(PackageType.SALE_PRO.name())){
				//cha được hưởng 10%
			}
		}
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * check package of user
	 * @param userId user id
	 * @return package value
	 */
	private String checkPackage(int userId)throws SQLException{
		User user = dao.getUserById(userId);
		String result = "";	
		if(user.getPackageValue() == PackageType.New.getValue()){
			Double totalPrice = dao.totalOrderPrice(user, TimePeriodCheck.TIME_ORDER_PERIOD_45);
			if(totalPrice >= PackageType.SALE_PRO.getAmount())
				return PackageType.PRO_DISTRIBUTE.name();
			if(totalPrice >= PackageType.SALE_MEMBER.getAmount())
				return PackageType.SALE_PRO.name();
			if(totalPrice > PackageType.New.getAmount())
				return PackageType.SALE_MEMBER.name();
		}else{
			if(user.getPackageValue() == PackageType.SALE_MEMBER.getValue())
				return PackageType.SALE_MEMBER.name();
			if(user.getPackageValue() == PackageType.SALE_PRO.getValue())
				return PackageType.SALE_PRO.name();
			if(user.getPackageValue() == PackageType.PRO_DISTRIBUTE.getValue())
				return PackageType.PRO_DISTRIBUTE.name();
		}
		return result;
	}

}
