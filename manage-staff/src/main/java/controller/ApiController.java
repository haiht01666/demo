package controller;

import model.AjaxResult;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import service.ApiService;

import java.util.Map;

@Controller
@RequestMapping("api")
public class ApiController {
	@Autowired ApiService service;

	@RequestMapping(value = { "/getLoginInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getLoginInfo(@RequestBody Map loginMap) {
		String loginUser = (String)loginMap.get("loginUser");
		String loginPass = (String)loginMap.get("loginPass");
		return service.checkLogin(loginUser, loginPass);
	}

	@RequestMapping(value = { "/updatePersonalInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult updatePersonalInfo(@RequestBody User user) {
		return service.updatePersonalInfo(user);
	}
}
