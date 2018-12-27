package com.pxxy.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.announces;
import com.pxxy.pojo.huati;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;

public interface post_barService {

	int insert(post_bar record);
	PostUserDTO selectAllBar();	//查询所有贴吧
	int updateByPrimaryKeySelective(post_bar record);	//封禁贴吧
	post_bar queryBarPic(String barId);	//查询贴吧图片
	List<post_picture> querySlidePic();	//轮播图管理
	int updateByPrimaryKeySelective(post_picture record);
	announces selectAnnouncesByKey(String announceId);
	PostUserDTO selectBarByKW(String barName,int preNum, int pageSize);	//关键字查吧
	post_bar queryBarByName(String barName);	//根据name查bar
	int insertGG(announces record);	//添加公告
	int updateGG(announces record);	//编辑公告
	PostUserDTO selectAnnounceBack();	//查询所有公告
	PostUserDTO selectAllBarFY(int preNum,int pageSize);
	
}
