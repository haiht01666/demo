package model;

import java.util.Date;

public class Revenue {
	private String userName;
	
	private String orderName;
	
	private Date cdate;
	
	private Double orderPrice;
	
	private String revenuePecent;
	
	private Double revenueValue;
	
	private String cdateString;

	public String getCdateString() {
		return cdateString;
	}

	public void setCdateString(String cdateString) {
		this.cdateString = cdateString;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getOrderName() {
		return orderName;
	}

	public void setOrderName(String orderName) {
		this.orderName = orderName;
	}

	public Date getCdate() {
		return cdate;
	}

	public void setCdate(Date cdate) {
		this.cdate = cdate;
	}

	public Double getOrderPrice() {
		return orderPrice;
	}

	public void setOrderPrice(Double orderPrice) {
		this.orderPrice = orderPrice;
	}

	public String getRevenuePecent() {
		return revenuePecent;
	}

	public void setRevenuePecent(String revenuePecent) {
		this.revenuePecent = revenuePecent;
	}

	public Double getRevenueValue() {
		return revenueValue;
	}

	public void setRevenueValue(Double revenueValue) {
		this.revenueValue = revenueValue;
	}
}
