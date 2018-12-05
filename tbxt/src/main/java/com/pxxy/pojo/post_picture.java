package com.pxxy.pojo;

import java.io.Serializable;

public class post_picture implements Serializable {
    private String pictureId;

    private String pictureName;

    private String pictureBelong;

    private String pictureSequence;

    private String pictureCreattime;

    private String pictureModifytime;

    private String pictureIsdelete;

    private static final long serialVersionUID = 1L;

    public String getPictureId() {
        return pictureId;
    }

    public void setPictureId(String pictureId) {
        this.pictureId = pictureId == null ? null : pictureId.trim();
    }

    public String getPictureName() {
        return pictureName;
    }

    public void setPictureName(String pictureName) {
        this.pictureName = pictureName == null ? null : pictureName.trim();
    }

    public String getPictureBelong() {
        return pictureBelong;
    }

    public void setPictureBelong(String pictureBelong) {
        this.pictureBelong = pictureBelong == null ? null : pictureBelong.trim();
    }

    public String getPictureSequence() {
        return pictureSequence;
    }

    public void setPictureSequence(String pictureSequence) {
        this.pictureSequence = pictureSequence == null ? null : pictureSequence.trim();
    }

    public String getPictureCreattime() {
        return pictureCreattime;
    }

    public void setPictureCreattime(String pictureCreattime) {
        this.pictureCreattime = pictureCreattime == null ? null : pictureCreattime.trim();
    }

    public String getPictureModifytime() {
        return pictureModifytime;
    }

    public void setPictureModifytime(String pictureModifytime) {
        this.pictureModifytime = pictureModifytime == null ? null : pictureModifytime.trim();
    }

    public String getPictureIsdelete() {
        return pictureIsdelete;
    }

    public void setPictureIsdelete(String pictureIsdelete) {
        this.pictureIsdelete = pictureIsdelete == null ? null : pictureIsdelete.trim();
    }
}