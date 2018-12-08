package com.pxxy.DTO;

import java.util.List;

import com.pxxy.pojo.post_topic;

public class DTOtopic {

	private post_topic post_topic;
	
	private List<post_topic> post_topicList;

	public post_topic getPost_topic() {
		return post_topic;
	}

	public void setPost_topic(post_topic post_topic) {
		this.post_topic = post_topic;
	}

	public List<post_topic> getPost_topicList() {
		return post_topicList;
	}

	public void setPost_topicList(List<post_topic> post_topicList) {
		this.post_topicList = post_topicList;
	}

	@Override
	public String toString() {
		return "DTOtopic [post_topic=" + post_topic + ", post_topicList=" + post_topicList + "]";
	}
	
	
}
