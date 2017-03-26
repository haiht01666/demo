package dao;

import model.User;

public interface UserDao {
	
	public User getUserByCode(String code);
}
