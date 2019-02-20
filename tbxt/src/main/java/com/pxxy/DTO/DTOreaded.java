package com.pxxy.DTO;

import java.io.Serializable;
import java.util.List;

import com.pxxy.pojo.post_readed;

public class DTOreaded implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<post_readed> post_readedList;
	private int countRead;
	
	
	public List<post_readed> getPost_readedList() {
		return post_readedList;
	}


	public void setPost_readedList(List<post_readed> post_readedList) {
		this.post_readedList = post_readedList;
	}


	public int getCountRead() {
		return countRead;
	}


	public void setCountRead(int countRead) {
		this.countRead = countRead;
	}

}
