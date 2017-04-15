package constant;

public enum RevenueType {
	PERSONAL(0), GROUP(1);
	private int value;

	private RevenueType(int value) {
		this.value = value;
	}

	public int getValue() {
		return this.value;
	}
}
