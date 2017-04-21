package controller;

import java.sql.SQLException;
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
import model.Revenue;
import model.RevenueForm;
import model.RevenueResult;
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

	@RequestMapping(value = { "/addMember" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult createMember(@RequestBody User form) {
		AjaxResult result = new AjaxResult();
		try {
			User parent = service.getUserById(form.getParentId());
			if(parent.getCdate() == null){
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E009", null, Locale.getDefault()));
				return result;
			}
			result.setResultData(service.createMember(parent,form.getLever()));
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
		model.addAttribute("userDetail", service.detailUser(userID));
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
		model.addAttribute("feedbacks", service.getAllFeedback());
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
			if (user.getCdate() == null) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E006", null, Locale.getDefault()));
			} else {
				if(user.getDispName() == null)
					user.setDispName(messageSource.getMessage("I001", null, Locale.getDefault()));
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
		try {
			if (service.createOrder(form) == 0) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E007", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setMessage(messageSource.getMessage("S004", null, Locale.getDefault()));
				result.setResultData(form);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E007", null, Locale.getDefault()));
			return result;
		}
		return result;
	}
	
	@RequestMapping(value = { "/revenue" }, method = RequestMethod.GET)
	public String revenue(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "account/revenue";
	}
	
	@RequestMapping(value = { "/revenueGroup" }, method = RequestMethod.GET)
	public String revenueGroup(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "account/revenueGroup";
	}

	@RequestMapping(value = { "/revenuePersonal" }, method = RequestMethod.GET)
	public String revenuePersonal(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "account/revenuePersonal";
	}

	@RequestMapping(value = { "/revenue" }, method = RequestMethod.POST)
	public @ResponseBody RevenueResult revenuePersonal(@RequestBody RevenueForm form) throws SQLException {
		RevenueResult lstRevenue = new RevenueResult();
		List<Revenue> lst = service.getAllRevenue(form);
		lstRevenue.setData(lst);
		return lstRevenue;
	}
	
	@RequestMapping(value = { "/updateOrder" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult updateOrder(@RequestBody Order form) {
		AjaxResult result = new AjaxResult();
		if(form.getType() == 0){
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E010", null, Locale.getDefault()));
			return result;
		}
		try {
			if(service.updateOrder(form) > 0){
				result.setResult(true);
				result.setMessage(messageSource.getMessage("S005", null, Locale.getDefault()));
				return result;
			}
		} catch (SQLException e) {
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E010", null, Locale.getDefault()));
			return result;
		}
		return result;
	}
	
	@RequestMapping(value = { "/resetPassword" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult resetPassword(@RequestBody EditRoleForm form) {
		AjaxResult result = new AjaxResult();
		try {
			String passord = service.resetPassword(form.getLstUserId());
			if (passord.equals("")) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E012", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setMessage(messageSource.getMessage("S006", new Object[]{passord}, Locale.getDefault()));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E011", null, Locale.getDefault()));
			return result;
		}
		return result;
	}
	
	@RequestMapping(value = { "/revenueGroup" }, method = RequestMethod.POST)
	public @ResponseBody RevenueResult revenueGroup(@RequestBody RevenueForm form) throws SQLException {
		RevenueResult lstRevenue = new RevenueResult();
		List<Revenue> lst = service.getRevenueGroup(form);
		lstRevenue.setData(lst);
		return lstRevenue;
	}
}
