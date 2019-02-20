package com.pxxy.DTO;

import java.io.Serializable;
import java.util.List;

import com.pxxy.pojo.post_great;

public class DTOgreat implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<post_great> post_greatList;
	private int CountGreat;
	private int CountPost;
	public int getCountGreat() {
		return CountGreat;
	}

	public int getCountPost() {
		return CountPost;
	}

	public void setCountPost(int countPost) {
		CountPost = countPost;
	}

	public void setCountGreat(int countGreat) {
		CountGreat = countGreat;
	}

	public List<post_great> getPost_greatList() {
		return post_greatList;
	}

	public void setPost_greatList(List<post_great> post_greatList) {
		this.post_greatList = post_greatList;
	}
	
	
}
