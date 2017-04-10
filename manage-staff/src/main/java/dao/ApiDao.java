package dao;

import model.User;

public interface ApiDao {
	String getPasswordEncrypt(String userId);

	/**
	 * check login user and pass
	 *
	 * @param userId user id
	 * @return true if valid
	 */
	User getLoginInfo(String userId);

	int updatePersonalInfo(User user);

}
