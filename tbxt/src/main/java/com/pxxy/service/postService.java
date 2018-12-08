package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_picture;

public interface postService {

	int creatPost(post record);	//创建帖子
	PostUserDTO queryPostByUserId(String postId);	//根据用户id查询相关post多表信息
	PostUserDTO queryPostViewByTest(String userId);	//测试首页推荐post
	
    PostUserDTO queryPostLayer(String postId);	//Post详情 贴吧
    
}
