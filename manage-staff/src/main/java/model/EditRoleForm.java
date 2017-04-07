package model;

import java.util.List;

public class EditRoleForm {
	private String role;
	
	private List<String> lstUserId;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<String> getLstUserId() {
		return lstUserId;
	}

	public void setLstUserId(List<String> lstUserId) {
		this.lstUserId = lstUserId;
	}
	
}
