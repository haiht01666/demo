package service;

import java.sql.SQLException;
import java.util.Date;

import model.Revenue;
import model.RevenueApi;
import model.User;

public interface RevenueService {
	/**
	 * Check user active or not
	 * @param id : user id
	 * @return true if active , false if not
	 */
	public boolean isActive(int id,Date date) throws SQLException;
	
	public String getBaseLever(int userId,Date date) throws SQLException;
	
	public String getLever(int userId,Date date) throws SQLException;
	
	public Double getDirectRevenue(int userId,Date fromDate, Date endDate) throws SQLException;
	
	public int saveRevenue(Revenue revenue , User user ,Date cate) throws SQLException;
	
	public RevenueApi getTotalRevenueInfo(Date from,int userId )throws SQLException;
	
	public RevenueApi getRevenueInfo(Date from , Date to,int userId )throws SQLException;
}
