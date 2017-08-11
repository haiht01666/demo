package service;

import model.AjaxResult;
import model.Order;
import model.User;

import java.util.List;

public interface ApiService {
    /**
     * check login user and pass
     *
     * @param user user name
     * @param pass pass word
     * @return true if valid
     */
    AjaxResult checkLogin(String user, String pass);

    AjaxResult getSummaryPersonalInfo(String userCode);

    AjaxResult updatePersonalInfo(User user);

    AjaxResult saveAvatar(User user);

    AjaxResult changePassword(String userCode, String oldPass, String newPass);

    AjaxResult requestSupport(String userCode, String title, String content);

    AjaxResult getNpp(boolean directNpp, String userCode, String childId, Integer limit, Integer offset,
            String orderby);

    AjaxResult getListOrder(String listUserId, String childId, Integer limit, Integer offset, String orderby);

    AjaxResult getListPersonalOrder(String listUserId, String childId, Integer limit, Integer offset, String orderby);

    AjaxResult getNppGraphical(String userCode);

    AjaxResult getSummaryInfo(String userCode, String time, int limit, int offset);

    AjaxResult getCommissionInfo(String userCode, String time, String timeDetail);

    AjaxResult getInfoCompany();

    AjaxResult getBannerList();
}
