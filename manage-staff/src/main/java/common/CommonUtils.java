package common;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import model.CompanyInfo;
import org.apache.commons.lang.StringUtils;
import org.joda.time.*;

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

    public static int getBackOfficeNum(Date backOfficeDate) {
        if(backOfficeDate == null){
            return -2;
        }
        return getDaysCount(new Date(), backOfficeDate);
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
        DateTime endDate = new DateTime(end);
        DateTime beginDate = new DateTime(begin);
        if(endDate.withTimeAtStartOfDay().isBefore(beginDate.withTimeAtStartOfDay())){
            return -1;
        }
        return Days.daysBetween(beginDate.toLocalDate(), endDate.toLocalDate()).getDays();
    }

    public static void main(String[] args) throws ParseException {
        Calendar cal = Calendar.getInstance();
        cal.set(2017, 8, 12);
        SimpleDateFormat df = new SimpleDateFormat("dd MM yyyy");
        Integer i = CommonUtils.getBackOfficeNum(df.parse("09 08 2017"));
        System.out.println(i);
        System.out.println(CommonUtils.getDaysCount(new Date(), df.parse("11 08 2017")));
    }
}
