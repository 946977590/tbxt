package com.pxxy.pojo;

import java.io.Serializable;

public class huati implements Serializable {
    private String huatiId;

    private String huatiContent;

    private String huatiPostId;

    private String huatiUserId;

    private String huatiCategoryId;

    private String huatiIsdelete;

    private static final long serialVersionUID = 1L;

    public String getHuatiId() {
        return huatiId;
    }

    public void setHuatiId(String huatiId) {
        this.huatiId = huatiId == null ? null : huatiId.trim();
    }

    public String getHuatiContent() {
        return huatiContent;
    }

    public void setHuatiContent(String huatiContent) {
        this.huatiContent = huatiContent == null ? null : huatiContent.trim();
    }

    public String getHuatiPostId() {
        return huatiPostId;
    }

    public void setHuatiPostId(String huatiPostId) {
        this.huatiPostId = huatiPostId == null ? null : huatiPostId.trim();
    }

    public String getHuatiUserId() {
        return huatiUserId;
    }

    public void setHuatiUserId(String huatiUserId) {
        this.huatiUserId = huatiUserId == null ? null : huatiUserId.trim();
    }

    public String getHuatiCategoryId() {
        return huatiCategoryId;
    }

    public void setHuatiCategoryId(String huatiCategoryId) {
        this.huatiCategoryId = huatiCategoryId == null ? null : huatiCategoryId.trim();
    }

    public String getHuatiIsdelete() {
        return huatiIsdelete;
    }

    public void setHuatiIsdelete(String huatiIsdelete) {
        this.huatiIsdelete = huatiIsdelete == null ? null : huatiIsdelete.trim();
    }
}