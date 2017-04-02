package dao;

import model.User;
import model.UserForm;

public interface UserDao {
	
	/**
	 * get user by code
	 * @param code user id
	 * @return user object
	 */
	public User getUserByCode(String code);
	
	/**
	 * check user enable
	 * @param id user id
	 * @return true or false
	 */
	public boolean isUserEnable(int id);
	
	/**
	 * Create user
	 * @param user user
	 * @return number of row created
	 */
	public int createUser(UserForm user);
}
