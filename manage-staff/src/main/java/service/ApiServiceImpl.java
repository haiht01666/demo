package service;

import dao.ApiDao;
import model.AjaxResult;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service public class ApiServiceImpl implements ApiService {

    @Autowired ApiDao dao;

    @Autowired private PasswordEncoder passwordEncoder;

    @Autowired private MessageSource messageSource;

    @Override public AjaxResult checkLogin(String userId, String password) {
        AjaxResult result = new AjaxResult();
        try {
            String passwordEncrypt = dao.getPasswordEncrypt(userId);
            if (!passwordEncoder.matches(password, passwordEncrypt)) {
                result.setResult(false);
                return result;
            }
            User user = dao.getLoginInfo(userId);
            result.setResult(true);
            result.setResultData(user);
            return result;
        } catch (Exception e) {
            result.setResult(false);
            result.setMessage(messageSource.getMessage("E001", null, Locale.getDefault()));
            return result;
        }
    }

    @Override public AjaxResult updatePersonalInfo(User user) {
        AjaxResult result = new AjaxResult();
        try {
            dao.updatePersonalInfo(user);
            result.setResult(true);
            return result;
        } catch (Exception e) {
            result.setResult(false);
            result.setMessage(messageSource.getMessage("E001", null, Locale.getDefault()));
            return result;
        }
    }
}
