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
    List<huati> queryHotHuati();	//���Ż����Ƽ�
    
    List<?> queryHotHuatiNum();	//��ѯ�����Ӧ���ȶ�
    
    List<huati> queryAllHotHuati();
    List<?> queryAllHotHuatiNum();	//��ѯ�����Ӧ���ȶ�
}