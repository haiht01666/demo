package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UserDao;
import model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;
	/**
	 * {@inheritDoc}
	 */
	@Override
	public User getUserByCode(String userCode) {
	
		return userDao.getUserByCode(userCode);
	}

}
