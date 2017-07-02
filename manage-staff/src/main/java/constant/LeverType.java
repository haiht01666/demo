package constant;

public enum LeverType {
	New(0,0,0),SALE_MEMBER(1,217,0),SALE_PRO(2,652,0),PRO_DISTRIBUTE(3,1300,0), TL(4,4348,4348), MSD(5,8696,8696), DSD(6,21740,21740), GDSD(7,65220,65220);
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
