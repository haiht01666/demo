package controller;

import model.AjaxResult;
import model.Product;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.ApiService;
import service.ArticleServiceImpl;
import service.ProductService;

import java.util.Map;

@Controller
@RequestMapping("api")
public class ApiController {
	@Autowired ApiService service;
	@Autowired ProductService productService;
	@Autowired ArticleServiceImpl articleService;

	@RequestMapping(value = { "/getLoginInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getLoginInfo(@RequestBody Map loginMap) {
		String loginUser = (String)loginMap.get("loginUser");
		String loginPass = (String)loginMap.get("loginPass");
		return service.checkLogin(loginUser, loginPass);
	}

	@RequestMapping(value = { "/getSummaryPersonalInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getSummaryPersonalInfo(@RequestBody Map getInfo) {
		String userCode = (String)getInfo.get("userCode");
		return service.getSummaryPersonalInfo(userCode);
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
		String title = (String)changePassMap.get("title");
		String content = (String)changePassMap.get("content");
		return service.requestSupport(userCode, title, content);
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

	@RequestMapping(value = { "/getPersonalOrder" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getPersonalOrder(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		String childId = (String)mapGetAllNpp.get("childId");
		Integer limit = (Integer)mapGetAllNpp.get("limit");
		Integer offset = (Integer)mapGetAllNpp.get("offset");
		String orderby = (String) mapGetAllNpp.get("orderby");
		return service.getListPersonalOrder(userCode, childId, limit, offset, orderby);
	}

	@RequestMapping(value = { "/getNppGraphical" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getNppGraphical(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		return service.getNppGraphical(userCode);
	}
	@RequestMapping(value = { "/getSummaryInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getSummaryInfo(@RequestBody Map mapGetAllNpp) {
		String userCode = (String)mapGetAllNpp.get("userCode");
		String time = (String)mapGetAllNpp.get("time");
		Integer limit = (Integer)mapGetAllNpp.get("limit");
		Integer offset = (Integer)mapGetAllNpp.get("offset");
		return service.getSummaryInfo(userCode, time, limit, offset);
	}
	@RequestMapping(value = { "/getCommissionInfo" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getCommissionInfo(@RequestBody Map mapGetCommission) {
		String userCode = (String)mapGetCommission.get("userCode");
		String time = (String)mapGetCommission.get("time");
		String timeDetail = (String)mapGetCommission.get("timeDetail");
		return service.getCommissionInfo(userCode, time, timeDetail);
	}

	@RequestMapping(value = { "/getProductPage" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getProductPage(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
		AjaxResult result = new AjaxResult();
		result.setResult(true);
		result.setResultData(productService.getProductPage(limit, offset));
		result.setNumberRecord(productService.getNumberProducts());

		return result;
	}

	@RequestMapping(value = { "/searchProduct" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult searchProduct(@RequestParam("limit") int limit, @RequestParam("offset") int offset, @RequestParam("searchStr") String searchStr) {
		AjaxResult result = new AjaxResult();
		result.setResult(true);
		result.setResultData(productService.searchProduct(limit, offset, searchStr));
		result.setNumberRecord(productService.getNumberProductsSearch(searchStr));
		return result;
	}

	@RequestMapping(value = { "/getProductById" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getProductById(@RequestParam("id") int id) {
		AjaxResult result = new AjaxResult();
		if(!productService.existProduct(id)){
			result.setResult(false);
			return result;
		}else {
			result.setResult(true);
			result.setResultData(productService.getProductById(id));
		}
		return result;
	}

	@RequestMapping(value = { "/getProductsByCategory" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getProductsByCategory(@RequestParam("limit") int limit, @RequestParam("offset") int offset,@RequestParam("category") String category) {
		AjaxResult result = new AjaxResult();
		if(!productService.existCategory(category)){
			result.setResult(false);
			return result;
		}else {
			result.setResult(true);
			result.setResultData(productService.getProductsByCategory(limit, offset, category));
			result.setNumberRecord(productService.getNumberProductsCategory(category));
		}
		return result;
	}

	@RequestMapping(value = { "/getArticlePage" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getArticlePage(@RequestParam("limit") int limit, @RequestParam("offset") int offset) {
		AjaxResult result = new AjaxResult();
		result.setResult(true);
		result.setResultData(articleService.getArticlePage(limit, offset));
		result.setNumberRecord(articleService.getNumberArticle());
		return result;
	}

	@RequestMapping(value = { "/getArticleById" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getArticleById(@RequestParam("id") int id) {
		AjaxResult result = new AjaxResult();
		if(!articleService.existArticle(id)){
			result.setResult(false);
			return result;
		}else {
			result.setResult(true);
			result.setResultData(articleService.getArticleById(id));
		}
		return result;
	}

	@RequestMapping(value = { "/getCategories" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getCategories() {
		AjaxResult result = new AjaxResult();
		result.setResult(true);
		result.setResultData(productService.getAllCategory());
		return result;
	}

	@RequestMapping(value = { "/getInfoCompany" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getInfoCompany() {
		AjaxResult result = service.getInfoCompany();
		result.setResult(result.isResult());
		result.setResultData(result.getResultData());
		return result;
	}

	@RequestMapping(value = { "/getBannerList" }, method = RequestMethod.GET)
	public @ResponseBody AjaxResult getBannerList() {
		AjaxResult result = service.getBannerList();
		result.setResult(result.isResult());
		result.setResultData(result.getResultData());
		return result;
	}
}
