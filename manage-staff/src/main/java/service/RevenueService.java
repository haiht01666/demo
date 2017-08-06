package service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import model.Order;
import model.Revenue;
import model.RevenueApi;
import model.Revenues;
import model.User;

public interface RevenueService {
	/**
	 * Check user active or not
	 * @param id : user id
	 * @return true if active , false if not
	 */
	public boolean isActive(User user,Date date) throws SQLException;
	
	public String getBaseLever(User user,Date date) throws SQLException;
	
	public String getLever(User user,Date date,List<Order> lstOrder) throws SQLException;
	
	public Double getDirectRevenue(int userId,Date fromDate, Date endDate) throws SQLException;
	
	public int saveRevenue(Revenue revenue , User user ,Date cate) throws SQLException;
	
	public RevenueApi getTotalRevenueInfo(Date from,int userId )throws SQLException;
	
	public RevenueApi getRevenueInfo(Date from , Date to,int userId )throws SQLException;
	
	public Double getTotalRevenue(Date date, User user) throws SQLException;
	
	//Lấy ngày trả hoa hồng theo tuần mới nhất.
	public Date getDateRevenue(int id) throws SQLException;
	
	public int saveRevenues(Revenues lstRevenue)throws SQLException;
}
