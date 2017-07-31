package dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseSingleton {
	
	private static DatabaseSingleton dbIsntance;
	private static Connection con;

	private DatabaseSingleton() {
		// private constructor //
	}

	public static DatabaseSingleton getInstance() {
		if (dbIsntance == null) {
			dbIsntance = new DatabaseSingleton();
		}
		return dbIsntance;
	}

	public Connection getConnection() {
		if (con == null) {
			try {
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				// url connect to mysql
				String url = "jdbc:mysql://localhost:3306/db_manage_staff?characterEncoding=UTF-8";//messageSource.getMessage("db.url", null, Locale.US);
				// user name connect to mysql
				String user = "root";//messageSource.getMessage("db.user", null, Locale.US);
				// password connect to mysql
				String pass = "123456";//messageSource.getMessage("db.pass", null, Locale.US);
				con = DriverManager.getConnection(url, user, pass);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}

		return con;
	}
}
