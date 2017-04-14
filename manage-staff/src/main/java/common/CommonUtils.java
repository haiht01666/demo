package common;

import model.TimeModel;
import org.apache.commons.lang.StringUtils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

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
        c.add(Calendar.DATE, weekPeriosNumber * (-7));
        // Set the calendar to monday of the current week
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        //cal start date, end date
        TimeModel timeModel = new TimeModel();
        timeModel.setStartDate(df1.format(c.getTime()));
        c.add(Calendar.DATE, 6);
        timeModel.setEndDate(df1.format(c.getTime()));
        return timeModel;
    }
}
