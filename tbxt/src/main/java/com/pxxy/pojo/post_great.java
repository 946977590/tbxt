package com.pxxy.pojo;

import java.io.Serializable;

public class post_great implements Serializable {
    private String greatId;

    private String postId;

    private String userId;

    private static final long serialVersionUID = 1L;

    public String getGreatId() {
        return greatId;
    }

    public void setGreatId(String greatId) {
        this.greatId = greatId == null ? null : greatId.trim();
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId == null ? null : postId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }
}