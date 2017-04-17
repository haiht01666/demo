package model;

import java.math.BigDecimal;

public class WeekVolumeInfo {
    private BigDecimal groupVolume;
    private BigDecimal personalVolume;
    private String weekTime;
    private int weekIndex;

    public BigDecimal getGroupVolume() {
        return groupVolume;
    }

    public void setGroupVolume(BigDecimal groupVolume) {
        this.groupVolume = groupVolume;
    }

    public BigDecimal getPersonalVolume() {
        return personalVolume;
    }

    public void setPersonalVolume(BigDecimal personalVolume) {
        this.personalVolume = personalVolume;
    }

    public String getWeekTime() {
        return weekTime;
    }

    public void setWeekTime(String weekTime) {
        this.weekTime = weekTime;
    }

    public int getWeekIndex() {
        return weekIndex;
    }

    public void setWeekIndex(int weekIndex) {
        this.weekIndex = weekIndex;
    }
}
