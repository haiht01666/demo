package dao;

import model.Order;
import model.User;

import java.math.BigDecimal;
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
	long getTotalNpp(boolean directNpp, String userCode);
	List<User> getNpp(boolean directNpp, String userCode, Integer limit, Integer offset, String orderby);
	long getTotalOrder(List<String> listChildId);
	List<Order> getListOrder(List<String> listChildId, Integer limit, Integer offset, String orderby);
	BigDecimal getWeekGroupVolume(List<String> listGroupId, String startDate, String monthYear);

	BigDecimal getMonthPersonalVolume(String userCode, String dateTime);
}
