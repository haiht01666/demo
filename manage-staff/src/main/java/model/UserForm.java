package model;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

public class UserForm {
	@NotBlank
	@Min(value = 0, message = "The value must be number")
	private String id;

	@NotBlank
	@Size(max = 50)
	private String name;

	@NotBlank
	@Email
	@Size(max = 50)
	private String email;

	@NotBlank
	@Size(max = 50)
	private String phone;

	@NotBlank
	@Size(max = 50)
	private String bankName;

	@NotBlank
	@Size(max = 50)
	private String bankAccount;

	@NotBlank
	@Size(max = 50)
	private String bankAdd;

	@NotBlank
	@Size(min = 6 , max = 50)
	private String password;

	@NotBlank
	@Size(max = 50)
	private String rePassword;
	
	@NotBlank
	@Size(max = 50)
	private String address;
	
	@NotBlank
	@Size(max = 50)
	private String identityCardNumber;
	
	@NotBlank
	@Size(max = 50)
	private String identityCardPlace;
	
	@NotBlank
	@DateTimeFormat
	private String birdDay;

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIdentityCardNumber() {
		return identityCardNumber;
	}

	public void setIdentityCardNumber(String identityCardNumber) {
		this.identityCardNumber = identityCardNumber;
	}

	public String getIdentityCardPlace() {
		return identityCardPlace;
	}

	public void setIdentityCardPlace(String identityCardPlace) {
		this.identityCardPlace = identityCardPlace;
	}

	public String getBirdDay() {
		return birdDay;
	}

	public void setBirdDay(String birdDay) {
		this.birdDay = birdDay;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankAdd() {
		return bankAdd;
	}

	public void setBankAdd(String bankAdd) {
		this.bankAdd = bankAdd;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRePassword() {
		return rePassword;
	}

	public void setRePassword(String rePassword) {
		this.rePassword = rePassword;
	}

	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	@AssertTrue(message = "passVerify field should be equal than pass field")
	private boolean isValid() {
		return this.password.equals(this.rePassword);
	}

}
