package service;

import common.CommonUtils;
import dao.ApiDao;
import model.AjaxResult;
import model.Order;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service public class ApiServiceImpl implements ApiService {

    @Autowired ManageService manageService;

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

    @Override public AjaxResult getNpp(boolean directNpp, String userCode, String childId, Integer limit,
            Integer offset, String orderby) {
        AjaxResult result = new AjaxResult();
        try {
            long totalNpp = dao.getTotalNpp(directNpp, userCode);
            List<User> listNpp = dao.getNpp(directNpp, userCode, limit, offset, orderby);
            for (User user : listNpp) {
                user.setAgentLevel(CommonUtils.getLevelChild(childId, user.getChildId()));
                user.setLeverValue(manageService.getLeverUser(user.getId()));
            }
            result.setResult(true);
            result.setNumberRecord(totalNpp);
            result.setResultData(listNpp);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult getListOrder(String userCode, String childId, Integer limit, Integer offset,
            String orderby) {
        AjaxResult result = new AjaxResult();
        try {
            List<User> listNpp = dao.getNpp(false, userCode, -1, offset, "id");
            List<String> listNppId = new ArrayList<>();
            for (User user : listNpp) {
                listNppId.add(user.getUserCode());
            }
            // get child order
            long totalOrder = dao.getTotalOrder(listNppId);
            List<Order> listOrder = dao.getListOrder(listNppId, limit, offset, orderby);
            for (Order order : listOrder) {
                order.setAgentLevel(CommonUtils.getLevelChild(childId, order.getChildId()));
            }
            result.setResult(true);
            result.setNumberRecord(totalOrder);
            result.setResultData(listOrder);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    public static void main(String[] args) {

    }
}
