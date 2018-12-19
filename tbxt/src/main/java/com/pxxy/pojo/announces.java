package com.pxxy.pojo;

import java.io.Serializable;

public class announces implements Serializable {
    private String announceId;

    private String announceTitle;

    private String announceContent;

    private String announceModifytime;

    private String announceCreattime;

    private String announceIsdelete;

    private static final long serialVersionUID = 1L;

    public String getAnnounceId() {
        return announceId;
    }

    public void setAnnounceId(String announceId) {
        this.announceId = announceId == null ? null : announceId.trim();
    }

    public String getAnnounceTitle() {
        return announceTitle;
    }

    public void setAnnounceTitle(String announceTitle) {
        this.announceTitle = announceTitle == null ? null : announceTitle.trim();
    }

    public String getAnnounceContent() {
        return announceContent;
    }

    public void setAnnounceContent(String announceContent) {
        this.announceContent = announceContent == null ? null : announceContent.trim();
    }

    public String getAnnounceModifytime() {
        return announceModifytime;
    }

    public void setAnnounceModifytime(String announceModifytime) {
        this.announceModifytime = announceModifytime == null ? null : announceModifytime.trim();
    }

    public String getAnnounceCreattime() {
        return announceCreattime;
    }

    public void setAnnounceCreattime(String announceCreattime) {
        this.announceCreattime = announceCreattime == null ? null : announceCreattime.trim();
    }

    public String getAnnounceIsdelete() {
        return announceIsdelete;
    }

    public void setAnnounceIsdelete(String announceIsdelete) {
        this.announceIsdelete = announceIsdelete == null ? null : announceIsdelete.trim();
    }
}