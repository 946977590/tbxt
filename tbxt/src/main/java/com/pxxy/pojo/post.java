package com.pxxy.pojo;

import java.io.Serializable;

public class post implements Serializable {
    private String postId;

    private String postBarId;

    private String postUserId;

    private String postTitle;

    private String postContent;

    private String postAuthor;

    private String postCreattime;

    private String postModifytime;

    private String postIsdelete;

    private static final long serialVersionUID = 1L;

    public post() {
		super();
	}

	public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId == null ? null : postId.trim();
    }

    public String getPostBarId() {
        return postBarId;
    }

    public void setPostBarId(String postBarId) {
        this.postBarId = postBarId == null ? null : postBarId.trim();
    }

    public String getPostUserId() {
        return postUserId;
    }

    public void setPostUserId(String postUserId) {
        this.postUserId = postUserId == null ? null : postUserId.trim();
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle == null ? null : postTitle.trim();
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent == null ? null : postContent.trim();
    }

    public String getPostAuthor() {
        return postAuthor;
    }

    public void setPostAuthor(String postAuthor) {
        this.postAuthor = postAuthor == null ? null : postAuthor.trim();
    }

    public String getPostCreattime() {
        return postCreattime;
    }

    public void setPostCreattime(String postCreattime) {
        this.postCreattime = postCreattime == null ? null : postCreattime.trim();
    }

    public String getPostModifytime() {
        return postModifytime;
    }

    public void setPostModifytime(String postModifytime) {
        this.postModifytime = postModifytime == null ? null : postModifytime.trim();
    }

    public String getPostIsdelete() {
        return postIsdelete;
    }

    public void setPostIsdelete(String postIsdelete) {
        this.postIsdelete = postIsdelete == null ? null : postIsdelete.trim();
    }

	@Override
	public String toString() {
		return "post [postId=" + postId + ", postBarId=" + postBarId + ", postUserId=" + postUserId + ", postTitle="
				+ postTitle + ", postContent=" + postContent + ", postAuthor=" + postAuthor + ", postCreattime="
				+ postCreattime + ", postModifytime=" + postModifytime + ", postIsdelete=" + postIsdelete + "]";
	}
    
    
}