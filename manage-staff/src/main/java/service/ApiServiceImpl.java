package service;

import dao.ApiDao;
import model.AjaxResult;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service public class ApiServiceImpl implements ApiService {

    @Autowired ApiDao dao;

    @Autowired private PasswordEncoder passwordEncoder;

    @Override public AjaxResult checkLogin(String userId, String password) {
        AjaxResult result = new AjaxResult();
        try {
            String passwordEncrypt = dao.getPasswordEncrypt(userId);
            if (!passwordEncoder.matches(password, passwordEncrypt)) {
                result.setResult(false);
            }
            User user = dao.getLoginInfo(userId);
            result.setResult(true);
            result.setResultData(user);
        } catch (Exception e) {
            result.setResult(false);

        }
        return result;
    }

    @Override public AjaxResult updatePersonalInfo(User user) {
        AjaxResult result = new AjaxResult();
        try {
            dao.updatePersonalInfo(user);
            result.setResult(true);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult saveAvatar(User user) {
        AjaxResult result = new AjaxResult();
        try {
            dao.saveAvatar(user);
            result.setResult(true);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult changePassword(String userCode, String oldPass, String newPass) {
        AjaxResult result = new AjaxResult();
        try {
            result.setResult(true);
            result.setResultData(0);
            String passwordEncrypt = dao.getPasswordEncrypt(userCode);
            if (passwordEncoder.matches(oldPass, passwordEncrypt)) {
                dao.changePassword(userCode, passwordEncoder.encode(newPass));
                result.setResultData(1);
            }
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult requestSupport(String userCode, String userName, String title, String content) {
        AjaxResult result = new AjaxResult();
        try {
            dao.requestSupport(userCode, userName, title, content);
            result.setResult(true);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult getAllNpp(String userCode, String childId, String litmit, String offset) {
        AjaxResult result = new AjaxResult();
        try {
            long totalAllNpp = dao.getTotalAllNpp(userCode, childId);
            List<User> listAllNpp = dao.getAllNpp(userCode, childId, Integer.parseInt(litmit), Integer.parseInt(offset));
            result.setResult(true);
            result.setNumberRecord(totalAllNpp);
            result.setResultData(listAllNpp);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }
}
