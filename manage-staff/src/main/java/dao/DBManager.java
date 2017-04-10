package dao;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Locale;

import javax.xml.bind.annotation.adapters.HexBinaryAdapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

public class DBManager {
	@Autowired
	private MessageSource messageSource;
	
	PreparedStatement stmt = null;
	Statement st = null;
	Connection conn = null;
	ResultSet rs = null;

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


	
	public String encryptMd5(String item){
		try {
			return (new HexBinaryAdapter()).marshal(MessageDigest.getInstance("MD5").digest(item.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}

}
