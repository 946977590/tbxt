package com.pxxy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.post;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;
import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostByGreatReadedDTO;
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

	//post的Layer详情数据
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

	public void greatAdd(String greatId, String postId, String userId) {
		postMapper.greatAdd(greatId, postId, userId);
	}

	public post_great judgeGreat(String postId, String userId) {
		post_great great = postMapper.judgeGreat(postId, userId);
		return great;
	}

	public void delGreat(String greatId) {
		postMapper.delGreat(greatId);
	}

	public DTOgreat queryPostLayer_great(String postId) {
		DTOgreat DTO_great = postMapper.queryPostLayer_great(postId);
		return DTO_great;
	}

	public void commentAdd(String topicId, String postId, String userId, String bUserId, String topicContent) {
		postMapper.commentAdd(topicId, postId, userId, bUserId, topicContent);
	}
	
	//贴吧首页热门推荐
	public PostUserDTO queryTopPostView() {
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		//获取相关postId数组集合
		ArrayList postIdList = (ArrayList) postMapper.queryTopPostId();
		//根据相关id获取对应的post
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
		}
		postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		return postUserDTO;
	}
	
	//吧内容详情
	public PostUserDTO queryBarPostView(String barId) {
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		//获取相关postId数组集合
		ArrayList postIdList = (ArrayList) postMapper.queryBarPostId(barId);
		//根据相关id获取对应的post
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
		}
		postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		return postUserDTO;
	}

	public PostUserDTO queryAllBar() {
		// TODO Auto-generated method stub
		PostUserDTO postUserDTO = postMapper.queryAllBar();
		return postUserDTO;
	}

}
