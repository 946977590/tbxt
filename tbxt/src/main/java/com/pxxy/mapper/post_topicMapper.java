package com.pxxy.mapper;

import com.pxxy.pojo.post_topic;

public interface post_topicMapper {
    int deleteByPrimaryKey(String topicId);

    int insert(post_topic record);

    int insertSelective(post_topic record);

    post_topic selectByPrimaryKey(String topicId);

    int updateByPrimaryKeySelective(post_topic record);

    int updateByPrimaryKey(post_topic record);
}