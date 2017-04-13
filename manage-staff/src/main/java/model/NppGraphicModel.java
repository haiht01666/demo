package model;

import java.util.List;

public class NppGraphicModel {
    private User userInfo;

    private int numberNM;

    private int numberSM;

    private int numberPS;

    private int numberPD;

    private int numberTL;

    private int numberMSD;

    private int numberDSD;

    private int numberGDSD;

    private List<User> listNpp;

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    public List<User> getListNpp() {
        return listNpp;
    }

    public void setListNpp(List<User> listNpp) {
        this.listNpp = listNpp;
    }

    public int getNumberNM() {
        return numberNM;
    }

    public void setNumberNM(int numberNM) {
        this.numberNM = numberNM;
    }

    public int getNumberSM() {
        return numberSM;
    }

    public void setNumberSM(int numberSM) {
        this.numberSM = numberSM;
    }

    public int getNumberPS() {
        return numberPS;
    }

    public void setNumberPS(int numberPS) {
        this.numberPS = numberPS;
    }

    public int getNumberPD() {
        return numberPD;
    }

    public void setNumberPD(int numberPD) {
        this.numberPD = numberPD;
    }

    public int getNumberTL() {
        return numberTL;
    }

    public void setNumberTL(int numberTL) {
        this.numberTL = numberTL;
    }

    public int getNumberMSD() {
        return numberMSD;
    }

    public void setNumberMSD(int numberMSD) {
        this.numberMSD = numberMSD;
    }

    public int getNumberDSD() {
        return numberDSD;
    }

    public void setNumberDSD(int numberDSD) {
        this.numberDSD = numberDSD;
    }

    public int getNumberGDSD() {
        return numberGDSD;
    }

    public void setNumberGDSD(int numberGDSD) {
        this.numberGDSD = numberGDSD;
    }
}
