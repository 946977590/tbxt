package com.pxxy.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.huati;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.post_readed;
import com.pxxy.pojo.user;
import com.alibaba.fastjson.JSONObject;
import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOhuati;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostByGreatReadedDTO;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.*;
import com.pxxy.service.postService;
import com.pxxy.utils.RedisUtil;
import com.pxxy.utils.SerializeUtil;

@Service
public class postServiceImpl implements postService {
	
	private static Logger logger = Logger.getLogger(postServiceImpl.class);  

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
	private userMapper userMapper;
	
	@Autowired 
	private post_topicMapper post_topicMapper;
	
	@Autowired 
	private huatiMapper huatiMapper;
	
	@Autowired
    private RedisUtil redisUtil;
	
	public int creatPost(post record) {
		int a = postMapper.insertSelective(record);
//		System.out.println("service=====post�ɹ�����"+a+"������");
		return a;
	}
	
	public int insertPicture(post_picture record) {
//		int a = postMapper.insertPicture(record);
//		System.out.println("service====post_picture�ɹ�����"+a+"������");
		return 0;
	}

	public PostUserDTO queryPostByUserId(String userId) {
		// TODO Auto-generated method stub
//		System.out.println("service===����queryPostByUserId����");
		PostUserDTO PostUserDTO = new PostUserDTO();
		DTOreaded DTOreaded = new DTOreaded();
		DTOgreat DTOgreat = new DTOgreat();
		int countRead = 0;
		int countGreat = 0;
		int rrr = 0;
		int ggg =0;
		
		long startTime = System.currentTimeMillis();
		
		DTOBarAndPic dTOBarAndPic0 = postMapper.queryPostByUserId(userId);
		List postList = postMapper.queryPostIdListByUserId(userId);
		for(int i=0;i<postList.size();i++) {
			String postId = (String) postList.get(i);
			rrr = post_readedMapper.CountReadByuser(postId);
			ggg = post_greatMapper.CountGreatByUser(postId);
			countRead = countRead+rrr;
			countGreat = countGreat+ggg;
		}
		int countPost = postMapper.CountPostByUser(userId);
		DTOreaded.setCountRead(countRead);
		DTOgreat.setCountGreat(countGreat);
		DTOgreat.setCountPost(countPost);
		PostUserDTO.setDTOreaded(DTOreaded);
		PostUserDTO.setDTOgreat(DTOgreat);
		DTOBarAndPic dTOBarAndPic = new DTOBarAndPic();
		if(dTOBarAndPic0 != null) {
			dTOBarAndPic = dTOBarAndPic0;
			PostUserDTO.setDTOBarAndPic(dTOBarAndPic);
		}else {
			DTOBarAndPic dTOBarAndPic2 = new DTOBarAndPic();
			dTOBarAndPic2.setPostList(null);
			dTOBarAndPic = dTOBarAndPic2;
			PostUserDTO.setDTOBarAndPic(dTOBarAndPic);
		}
		System.out.println("测试耗时======="+(System.currentTimeMillis()-startTime));
		return PostUserDTO;
	}
	
	public PostUserDTO queryPostViewByTest(String userId) {
		PostUserDTO postUserDTO = postMapper.queryPostViewByTest(userId);
		return postUserDTO;
	}

	//post��Layer��������
	public PostUserDTO queryPostLayer(String postId) {
		List<post_picture> Piclist = post_pictureMapper.selectByPostId(postId);
		DTOBarAndPic DTO_BarAndPic = postMapper.queryPostLayer_BarAndPic(postId);
		post post = postMapper.selectByPrimaryKey(postId);
		user user111 = userMapper.selectByPrimaryKey(post.getPostUserId());
		DTO_BarAndPic.getPost().setPostAuthor(user111.getUserNickname());
		DTO_BarAndPic.setPost_pictureList(Piclist);
		DTOtopic DTO_Topic = postMapper.queryPostLayer_Topic(postId);
		if(DTO_Topic != null) {
			for(int i=0;i<DTO_Topic.getPost_topicList().size();i++) {
				String userId = DTO_Topic.getPost_topicList().get(i).getUserId();
				user user = userMapper.selectByPrimaryKey(userId);
				DTO_Topic.getPost_topicList().get(i).setbUserId(user.getUserNickname());
			}
		}
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
		
//		if(redisUtil.hasKey("TopPostView")) {
//			redisUtil.del("TopPostView");
//			logger.debug("更新话题缓存");
//		}
//		DTOhuati DTOhuati = new DTOhuati();
//		List<huati> list = huatiMapper.queryHotHuati();
//		List<?> Numlist = huatiMapper.queryHotHuatiNum();
//		DTOhuati.setHuatiList(list);
//		DTOhuati.setNumList(Numlist);
//		redisUtil.set("huatiPostView", DTOhuati);
		
		return great;
	}

	public void delGreat(String greatId) {
//		if(redisUtil.hasKey("TopPostView")) {
//			redisUtil.del("TopPostView");
//			logger.debug("更新话题缓存");
//		}
//		DTOhuati DTOhuati = new DTOhuati();
//		List<huati> list = huatiMapper.queryHotHuati();
//		List<?> Numlist = huatiMapper.queryHotHuatiNum();
//		DTOhuati.setHuatiList(list);
//		DTOhuati.setNumList(Numlist);
//		redisUtil.set("huatiPostView", DTOhuati);
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
		if(redisUtil.hasKey("TopPostView")) {
			logger.debug("首页推荐===该数据从redis缓存读取");
			if(redisUtil.get("TopPostView") instanceof PostUserDTO)
			return (PostUserDTO) redisUtil.get("TopPostView");
		}
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		ArrayList postIdList = (ArrayList) postMapper.queryTopPostId();
		List delIdList = postMapper.queryDeletePostId();
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			if(delIdList.contains(postId)) continue;
			post post = postMapper.selectByPrimaryKey(postId);
			user user111 = userMapper.selectByPrimaryKey(post.getPostUserId());
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTO.getPost().setPostAuthor(user111.getUserNickname());//�޸������ǳ�bug
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
		}
		postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		try {
			redisUtil.set("TopPostView", postUserDTO, 60);
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.debug("首页推荐===该数据从数据库读取");
		return postUserDTO;
	}
	
	//����������
	public PostUserDTO queryBarPostView(String barId) {
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		//��ȡ���postId���鼯��
		ArrayList postIdList = (ArrayList) postMapper.queryBarPostId(barId);
		List delIdList = postMapper.queryDeletePostId();
		//�������id��ȡ��Ӧ��post
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			if(delIdList.contains(postId)) continue;
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
		}
		postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		return postUserDTO;
	}
	//��������
	public PostUserDTO queryHuatiPostView(String postCategory) {
		PostUserDTO postUserDTO = new PostUserDTO() ;
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		ArrayList postIdList = (ArrayList) postMapper.queryHuatiPostId(postCategory);
		//�������id��ȡ��Ӧ��post
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
		DTOBarAndPic DTOBarAndPic1 = postMapper.selectAllPostInBack();	//��̨��ѯ��������
		List<post> postList = DTOBarAndPic1.getPostList();
		for(int i=0;i<DTOBarAndPic1.getPostList().size();i++) {
			String barId = DTOBarAndPic1.getPostList().get(i).getPostBarId();
			post_bar post_bar = post_barMapper.queryBarNameById(barId);
			postList.get(i).setPostCategory(post_bar.getBarName());
		}
		DTOBarAndPic.setPostList(postList);
		return DTOBarAndPic;
	}
	
	public DTOBarAndPic selectAllPostInBackFY(int preNum,int pageSize) {
		DTOBarAndPic DTOBarAndPic = new DTOBarAndPic();
		DTOBarAndPic DTOBarAndPic1 = postMapper.selectAllPostInBackByFY(preNum, pageSize);
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
		if(redisUtil.hasKey("huatiPostView")) {
			logger.debug("热门话题===该数据从redis缓存读取");
			if(redisUtil.get("huatiPostView") instanceof DTOhuati)
			return (DTOhuati) redisUtil.get("huatiPostView");
		}
		DTOhuati DTOhuati = new DTOhuati();
		List<huati> list = huatiMapper.queryHotHuati();
		List<?> Numlist = huatiMapper.queryHotHuatiNum();
		DTOhuati.setHuatiList(list);
		DTOhuati.setNumList(Numlist);
		try {
			redisUtil.set("huatiPostView", DTOhuati,3600);
		}catch(Exception e) {
			e.printStackTrace();
		}
		logger.debug("热门话题===该数据从数据库读取");
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

	public DTOhuati queryHotHuatiAll() {
		DTOhuati DTOhuati = new DTOhuati();
		List<huati> list = huatiMapper.queryHotHuatiAll();
		DTOhuati.setHuatiList(list);
		return DTOhuati;
	}

	public DTOBarAndPic selectAllPostInBackByFYandKw(String postTitle, int preNum, int pageSize) {
		DTOBarAndPic DTOBarAndPic = new DTOBarAndPic();
		DTOBarAndPic DTOBarAndPic1 = postMapper.selectAllPostInBackByFYandKw(postTitle, preNum, pageSize);
		List<post> postList = DTOBarAndPic1.getPostList();
		for(int i=0;i<DTOBarAndPic1.getPostList().size();i++) {
			String barId = DTOBarAndPic1.getPostList().get(i).getPostBarId();
			post_bar post_bar = post_barMapper.queryBarNameById(barId);
			postList.get(i).setPostCategory(post_bar.getBarName());
		}
		DTOBarAndPic.setPostList(postList);
		return DTOBarAndPic;
	}

	public post judgePostUserTopic(String postId, String userId) {
		post post = postMapper.judgePostUserTopic(postId, userId);
		return post;
	}

	public int deleteTopic(String topicId) {
		int i = post_topicMapper.deleteByPrimaryKey(topicId);
		return i;
	}

}
