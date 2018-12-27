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
    PostUserDTO selectAllBar();	//查询所有贴吧
    PostUserDTO selectAllBarFY(@Param("preNum")int preNum,@Param("pageSize")int pageSize);	//查询所有贴吧
    PostUserDTO selectBarByKW(@Param("barName") String barName,@Param("preNum")int preNum,@Param("pageSize")int pageSize);	//关键字查吧
    post_bar queryBarNameById(String barIds); //根据id查吧名
    post_bar queryBarPic(String barId);	//查询贴吧图片
    post_bar queryBarByName(String barName);	//根据name查bar
}