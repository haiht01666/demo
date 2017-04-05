package service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import constant.Roles;
import dao.ManageDao;
import model.User;

@Service
public class ManageServiceImpl implements ManageService {

	@Autowired
	ManageDao dao;

	@Override
	public int createMember(int parentId,String childId) throws SQLException {

		return dao.createMember(parentId,childId);
	}

	@Override
	public List<User> lstUser(String role) throws SQLException{
		if(role.equals(Roles.ROLE_ADMIN.toString()))
			return dao.getStaffs();
		else if(role.equals(Roles.ROLE_SPADMIN.toString()))
			return dao.getMembers();
		else
			return null;
	}

}
