package com.pxxy.mapper;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.announces;

public interface announcesMapper {
    int deleteByPrimaryKey(String announceId);

    int insert(announces record);

    int insertSelective(announces record);

    announces selectByPrimaryKey(String announceId);

    int updateByPrimaryKeySelective(announces record);

    int updateByPrimaryKey(announces record);
    
    PostUserDTO selectAllAnnounce();	//��ѯ���й���
}