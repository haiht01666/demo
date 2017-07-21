package controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import constant.OrderType;
import model.AjaxResult;
import model.Banner;
import model.EditRoleForm;
import model.Order;
import model.Revenue;
import model.RevenueForm;
import model.RevenueResult;
import model.Revenues;
import model.UploadResult;
import model.User;
import service.ManageService;
import service.RevenueService;

@Controller
@RequestMapping("manage")
public class ManagerController {
	@Autowired
	ServletContext context;

	@Autowired
	private HttpSession session;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	ManageService service;
	
	@Autowired
	RevenueService revenueService;

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
	
	@RequestMapping(value = { "", "/getAllUserInfo" }, method = RequestMethod.GET)
	public String getUserInfo(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		String userRole = user.getRoles().get(0);
		model.addAttribute("user", user);
		List<User> lstMember = service.lstUser(userRole);
		model.addAttribute("lstMember", lstMember);
		model.addAttribute("role", userRole);
		return "account/userInfo";
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
			int number = service.createOrder(form);
			if (number == 0) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E007", null, Locale.getDefault()));
			}else if(number == -1){
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E018", null, Locale.getDefault()));
			}
			else {
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
			if(form.getType() == OrderType.ORDER_PROACTIVE.getCode()){
				//can not accept edit order pro-active
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E017", null, Locale.getDefault()));
				return result;
			}
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
	
	@RequestMapping(value = { "/revenueMonth" }, method = RequestMethod.GET)
	public String  revenueMonth(ModelMap model) throws SQLException {
		List<Revenue> lst = service.getRevenueMonth();
		model.addAttribute("revenues", lst);
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "account/revenueMonth";
	}
	
	@RequestMapping(value = { "/saveRevenues" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult saveRevenues(@RequestBody Revenues form) throws SQLException {
		AjaxResult result = new AjaxResult();
		if(revenueService.saveRevenues(form) > 0){
			result.setResult(true);
			result.setMessage("Lưu thông tin thành công!");
		}else{
			result.setResult(false);
			result.setMessage("Lưu thông tin thất bại!");
		}
		return result;
	}
	
	@RequestMapping(value = { "/banner" }, method = RequestMethod.GET)
	public String banner(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "account/banner";
	}

	@RequestMapping(value = { "/getAllBanner" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getAllBanner() throws SQLException {
		AjaxResult result = new AjaxResult();
		result.setData(service.getAllBanner());
		return result;
	}
	
	@RequestMapping(value = "/uploadBanner", method = RequestMethod.POST)
	public @ResponseBody UploadResult singleSave(@RequestParam("file") MultipartFile file) {
		UploadResult result = new UploadResult();
		String fileName = null;
		if (!file.isEmpty()) {
			try {
				String relativeWebPath = "/static/images/banner";
				String absoluteFilePath = context.getRealPath(relativeWebPath);
				fileName = file.getOriginalFilename();
				File uploadedFile = new File(absoluteFilePath, fileName);
				byte[] bytes = file.getBytes();
				BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(uploadedFile));
				buffStream.write(bytes);
				buffStream.close();
				result.setMsg("Upload thành công!");
				result.setPathFile(relativeWebPath+"/"+fileName);
			} catch (Exception e) {
				result.setMsg("Upload thất bại !");
			}
		} else {
			result.setMsg("Không thể upload file trống !");
		}
		return result;
	}
	
	@RequestMapping(value = { "/createBanner" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult createBanner(@RequestBody Banner form) throws NoSuchMessageException, SQLException {
		AjaxResult result = new AjaxResult();
		if (form != null) {
			if (service.createBanner(form) == 0) {
				result.setResult(false);
				result.setMessage("Tạo banner thất bại!");
			} else {
				result.setResult(true);
				result.setResultData(form);
			}
		}
		return result;
	}
	
	@RequestMapping(value = { "/deleteBanner" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult deleteArticle(@RequestBody Banner form) throws SQLException {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.deleteBanner(form.getId()));
		result.setResult(true);
		return result;
	}
	
}
