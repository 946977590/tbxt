package com.pxxy.service;

import java.util.List;

import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.huati;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.post_readed;

public interface postService {

	post selectByPrimaryKey(String postId);
	int creatPost(post record);	//创建帖子
	PostUserDTO queryPostByUserId(String postId);	//根据用户id查询相关post多表信息
	PostUserDTO queryPostViewByTest(String userId);	//测试首页推荐post
	
	DTOgreat queryPostLayer_great(String postId);	//Post详情  点赞
    PostUserDTO queryPostLayer(String postId);	//Post详情 贴吧
    post_great judgeGreat(String postId,String userId);			//点赞判断
    void greatAdd(String greatId,String postId,String userId);	//点赞
    void delGreat(String greatId);		//取消点赞
    void commentAdd(String topicId,String postId,String userId,String bUserId,String topicContent);//增加评论
    
    PostUserDTO queryTopPostView();	//贴吧首页热门推荐
    PostUserDTO queryBarPostView(String barId);	//贴吧内容详情
    PostUserDTO queryAllBar(); 			//查询所有贴吧
    DTOBarAndPic selectAllPostInBack();	//后台查询所有帖子
    PostUserDTO selectAllAnnounce();	//查询所有公告
    int updateByPrimaryKeySelective(post record);	//更新post
    List<post_picture> queryAllPic();
    int deletePic(post_picture post_picture);
    int PostreadAdd(post_readed record);		//已读功能
    List<post_readed> judgeRead(String userId,String postId);	//判断该用户是否读过文章
    int insertHuati(huati record);	//插入话题
    List<huati> queryHotHuati();	//热门话题推荐
}
