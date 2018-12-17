package com.pxxy.service;

import org.apache.ibatis.annotations.Param;

import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;

public interface postService {

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
}
