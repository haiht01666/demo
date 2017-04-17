package model;

import java.math.BigDecimal;
import java.util.List;

public class SumaryInfoModel {
    private User userInfo;

    private BigDecimal monthPersonalVolume;

    private String monthTime;

    private List<WeekVolumeInfo> weekVolumeInfoList;

    private List<VolumeInfo> volumeInfoList;

    private int totalRecord;

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

    public List<WeekVolumeInfo> getWeekVolumeInfoList() {
        return weekVolumeInfoList;
    }

    public void setWeekVolumeInfoList(List<WeekVolumeInfo> weekVolumeInfoList) {
        this.weekVolumeInfoList = weekVolumeInfoList;
    }

    public List<VolumeInfo> getVolumeInfoList() {
        return volumeInfoList;
    }

    public void setVolumeInfoList(List<VolumeInfo> volumeInfoList) {
        this.volumeInfoList = volumeInfoList;
    }

    public int getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(int totalRecord) {
        this.totalRecord = totalRecord;
    }
}
