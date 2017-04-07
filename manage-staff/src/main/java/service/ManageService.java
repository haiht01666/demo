package service;

import java.sql.SQLException;
import java.util.List;

import model.EditRoleForm;
import model.User;

public interface ManageService {
	public int createMember(int parentId, String childId) throws SQLException;
	
	public List<User> lstUser(String role) throws SQLException;
	
	public int editRole(EditRoleForm formdata) throws SQLException;
}
