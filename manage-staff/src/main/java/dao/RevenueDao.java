package dao;

import java.sql.SQLException;
import java.util.Date;

public interface RevenueDao {
	public boolean isActive(int id , Date date) throws SQLException;
}
