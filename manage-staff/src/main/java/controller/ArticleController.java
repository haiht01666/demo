package controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import model.AjaxResult;
import model.Article;
import model.ArticleResult;
import model.Product;
import model.UploadResult;
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
	
	@RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
	public @ResponseBody UploadResult singleSave(@RequestParam("file") MultipartFile file) {
		UploadResult result = new UploadResult();
		String fileName = null;
		if (!file.isEmpty()) {
			try {
				String relativeWebPath = "/static/images/article";
				String absoluteFilePath = context.getRealPath(relativeWebPath);
				fileName = file.getOriginalFilename();
				File uploadedFile = new File(absoluteFilePath, fileName);
				byte[] bytes = file.getBytes();
				BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(uploadedFile));
				buffStream.write(bytes);
				buffStream.close();
				result.setMsg("Upload thành công!");
				result.setPathFile("/manage-staff"+relativeWebPath+"/"+fileName);
			} catch (Exception e) {
				result.setMsg("Upload thất bại !");
			}
		} else {
			result.setMsg("Không thể upload file trống !");
		}
		return result;
	}
	
	@RequestMapping(value = { "/home" }, method = RequestMethod.GET)
	public String home(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		return "article/home";
	}
	
	@RequestMapping(value = { "/getHomeArticle" }, method = RequestMethod.GET)
	public @ResponseBody ArticleResult home() throws SQLException {
		ArticleResult result = new ArticleResult();
		result.setData(service.getHomeArticle());
		return result;
	}
	
	@RequestMapping(value = "/uploadHomeImage", method = RequestMethod.POST)
	public @ResponseBody UploadResult uploadImage(@RequestParam("file") MultipartFile file) {
		UploadResult result = new UploadResult();
		String fileName = null;
		if (!file.isEmpty()) {
			try {
				String relativeWebPath = "/static/images/home";
				String absoluteFilePath = context.getRealPath(relativeWebPath);
				fileName = file.getOriginalFilename();
				File uploadedFile = new File(absoluteFilePath, fileName);
				byte[] bytes = file.getBytes();
				BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(uploadedFile));
				buffStream.write(bytes);
				buffStream.close();
				result.setMsg("Upload thành công!");
				result.setPathFile("/manage-staff"+relativeWebPath+"/"+fileName);
			} catch (Exception e) {
				result.setMsg("Upload thất bại !");
			}
		} else {
			result.setMsg("Không thể upload file trống !");
		}
		return result;
	}
	
	@RequestMapping(value = { "/deleteHome" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult deleteHome(@RequestBody Article form) {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.deleteHome(form.getId()));
		result.setResult(true);
		return result;
	}
	
	@RequestMapping(value = { "/updateHome" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult updateHome(@RequestBody Article form) {
		AjaxResult result = new AjaxResult();
		if (form != null) {
			User user = (User) session.getAttribute("ss-user");
			form.setAuthor(user.getDispName());
			if (service.updateHome(form) == 0) {
				result.setResult(false);
				result.setMessage(messageSource.getMessage("E016", null, Locale.getDefault()));
			} else {
				result.setResult(true);
				result.setResultData(form);
			}
		}
		return result;
	}
	
	@RequestMapping(value = { "/getHome" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getHome(@RequestBody Product form) {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.getHomeById(form.getId()));
		result.setResult(true);
		return result;
	}

}
