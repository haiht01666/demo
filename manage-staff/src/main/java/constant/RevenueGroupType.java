package constant;

public enum RevenueGroupType {
	WEEK(0), MONTH(1),QUARTER(2),YEAR(3);
	private int value;

	private RevenueGroupType(int value) {
		this.value = value;
	}

	public int getValue() {
		return this.value;
	}
}
