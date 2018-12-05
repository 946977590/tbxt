package com.pxxy.pojo;

import java.io.Serializable;

public class post_bar implements Serializable {
    private String barId;

    private String barName;

    private String barLeader;

    private String barPicture;

    private String barSign;

    private String barCategory;

    private String barCreattime;

    private String barModifytime;

    private String barIsdelete;

    private static final long serialVersionUID = 1L;

    public String getBarId() {
        return barId;
    }

    public void setBarId(String barId) {
        this.barId = barId == null ? null : barId.trim();
    }

    public String getBarName() {
        return barName;
    }

    public void setBarName(String barName) {
        this.barName = barName == null ? null : barName.trim();
    }

    public String getBarLeader() {
        return barLeader;
    }

    public void setBarLeader(String barLeader) {
        this.barLeader = barLeader == null ? null : barLeader.trim();
    }

    public String getBarPicture() {
        return barPicture;
    }

    public void setBarPicture(String barPicture) {
        this.barPicture = barPicture == null ? null : barPicture.trim();
    }

    public String getBarSign() {
        return barSign;
    }

    public void setBarSign(String barSign) {
        this.barSign = barSign == null ? null : barSign.trim();
    }

    public String getBarCategory() {
        return barCategory;
    }

    public void setBarCategory(String barCategory) {
        this.barCategory = barCategory == null ? null : barCategory.trim();
    }

    public String getBarCreattime() {
        return barCreattime;
    }

    public void setBarCreattime(String barCreattime) {
        this.barCreattime = barCreattime == null ? null : barCreattime.trim();
    }

    public String getBarModifytime() {
        return barModifytime;
    }

    public void setBarModifytime(String barModifytime) {
        this.barModifytime = barModifytime == null ? null : barModifytime.trim();
    }

    public String getBarIsdelete() {
        return barIsdelete;
    }

    public void setBarIsdelete(String barIsdelete) {
        this.barIsdelete = barIsdelete == null ? null : barIsdelete.trim();
    }
}