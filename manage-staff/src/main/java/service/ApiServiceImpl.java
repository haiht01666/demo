package service;

import common.CommonUtils;
import constant.LeverType;
import dao.ApiDao;
import model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

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
                user.setLeverValue(manageService.getLeverUser(Integer.parseInt(user.getUserCode())));
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

    @Override public AjaxResult getNppGraphical(String userCode) {
        AjaxResult result = new AjaxResult();
        try {
            List<User> listNpp = dao.getNpp(false, userCode, -1, null, "id");
            User userInfo = dao.getLoginInfo(userCode);
            userInfo.setLeverValue(manageService.getLeverUser(Integer.parseInt(userCode)));
            NppGraphicModel nppGraphicModel = new NppGraphicModel();
            nppGraphicModel.setUserInfo(userInfo);
            nppGraphicModel.setListNpp(listNpp);
            for (User npp : listNpp) {
                String levelUser = manageService.getLeverUser(Integer.parseInt(npp.getUserCode()));
                if (levelUser.equals(LeverType.New.name())) {
                    nppGraphicModel.setNumberNM(nppGraphicModel.getNumberNM() + 1);
                } else if (levelUser.equals(LeverType.SALE_MEMBER.name())) {
                    nppGraphicModel.setNumberSM(nppGraphicModel.getNumberSM() + 1);
                } else if (levelUser.equals(LeverType.SALE_PRO.name())) {
                    nppGraphicModel.setNumberPS(nppGraphicModel.getNumberPS() + 1);
                } else if (levelUser.equals(LeverType.PRO_DISTRIBUTE.name())) {
                    nppGraphicModel.setNumberPD(nppGraphicModel.getNumberPD() + 1);
                } else if (levelUser.equals(LeverType.TL.name())) {
                    nppGraphicModel.setNumberTL(nppGraphicModel.getNumberTL() + 1);
                } else if (levelUser.equals(LeverType.MSD.name())) {
                    nppGraphicModel.setNumberMSD(nppGraphicModel.getNumberMSD() + 1);
                } else if (levelUser.equals(LeverType.DSD.name())) {
                    nppGraphicModel.setNumberDSD(nppGraphicModel.getNumberDSD() + 1);
                } else if (levelUser.equals(LeverType.SALE_MEMBER.name())) {
                    nppGraphicModel.setNumberGDSD(nppGraphicModel.getNumberGDSD() + 1);
                }
                npp.setAgentLevel(CommonUtils.getLevelChild(userInfo.getChildId(), npp.getChildId()));
                npp.setLeverValue(levelUser);
            }
            result.setResult(true);
            result.setResultData(nppGraphicModel);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult getSummaryInfo(String userCode) {
        AjaxResult result = new AjaxResult();
        try {
            SumaryInfoModel sumaryInfoModel = new SumaryInfoModel();
            // set user info
            User userInfo = dao.getLoginInfo(userCode);
            userInfo.setLeverValue(manageService.getLeverUser(Integer.parseInt(userCode)));
            sumaryInfoModel.setUserInfo(userInfo);
            // lay tat ca npp (bao gom ca npp cha)
            List<User> listNpp = dao.getNpp(false, userCode, -1, null, "id");
            List<String> listGroupId = new ArrayList<>();
            listGroupId.add(userCode);
            for (User user : listNpp) {
                listGroupId.add(user.getUserCode());
            }
            // lay doanh so ca nhan thang
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
            String monthYear = dateFormat.format(new Date());
            BigDecimal monthPersonalVolume = dao.getMonthPersonalVolume(userCode, monthYear);
            sumaryInfoModel.setMonthPersonalVolume(monthPersonalVolume);
            sumaryInfoModel.setMonthTime(monthYear);

            // lay doanh so tuan
            TimeModel timeModel;

            // tuần hiện tại
            timeModel = CommonUtils.getTimeWeek(0);
            BigDecimal weekGroupVolume0 = dao
                    .getWeekGroupVolume(listGroupId, timeModel.getStartDate(), timeModel.getEndDate());
            sumaryInfoModel.setGroupVolumeWeek0(weekGroupVolume0);
            sumaryInfoModel.setWeek0Time(timeModel.getStartDate() + " - " + timeModel.getEndDate());

            // 1 tuần trước
            timeModel = CommonUtils.getTimeWeek(1);
            BigDecimal weekGroupVolume1 = dao
                    .getWeekGroupVolume(listGroupId, timeModel.getStartDate(), timeModel.getEndDate());
            sumaryInfoModel.setGroupVolumeWeek1(weekGroupVolume1);
            sumaryInfoModel.setWeek1Time(timeModel.getStartDate() + " - " + timeModel.getEndDate());

            // 2 tuần trước
            timeModel = CommonUtils.getTimeWeek(2);
            BigDecimal weekGroupVolume2 = dao
                    .getWeekGroupVolume(listGroupId, timeModel.getStartDate(), timeModel.getEndDate());
            sumaryInfoModel.setGroupVolumeWeek2(weekGroupVolume2);
            sumaryInfoModel.setWeek2Time(timeModel.getStartDate() + " - " + timeModel.getEndDate());

            // 3 tuần trước
            timeModel = CommonUtils.getTimeWeek(3);
            BigDecimal weekGroupVolume3 = dao
                    .getWeekGroupVolume(listGroupId, timeModel.getStartDate(), timeModel.getEndDate());
            sumaryInfoModel.setGroupVolumeWeek3(weekGroupVolume3);
            sumaryInfoModel.setWeek3Time(timeModel.getStartDate() + " - " + timeModel.getEndDate());

            result.setResultData(sumaryInfoModel);
            result.setResult(true);

        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    public static void main(String[] args) {
        TimeModel timeModel = CommonUtils.getTimeWeek(1);
        System.out.println(timeModel.getStartDate());
        System.out.println(timeModel.getEndDate());

    }
}
