package model;

import java.math.BigDecimal;

public class SumaryInfoModel {
    private User userInfo;

    private BigDecimal monthPersonalVolume;

    private String monthTime;

    private BigDecimal groupVolumeWeek1;

    private String week1Time;

    private BigDecimal groupVolumeWeek2;

    private String week2Time;

    private BigDecimal groupVolumeWeek3;

    private String week3Time;

    private BigDecimal groupVolumeWeek0;

    private String week0Time;

    public String getWeek1Time() {
        return week1Time;
    }

    public void setWeek1Time(String week1Time) {
        this.week1Time = week1Time;
    }

    public String getWeek2Time() {
        return week2Time;
    }

    public void setWeek2Time(String week2Time) {
        this.week2Time = week2Time;
    }

    public String getWeek3Time() {
        return week3Time;
    }

    public void setWeek3Time(String week3Time) {
        this.week3Time = week3Time;
    }

    public String getWeek0Time() {
        return week0Time;
    }

    public void setWeek0Time(String week0Time) {
        this.week0Time = week0Time;
    }

    public User getUserInfo() {
        return userInfo;
    }

    public String getMonthTime() {
        return monthTime;
    }

    public void setMonthTime(String monthTime) {
        this.monthTime = monthTime;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    public BigDecimal getMonthPersonalVolume() {
        return monthPersonalVolume;
    }

    public void setMonthPersonalVolume(BigDecimal monthPersonalVolume) {
        this.monthPersonalVolume = monthPersonalVolume;
    }

    public BigDecimal getGroupVolumeWeek1() {
        return groupVolumeWeek1;
    }

    public void setGroupVolumeWeek1(BigDecimal groupVolumeWeek1) {
        this.groupVolumeWeek1 = groupVolumeWeek1;
    }

    public BigDecimal getGroupVolumeWeek2() {
        return groupVolumeWeek2;
    }

    public void setGroupVolumeWeek2(BigDecimal groupVolumeWeek2) {
        this.groupVolumeWeek2 = groupVolumeWeek2;
    }

    public BigDecimal getGroupVolumeWeek3() {
        return groupVolumeWeek3;
    }

    public void setGroupVolumeWeek3(BigDecimal groupVolumeWeek3) {
        this.groupVolumeWeek3 = groupVolumeWeek3;
    }

    public BigDecimal getGroupVolumeWeek0() {
        return groupVolumeWeek0;
    }

    public void setGroupVolumeWeek0(BigDecimal groupVolumeWeek0) {
        this.groupVolumeWeek0 = groupVolumeWeek0;
    }
}
