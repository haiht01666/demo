package common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeConstants;
import org.joda.time.Months;
import org.joda.time.Years;

import model.TimeModel;

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
        c.add(Calendar.DATE, -2);
        //cal start date, end date
        TimeModel timeModel = new TimeModel();
        timeModel.setStartDate(df1.format(c.getTime()));
        c.add(Calendar.DATE, 6);
        timeModel.setEndDate(df1.format(c.getTime()));
        return timeModel;
    }

    public static TimeModel getTimeWeekData(int weekPeriosNumber) {
        DateFormat df1 = new SimpleDateFormat("dd/MM/yyyy");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DATE, (weekPeriosNumber) * (-7));
        // Set the calendar to monday of the current week
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        c.add(Calendar.DATE, -1);
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
        int numberWeek = 0;
        DateTime dateStartTmp = new DateTime(dateRegister);
        DateTime dateEndTmp = new DateTime(caculateDate);
        DateTime firstDate = dateStartTmp;
        DateTime lastDate = dateEndTmp;

        if(dateStartTmp.isAfter(dateEndTmp)){
            return 0;
        }

        DateTime dateStart = dateStartTmp.withDayOfWeek(DateTimeConstants.SATURDAY);
        if(dateStartTmp.isBefore(dateStart)){
            numberWeek += 1;
            firstDate = dateStart;
        }

        DateTime dateEnd = dateEndTmp.withDayOfWeek(DateTimeConstants.FRIDAY);
        if(dateEnd.isBefore(dateEndTmp)){
            numberWeek += 1;
            lastDate  = dateEnd;
        }

        while (firstDate.isBefore(lastDate)){
            Calendar c = Calendar.getInstance();
            c.setTime(firstDate.toDate());
            c.add(Calendar.DATE, 7);
            firstDate = new DateTime(c.getTime());
            numberWeek  += 1;
        }
        return numberWeek;
    }

    public static int numberMonthFromRegister(Date dateRegister, Date caculateDate) {
        DateTime dateStartTmp = new DateTime(dateRegister);
        DateTime dateStart = dateStartTmp.withDayOfWeek(DateTimeConstants.SATURDAY);
        if(dateStartTmp.isBefore(dateStart)){
            dateStart = dateStartTmp;
        }
        DateTime dateEndTmp = new DateTime(caculateDate);
        DateTime dateEnd = dateEndTmp.withDayOfWeek(DateTimeConstants.FRIDAY);
        if(dateEndTmp.isAfter(dateEnd)){
            dateEnd = dateEndTmp;
        }
        if(dateStart.isAfter(dateEnd)){
            return 0;
        }
        return Months.monthsBetween(dateStart, dateEnd).getMonths() + 1;
    }
    public static int numberYearFromRegister(Date dateRegister, Date caculateDate) {
        DateTime dateStartTmp = new DateTime(dateRegister);
        DateTime dateStart = dateStartTmp.withDayOfWeek(DateTimeConstants.SATURDAY);
        if(dateStartTmp.isBefore(dateStart)){
            dateStart = dateStartTmp;
        }
        DateTime dateEndTmp = new DateTime(caculateDate);
        DateTime dateEnd = dateEndTmp.withDayOfWeek(DateTimeConstants.FRIDAY);
        if(dateEndTmp.isAfter(dateEnd)){
            dateEnd = dateEndTmp;
        }
        if(dateStart.isAfter(dateEnd)){
            return 0;
        }
        return Years.yearsBetween(dateStart, dateEnd).getYears() + 1;
    }

    public static Calendar setMaxHour(Calendar cal){
    	cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		cal.set(Calendar.MILLISECOND, 59);
    	return cal;
    }
    
    public static Calendar setMinHour(Calendar cal){
    	cal.set(Calendar.HOUR_OF_DAY, 00);
		cal.set(Calendar.MINUTE, 00);
		cal.set(Calendar.SECOND, 00);
		cal.set(Calendar.MILLISECOND, 00);
    	return cal;
    }


    public static int getDaysCount(Date begin, Date end) {
        Calendar start = org.apache.commons.lang.time.DateUtils.toCalendar(begin);
        start.set(Calendar.MILLISECOND, 0);
        start.set(Calendar.SECOND, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.HOUR_OF_DAY, 0);

        Calendar finish = org.apache.commons.lang.time.DateUtils.toCalendar(end);
        finish.set(Calendar.MILLISECOND, 999);
        finish.set(Calendar.SECOND, 59);
        finish.set(Calendar.MINUTE, 59);
        finish.set(Calendar.HOUR_OF_DAY, 23);

        long delta = finish.getTimeInMillis() - start.getTimeInMillis();
        return (int) Math.ceil(delta / (1000.0 * 60 * 60 * 24));
    }
}
