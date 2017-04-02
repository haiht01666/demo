package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UserDao;
import model.User;
import model.UserForm;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;

	@Override
	public User getUserByCode(String userCode) {

		return userDao.getUserByCode(userCode);
	}

	@Override
	public boolean isUserEnable(int id) {
		return userDao.isUserEnable(id);
	}

	@Override
	public int createUser(UserForm user) {
		return userDao.createUser(user);
	}

}
