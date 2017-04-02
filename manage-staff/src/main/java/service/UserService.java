package service;

import model.User;
import model.UserForm;

public interface UserService {
	public User getUserByCode(String code);
	/**
	 * check user is enable(don't sign up)
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
