package com.pxxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.post;
import com.pxxy.pojo.post_picture;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.postMapper;
import com.pxxy.service.postService;

@Service
public class postServiceImpl implements postService {

	@Autowired 
	private postMapper postMapper;
	
	public int creatPost(post record) {
		int a = postMapper.insert(record);
		System.out.println("service=====post�ɹ�����"+a+"������");
		return a;
	}
	
	public int insertPicture(post_picture record) {
//		int a = postMapper.insertPicture(record);
//		System.out.println("service====post_picture�ɹ�����"+a+"������");
		return 0;
	}

	public PostUserDTO queryPostByUserId(String postId) {
		// TODO Auto-generated method stub
		System.out.println("service===����queryPostByUserId����");
		PostUserDTO PostUserDTO = postMapper.queryPostByUserId(postId);
		return PostUserDTO;
	}
	
	public void test() {
		System.out.println("alsihdoaiuhsfiouahirfuaishu");
	}

}
