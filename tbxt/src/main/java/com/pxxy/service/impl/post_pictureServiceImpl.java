package com.pxxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.post_picture;
import com.pxxy.mapper.post_pictureMapper;
import com.pxxy.service.post_pictureService;

@Service
public class post_pictureServiceImpl implements post_pictureService {

	@Autowired 
	private post_pictureMapper post_pictureMapper;
	
	public int insert(post_picture record) {
		int a = post_pictureMapper.insert(record);
		System.out.println("service====post_picture成功插入"+a+"条数据");
		return a;
	}

}
