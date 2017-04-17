package model;

import java.math.BigDecimal;

public class VolumeInfo {
    private BigDecimal groupVolume;
    private BigDecimal personalVolume;
    private String time;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getWeekIndex() {
        return weekIndex;
    }

    public void setWeekIndex(int weekIndex) {
        this.weekIndex = weekIndex;
    }
}
