package constant;

public enum OrderType {
	ORDER_PRODUCT(1,"Mua sản phẩm"),
	ORDER_PROACTIVE(2,"Mua năng động"),
	ORDER_PACKAGE(3,"Đăng ký gói");
	
	private int code;
	
	private String value;

    /**
     * @param text
     * @return 
     */
	OrderType(int code,String value) {
        this.code = code;
        this.value = value;
    }
	
	public int getCode(){
		return this.code;
	}
    
	public String getValue(){
		return this.value;
	}
	
	public String DefaultValue(){
		return "Khác";
	}
}
