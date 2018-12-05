package com.pxxy.pojo;

import java.io.Serializable;

public class post_readed implements Serializable {
    private String readedId;

    private String postId;

    private String userId;

    private static final long serialVersionUID = 1L;

    public String getReadedId() {
        return readedId;
    }

    public void setReadedId(String readedId) {
        this.readedId = readedId == null ? null : readedId.trim();
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