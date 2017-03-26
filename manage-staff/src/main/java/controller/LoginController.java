package controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class LoginController{

	@Autowired
	private MessageSource messageSource;
	
	@RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
	public String homePage(ModelMap model) {
		model.addAttribute("mesage",messageSource.getMessage("message.12",null, Locale.US));
		//userMapper.getAllUsers();
		return "common/home";
	}
	
	@RequestMapping(value = "/access-denied", method = RequestMethod.GET)
	public String accessDeniedPage(ModelMap model) {
		//model.addAttribute("user", getPrincipal());
		return "common/access-deni";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public View logoutPage(HttpServletRequest request, HttpServletResponse response) {
		RedirectView redirect = new RedirectView("login");
		redirect.setExposeModelAttributes(false);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			  new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return redirect;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}
	
//	private String converCurrency(Double amount){
//		String result = "";
//	    Locale locale = new Locale("vi", "VN");      
//	    NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(locale);
//	    result = currencyFormatter.format(amount);
//	    return result;
//	}

}
