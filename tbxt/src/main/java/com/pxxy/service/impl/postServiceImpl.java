package com.pxxy.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.huati;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.post_readed;
import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOhuati;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostByGreatReadedDTO;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.*;
import com.pxxy.service.postService;

@Service
public class postServiceImpl implements postService {

	@Autowired 
	private postMapper postMapper;
	
	@Autowired 
	private post_barMapper post_barMapper;
	
	@Autowired 
	private post_greatMapper post_greatMapper;
	
	@Autowired 
	private post_readedMapper post_readedMapper;
	
	@Autowired 
	private post_pictureMapper post_pictureMapper;
	
	@Autowired 
	private announcesMapper announcesMapper;
	
	@Autowired 
	private huatiMapper huatiMapper;
	
	public int creatPost(post record) {
		int a = postMapper.insertSelective(record);
		System.out.println("service=====post成功插入"+a+"条数据");
		return a;
	}
	
	public int insertPicture(post_picture record) {
//		int a = postMapper.insertPicture(record);
//		System.out.println("service====post_picture成功插入"+a+"条数据");
		return 0;
	}

	public PostUserDTO queryPostByUserId(String userId) {
		// TODO Auto-generated method stub
		System.out.println("service===进入queryPostByUserId方法");
		PostUserDTO PostUserDTO = new PostUserDTO();
		DTOBarAndPic dTOBarAndPic = postMapper.queryPostByUserId(userId);
		DTOreaded DTOreaded = new DTOreaded();
		DTOgreat DTOgreat = new DTOgreat();
		List postList = postMapper.queryPostIdListByUserId(userId);
		int countRead = 0;
		int countGreat = 0;
		String postId = "";
		for(int i=0;i<postList.size();i++) {
			postId = (String) postList.get(i);
			countRead = post_readedMapper.CountReadByuser(postId);
			countGreat = post_greatMapper.CountGreatByUser(postId);
			System.out.println("=========i==="+i);
		}
		System.out.println("=========countRead==="+countRead);
		System.out.println("=========countGreat==="+countGreat);
		int countPost = postMapper.CountPostByUser(userId);
		DTOreaded.setCountRead(countRead);
		DTOgreat.setCountGreat(countGreat);
		DTOgreat.setCountPost(countPost);
		if(DTOreaded != null)PostUserDTO.setDTOreaded(DTOreaded);
		if(DTOgreat != null)PostUserDTO.setDTOgreat(DTOgreat);
		if(dTOBarAndPic != null)PostUserDTO.setDTOBarAndPic(dTOBarAndPic);
		return PostUserDTO;
	}
	
	public PostUserDTO queryPostViewByTest(String userId) {
		PostUserDTO postUserDTO = postMapper.queryPostViewByTest(userId);
		return postUserDTO;
	}

	//post的Layer详情数据
	public PostUserDTO queryPostLayer(String postId) {
		List<post_picture> Piclist = post_pictureMapper.selectByPostId(postId);
		DTOBarAndPic DTO_BarAndPic = postMapper.queryPostLayer_BarAndPic(postId);
		DTO_BarAndPic.setPost_pictureList(Piclist);
		DTOtopic DTO_Topic = postMapper.queryPostLayer_Topic(postId);
		DTOgreat DTO_great = postMapper.queryPostLayer_great(postId);
		int CountRead = post_readedMapper.CountReaded(postId);
		DTOreaded DTO_readed = new DTOreaded();
		DTO_readed.setCountRead(CountRead);
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
	//话题社区
	public PostUserDTO queryHuatiPostView(String postCategory) {
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		ArrayList postIdList = (ArrayList) postMapper.queryHuatiPostId(postCategory);
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

	
	public PostUserDTO selectAllAnnounce() {
		PostUserDTO postUserDTO = announcesMapper.selectAllAnnounce();
		return postUserDTO;
	}

	public post selectByPrimaryKey(String postId) {
		post post = postMapper.selectByPrimaryKey(postId);
		return post;
	}

	public DTOBarAndPic selectAllPostInBack() {
		DTOBarAndPic DTOBarAndPic = new DTOBarAndPic();
		DTOBarAndPic DTOBarAndPic1 = postMapper.selectAllPostInBack();	//后台查询所有帖子
		List<post> postList = DTOBarAndPic1.getPostList();
		for(int i=0;i<DTOBarAndPic1.getPostList().size();i++) {
			String barId = DTOBarAndPic1.getPostList().get(i).getPostBarId();
			post_bar post_bar = post_barMapper.queryBarNameById(barId);
			postList.get(i).setPostCategory(post_bar.getBarName());
		}
		DTOBarAndPic.setPostList(postList);
		return DTOBarAndPic;
	}

	public int updateByPrimaryKeySelective(post record) {
		int i = postMapper.updateByPrimaryKeySelective(record);
		return i;
	}

	public List<post_picture> queryAllPic() {
		List<post_picture> list = post_pictureMapper.queryAllPic();
		return list;
	}

	public int deletePic(post_picture post_picture) {
		int i = post_pictureMapper.updateByPrimaryKeySelective(post_picture);
		return i;
	}

	public int PostreadAdd(post_readed record) {
		int i = post_readedMapper.insert(record);
		return i;
	}

	public List<post_readed> judgeRead(String userId, String postId) {
		List<post_readed> post_readedList = post_readedMapper.judgeRead(userId,postId);
		return post_readedList;
	}

	public post_bar queryBarPic(String barId) {
		post_bar post_bar = post_barMapper.queryBarPic(barId);
		return post_bar;
	}

	public int insertHuati(huati record) {
		int i = huatiMapper.insert(record);
		return i;
	}

	public DTOhuati queryHotHuati() {
		DTOhuati DTOhuati = new DTOhuati();
		List<huati> list = huatiMapper.queryHotHuati();
		List<?> Numlist = huatiMapper.queryHotHuatiNum();
		DTOhuati.setHuatiList(list);
		DTOhuati.setNumList(Numlist);
		return DTOhuati;
	}

	public int updateHuati(huati record) {
		int i = huatiMapper.updateByPrimaryKeySelective(record);
		return i;
	}

	public DTOhuati queryHotHuatiByBackStage() {
		DTOhuati DTOhuati = new DTOhuati();
		List<huati> list = huatiMapper.queryAllHotHuati();
		List<?> Numlist = huatiMapper.queryAllHotHuatiNum();
		DTOhuati.setHuatiList(list);
		DTOhuati.setNumList(Numlist);
		return DTOhuati;
	}

}
