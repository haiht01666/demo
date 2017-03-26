package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

public class DBManager {
	@Autowired
	private MessageSource messageSource;

	public Connection getConnection() {
		Connection conn = null;
		try {

			Class.forName("com.mysql.jdbc.Driver").newInstance();
			// url connect to mysql
			String url = messageSource.getMessage("db.url", null, Locale.US);
			// user name connect to mysql
			String user = messageSource.getMessage("db.user", null, Locale.US);
			// password connect to mysql
			String pass = messageSource.getMessage("db.pass", null, Locale.US);
			conn = DriverManager.getConnection(url, user, pass);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return conn;
	}

}
