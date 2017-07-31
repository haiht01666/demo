package model;

import java.util.List;

public class AjaxResult {
    /**
     * Result data
     */
    private Object resultData;

    private String message;

    private boolean result;

    private long numberRecord;
    
    private List<Banner> data;
    
    public List<User> getLstUser() {
		return lstUser;
	}

	public void setLstUser(List<User> lstUser) {
		this.lstUser = lstUser;
	}

	private List<User> lstUser;

    public List<Banner> getData() {
		return data;
	}

	public void setData(List<Banner> data) {
		this.data = data;
	}

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
