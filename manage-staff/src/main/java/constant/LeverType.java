package constant;

public enum LeverType {
	New(0,0,0),SALE_MEMBER(1,5000000,0),SALE_PRO(2,15000000,0),PRO_DISTRIBUTE(3,30000000,0), TL(4,100000000,10000000), MSD(5,200000000,20000000), DSD(6,500000000,50000000), GDSD(7,1500000000,150000000);
	private int value;
	private int amount;
	private int minvalue;
	LeverType(int value,int amount,int minvalue){
		this.value = value;
		this.amount = amount;
		this.minvalue = minvalue;
	}
	public int getValue(){
		return this.value;
	}
	public int getAmount(){
		return this.amount;
	}
	public int getMinValue(){
		return this.minvalue;
	}
}
