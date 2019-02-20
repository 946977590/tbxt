package com.pxxy.DTO;

import java.io.Serializable;
import java.util.List;

import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;

public class PostByGreatReadedDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<post_picture> post_pictureList;
	private post post;
	private post_bar post_bar;
	
	public List<post_picture> getPost_pictureList() {
		return post_pictureList;
	}
	public void setPost_pictureList(List<post_picture> post_pictureList) {
		this.post_pictureList = post_pictureList;
	}
	public post getPost() {
		return post;
	}
	public void setPost(post post) {
		this.post = post;
	}
	public post_bar getPost_bar() {
		return post_bar;
	}
	public void setPost_bar(post_bar post_bar) {
		this.post_bar = post_bar;
	}
	@Override
	public String toString() {
		return "PostByGreatReadedDTO [post_pictureList=" + post_pictureList + ", post=" + post + ", post_bar="
				+ post_bar + "]";
	}
	
}
