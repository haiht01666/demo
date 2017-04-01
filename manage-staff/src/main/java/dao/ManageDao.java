package dao;

import java.sql.SQLException;

public interface ManageDao {
	public int createMember(int parentId) throws SQLException;
}
