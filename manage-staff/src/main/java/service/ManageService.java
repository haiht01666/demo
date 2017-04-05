package service;

import java.sql.SQLException;

import model.User;

public interface ManageService {
	public int createMember(int parentId, String childId) throws SQLException;
	
	public User lstUser(String role);
}
