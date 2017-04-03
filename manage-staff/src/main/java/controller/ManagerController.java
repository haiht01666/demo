package controller;

import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.AjaxResult;
import model.User;
import service.ManageService;

@Controller
@RequestMapping("manage")
public class ManagerController {
	
	@Autowired
	private HttpSession session;
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	ManageService service;

	@RequestMapping(value = { "" }, method = RequestMethod.GET)
	public String index(ModelMap model) {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "manage-staff/index";
	}

	@RequestMapping(value = { "/addMember" }, method = RequestMethod.GET,produces="application/json; charset=UTF-8")
	public @ResponseBody AjaxResult createMember() {
		User user = (User) session.getAttribute("ss-user");
		AjaxResult result = new AjaxResult();
		try {
			result.setResultData(service.createMember(Integer.parseInt(user.getUserCode()),user.getChildId()));
			result.setResult(true);
			result.setMessage(messageSource.getMessage("S001", null,Locale.US));
		} catch (Exception e) {
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E001", null,Locale.US));
			return result;
		}
		return result;
	}

}
