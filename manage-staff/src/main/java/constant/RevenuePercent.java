package constant;

public enum RevenuePercent {
	TEN("10%",0.1),FEFTEEN("15%",0.15),TWENTY("20%",0.2),TWO("2%",0.02),THREE("3%",0.03),ONE("1%",0.01);
	
	private Double value;
	
	private String name;
	
	RevenuePercent(String name,Double value){
		this.name = name;
		this.value = value;
	}
	public Double getValue(){
		return this.value;
	}
	
	@Override
	public String toString() {
		return this.name;
	}
}
