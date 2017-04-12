package common;

import org.apache.commons.lang.StringUtils;

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
}
