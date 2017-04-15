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
	
	private String byerName;
	
	private int byerId;
	
	private String receiverName;
	
	private int receiverId;
	
	private int orderId;

	private int type;
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getByerName() {
		return byerName;
	}

	public void setByerName(String byerName) {
		this.byerName = byerName;
	}

	public int getByerId() {
		return byerId;
	}

	public void setByerId(int byerId) {
		this.byerId = byerId;
	}

	public String getReceiverName() {
		return receiverName;
	}

	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}

	public int getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(int receiverId) {
		this.receiverId = receiverId;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

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
