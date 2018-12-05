package com.pxxy.mapper;

import com.pxxy.pojo.post_readed;

public interface post_readedMapper {
    int deleteByPrimaryKey(String readedId);

    int insert(post_readed record);

    int insertSelective(post_readed record);

    post_readed selectByPrimaryKey(String readedId);

    int updateByPrimaryKeySelective(post_readed record);

    int updateByPrimaryKey(post_readed record);
}