package dao;

import java.sql.SQLException;
import java.util.List;

import model.User;

public interface ManageDao {
	public int createMember(int parentId, String childId) throws SQLException;

	/*
	 * Get staff only
	 */
	public List<User> getStaffs();

	/**
	 * get all member
	 * 
	 * @return list user
	 */
	public List<User> getMembers();
}
