package common;

import model.TimeModel;
import org.apache.commons.lang.StringUtils;
import org.joda.time.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by BlueSky on 4/12/2017.
 */
public class CommonUtils {
    public static String getLevelChild(String parentId, String childId) {
        int level = 0;
        if (!StringUtils.isEmpty(parentId) && childId.contains(parentId)) {
            String tmp = childId.substring(parentId.length() + 1, childId.length() - 1);
            level = tmp.split("-").length;
        }
        return ("D" + level);
    }

    public static TimeModel getTimeWeek(int weekPeriosNumber) {
        DateFormat df1 = new SimpleDateFormat("dd/MM/yyyy");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, (weekPeriosNumber) * (-7));
        // Set the calendar to monday of the current week
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        //cal start date, end date
        TimeModel timeModel = new TimeModel();
        timeModel.setStartDate(df1.format(c.getTime()));
        c.add(Calendar.DATE, 6);
        timeModel.setEndDate(df1.format(c.getTime()));
        return timeModel;
    }

    public static String getTimeMonth(int monthPeriosNumber) {
        DateFormat df1 = new SimpleDateFormat("MM/yyyy");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, monthPeriosNumber * -1);
        //cal start date, end date
        return df1.format(c.getTime());
    }
    public static String getTimeYear(int yearPeriosNumber) {
        DateFormat df1 = new SimpleDateFormat("yyyy");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.YEAR, yearPeriosNumber * -1);
        //cal start date, end date
        return df1.format(c.getTime());
    }

    public static int numberWeekFromRegister(Date dateRegister, Date caculateDate) {
        DateTime dateStartTmp = new DateTime(dateRegister);
        DateTime dateStart = dateStartTmp.withDayOfWeek(DateTimeConstants.MONDAY);
        DateTime dateEndTmp = new DateTime(caculateDate);
        DateTime dateEnd = dateEndTmp.withDayOfWeek(DateTimeConstants.SUNDAY);
        if(dateStart.isAfter(dateEnd)){
            return 0;
        }
        return Weeks.weeksBetween(dateStart, dateEnd).getWeeks() + 1;
    }

    public static int numberMonthFromRegister(Date dateRegister, Date caculateDate) {
        DateTime dateStartTmp = new DateTime(dateRegister);
        DateTime dateStart = dateStartTmp.withDayOfWeek(DateTimeConstants.MONDAY);
        DateTime dateEndTmp = new DateTime(caculateDate);
        DateTime dateEnd = dateEndTmp.withDayOfWeek(DateTimeConstants.SUNDAY);
        if(dateStart.isAfter(dateEnd)){
            return 0;
        }
        return Months.monthsBetween(dateStart, dateEnd).getMonths() + 1;
    }
    public static int numberYearFromRegister(Date dateRegister, Date caculateDate) {
        DateTime dateStartTmp = new DateTime(dateRegister);
        DateTime dateStart = dateStartTmp.withDayOfWeek(DateTimeConstants.MONDAY);
        DateTime dateEndTmp = new DateTime(caculateDate);
        DateTime dateEnd = dateEndTmp.withDayOfWeek(DateTimeConstants.SUNDAY);
        if(dateStart.isAfter(dateEnd)){
            return 0;
        }
        return Years.yearsBetween(dateStart, dateEnd).getYears() + 1;
    }
}
