package model;

import java.math.BigDecimal;
import java.util.List;

public class CommissionInfoModel {
    private double commissionDirectSummary;

    private double commissionGroupSummary;

    private double commissionTotalSummary;

    private double directCommission;

    private double groupCommission;

    private double totalCommission;

    private List<String> weekTimeDispList;

    private List<String> weekTimeValList;

    private List<String> monthTimeDispList;

    private List<String> monthTimeValList;

    private List<String> yearTimeDispList;

    private List<String> yearTimeValList;

    public double getCommissionDirectSummary() {
        return commissionDirectSummary;
    }

    public void setCommissionDirectSummary(double commissionDirectSummary) {
        this.commissionDirectSummary = commissionDirectSummary;
    }

    public double getCommissionGroupSummary() {
        return commissionGroupSummary;
    }

    public void setCommissionGroupSummary(double commissionGroupSummary) {
        this.commissionGroupSummary = commissionGroupSummary;
    }

    public double getCommissionTotalSummary() {
        return commissionTotalSummary;
    }

    public void setCommissionTotalSummary(double commissionTotalSummary) {
        this.commissionTotalSummary = commissionTotalSummary;
    }

    public double getDirectCommission() {
        return directCommission;
    }

    public void setDirectCommission(double directCommission) {
        this.directCommission = directCommission;
    }

    public double getGroupCommission() {
        return groupCommission;
    }

    public void setGroupCommission(double groupCommission) {
        this.groupCommission = groupCommission;
    }

    public double getTotalCommission() {
        return totalCommission;
    }

    public void setTotalCommission(double totalCommission) {
        this.totalCommission = totalCommission;
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
