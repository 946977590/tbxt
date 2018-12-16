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
	
	//������ҳ�����Ƽ�
	public PostUserDTO queryTopPostView() {
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		//��ȡ���postId���鼯��
		ArrayList postIdList = (ArrayList) postMapper.queryTopPostId();
		//�������id��ȡ��Ӧ��post
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
		}
		postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		return postUserDTO;
	}

}
