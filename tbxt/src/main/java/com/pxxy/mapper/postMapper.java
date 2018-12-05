package com.pxxy.mapper;

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
}