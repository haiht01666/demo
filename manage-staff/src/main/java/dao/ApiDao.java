package dao;

import model.User;

import java.util.List;

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
	int saveAvatar(User user);
	int changePassword(String userCode, String newPass);
	int requestSupport(String userCode, String userName, String title, String content);
	List<User> getAllNpp(String userCode, String childId, String litmit, String offset);
}
