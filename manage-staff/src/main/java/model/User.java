package model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class User implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private int id;

    /**
     * password
     */
    private String passWord;

    /**
     * user roles
     */
    private List<String> roles;

    /**
     * Display name
     */
    private String dispName;

    /**
     * enable
     */
    private boolean enable;

    /**
     * User code
     */
    private String userCode;

    private String childId;

    private Date signUpDate;

    private Date cdate;

    private String email;

    private String phone;

    private String bankName;

    private String bankAccount;

    private String bankBranch;

    private String bankUser;

    private String role;

    private int parentId;

    private String parentName;

    private int lever;

    private String leverValue;

    private Date birthday;

    private String address;

    private String identifier;

    private String userAvatar;

    private String city;

    private Double totalOrderValue;

    private ActiveStatus activeStatus;
    private Date backOffice;
    private int backOfficeNum;

    public ActiveStatus getActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(ActiveStatus activeStatus) {
        this.activeStatus = activeStatus;
    }

    public Double getTotalOrderValue() {
        return totalOrderValue;
    }

    public void setTotalOrderValue(Double totalOrderValue) {
        this.totalOrderValue = totalOrderValue;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    // cấp đại lý
    private String agentLevel;

    private String status;

    private boolean completePackage;

    public boolean getCompletePackage() {
        return completePackage;
    }

    public void setCompletePackage(boolean isCompletePackage) {
        this.completePackage = isCompletePackage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLeverValue() {
        return leverValue;
    }

    public void setLeverValue(String leverValue) {
        this.leverValue = leverValue;
    }

    public int getLever() {
        return lever;
    }

    public void setLever(int lever) {
        this.lever = lever;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(String bankBranch) {
        this.bankBranch = bankBranch;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCdate() {
        return cdate;
    }

    public void setCdate(Date cdate) {
        this.cdate = cdate;
    }

    private Date lastOrderDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getDispName() {
        return dispName;
    }

    public void setDispName(String dispName) {
        this.dispName = dispName;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getChildId() {
        return childId;
    }

    public void setChildId(String childId) {
        this.childId = childId;
    }

    public Date getSignUpDate() {
        return signUpDate;
    }

    public void setSignUpDate(Date signUpDate) {
        this.signUpDate = signUpDate;
    }

    public Date getLastOrderDate() {
        return lastOrderDate;
    }

    public void setLastOrderDate(Date lastOrderDate) {
        this.lastOrderDate = lastOrderDate;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public String getBankUser() {
        return bankUser;
    }

    public void setBankUser(String bankUser) {
        this.bankUser = bankUser;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getAgentLevel() {
        return agentLevel;
    }

    public void setAgentLevel(String agentLevel) {
        this.agentLevel = agentLevel;
    }

    public Date getBackOffice() {
        return backOffice;
    }

    public void setBackOffice(Date backOffice) {
        this.backOffice = backOffice;
    }

    public int getBackOfficeNum() {
        return backOfficeNum;
    }

    public void setBackOfficeNum(int backOfficeNum) {
        this.backOfficeNum = backOfficeNum;
    }
}
