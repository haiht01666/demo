package service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import model.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private HttpSession session;

	@Autowired
	private UserService userService;

	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String code) throws UsernameNotFoundException {
		User user = userService.getUserByCode(code);
		System.out.println("User : " + user);
		if (user == null) {
			System.out.println("User not found");
			throw new UsernameNotFoundException("Username not found");
		}
		session.setAttribute("ss-user", user);
		return new org.springframework.security.core.userdetails.User(user.getUserCode(), user.getPassWord(),
				user.getEnable(), true, true, true, getGrantedAuthorities(user));
	}

	/**
	 * Get roles
	 * 
	 * @param user
	 *            user info
	 * @return list role
	 */
	private List<GrantedAuthority> getGrantedAuthorities(User user) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (String role : user.getRoles()) {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
		}
		System.out.print("authorities :" + authorities);
		return authorities;
	}

}
