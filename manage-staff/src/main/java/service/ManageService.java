package service;

import java.sql.SQLException;

public interface ManageService {
	public int createMember(int parentId) throws SQLException;
}
