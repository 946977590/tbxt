package com.pxxy.mapper;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post_bar;

public interface post_barMapper {
    int deleteByPrimaryKey(String barId);

    int insert(post_bar record);

    int insertSelective(post_bar record);

    post_bar selectByPrimaryKey(String barId);

    int updateByPrimaryKeySelective(post_bar record);

    int updateByPrimaryKey(post_bar record);
    PostUserDTO selectAllBar();	//²éÑ¯ËùÓÐÌù°É
}