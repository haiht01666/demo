package controller;

import java.sql.SQLException;
import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.AjaxResult;
import model.Article;
import model.ArticleResult;
import model.Product;
import model.User;
import service.ArticleService;

@Controller
@RequestMapping("article")
public class ArticleController {
	@Autowired
	private HttpSession session;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	ArticleService service;

	@Autowired
	ServletContext context;

	@RequestMapping(value = { "" }, method = RequestMethod.GET)
	public String index(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "article/index";
	}

	@RequestMapping(value = { "/getAllArticle" }, method = RequestMethod.GET)
	public @ResponseBody ArticleResult product() throws SQLException {
		ArticleResult result = new ArticleResult();
		result.setData(service.getAllArticle());
		return result;
	}

	@RequestMapping(value = { "/create" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult createProduct(@RequestBody Article form) {
		AjaxResult result = new AjaxResult();
		if (form != null) {
			User user = (User) session.getAttribute("ss-user");
			form.setAuthor(user.getDispName());
			if (service.createArticle(form) == 0) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E015", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setResultData(form);
			}
		}
		return result;
	}

	@RequestMapping(value = { "/getArticle" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getArticle(@RequestBody Product form) {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.getArticleById(form.getId()));
		result.setResult(true);
		return result;
	}

	@RequestMapping(value = { "/update" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult updateArticle(@RequestBody Article form) {
		AjaxResult result = new AjaxResult();
		if (form != null) {
			User user = (User) session.getAttribute("ss-user");
			form.setAuthor(user.getDispName());
			if (service.updateArticle(form) == 0) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E016", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setResultData(form);
			}
		}
		return result;
	}

	@RequestMapping(value = { "/delete" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult deleteArticle(@RequestBody Article form) {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.deleteArticle(form.getId()));
		result.setResult(true);
		return result;
	}

}
