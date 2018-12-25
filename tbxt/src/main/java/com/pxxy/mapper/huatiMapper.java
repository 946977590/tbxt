package com.pxxy.mapper;

import java.util.List;

import com.pxxy.pojo.huati;

public interface huatiMapper {
    int deleteByPrimaryKey(String huatiId);

    int insert(huati record);

    int insertSelective(huati record);

    huati selectByPrimaryKey(String huatiId);

    int updateByPrimaryKeySelective(huati record);

    int updateByPrimaryKey(huati record);
    List<huati> queryHotHuati();	//热门话题推荐
    
    List<?> queryHotHuatiNum();	//查询话题对应的热度
    
    List<huati> queryAllHotHuati();
    List<?> queryAllHotHuatiNum();	//查询话题对应的热度
}