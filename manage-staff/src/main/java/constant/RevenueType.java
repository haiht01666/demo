package constant;

public enum RevenueType {
	PERSONAL(0), GROUP(1),DIRECT(3),WEEK(4),QUATER(5),MONTH(6);
	private int value;

	private RevenueType(int value) {
		this.value = value;
	}

	public int getValue() {
		return this.value;
	}
}
