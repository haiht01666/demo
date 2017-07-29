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
import model.Product;
import model.ProductResult;
import model.UploadResult;
import model.User;
import service.ProductService;

@Controller
@RequestMapping("product")
public class ProductController {
	@Autowired
	private HttpSession session;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	ProductService service;

	@Autowired
	ServletContext context;

	@RequestMapping(value = { "" }, method = RequestMethod.GET)
	public String index(ModelMap model) throws SQLException {
		// get current user from session
		User user = (User) session.getAttribute("ss-user");
		model.addAttribute("user", user);
		model.addAttribute("lstCategory", service.getAllCategory());
		return "product/index";
	}

	@RequestMapping(value = { "/getAllProduct" }, method = RequestMethod.GET)
	public @ResponseBody ProductResult product() throws SQLException {
		ProductResult result = new ProductResult();
		result.setData(service.getAllProduct());
		return result;
	}

	@RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
	public @ResponseBody UploadResult singleSave(@RequestParam("file") MultipartFile file) {
		UploadResult result = new UploadResult();
		String fileName = null;
		if (!file.isEmpty()) {
			try {
				String relativeWebPath = "/static/images/product";
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

	@RequestMapping(value = { "/create" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult createProduct(@RequestBody Product form) {
		AjaxResult result = new AjaxResult();
		if (service.createProduct(form) == 0) {
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E013", null, Locale.getDefault()));
		} else {
			result.setResult(true);
			result.setResultData(form);
		}
		return result;
	}

	@RequestMapping(value = { "/getProduct" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult getProduct(@RequestBody Product form) {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.getProductById(form.getId()));
		result.setResult(true);
		return result;
	}
	
	@RequestMapping(value = { "/update" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult updateProduct(@RequestBody Product form) {
		AjaxResult result = new AjaxResult();
		if (service.updateProduct(form) == 0) {
			result.setResult(false);
			result.setMessage(messageSource.getMessage("E014", null, Locale.getDefault()));
		} else {
			result.setResult(true);
			result.setResultData(form);
		}
		return result;
	}
	
	@RequestMapping(value = { "/delete" }, method = RequestMethod.POST)
	public @ResponseBody AjaxResult deleteProduct(@RequestBody Product form) {
		AjaxResult result = new AjaxResult();
		result.setResultData(service.deleteProduct(form.getId()));
		result.setResult(true);
		return result;
	}


}
