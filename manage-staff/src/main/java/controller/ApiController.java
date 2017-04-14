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

	@RequestMapping(value = { "/saveAvatar" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult saveAvatar(@RequestBody User user) {
		return service.saveAvatar(user);
	}
	@RequestMapping(value = { "/changePassword" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult changePassword(@RequestBody Map changePassMap) {
		String userCode = (String)changePassMap.get("userCode");
		String oldPass = (String)changePassMap.get("passOld");
		String newPass = (String)changePassMap.get("passNew");
		return service.changePassword(userCode, oldPass, newPass);
	}

	@RequestMapping(value = { "/requestSupport" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult requestSupport(@RequestBody Map changePassMap) {
		String userCode = (String)changePassMap.get("userCode");
		String userName = (String)changePassMap.get("userName");
		String title = (String)changePassMap.get("title");
		String content = (String)changePassMap.get("content");
		return service.requestSupport(userCode, userName, title, content);
	}

	@RequestMapping(value = { "/getNpp" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getAllNpp(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		String childId = (String)mapGetAllNpp.get("childId");
		Integer limit = (Integer)mapGetAllNpp.get("limit");
		Integer offset = (Integer)mapGetAllNpp.get("offset");
		String orderby = (String) mapGetAllNpp.get("orderby");
		boolean directNpp = (Boolean) mapGetAllNpp.get("directNpp");
		return service.getNpp(directNpp, userCode, childId, limit, offset, orderby);
	}

	@RequestMapping(value = { "/getOrder" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getOrder(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		String childId = (String)mapGetAllNpp.get("childId");
		Integer limit = (Integer)mapGetAllNpp.get("limit");
		Integer offset = (Integer)mapGetAllNpp.get("offset");
		String orderby = (String) mapGetAllNpp.get("orderby");
		return service.getListOrder(userCode, childId, limit, offset, orderby);
	}

	@RequestMapping(value = { "/getNppGraphical" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getNppGraphical(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		return service.getNppGraphical(userCode);
	}
	@RequestMapping(value = { "/getSummaryInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getSummaryInfo(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		return service.getSummaryInfo(userCode);
	}
}
