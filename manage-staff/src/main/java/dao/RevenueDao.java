package dao;

import java.sql.SQLException;
import java.util.Date;

public interface RevenueDao {
	public boolean isActive(int id , Date date) throws SQLException;
	public Date getProactiveDateCurrent(Date date,int userId)throws SQLException;
	/**
	 * Check user co active lien tiep ?
	 * @param userId
	 * @param date : ngay active gan nhat
	 * @return
	 */
	public boolean isProActive(int userId,Date date)throws SQLException;
} 
