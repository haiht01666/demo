package service;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public User lstUser(String role) {
		// TODO Auto-generated method stub
		return null;
	}

}
