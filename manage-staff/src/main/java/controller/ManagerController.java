package controller;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import model.AjaxResult;
import model.EditRoleForm;
import model.Order;
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

	@RequestMapping(value = { "", "/home" }, method = RequestMethod.GET)
	public String index(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		String userRole = user.getRoles().get(0);
		model.addAttribute("user", user);
		List<User> lstMember = service.lstUser(userRole);
		model.addAttribute("lstMember", lstMember);
		model.addAttribute("role", userRole);
		return "account/index";
	}

	@RequestMapping(value = { "/addMember" }, method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public @ResponseBody AjaxResult createMember() {
		User user = (User) session.getAttribute("ss-user");
		AjaxResult result = new AjaxResult();
		try {
			result.setResultData(service.createMember(Integer.parseInt(user.getUserCode()), user.getChildId()));
			result.setResult(true);
			result.setMessage(messageSource.getMessage("S001", null, Locale.getDefault()));
		} catch (Exception e) {
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E001", null, Locale.getDefault()));
			return result;
		}
		return result;
	}

	@RequestMapping(value = { "/detail" }, method = RequestMethod.GET)
	public String detail(ModelMap model, @RequestParam("id") String id) throws SQLException {
		int userID = Integer.parseInt(id);
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		model.addAttribute("userDetail", service.getUserById(userID));
		return "account/detail";
	}

	@RequestMapping(value = { "/orders" }, method = RequestMethod.GET)
	public String order(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		model.addAttribute("orders", service.getAllOrder());
		return "account/order";
	}

	@RequestMapping(value = { "/feedbacks" }, method = RequestMethod.GET)
	public String feedback(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "account/feedback";
	}

	@RequestMapping(value = { "/editRole" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult editRole(@RequestBody EditRoleForm form) {
		AjaxResult result = new AjaxResult();
		try {
			if (service.editRole(form) > 0) {
				result.setResult(true);
				result.setMessage(messageSource.getMessage("S003", null, Locale.getDefault()));
			} else {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E005", null, Locale.getDefault()));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E005", null, Locale.getDefault()));
			return result;
		}
		return result;
	}

	@RequestMapping(value = { "/checkUser" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult checkUserExist(@RequestParam("id") int id) {
		AjaxResult result = new AjaxResult();
		try {
			User user = service.getUserById(id);
			if (user.getDispName() == null) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E006", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setResultData(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E006", null, Locale.getDefault()));
			return result;
		}
		return result;
	}

	@RequestMapping(value = { "/createOrder" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult createOrder(@RequestBody Order form) {
		AjaxResult result = new AjaxResult();
		if(form.getType() == 0){
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E008", null, Locale.getDefault()));
		}
		form.setOrderDate(new Date());
		try {
			if (service.createOrder(form) == 0) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E007", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setMessage(messageSource.getMessage("S004", null, Locale.getDefault()));
				result.setResultData(form);
				// calculator revenue
				service.calcuRevenue(form.getUserId());
				service.calcuRevenue(form.getParentId());
			}
		} catch (SQLException e) {
			e.printStackTrace();
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E005", null, Locale.getDefault()));
			return result;
		}
		return result;
	}

}
