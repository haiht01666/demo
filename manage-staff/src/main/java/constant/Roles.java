package constant;

public enum Roles {
	ROLE_ADMIN("ADMIN"),
	ROLE_SPADMIN("SPADMIN"),
	ROLE_STAFF("STAFF");
	
	private String text;

    /**
     * @param text
     * @return 
     */
    Roles(String text) {
        this.text = text;
    }
    
    @Override
    public String toString() {
        return text;
    }
}
