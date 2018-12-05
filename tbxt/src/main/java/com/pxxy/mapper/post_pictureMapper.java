package com.pxxy.mapper;

import com.pxxy.pojo.post_picture;

public interface post_pictureMapper {
    int deleteByPrimaryKey(String pictureId);

    int insert(post_picture record);	//ÉÏ´«Í¼Æ¬

    int insertSelective(post_picture record);

    post_picture selectByPrimaryKey(String pictureId);

    int updateByPrimaryKeySelective(post_picture record);

    int updateByPrimaryKey(post_picture record);
}