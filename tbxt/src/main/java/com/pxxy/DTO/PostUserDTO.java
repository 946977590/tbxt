package com.pxxy.DTO;

import java.util.List;

import com.pxxy.pojo.*;
public class PostUserDTO {

	private post post;
	private post_bar post_bar;
	private user user;
	private post_great post_great;
	private post_readed post_readed;
	private post_topic post_topic;
	private List<post_picture> post_pictureList;
	private List<post> postList;
	private List<post_bar> post_barList;
	private List<post_great> post_greatList;
	private List<post_readed> post_readedList;
	private List<post_topic> post_topicList;
	
	private DTOgreat DTOgreat;
	private DTOreaded DTOreaded;
	private DTOBarAndPic DTOBarAndPic;
	private DTOtopic DTOtopic;
	
	
	
	
	public PostUserDTO() {
		super();
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
	public user getUser() {
		return user;
	}
	public void setUser(user user) {
		this.user = user;
	}
	public post_great getPost_great() {
		return post_great;
	}
	public void setPost_great(post_great post_great) {
		this.post_great = post_great;
	}
	public post_readed getPost_readed() {
		return post_readed;
	}
	public void setPost_readed(post_readed post_readed) {
		this.post_readed = post_readed;
	}
	public post_topic getPost_topic() {
		return post_topic;
	}
	public void setPost_topic(post_topic post_topic) {
		this.post_topic = post_topic;
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
	
	public List<post_great> getPost_greatList() {
		return post_greatList;
	}
	public void setPost_greatList(List<post_great> post_greatList) {
		this.post_greatList = post_greatList;
	}
	public List<post_readed> getPost_readedList() {
		return post_readedList;
	}
	public void setPost_readedList(List<post_readed> post_readedList) {
		this.post_readedList = post_readedList;
	}
	public List<post_topic> getPost_topicList() {
		return post_topicList;
	}
	public void setPost_topicList(List<post_topic> post_topicList) {
		this.post_topicList = post_topicList;
	}
	public DTOgreat getDTOgreat() {
		return DTOgreat;
	}
	public void setDTOgreat(DTOgreat dTOgreat) {
		DTOgreat = dTOgreat;
	}
	public DTOreaded getDTOreaded() {
		return DTOreaded;
	}
	public void setDTOreaded(DTOreaded dTOreaded) {
		DTOreaded = dTOreaded;
	}
	public DTOBarAndPic getDTOBarAndPic() {
		return DTOBarAndPic;
	}
	public void setDTOBarAndPic(DTOBarAndPic dTOBarAndPic) {
		DTOBarAndPic = dTOBarAndPic;
	}
	public DTOtopic getDTOtopic() {
		return DTOtopic;
	}
	public void setDTOtopic(DTOtopic dTOtopic) {
		DTOtopic = dTOtopic;
	}
	@Override
	public String toString() {
		return "PostUserDTO [post=" + post + ", post_bar=" + post_bar + ", user=" + user + ", post_great=" + post_great
				+ ", post_readed=" + post_readed + ", post_topic=" + post_topic + ", post_pictureList="
				+ post_pictureList + ", postList=" + postList + ", post_barList=" + post_barList + ", post_greatList="
				+ post_greatList + ", post_readedList=" + post_readedList + ", post_topicList=" + post_topicList
				+ ", DTOgreat=" + DTOgreat + ", DTOreaded=" + DTOreaded + ", DTOBarAndPic=" + DTOBarAndPic
				+ ", DTOtopic=" + DTOtopic + "]";
	}
	
}
