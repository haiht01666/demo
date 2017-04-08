package constant;

public enum PackageType {
	New(0,0),SALE_MEMBER(1,5000000),SALE_PRO(2,15000000),PRO_DISTRIBUTE(3,30000000);
	private int value;
	private int amount;
	PackageType(int value,int amount){
		this.value = value;
		this.amount = amount;
	}
	public int getValue(){
		return this.value;
	}
	public int getAmount(){
		return this.amount;
	}
	
}
