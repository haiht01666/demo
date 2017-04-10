package service;

import model.AjaxResult;
import model.User;

public interface ApiService {
	/**
	 * check login user and pass
	 *
	 * @param user user name
	 * @param pass pass word
	 * @return true if valid
	 */
	AjaxResult checkLogin(String user, String pass);

	AjaxResult updatePersonalInfo(User user);
}
