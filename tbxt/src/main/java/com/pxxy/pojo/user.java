package com.pxxy.pojo;

import java.io.Serializable;

public class user implements Serializable {
    private String userId;

    private String userEmail;

    private String userPassword;

    private String userNickname;

    private String userGender;

    private String userLevel;

    private String userCreattime;

    private String userModifytime;

    private String userIsdelete;

    private static final long serialVersionUID = 1L;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail == null ? null : userEmail.trim();
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword == null ? null : userPassword.trim();
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname == null ? null : userNickname.trim();
    }

    public String getUserGender() {
        return userGender;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender == null ? null : userGender.trim();
    }

    public String getUserLevel() {
        return userLevel;
    }

    public void setUserLevel(String userLevel) {
        this.userLevel = userLevel == null ? null : userLevel.trim();
    }

    public String getUserCreattime() {
        return userCreattime;
    }

    public void setUserCreattime(String userCreattime) {
        this.userCreattime = userCreattime == null ? null : userCreattime.trim();
    }

    public String getUserModifytime() {
        return userModifytime;
    }

    public void setUserModifytime(String userModifytime) {
        this.userModifytime = userModifytime == null ? null : userModifytime.trim();
    }

    public String getUserIsdelete() {
        return userIsdelete;
    }

    public void setUserIsdelete(String userIsdelete) {
        this.userIsdelete = userIsdelete == null ? null : userIsdelete.trim();
    }
}