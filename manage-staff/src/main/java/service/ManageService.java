package service;

import java.sql.SQLException;

public interface ManageService {
	public int createMember(int parentId, String childId) throws SQLException;
}
