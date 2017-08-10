package dao;

import java.sql.SQLException;
import java.util.Date;

import model.Revenue;
import model.RevenueApi;
import model.Revenues;
import model.User;

public interface RevenueDao {
	public boolean isActive(int id , Date date) throws SQLException;
	/**
	 * Get latest date order proactive
	 * @param id
	 * @param date
	 * @return
	 * @throws SQLException
	 */
	public Date getDateActive(int id , Date date) throws SQLException;
	public Date getProactiveDateCurrent(Date date,int userId)throws SQLException;
	/**
	 * Check user co active lien tiep ?
	 * @param userId
	 * @param date : ngay active gan nhat
	 * @return
	 */
	public boolean isProActive(int userId,Date date)throws SQLException;
	
	public Double getDirectRevenue(int userId,Date fromDate, Date endDate) throws SQLException;
	
	public int saveRevenue(Revenue revenue , User user ,Date cate) throws SQLException;
	
	public RevenueApi getRevenueInfo(Date cdate,int userId)throws SQLException;
	
	public RevenueApi getRevenueInfo(Date from , Date to,int userId )throws SQLException;
	
	public Double getTotalRevenue(Date date, int userID) throws SQLException;
	
	public Date getDateRevenue(int id) throws SQLException;
	
	public int saveRevenues(Revenues lstRevenue)throws SQLException;
} 
