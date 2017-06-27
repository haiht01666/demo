package service;

import java.sql.SQLException;
import java.util.Date;

public interface RevenueService {
	/**
	 * Check user active or not
	 * @param id : user id
	 * @return true if active , false if not
	 */
	public boolean isActive(int id,Date date) throws SQLException;
}
