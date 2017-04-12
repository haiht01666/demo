package model;

public class AjaxResult {
    /**
     * Result data
     */
    private Object resultData;

    private String message;

    private boolean result;

    private long numberRecord;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getResultData() {
        return resultData;
    }

    public void setResultData(Object resultData) {
        this.resultData = resultData;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public long getNumberRecord() {
        return numberRecord;
    }

    public void setNumberRecord(long numberRecord) {
        this.numberRecord = numberRecord;
    }
}
