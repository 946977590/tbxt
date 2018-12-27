package com.pxxy.mapper;


import org.apache.ibatis.annotations.Param;

import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post_bar;

public interface post_barMapper {
    int deleteByPrimaryKey(String barId);

    int insert(post_bar record);

    int insertSelective(post_bar record);

    post_bar selectByPrimaryKey(String barId);

    int updateByPrimaryKeySelective(post_bar record);

    int updateByPrimaryKey(post_bar record);
    PostUserDTO selectAllBar();	//��ѯ��������
    PostUserDTO selectAllBarFY(@Param("preNum")int preNum,@Param("pageSize")int pageSize);	//��ѯ��������
    PostUserDTO selectBarByKW(@Param("barName") String barName,@Param("preNum")int preNum,@Param("pageSize")int pageSize);	//�ؼ��ֲ��
    post_bar queryBarNameById(String barIds); //����id�����
    post_bar queryBarPic(String barId);	//��ѯ����ͼƬ
    post_bar queryBarByName(String barName);	//����name��bar
}