package com.pxxy.DTO;

import java.util.List;

import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.user;

public class DTOBarAndPic {

	private post post;
	private post_bar post_bar;
	private user user;
	private List<post_picture> post_pictureList;
	private List<post> postList;
	private List<post_bar> post_barList;
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
	public user getUser() {
		return user;
	}
	public void setUser(user user) {
		this.user = user;
	}
	public List<post_picture> getPost_pictureList() {
		return post_pictureList;
	}
	public void setPost_pictureList(List<post_picture> post_pictureList) {
		this.post_pictureList = post_pictureList;
	}
	public List<post> getPostList() {
		return postList;
	}
	public void setPostList(List<post> postList) {
		this.postList = postList;
	}
	public List<post_bar> getPost_barList() {
		return post_barList;
	}
	public void setPost_barList(List<post_bar> post_barList) {
		this.post_barList = post_barList;
	}
	@Override
	public String toString() {
		return "DTOBarAndPic [post=" + post + ", post_bar=" + post_bar + ", user=" + user + ", post_pictureList="
				+ post_pictureList + ", postList=" + postList + ", post_barList=" + post_barList + "]";
	}
	
	
}
