package com.pxxy.mapper;

import com.pxxy.pojo.post_great;

public interface post_greatMapper {
    int deleteByPrimaryKey(String greatId);

    int insert(post_great record);

    int insertSelective(post_great record);

    post_great selectByPrimaryKey(String greatId);

    int updateByPrimaryKeySelective(post_great record);

    int updateByPrimaryKey(post_great record);
    
    int CountGreatByUser(String postId);
}