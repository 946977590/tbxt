package com.pxxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.post;
import com.pxxy.pojo.post_picture;
import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.postMapper;
import com.pxxy.service.postService;

@Service
public class postServiceImpl implements postService {

	@Autowired 
	private postMapper postMapper;
	
	public int creatPost(post record) {
		int a = postMapper.insert(record);
		System.out.println("service=====post成功插入"+a+"条数据");
		return a;
	}
	
	public int insertPicture(post_picture record) {
//		int a = postMapper.insertPicture(record);
//		System.out.println("service====post_picture成功插入"+a+"条数据");
		return 0;
	}

	public PostUserDTO queryPostByUserId(String postId) {
		// TODO Auto-generated method stub
		System.out.println("service===进入queryPostByUserId方法");
		PostUserDTO PostUserDTO = postMapper.queryPostByUserId(postId);
		return PostUserDTO;
	}
	
	public PostUserDTO queryPostViewByTest(String userId) {
		PostUserDTO postUserDTO = postMapper.queryPostViewByTest(userId);
		return postUserDTO;
	}

	public PostUserDTO queryPostLayer(String postId) {
		DTOBarAndPic DTO_BarAndPic = postMapper.queryPostLayer_BarAndPic(postId);
		DTOtopic DTO_Topic = postMapper.queryPostLayer_Topic(postId);
		DTOgreat DTO_great = postMapper.queryPostLayer_great(postId);
		DTOreaded DTO_readed = postMapper.queryPostLayer_readed(postId);
		PostUserDTO postDTO = new PostUserDTO();
		if(DTO_BarAndPic!=null) {
			postDTO.setDTOBarAndPic(DTO_BarAndPic);
		}if(DTO_Topic!=null) {
			postDTO.setDTOtopic(DTO_Topic);
		}if(DTO_great!=null) {
			postDTO.setDTOgreat(DTO_great);
		}if(DTO_readed!=null) {
			postDTO.setDTOreaded(DTO_readed);
		}
		return postDTO;
	}

}
