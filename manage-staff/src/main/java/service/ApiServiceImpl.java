package service;

import common.CommonUtils;
import constant.LeverType;
import constant.RevenueType;
import dao.ApiDao;
import model.*;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeConstants;
import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import scala.Tuple2;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
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
                return result;
            }
            User user = dao.getLoginInfo(userId);
            result.setResult(true);
            result.setResultData(user);
        } catch (Exception e) {
            result.setResult(false);
            return  result;

        }
        return result;
    }

    @Override public AjaxResult getSummaryPersonalInfo(String userCode) {
        AjaxResult result = new AjaxResult();
        try {
            User user = dao.getLoginInfo(userCode);
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
            result.setResult(dao.updatePersonalInfo(user) > 0);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult saveAvatar(User user) {
        AjaxResult result = new AjaxResult();
        try {
            result.setResult(dao.saveAvatar(user) > 0);
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

    @Override public AjaxResult requestSupport(String userCode, String title, String content) {
        AjaxResult result = new AjaxResult();
        try {
            result.setResult(dao.requestSupport(userCode, title, content) > 0);
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
                User userTmp = manageService.detailUser(Integer.parseInt(user.getUserCode()));
                user.setLeverValue(userTmp.getLeverValue());
                user.setStatus(userTmp.getStatus());
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
            // get child order
            long totalOrder = dao.getTotalOrder(userCode);
            List<Order> listOrder = dao.getListOrder(userCode, limit, offset, orderby);
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

    @Override public AjaxResult getSummaryInfo(String userCode, String time, int limit, int offset) {
        AjaxResult result = new AjaxResult();
        try {
            SumaryInfoModel sumaryInfoModel = new SumaryInfoModel();
            // set user info
            User userInfo = dao.getLoginInfo(userCode);
            User userTmp = manageService.detailUser(Integer.parseInt(userCode));
            userInfo.setLeverValue(userTmp.getLeverValue());
            userInfo.setStatus(userTmp.getStatus());
            sumaryInfoModel.setUserInfo(userInfo);

            // lay doanh so ca nhan thang
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
            String monthYear = dateFormat.format(new Date());
            BigDecimal monthPersonalVolume = dao.getMonthPersonalVolume(userCode, monthYear);
            sumaryInfoModel.setMonthPersonalVolume(monthPersonalVolume);
            sumaryInfoModel.setMonthTime(monthYear);

            // lay doanh so tuan
            List<WeekVolumeInfo> weekVolumeInfoList = new ArrayList<>();
            // 4 tuần gần nhất
            for (int i = 0; i < 4; i++) {
                WeekVolumeInfo weekVolumeInfo = new WeekVolumeInfo();
                TimeModel timeModel = CommonUtils.getTimeWeek(i);
                DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
                int weekIndex = CommonUtils
                        .numberWeekFromRegister(userInfo.getSignUpDate(), df.parse(timeModel.getEndDate()));
                BigDecimal weekGroupVolume = dao
                        .getWeekGroupVolume(userCode, timeModel.getStartDate(), timeModel.getEndDate());
                weekVolumeInfo.setGroupVolume(weekGroupVolume);
                weekVolumeInfo.setWeekTime(
                        weekIndex + " (" + timeModel.getStartDate() + " - " + timeModel.getEndDate() + ")");
                weekVolumeInfoList.add(weekVolumeInfo);
            }
            // lấy lịch sử toàn bộ doanh thu
            Tuple2<Integer, List<VolumeInfo>> tuple2 = getVolumeInfoList(userInfo, time, limit, offset);
            sumaryInfoModel.setTotalRecord(tuple2._1);
            sumaryInfoModel.setVolumeInfoList(tuple2._2);
            sumaryInfoModel.setWeekVolumeInfoList(weekVolumeInfoList);
            result.setResultData(sumaryInfoModel);
            result.setResult(true);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    @Override public AjaxResult getCommissionInfo(String userCode, String time, String timeDetail) {
        AjaxResult result = new AjaxResult();
        try {
            CommissionInfoModel commissionInfoModel = new CommissionInfoModel();

            User userInfo = dao.getLoginInfo(userCode);
            // lay tat ca npp (bao gom ca npp cha)
            List<User> listNpp = dao.getNpp(false, userCode, -1, null, "id");
            List<String> listGroupId = new ArrayList<>();
            listGroupId.add(userCode);
            for (User user : listNpp) {
                listGroupId.add(user.getUserCode());
            }
            // doanh số cá nhân tuần hiện tại
            TimeModel timeweek = CommonUtils.getTimeWeek(0);
            BigDecimal weekPersonalVolume = dao
                    .getWeekPersonalVolume(userCode, timeweek.getStartDate(), timeweek.getEndDate());
            commissionInfoModel.setWeekPersonalVolume(weekPersonalVolume);

            // doanh số cá nhân tháng hiện tại
            BigDecimal monthPersonalVolume = dao.getMonthPersonalVolume(userCode, CommonUtils.getTimeMonth(0));
            commissionInfoModel.setMonthPersonalVolume(monthPersonalVolume);

            // doanh số cá nhân năm hiện tại
            BigDecimal yearPersonalVolume = dao.getYearPersonalVolume(userCode, CommonUtils.getTimeYear(0));
            commissionInfoModel.setYearPersonalVolume(yearPersonalVolume);

            // combo box list week
            int numberWeek = CommonUtils.numberWeekFromRegister(userInfo.getSignUpDate(), new Date());
            List<String> weekTimeDispList = new ArrayList<>();
            List<String> weekTimeValList = new ArrayList<>();
            for (int i = 0; i < numberWeek; i++) {
                TimeModel timeModel = CommonUtils.getTimeWeek(i);
                DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
                int weekIndex = CommonUtils
                        .numberWeekFromRegister(userInfo.getSignUpDate(), df.parse(timeModel.getEndDate()));
                weekTimeDispList
                        .add(timeModel.getStartDate() + " - " + timeModel.getEndDate() + " (" + weekIndex + ")");
                weekTimeValList.add(Integer.toString(weekIndex));
            }
            commissionInfoModel.setWeekTimeDispList(weekTimeDispList);
            commissionInfoModel.setWeekTimeValList(weekTimeValList);

            // combo box list month
            int numberMonth = CommonUtils.numberMonthFromRegister(userInfo.getSignUpDate(), new Date());
            List<String> monthTimeDispList = new ArrayList<>();
            List<String> monthTimeValList = new ArrayList<>();
            for (int i = 0; i < numberMonth; i++) {
                String timeMonth = CommonUtils.getTimeMonth(i);
                monthTimeDispList.add(timeMonth);
                monthTimeValList.add(timeMonth);
            }
            commissionInfoModel.setMonthTimeDispList(monthTimeDispList);
            commissionInfoModel.setMonthTimeValList(monthTimeValList);

            // combo box list year
            int numberYear = CommonUtils.numberYearFromRegister(userInfo.getSignUpDate(), new Date());
            List<String> yearTimeDispList = new ArrayList<>();
            List<String> yearTimeValList = new ArrayList<>();
            for (int i = 0; i < numberYear; i++) {
                String timeMonth = CommonUtils.getTimeYear(i);
                yearTimeDispList.add(timeMonth);
                yearTimeValList.add(timeMonth);
            }
            commissionInfoModel.setYearTimeDispList(yearTimeDispList);
            commissionInfoModel.setYearTimeValList(yearTimeValList);

            // set time user
            RevenueForm form = new RevenueForm();
            if (StringUtils.isNotEmpty(timeDetail)) {
                if (time.equals("weekly")) {
                    DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
                    TimeModel timeModel = CommonUtils.getTimeWeek(Integer.parseInt(timeDetail));
                    form.setCdate(new Date());
                    form.setDateFrom(df.parse(timeModel.getStartDate()));
                    form.setDateTo(df.parse(timeModel.getEndDate()));
                } else if (time.equals("monthly")) {
                    form.setCdate(new Date());
                    DateTimeFormatter formatter = DateTimeFormat.forPattern("MM/yyyy");
                    DateTime dateTime = formatter.parseDateTime(timeDetail);
                    form.setDateFrom(dateTime.dayOfMonth().withMinimumValue().toDate());
                    form.setDateTo(dateTime.dayOfMonth().withMaximumValue().toDate());
                } else if (time.equals("yearly")) {
                    form.setCdate(new Date());
                    DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy");
                    DateTime dateTime = formatter.parseDateTime(timeDetail);
                    form.setDateFrom(dateTime.dayOfYear().withMinimumValue().toDate());
                    form.setDateTo(dateTime.dayOfYear().withMaximumValue().toDate());
                }
                form.setUserId(Integer.parseInt(userCode));
                // hoa hồng trực tiếp
                form.setType(RevenueType.PERSONAL.getValue());
                commissionInfoModel.setDirectCommission(new BigDecimal(manageService.apiGetRevenue(form)));
                // hoa hồng nhóm
                form.setType(RevenueType.GROUP.getValue());
                commissionInfoModel.setGroupCommission(new BigDecimal(manageService.apiGetRevenue(form)));
            }
            result.setResultData(commissionInfoModel);
            result.setResult(true);
        } catch (Exception e) {
            result.setResult(false);
        }
        return result;
    }

    private Tuple2<Integer, List<VolumeInfo>> getVolumeInfoList(User userInfo, String time, int limit, int offset)
            throws ParseException {
        List<VolumeInfo> volumeInfoList = new ArrayList<>();
        int totalRecord = 0;
        int start = 0;
        int end = 0;
        if (time.equals("weekly")) {
            totalRecord = CommonUtils.numberWeekFromRegister(userInfo.getSignUpDate(), new Date());
            if (totalRecord <= limit) {
                start = 0;
                end = totalRecord;
            } else {
                start = offset;
                end = offset + limit;
                if (end > totalRecord)
                    end = totalRecord;
            }
            for (int i = start; i < end; i++) {
                VolumeInfo volumeInfo = new VolumeInfo();
                TimeModel timeModel = CommonUtils.getTimeWeek(i);
                DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
                int weekIndex = CommonUtils
                        .numberWeekFromRegister(userInfo.getSignUpDate(), df.parse(timeModel.getEndDate()));
                BigDecimal weekGroupVolume = dao
                        .getWeekGroupVolume(userInfo.getUserCode(), timeModel.getStartDate(), timeModel.getEndDate());

                BigDecimal weekPersonalVolume = dao
                        .getWeekPersonalVolume(userInfo.getUserCode(), timeModel.getStartDate(),
                                timeModel.getEndDate());
                // set info
                volumeInfo.setPersonalVolume(weekPersonalVolume);
                volumeInfo.setGroupVolume(weekGroupVolume);
                volumeInfo.setTime(timeModel.getStartDate() + " - " + timeModel.getEndDate() + " (" + weekIndex + ")");
                volumeInfo.setWeekIndex(weekIndex);
                volumeInfoList.add(volumeInfo);
            }
        } else if (time.equals("monthly")) {
            totalRecord = CommonUtils.numberMonthFromRegister(userInfo.getSignUpDate(), new Date());
            for (int i = 0; i < totalRecord; i++) {
                VolumeInfo volumeInfo = new VolumeInfo();
                String timeMonth = CommonUtils.getTimeMonth(i);
                BigDecimal monthlyPersonalVolume = dao.getMonthPersonalVolume(userInfo.getUserCode(), timeMonth);
                BigDecimal monthlyGroupVolume = dao.getMonthGroupVolume(userInfo.getUserCode(), timeMonth);

                // set info
                volumeInfo.setPersonalVolume(monthlyPersonalVolume);
                volumeInfo.setGroupVolume(monthlyGroupVolume);
                volumeInfo.setTime(timeMonth);
                volumeInfoList.add(volumeInfo);
            }
        } else if (time.equals("yearly")) {
            totalRecord = CommonUtils.numberYearFromRegister(userInfo.getSignUpDate(), new Date());
            for (int i = 0; i < totalRecord; i++) {
                VolumeInfo volumeInfo = new VolumeInfo();
                String timeMonth = CommonUtils.getTimeYear(i);
                BigDecimal monthlyPersonalVolume = dao.getYearPersonalVolume(userInfo.getUserCode(), timeMonth);
                BigDecimal monthlyGroupVolume = dao.getYearGroupVolume(userInfo.getUserCode(), timeMonth);

                // set info
                volumeInfo.setPersonalVolume(monthlyPersonalVolume);
                volumeInfo.setGroupVolume(monthlyGroupVolume);
                volumeInfo.setTime(timeMonth);
                volumeInfoList.add(volumeInfo);
            }
        }
        return new Tuple2(totalRecord, volumeInfoList);
    }

    public static void main(String[] args) {
        DateTime dateTime = new DateTime().withMonthOfYear(12);
        System.out.println(dateTime.dayOfYear().withMinimumValue());
        System.out.println(dateTime.dayOfYear().withMaximumValue());
        LocalDate now = new LocalDate();

        System.out.println(now.withDayOfYear(DateTimeConstants.MONDAY));

    }
}
