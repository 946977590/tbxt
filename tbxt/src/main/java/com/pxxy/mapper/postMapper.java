package com.pxxy.mapper;

import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_picture;

public interface postMapper {
    int deleteByPrimaryKey(String postId);

    int insert(post record);

    int insertSelective(post record);

    post selectByPrimaryKey(String postId);

    int updateByPrimaryKeySelective(post record);

    int updateByPrimaryKey(post record);
    
    PostUserDTO queryPostByUserId(String userId);	//根据用户id查询相关post多表信息
    
    PostUserDTO queryPostViewByTest(String userId);	//测试首页推荐post
    
    DTOgreat queryPostLayer_great(String postId);	//Post详情  点赞
    
    DTOreaded queryPostLayer_readed(String postId);	//Post详情  阅读
    
    DTOtopic queryPostLayer_Topic(String postId);	//Post详情  评论
    
    DTOBarAndPic queryPostLayer_BarAndPic(String postId);	//Post详情 贴吧-图片
}