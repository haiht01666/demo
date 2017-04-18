package model;

import java.math.BigDecimal;
import java.util.List;

public class CommissionInfoModel {
    private BigDecimal weekPersonalVolume;

    private BigDecimal monthPersonalVolume;

    private BigDecimal yearPersonalVolume;

    private BigDecimal directCommission;

    private BigDecimal groupCommission;

    private BigDecimal quarterCommission;

    private BigDecimal leaderClubCommission;

    private List<String> weekTimeDispList;

    private List<String> weekTimeValList;

    private List<String> monthTimeDispList;

    private List<String> monthTimeValList;

    private List<String> yearTimeDispList;

    private List<String> yearTimeValList;

    public BigDecimal getWeekPersonalVolume() {
        return weekPersonalVolume;
    }

    public void setWeekPersonalVolume(BigDecimal weekPersonalVolume) {
        this.weekPersonalVolume = weekPersonalVolume;
    }

    public BigDecimal getMonthPersonalVolume() {
        return monthPersonalVolume;
    }

    public void setMonthPersonalVolume(BigDecimal monthPersonalVolume) {
        this.monthPersonalVolume = monthPersonalVolume;
    }

    public BigDecimal getYearPersonalVolume() {
        return yearPersonalVolume;
    }

    public void setYearPersonalVolume(BigDecimal yearPersonalVolume) {
        this.yearPersonalVolume = yearPersonalVolume;
    }

    public BigDecimal getDirectCommission() {
        return directCommission;
    }

    public void setDirectCommission(BigDecimal directCommission) {
        this.directCommission = directCommission;
    }

    public BigDecimal getGroupCommission() {
        return groupCommission;
    }

    public void setGroupCommission(BigDecimal groupCommission) {
        this.groupCommission = groupCommission;
    }

    public BigDecimal getQuarterCommission() {
        return quarterCommission;
    }

    public void setQuarterCommission(BigDecimal quarterCommission) {
        this.quarterCommission = quarterCommission;
    }

    public BigDecimal getLeaderClubCommission() {
        return leaderClubCommission;
    }

    public void setLeaderClubCommission(BigDecimal leaderClubCommission) {
        this.leaderClubCommission = leaderClubCommission;
    }

    public List<String> getWeekTimeDispList() {
        return weekTimeDispList;
    }

    public void setWeekTimeDispList(List<String> weekTimeDispList) {
        this.weekTimeDispList = weekTimeDispList;
    }

    public List<String> getWeekTimeValList() {
        return weekTimeValList;
    }

    public void setWeekTimeValList(List<String> weekTimeValList) {
        this.weekTimeValList = weekTimeValList;
    }

    public List<String> getMonthTimeDispList() {
        return monthTimeDispList;
    }

    public void setMonthTimeDispList(List<String> monthTimeDispList) {
        this.monthTimeDispList = monthTimeDispList;
    }

    public List<String> getMonthTimeValList() {
        return monthTimeValList;
    }

    public void setMonthTimeValList(List<String> monthTimeValList) {
        this.monthTimeValList = monthTimeValList;
    }

    public List<String> getYearTimeDispList() {
        return yearTimeDispList;
    }

    public void setYearTimeDispList(List<String> yearTimeDispList) {
        this.yearTimeDispList = yearTimeDispList;
    }

    public List<String> getYearTimeValList() {
        return yearTimeValList;
    }

    public void setYearTimeValList(List<String> yearTimeValList) {
        this.yearTimeValList = yearTimeValList;
    }
}
