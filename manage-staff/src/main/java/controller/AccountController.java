package controller;

import java.util.Locale;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import model.UserForm;
import service.UserService;

@Controller
@RequestMapping("account")
public class AccountController {

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private UserService userService;

	@RequestMapping(value = { "/create" }, method = RequestMethod.POST,produces = "text/plain;charset=UTF-8")
	public String create(@Valid UserForm userForm, BindingResult result, ModelMap model) {
		model.addAttribute("isError", true);
		if (result.hasErrors())
			// if has error
			model.addAttribute("message", messageSource.getMessage("E002", null, Locale.US));
		else {
			if (userService.isUserEnable(Integer.parseInt(userForm.getId()))) {
				if(userService.createUser(userForm) > 0){
					model.addAttribute("isError", false);
					model.addAttribute("message", messageSource.getMessage("S002", null, Locale.US));
				}else{
					model.addAttribute("message", messageSource.getMessage("E004", null, Locale.US));
				}
			}
			else {
				//user does not exist or created 
				model.addAttribute("message", messageSource.getMessage("E003", null, Locale.US));
			}
		}
		return "account/create";
	}

	@RequestMapping(value = { "/create" }, method = RequestMethod.GET)
	public String create(ModelMap model) {
		UserForm userFrom = new UserForm();
		model.addAttribute("userForm", userFrom);
		return "account/create";
	}

}
