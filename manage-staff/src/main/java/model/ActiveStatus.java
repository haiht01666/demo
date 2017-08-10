package model;

import java.util.Date;

import common.CommonUtils;

public class ActiveStatus {
	
	private Date expireDate;
	
	private int dateNum;
	
	private String status;

	public Date getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}

	public int getDateNum() {
		return this.dateNum;
	}

	public void setDateNum(Date date) {
		if(status.equals(constant.Status.INACTIVE))
			this.dateNum =  0;
		else{
			this.dateNum = CommonUtils.getDaysCount(new Date(), date);
		}
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
