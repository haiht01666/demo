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
	User getLoginInfo(String userId) throws Exception;

	int updatePersonalInfo(User user);
	int saveAvatar(User user);
	int changePassword(String userCode, String newPass);
	int requestSupport(String userCode, String title, String content);
	long getTotalNpp(boolean directNpp, String userCode);
	List<User> getNpp(boolean directNpp, String userCode, Integer limit, Integer offset, String orderby);
	long getTotalOrder(String userCode);
	List<Order> getListOrder(String userCode, Integer limit, Integer offset, String orderby);
	BigDecimal getWeekGroupVolume(String userCode, String startDate, String endDate);
	BigDecimal getWeekPersonalVolume(String userCode, String startDate, String endDate);
	BigDecimal getMonthPersonalVolume(String userCode, String dateTime);
	BigDecimal getMonthGroupVolume(String userCode, String monthYear);
	BigDecimal getYearPersonalVolume(String userCode, String dateTime);
	BigDecimal getYearGroupVolume(String userCode, String monthYear);
}
